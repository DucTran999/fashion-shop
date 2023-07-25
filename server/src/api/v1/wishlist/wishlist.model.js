import createHttpError from "http-errors";
import redisClient from "../helpers/init.redis.client.js";

const saveBulkProductToWishlist = async (wishlistId, productIds) => {
  const members = [];
  for (const productId of productIds) {
    members.push({ score: +productId, value: String(productId) });
  }

  try {
    const key = `wishlist:user#${wishlistId}`;
    await redisClient.zAdd(key, members);
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

const getWishlistDB = async (wishlistId) => {
  try {
    const key = `wishlist:user#${wishlistId}`;
    return await redisClient.zRange(key, 0, -1);
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

const saveProductToWishlist = async (wishlistId, productId) => {
  try {
    const key = `wishlist:user#${wishlistId}`;
    await redisClient.zAdd(key, { score: productId, value: String(productId) });
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

const deleteProductFromWishlist = async (wishlistId, productId) => {
  try {
    const key = `wishlist:user#${wishlistId}`;
    await redisClient.zRem(key, String(productId));
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

export default {
  getWishlistDB: getWishlistDB,
  saveProductToWishlist: saveProductToWishlist,
  saveBulkProductToWishlist: saveBulkProductToWishlist,
  deleteProductFromWishlist: deleteProductFromWishlist,
};
