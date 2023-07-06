import redisClient from "../helpers/init.redis.client.js";

class SessionModel {
  getCurrentAttempt = async (email) => {
    const key = `loginAttempt:user#${email}`;
    return await redisClient.get(key);
  };

  increaseAttempt = async (email) => {
    const key = `loginAttempt:user#${email}`;
    await redisClient.INCR(key);
  };

  createNewAttemptRecord = async (email) => {
    const key = `loginAttempt:user#${email}`;
    await redisClient.set(key, 1, { EX: 60 * 5 });
  };

  deleteAttemptRecord = async (email) => {
    const key = `loginAttempt:user#${email}`;
    await redisClient.del(key);
  };
}

export default new SessionModel();
