import createHttpError from "http-errors";
import orderModel from "./orders.model.js";
import cartModel from "../cart/cart.model.js";
import stateModel from "../states/state.model.js";

import paymentMethodModel from "../paymentMethod/paymentMethod.model.js";

class OrderService {
  getAllOrder = async () => {
    return await orderModel.findAll();
  };

  getAllUserOrderWithState = async (req, payload) => {
    if (payload.user_id !== req.params.id) throw createHttpError.Unauthorized();
    const { state, start_date, end_date } = req.query;

    return await orderModel.findAllByIdAndState(
      payload.user_id,
      state,
      start_date,
      end_date
    );
  };

  placeNewOrder = async (req, payload) => {
    const { user_id } = payload;
    const { payment_method_id } = req.body;

    // Check payment method
    const paymentMethod = await paymentMethodModel.findPaymentById(
      +payment_method_id
    );
    if (!paymentMethod?.length) throw createHttpError.BadRequest();

    // Verify cart not empty
    const items = await cartModel.findAll(user_id);
    if (!items.length) {
      throw createHttpError.BadRequest();
    }

    // Check cart not overstocking
    const productOverStocking = await orderModel.findProductOverStocking(
      user_id
    );
    if (productOverStocking.length > 0) {
      throw createHttpError.Conflict("Your cart has product overstocking!");
    }

    // TODO: Limit order per day

    // Calculate cart total price (TODO: Voucher, coupon, discount code)
    const initSum = 0;
    const total_price = items.reduce(
      (accumulator, currentVariant) => accumulator + currentVariant.sub_price,
      initSum
    );

    await orderModel.save(
      user_id,
      JSON.stringify(items),
      total_price,
      payment_method_id
    );

    await cartModel.clearCart(user_id);
  };

  updateOrderState = async (req, payload, state_id) => {
    if (payload.user_id !== req.params.id) throw createHttpError.Unauthorized();

    // check state available
    const isValid = await stateModel.isStateExisted(state_id);
    if (!isValid) throw createHttpError.BadRequest();

    const order_id = req.query?.order_id;

    return await orderModel.updateOrderState(
      payload.user_id,
      order_id,
      state_id
    );
  };
}

export default new OrderService();
