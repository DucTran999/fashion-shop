import redisClient from "./init.redis.client.js";

// Clear all user socket when server down
const clearAllUserSocketIds = async () => {
  const keys = await redisClient.keys("sockets:user#*");

  if (keys.length > 0) {
    await redisClient.del(...keys);
  }
};

// When user open new tab
const addOneSocketId = async (socketId, userId) => {
  const key = `sockets:user#${userId}`;
  await redisClient.sAdd(key, socketId);
};

// When user close a tab
const delOneSocketId = async (socketId, userId) => {
  const key = `sockets:user#${userId}`;
  await redisClient.sRem(key, socketId);
};

// when server want to contact to every tab. Like sent message, notifications.
const getUserSocketIds = async (userId) => {
  const key = `sockets:user#${userId}`;
  const ids = await redisClient.sMembers(key);

  return ids;
};

// when user logout remove all socket id.
const delUserSocketIds = async (userId) => {
  const key = `sockets:user#${userId}`;
  await redisClient.del(key);
};

export {
  addOneSocketId,
  delOneSocketId,
  getUserSocketIds,
  delUserSocketIds,
  clearAllUserSocketIds,
};
