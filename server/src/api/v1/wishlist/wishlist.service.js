import createHttpError from "http-errors";

import productService from "../products/product.service.js";
import wishlistModel from "./wishlist.model.js";

const getWishlist = async (wishlistId) => {
  const productIds = await wishlistModel.getWishlistDB(wishlistId);

  return await productService.findProductsByListIds(productIds);
};

/**
 * Merge local wishlist and wishlist in Db without any duplicate.
 * @param {array<number>} wishlistLocal Wishlist send from local
 * @param {array<number>} wishlistDB    Wishlist get from DB
 * @return {Promise<array<string>>}     An array includes unique numbers
 */
const mergeWishlist = async (wishlistLocal, wishlistDB) => {
  const wishlistMerged = [...wishlistLocal, ...wishlistDB];
  const totalProduct = await productService.getTotalProducts();

  let wishlistFiltered = [];
  for (let productId of wishlistMerged) {
    let productIdString = String(productId);

    if (
      +productIdString > totalProduct ||
      wishlistFiltered.indexOf(productIdString) !== -1
    )
      continue;

    wishlistFiltered.push(productIdString);
  }

  return wishlistFiltered;
};

const syncWishlist = async (wishlistId, wishlistLocal) => {
  if (!wishlistLocal.length) return;

  const wishlistDB = await wishlistModel.getWishlistDB(wishlistId);

  const wishlistMerged = await mergeWishlist(wishlistLocal, wishlistDB);

  await wishlistModel.saveBulkProductToWishlist(wishlistId, wishlistMerged);
};

const addProductToWishlist = async (wishlistId, productId) => {
  // Checking productId, its type is serial so it cannot over the total.
  const totalProduct = await productService.getTotalProducts();
  if (productId > totalProduct) throw createHttpError.BadRequest();

  // Save productId to user wishlist.
  await wishlistModel.saveProductToWishlist(wishlistId, productId);
};

const deleteProductFromWishlist = async (wishlistId, productId) => {
  // Remove products Id in wishlist
  await wishlistModel.deleteProductFromWishlist(wishlistId, productId);
};

export default {
  getWishlist: getWishlist,
  syncWishlist: syncWishlist,
  addProductToWishlist: addProductToWishlist,
  deleteProductFromWishlist: deleteProductFromWishlist,
};
