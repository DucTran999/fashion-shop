import ordersService from "./orders.service.js";

class OrderController {
  getAllOrdersWithState = async (req, res, next) => {
    try {
      const orders = await ordersService.getAllOrders(req);

      res
        .status(200)
        .json({ status: "success", message: null, elements: orders });
    } catch (err) {
      next(err);
    }
  };

  getUserOrderWithState = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      const orders = await ordersService.getAllUserOrderWithState(req, payload);

      res
        .status(200)
        .json({ status: "success", message: null, elements: orders });
    } catch (err) {
      next(err);
    }
  };

  placeNewOrder = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      await ordersService.placeNewOrder(req, payload);

      res.status(200).json({ status: "success", message: null });
    } catch (err) {
      next(err);
    }
  };

  confirmOrder = async (req, res, next) => {
    try {
      await ordersService.confirmOrder(req);

      res.status(200).json({ status: "success", message: null });
    } catch (err) {
      next(err);
    }
  };

  // use for set state to completed and cancelled order
  adminUpdateOrderState = async (req, res, next) => {
    try {
      await ordersService.handleRejectAndCompleteOrder(req);

      res.status(200).json({ status: "success", message: null });
    } catch (err) {
      next(err);
    }
  };

  cancelOrderDeliveryFailed = async (req, res, next) => {
    try {
      await ordersService.handleCancelOrderShippingFailed(req);

      res.status(200).json({ status: "success", message: null });
    } catch (err) {
      next(err);
    }
  };

  cancelOrder = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      await ordersService.updateOrderState(req, payload, 5);

      res.status(200).json({ status: "success", message: null });
    } catch (err) {
      next(err);
    }
  };
}

export default new OrderController();
