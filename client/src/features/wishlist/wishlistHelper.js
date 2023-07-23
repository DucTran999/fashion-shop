/**
 * wishlist helper
 * This module includes functions for updating user wishlist changed at local
 */
import { LOCAL_STORAGE_KEY } from "../../utils/constVariable";

/**
 * Add product in wishlist local
 * @param {Array<object>} product - Object has key is productId and value is its variations.
 * @return {Array} The array contains only variations with size small.
 */
const filterVariationBySizes = (product) => {
  const variations = [];
  product.forEach((variant) => {
    if (variant.size === "small") variations.push(variant);
  });

  return variations;
};

/**
 * Filter productId in local wishlist
 * @return {Array<number>} The array contains productId.
 */
const filterProductIds = () => {
  const key = LOCAL_STORAGE_KEY.wishlistLocal;
  const wishlistLocal = JSON.parse(localStorage.getItem(key));

  return Object.keys(wishlistLocal);
};

/**
 * Add product in wishlist local
 * @param {object} wishlist - Object has key is productId and value is its variations.
 */
const updateWishlistLocal = (wishlist) => {
  const key = LOCAL_STORAGE_KEY.wishlistLocal;
  localStorage.setItem(key, JSON.stringify(wishlist));
};

/**
 * Add product in wishlist local
 * @param {number} productId - productId
 * @param {Array<object>} product - All variations of products
 */
const addProductToWishlistLocal = (productId, product) => {
  const variations = filterVariationBySizes(product);

  const key = LOCAL_STORAGE_KEY.wishlistLocal;
  let wishlist = JSON.parse(localStorage.getItem(key));

  if (wishlist) {
    // add product to current wishlist
    wishlist = { ...wishlist, [productId]: variations };
    updateWishlistLocal(wishlist);
    return wishlist;
  } else {
    // add product to new wishlist
    const newWishlist = { [productId]: variations };
    updateWishlistLocal(newWishlist);
    return newWishlist;
  }
};

/**
 * Remove product stored in wishlist local by Id
 * @param {number} productId - productId
 */
const removeProductFromWishlistLocal = (productId) => {
  let wishlist = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY.wishlistLocal)
  );

  // remove product from current wishlist
  delete wishlist[productId];
  updateWishlistLocal(wishlist);
  return wishlist;
};

export {
  filterProductIds,
  updateWishlistLocal,
  addProductToWishlistLocal,
  removeProductFromWishlistLocal,
};
