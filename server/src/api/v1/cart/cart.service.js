import createHttpError from "http-errors";
import cartModel from "./cart.model.js";
import variantModel from "../variants/variant.model.js";

class CartService {
  getCartBrief = async (req) => {
    return await cartModel.findAllBrief(req.params.id);
  };

  getCart = async (req, payload) => {
    if (req.params.id !== payload.user_id) throw createHttpError.Unauthorized();
    const carts = await cartModel.findAll(payload.user_id);

    if (carts.length) {
      const initSum = 0;
      const sum = carts.reduce(
        (accumulator, currentVariant) => accumulator + currentVariant.sub_price,
        initSum
      );
      return [carts, sum];
    }
    return [carts, 0];
  };

  addProductToCart = async (req, payload) => {
    if (req.params.id !== payload.user_id) throw createHttpError.Unauthorized();

    const { cart_id, variant_id, qty } = req.body;

    // Check variant in DB
    const variantDB = await variantModel.findById(variant_id);
    if (!variantDB.length) throw createHttpError.BadRequest();

    // Check new qty not over product in stock
    if (+qty > +variantDB[0].in_stock) {
      throw createHttpError.Conflict(
        "Cannot order greater than quantity in stock"
      );
    }

    // Check total new qty and qty in cart not over in stock.
    const productInCart = await cartModel.findById(cart_id, variant_id);
    if (productInCart.length > 0) {
      const totalQty = +productInCart[0].qty + +qty;

      if (totalQty > +variantDB[0].in_stock) {
        const allowQty = variantDB[0].in_stock - productInCart[0].qty;
        if (allowQty === 0) {
          throw createHttpError.Conflict(`Maximum quantity in cart`);
        }
        if (allowQty > 0) {
          throw createHttpError.Conflict(
            `You can only order ${allowQty} more products`
          );
        }
      }

      // Save product with qty to cart
      await cartModel.saveOne(cart_id, variant_id, totalQty);
      return;
    }

    // Save product to cart
    await cartModel.saveOne(cart_id, variant_id, qty);
  };

  addProductToCartOverride = async (req, payload) => {
    if (req.params.id !== payload.user_id) throw createHttpError.Unauthorized();

    const { variant_id, qty } = req.body;

    // Check variant in DB
    const variantDB = await variantModel.findById(variant_id);
    if (!variantDB.length) throw createHttpError.BadRequest();

    // Check new qty not over product in stock
    if (+qty > +variantDB[0].in_stock) {
      throw createHttpError.Conflict(
        "Cannot order greater than quantity in stock"
      );
    }

    // Save product to cart
    await cartModel.saveOne(payload.user_id, variant_id, qty);
  };

  removeProductCart = async (req, payload) => {
    if (req.params.id !== payload.user_id) throw createHttpError.Unauthorized();

    const { variant_id } = req.body;
    await cartModel.updateOne(payload.user_id, variant_id, 0);
  };
}

export default new CartService();
