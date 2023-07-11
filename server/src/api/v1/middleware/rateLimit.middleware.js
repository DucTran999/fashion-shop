import createHttpError from "http-errors";
import redisClient from "../helpers/init.redis.client.js";
import { formatUrlPath } from "../../utils/formatData.js";

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

    if (hitTimes >= limit) {
      return res
        .status(429)
        .json({ status: "error", message: "Too Many Request!" });
    }

    await redisClient.INCR(key);
    return next();
  } catch (error) {
    next(createHttpError.InternalServerError());
  }
};

export default { rateLimit };
