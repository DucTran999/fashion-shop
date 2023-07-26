import createHttpError from "http-errors";
import redisClient from "./init.redis.client.js";

/**
 * Cached hot, temporary data
 * @param {string} key name of resource will be cached
 * @param {object | string} value data
 * @param {number} duration cached time in seconds
 * @returns {promise<void>}
 */
const cacheData = async (key, value, duration) => {
  try {
    typeof value === "string"
      ? await redisClient.set(key, value, { EX: duration })
      : await redisClient.set(key, JSON.stringify(value), { EX: duration });
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

/**
 * Get data cached
 * @param {string} key resource name cached.
 * @returns {promise<string | null>}
 */
const getCached = async (key) => {
  try {
    return await redisClient.get(key);
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

export default { cacheData: cacheData, getCached: getCached };
