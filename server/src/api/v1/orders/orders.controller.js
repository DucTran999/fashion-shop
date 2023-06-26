import ordersService from "./orders.service.js";

class OrderController {
  getAllUserOrdersByStateReq = async (req, res, next) => {
    try {
      const orders = await ordersService.getAllUserOrdersByState(req);

      res
        .status(200)
        .json({ status: "success", message: null, elements: orders });
    } catch (err) {
      next(err);
    }
  };

  getUserOrdersByStateReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      const orders = await ordersService.getUserOrdersByState(req, payload);

      res
        .status(200)
        .json({ status: "success", message: null, elements: orders });
    } catch (err) {
      next(err);
    }
  };

  placeOrderReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      await ordersService.placeOrder(req, payload);

      res.status(200).json({ status: "success", message: null });
    } catch (err) {
      next(err);
    }
  };

  confirmUserOrderReq = async (req, res, next) => {
    try {
      await ordersService.confirmUserOrder(req);

      res.status(200).json({ status: "success", message: null });
    } catch (err) {
      next(err);
    }
  };

  // use for set state to completed and cancelled order
  adminUpdateOrderStateReq = async (req, res, next) => {
    try {
      await ordersService.adminUpdateOrderState(req);

      res.status(200).json({ status: "success", message: null });
    } catch (err) {
      next(err);
    }
  };

  cancelUserOrderShippingFailedReq = async (req, res, next) => {
    try {
      await ordersService.cancelUserOrderShippingFailed(req);

      res.status(200).json({ status: "success", message: null });
    } catch (err) {
      next(err);
    }
  };

  cancelOrderPendingAdminApprovalReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      await ordersService.cancelOrderPendingAdminApproval(req, payload);

      res.status(200).json({ status: "success", message: null });
    } catch (err) {
      next(err);
    }
  };
}

export default new OrderController();
