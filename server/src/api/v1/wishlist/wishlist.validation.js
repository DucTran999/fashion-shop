import createHttpError from "http-errors";

const validateAddProductToWishlistPayload = (req, res, next) => {
  try {
    // Check param
    const wishlistId = req.params?.wishlist_id;
    if (!wishlistId || isNaN(wishlistId)) throw createHttpError.BadRequest();

    // Check body
    const productId = req.body?.product_id;
    if (!productId || isNaN(productId)) throw createHttpError.BadRequest();

    next();
  } catch (error) {
    next(error);
  }
};

const validateDeleteProductWishlistPayload = (req, res, next) => {
  try {
    // Check param
    const wishlistId = req.params?.wishlist_id;
    if (!wishlistId || isNaN(wishlistId)) throw createHttpError.BadRequest();

    // Check body
    const productId = req.params?.product_id;
    if (!productId || isNaN(productId)) throw createHttpError.BadRequest();

    next();
  } catch (error) {
    next(error);
  }
};

const validateGetProductWishlistPayload = (req, res, next) => {
  try {
    // Check param
    const wishlistId = req.params?.wishlist_id;
    if (!wishlistId || isNaN(wishlistId)) throw createHttpError.BadRequest();

    next();
  } catch (error) {
    next(error);
  }
};

const validateSyncWishlistPayload = (req, res, next) => {
  try {
    // Check param
    const wishlistId = req.params?.wishlist_id;
    if (!wishlistId || isNaN(wishlistId)) throw createHttpError.BadRequest();

    // Check wishlist local
    const wishlistLocal = req.body?.wishlist_local;
    if (wishlistLocal === null || wishlistLocal === undefined)
      throw createHttpError.BadRequest();

    if (wishlistLocal.length > 0) {
      for (const productId of wishlistLocal) {
        if (isNaN(productId)) throw createHttpError.BadRequest();
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default {
  validateSyncWishlistPayload: validateSyncWishlistPayload,
  validateGetProductWishlistPayload: validateGetProductWishlistPayload,
  validateAddProductToWishlistPayload: validateAddProductToWishlistPayload,
  validateDeleteProductWishlistPayload: validateDeleteProductWishlistPayload,
};
