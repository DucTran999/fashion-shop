import createHttpError from "http-errors";

import { formatUrlPath } from "../../utils/formatData.js";
import redisClient from "../helpers/init.redis.client.js";

/**
 * Limit the number of requests per Ip in a specific period.
 * @param {number} limit - number of requests
 * @param {number} duration - time limit (seconds)
 * @return {(req,res, next) => Promise<any>} A asynchronous function for caching the rate.
 */
const rateLimit = (limit, duration) => async (req, res, next) => {
  try {
    const ip = req.socket.remoteAddress;
    const endpoint = formatUrlPath(req);
    const key = `rateLimit:${endpoint}#${ip}`;

    // Check token bucket
    const hitTimes = await redisClient.get(key);
    if (!hitTimes) {
      await redisClient.set(key, 1, { EX: duration });
      return next();
    }

    // refuse requests when hit the limit.
    if (hitTimes >= limit) {
      return res
        .status(429)
        .json({ status: "error", message: "Too Many Request!" });
    }

    // cached the number of request
    await redisClient.INCR(key);
    return next();
  } catch (error) {
    next(createHttpError.InternalServerError());
  }
};

export default { rateLimit };
