import { format } from "date-fns";
import { NOTIFICATION_TYPE } from "../../utils/constVariable.js";
import {
  formatMoney,
  getDateFromTimestamp,
  formatHyphenToUpperCase,
} from "../../utils/formatData.js";

const HEADER_TAG = {
  toShip: "shipping",
  placedSuccess: "place an order success",
  pendingCancel: "pending cancel order",
  shippingFailed: "shipping failure",
  cancelSuccess: "cancel order success",
};

const placeOrderSuccessMsg = () => {
  const subject = HEADER_TAG.placedSuccess;
  const message =
    "Your order has been placed successfully! Thank you for your business!";

  return { subject: subject, message: message, type: NOTIFICATION_TYPE.orders };
};

const confirmOrderToShipMsg = (order) => {
  const orderId = formatHyphenToUpperCase(order.id);
  const totalPrice = formatMoney(order.total_price);
  const timePlaced = format(
    getDateFromTimestamp(order.created_at),
    "yyyy-MM-dd HH:mm:ss"
  );

  const subject = HEADER_TAG.toShip;
  const message = `
      We are pleased to inform you that your order has been processed and is now 
      being shipped. The estimated time for delivery is 3 days. 
      The order ${orderId} with the total price ${totalPrice} you placed at ${timePlaced}. 
      Thank you for choosing our store for your purchase.
    `;

  return { subject: subject, message: message, type: NOTIFICATION_TYPE.orders };
};

const requestCancelOrderMsg = (orderId) => {
  const subject = HEADER_TAG.pendingCancel;
  const message = `
      We have received your request to cancel your order. We would like to inform 
      you that we have received your request and we are currently processing it. 
      Please note that if your order has already been shipped, it may not be possible
      to cancel it.
      The order id: ${formatHyphenToUpperCase(orderId)}
    `;

  return { subject: subject, message: message, type: NOTIFICATION_TYPE.orders };
};

const cancelOrderOnShippingFailureMsg = (orderId) => {
  const subject = HEADER_TAG.shippingFailed;
  const message = `
    We are sorry to inform you that the delivery of your order has failed. We 
    have been notified by our shipping carrier that they were unable to deliver 
    your order to the address provided. 
    The order id: ${formatHyphenToUpperCase(orderId)}
  `;

  return { subject: subject, message: message, type: NOTIFICATION_TYPE.orders };
};

const approveUserCancelOrderMsg = (orderId) => {
  const subject = HEADER_TAG.cancelSuccess;
  const message = `
        We wanted to inform you that your request to cancel your order has been 
        successfully processed. Your order has been cancelled and a refund, if 
        applicable, has been issued back to your original payment method.
        The order id: ${formatHyphenToUpperCase(orderId)}
    `;

  return { subject: subject, message: message, type: NOTIFICATION_TYPE.orders };
};

const informOrderShippingSuccessMsg = (orderId) => {
  const subject = HEADER_TAG.cancelSuccess;
  const message = `
        We are writing to confirm that your order has been successfully delivered 
        and received. We hope that you are satisfied with your purchase and that it
        meets your expectations.
        The order id: ${formatHyphenToUpperCase(orderId)}
    `;

  return { subject: subject, message: message, type: NOTIFICATION_TYPE.orders };
};

export default {
  placeOrderSuccessMsg,
  confirmOrderToShipMsg,
  requestCancelOrderMsg,
  cancelOrderOnShippingFailureMsg,
  approveUserCancelOrderMsg,
  informOrderShippingSuccessMsg,
};
