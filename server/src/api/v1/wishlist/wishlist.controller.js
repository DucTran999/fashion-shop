import createHttpError from "http-errors";
import wishlistService from "./wishlist.service.js";

class WishlistController {
  /**
   * Fetching latest user wishlist
   */
  getWishlistReq = async (payload, req, res, next) => {
    try {
      // Pass error to error Handler
      if (payload instanceof Error) throw payload;

      // Check params semantic
      const { user_id } = payload;
      const { wishlist_id } = req.params;
      if (user_id !== wishlist_id)
        throw createHttpError.Unauthorized("Invalid Token");

      // Fetch latest wishlist
      const products = await wishlistService.getWishlist(user_id);
      const response = { status: "success", message: null, wishlist: products };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Sync local wishlist with wishlist in DB when user logged in.
   */
  syncWishlistReq = async (payload, req, res, next) => {
    try {
      // Pass error to error Handler
      if (payload instanceof Error) throw payload;

      // Check params semantic
      const { user_id } = payload;
      const { wishlist_id } = req.params;
      const { wishlist_local } = req.body;
      if (user_id !== wishlist_id)
        throw createHttpError.Unauthorized("Invalid Token");

      // Sync wishlist and return the latest
      await wishlistService.syncWishlist(wishlist_id, wishlist_local);
      const products = await wishlistService.getWishlist(wishlist_id);
      const response = { status: "success", message: null, wishlist: products };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Add a new productId to user wishlist and response latest wishlist
   */
  addProductToWishlistReq = async (payload, req, res, next) => {
    try {
      // Pass error to error Handler
      if (payload instanceof Error) throw payload;

      // Check params semantic
      const userId = payload.user_id;
      const productId = req.body.product_id;
      const wishlistId = req.params.wishlist_id;
      if (userId !== wishlistId)
        throw createHttpError.Unauthorized("Invalid token");

      // Update and return latest wishlist
      await wishlistService.addProductToWishlist(userId, productId);
      const products = await wishlistService.getWishlist(userId);
      const response = { status: "success", message: null, wishlist: products };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete product from wishlist and response wishlist updated
   */
  deleteProductFromWishlistReq = async (payload, req, res, next) => {
    try {
      // Pass error to error Handler
      if (payload instanceof Error) throw payload;

      // Check params semantic
      const { wishlist_id, product_id } = req.params;
      const { user_id } = payload;
      if (user_id !== wishlist_id)
        throw createHttpError.BadRequest("Invalid Token");

      // Update and return latest wishlist
      await wishlistService.deleteProductFromWishlist(user_id, product_id);
      const products = await wishlistService.getWishlist(wishlist_id);
      const response = { status: "success", message: null, wishlist: products };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default new WishlistController();
