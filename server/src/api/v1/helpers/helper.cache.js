import createHttpError from "http-errors";
import redisClient from "./init.redis.client.js";
/**
 * Cached hot data
 * @param {string} key name of resource will be cached
 * @param {object}  value data
 * @param {number} duration cached time in seconds
 * @return {promise<void>}
 */
const cacheData = async (key, value, duration) => {
  try {
    await redisClient.set(key, JSON.stringify(value), { EX: duration });
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

/**
 * Get hot data cached
 * @param {string} key name of resource will be cached
 * @return {promise<object>}
 */
const getCached = async (key) => {
  try {
    await redisClient.get(key);
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

export default { cacheData: cacheData, getCached: getCached };
