import createHttpError from "http-errors";
import redisClient from "../helpers/init.redis.client.js";
import { formatUrlPath } from "../../utils/formatData.js";

const getResponseCached = async (payload, req, res, next) => {
  try {
    // Pass the error to controller
    if (payload instanceof Error) throw payload;

    // find response from cache
    const pathname = formatUrlPath(req);
    const key = `cache:response#${pathname}`;
    const resCached = await redisClient.get(key);

    return !resCached
      ? next(payload)
      : res.status(200).json(JSON.parse(resCached));
  } catch (error) {
    return error?.status !== 400
      ? next(createHttpError.InternalServerError())
      : next(error);
  }
};

const cacheResponse = async (req, data, time) => {
  try {
    const key = `cache:response#${formatUrlPath(req)}`;
    await redisClient.set(key, JSON.stringify(data), { EX: time, NX: true });
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

export default { getResponseCached, cacheResponse };
