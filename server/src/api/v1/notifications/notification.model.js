import createHttpError from "http-errors";
import redisClient from "../helpers/init.redis.client.js";

class NotificationModel {
  findAllByUserId = async (userId) => {
    try {
      const key = `notifications:user#${userId}`;
      const timestamp = Date.now();
      const lastWeek = timestamp - 7 * 24 * 60 * 60 * 1000;

      // The oldest notifications must be from last week
      const notifications = await redisClient.zRange(key, timestamp, lastWeek, {
        BY: "SCORE",
        REV: true,
      });

      return notifications;
    } catch (error) {
      throw new createHttpError.InternalServerError();
    }
  };

  findOneByTimestamp = async (userId, timestamp) => {
    try {
      const key = `notifications:user#${userId}`;
      const notification = await redisClient.zRange(key, timestamp, timestamp, {
        BY: "SCORE",
        REV: true,
      });

      return notification;
    } catch (error) {
      throw new createHttpError.InternalServerError();
    }
  };

  save = async (owner, timestamp, notification) => {
    try {
      await redisClient.zAdd(
        owner,
        { score: timestamp, value: notification },
        { NX: true }
      );
    } catch (error) {
      throw new createHttpError.InternalServerError();
    }
  };

  update = async (owner, timestamp, oldState, newState) => {
    try {
      await redisClient.zRem(owner, oldState);
      await redisClient.zAdd(owner, { score: timestamp, value: newState });
    } catch (error) {
      throw new createHttpError.InternalServerError();
    }
  };

  delete = async (owner, timestamp) => {
    try {
      await redisClient.zRemRangeByScore(owner, timestamp, timestamp);
    } catch (error) {
      throw new createHttpError.InternalServerError();
    }
  };
}

export default new NotificationModel();
