import cartService from "./cart.service.js";

class CartController {
  getCart = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;

      const [variants, total_price] = await cartService.getCart(req, payload);

      res.status(200).json({
        status: "success",
        message: null,

        elements: { products: variants, total_price: total_price },
      });
    } catch (error) {
      next(error);
    }
  };

  getCartBrief = async (req, res, next) => {
    try {
      const variants = await cartService.getCartBrief(req);

      res
        .status(200)
        .json({ status: "success", message: null, elements: variants });
    } catch (error) {
      next(error);
    }
  };

  updateCart = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;

      await cartService.addProductToCart(req, payload);

      res.status(200).json({ status: "success", message: null });
    } catch (error) {
      next(error);
    }
  };

  updateQtyFormCart = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;

      await cartService.addProductToCartOverride(req, payload);

      res.status(200).json({ status: "success", message: null });
    } catch (error) {
      next(error);
    }
  };

  removeProductCart = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      await cartService.removeProductCart(req, payload);

      res.status(200).json({ status: "success", message: null });
    } catch (error) {
      next(error);
    }
  };
}

export default new CartController();
