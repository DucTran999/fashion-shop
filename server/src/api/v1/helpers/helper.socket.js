import redisClient from "./init.redis.client.js";

// Clear all user socket when server down
const clearAllUserSocketIds = async () => {
  try {
    const keys = await redisClient.keys("sockets:user#*");

    if (keys.length > 0) {
      await redisClient.del(...keys);
    }
  } catch (error) {
    console.log("Server Internal Error");
  }
};

// When user open new tab
const addOneSocketId = async (socketId, userId) => {
  try {
    const key = `sockets:user#${userId}`;
    await redisClient.sAdd(key, socketId);
  } catch (error) {
    console.log("Server Internal Error");
  }
};

// When user close a tab
const delOneSocketId = async (socketId, userId) => {
  try {
    const key = `sockets:user#${userId}`;
    await redisClient.sRem(key, socketId);
  } catch (error) {
    console.log("Server Internal Error");
  }
};

// when server want to contact to every tab. Like sent message, notifications.
const getUserSocketIds = async (userId) => {
  try {
    const key = `sockets:user#${userId}`;
    const ids = await redisClient.sMembers(key);

    return ids;
  } catch (error) {
    console.log("Server Internal Error");
  }
};

// when user logout remove all socket id.
const delUserSocketIds = async (userId) => {
  try {
    const key = `sockets:user#${userId}`;
    await redisClient.del(key);
  } catch (error) {
    console.log("Server Internal Error");
  }
};

export {
  addOneSocketId,
  delOneSocketId,
  getUserSocketIds,
  delUserSocketIds,
  clearAllUserSocketIds,
};
