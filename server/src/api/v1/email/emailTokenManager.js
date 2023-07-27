import redisClient from "../helpers/init.redis.client.js";
import createHttpError from "http-errors";

/**
 * Get current token
 * @param {string} email - Customer email
 * @param {string} service - The name of service need email verification
 */
const getToken = async (email, service) => {
  try {
    const key = `verification:${email}#${service}`;
    return await redisClient.get(key);
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

/**
 * Get lifetime of the token.
 * @param {string} email - Customer email
 * @param {string} service - The name of service need email verification
 */
const getTokenTTL = async (email, service) => {
  try {
    const key = `verification:${email}#${service}`;
    return await redisClient.TTL(key);
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

/**
 * Create new token to control the email expiration
 * @param {string} email - Customer email
 * @param {string} token - The string identify is email still valid.
 * @param {string} service - The name of service need email verification
 * @param {number} time - Token expire time
 */
const saveToken = async (email, token, service, time) => {
  try {
    const key = `verification:${email}#${service}`;
    await redisClient.set(key, token, { EX: time, NX: true });
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

/**
 * Remove the old token to ensure only one valid email at a time.
 * @param {string} email - Customer email
 * @param {string} service - The name of service need email verification
 */
const deleteToken = async (email, service) => {
  try {
    const key = `verification:${email}#${service}`;
    await redisClient.del(key);
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

export default {
  getToken: getToken,
  getTokenTTL: getTokenTTL,
  saveToken: saveToken,
  deleteToken: deleteToken,
};
