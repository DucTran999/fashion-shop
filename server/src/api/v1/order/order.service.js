import createHttpError from "http-errors";

import orderModel from "./order.model.js";
import variantModel from "../variants/variant.model.js";
import cartModel from "../cart/cart.model.js";
import paymentModel from "../payment/payment.model.js";
import notificationService from "../notification/notification.service.js";
import messageTemplate from "../notification/messageTemplate.js";

import { ORDER_STATE_ID } from "../../utils/constVariable.js";
import { extractVariantId } from "../../utils/normalizeData.js";

class OrderService {
  getAllUserOrdersByState = async (req) => {
    const state_id = req.query?.state_id;
    if (!state_id) throw createHttpError.BadRequest();

    const orders = await orderModel.findAll(state_id);
    if (!orders.length) return orders;

    // Classify orders pending: overstock or not
    if (state_id === ORDER_STATE_ID.pending) {
      const ordersClassified = [];

      for (let i = 0; i < orders.length; ++i) {
        let total = 0;
        let hasOverstock = false;
        let itemsChecked = [];
        const items = orders[i].items;

        // Get list variant id
        const variantIds = extractVariantId(items);

        // Get latest qty for list items
        const latestQty = await variantModel.findLatestQtyInStock(variantIds);

        // Check overstock
        for (let i = 0; i < items.length; i++) {
          const isOverstock = items[i].qty > latestQty[i].in_stock;
          if (isOverstock) hasOverstock = true;
          total += items[i].sub_price;
          itemsChecked.push({ ...items[i], overstock: isOverstock });
        }

        ordersClassified.push({
          ...orders[i],
          items: itemsChecked,
          total_price: total,
          has_overstock: hasOverstock,
        });
      }
      return ordersClassified;
    }

    // Other type no need check overstock
    let ordersWithTotalPrice = [];
    for (let i = 0; i < orders.length; ++i) {
      let totalPrice = 0;
      const items = orders[i].items;
      items.forEach((item) => {
        totalPrice += item.sub_price;
      });

      ordersWithTotalPrice.push({ ...orders[i], total_price: totalPrice });
    }

    return ordersWithTotalPrice;
  };

  getUserOrdersByState = async (req, payload) => {
    if (payload.user_id !== req.params.id) throw createHttpError.Unauthorized();
    const { state, start_date, end_date } = req.query;

    return await orderModel.findAllByIdAndState(
      payload.user_id,
      state,
      start_date,
      end_date
    );
  };

  placeOrder = async (req, payload) => {
    const { user_id } = payload;
    const { payment_method_id } = req.body;

    // Check payment method
    const paymentMethod = await paymentModel.findPaymentById(
      +payment_method_id
    );
    if (!paymentMethod?.length) throw createHttpError.BadRequest();

    // Verify cart not empty
    const items = await cartModel.findAll(user_id);
    if (!items.length) throw createHttpError.BadRequest();

    // Check cart not overstocking
    const productOverStock = await orderModel.findProductOverstock(user_id);
    if (productOverStock.length > 0) {
      throw createHttpError.Conflict("Your cart has product overstock!");
    }

    // TODO: Limit order per day

    // Calculate cart total price (TODO: Voucher, coupon, discount code)
    const initSum = 0;
    const total_price = items.reduce(
      (accumulator, currentVariant) => accumulator + currentVariant.sub_price,
      initSum
    );

    // Save or to DB
    await orderModel.save(
      user_id,
      JSON.stringify(items),
      total_price,
      payment_method_id
    );

    await cartModel.clearCart(user_id);
    const message = messageTemplate.placeOrderSuccessMsg();
    await notificationService.pushOrderNotification(user_id, message);
  };

  confirmUserOrder = async (req) => {
    const orderId = req.params.id;
    if (!orderId) throw createHttpError.BadRequest();
    const order = req.body;
    if (!order) throw createHttpError.BadRequest();

    // Decrease stock
    const items = order.items;
    const variantIds = extractVariantId(items);
    const qtyInStock = await variantModel.findLatestQtyInStock(variantIds);

    for (let i = 0; i < items.length; ++i) {
      let newQty = qtyInStock[i].in_stock - items[i].qty;
      await variantModel.updateNewQty(qtyInStock[i].id, newQty);
    }

    // Update to delivery state
    orderModel.updateOrderState(
      order.user_id,
      orderId,
      ORDER_STATE_ID.shipping
    );

    const message = messageTemplate.confirmOrderToShipMsg(order);
    await notificationService.pushOrderNotification(order.user_id, message);
  };

  adminUpdateOrderState = async (req) => {
    const orderId = req.params.order_id;
    if (!orderId) throw createHttpError.BadRequest();
    const body = req.body;
    if (!body) throw createHttpError.BadRequest();
    const { user_id, current_state_id, next_state_id } = req.body;

    orderModel.updateOrderState(user_id, orderId, next_state_id);

    // Push notification
    if (current_state_id === ORDER_STATE_ID.shipping) {
      const message = messageTemplate.informOrderShippingSuccessMsg(orderId);
      await notificationService.pushOrderNotification(user_id, message);
      return;
    }

    if (current_state_id === ORDER_STATE_ID.pending) {
      const message = messageTemplate.cancelOrderOverstockMsg(orderId);
      await notificationService.pushOrderNotification(user_id, message);
      return;
    }

    if (current_state_id === ORDER_STATE_ID.cancelling) {
      const message = messageTemplate.approveUserCancelOrderMsg(orderId);
      await notificationService.pushOrderNotification(user_id, message);
      return;
    }
  };

  cancelUserOrderShippingFailed = async (req) => {
    const orderId = req.params?.id;
    if (!orderId) throw createHttpError.BadRequest();
    const order = req.body;
    if (!order) throw createHttpError.BadRequest();

    // revert qty in stock
    const items = order.items;
    const variantIds = extractVariantId(items);
    const qtyInStock = await variantModel.findLatestQtyInStock(variantIds);

    for (let i = 0; i < items.length; ++i) {
      let newQty = qtyInStock[i].in_stock + items[i].qty;
      await variantModel.updateNewQty(qtyInStock[i].id, newQty);
    }

    // Update to cancelled state
    orderModel.updateOrderState(
      order.user_id,
      orderId,
      ORDER_STATE_ID.cancelled
    );

    const message = messageTemplate.cancelOrderOnShippingFailureMsg(orderId);
    await notificationService.pushOrderNotification(order.user_id, message);
  };

  cancelOrderPendingAdminApproval = async (req, payload) => {
    if (payload.user_id !== req.params.id) throw createHttpError.Unauthorized();
    const { order_id } = req.query;

    await orderModel.updateOrderState(
      payload.user_id,
      order_id,
      ORDER_STATE_ID.cancelling
    );

    // Push notification
    const message = messageTemplate.requestCancelOrderMsg(order_id);
    await notificationService.pushOrderNotification(payload.user_id, message);
  };
}

export default new OrderService();
