import redisClient from "../helpers/init.redis.client.js";
import createHttpError from "http-errors";

const getToken = async (email, service) => {
  try {
    const key = `verification:${email}#${service}`;
    return await redisClient.get(key);
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

const getTokenTTL = async (email, service) => {
  try {
    const key = `verification:${email}#${service}`;
    return await redisClient.TTL(key);
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

const saveToken = async (email, token, service, time) => {
  try {
    const key = `verification:${email}#${service}`;
    await redisClient.set(key, token, { EX: time, NX: true });
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

const deleteToken = async (email, service) => {
  try {
    const key = `verification:${email}#${service}`;
    await redisClient.del(key);
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

export default { getToken, getTokenTTL, saveToken, deleteToken };
