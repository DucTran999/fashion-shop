import redisClient from "./init.redis.client.js";
import { io } from "../../utils/init.socket.js";

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
    return await redisClient.sMembers(key);
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

const emitUserFetchNotifications = async (userId) => {
  const socketIds = await getUserSocketIds(userId);

  // emit to all socket id consume by a user.
  if (socketIds) {
    for (let i = 0; i < socketIds.length; ++i) {
      io.to(socketIds[i]).emit("new-notification", "You have new notification");
    }
  }
};

const emitUserVerifySuccess = async (email) => {
  // know which client send register request
  try {
    const key = `registration:socket#${email}`;
    const socketId = await redisClient.get(key);
    io.to(socketId).emit("verify-email-registration", "Verify Success");
    redisClient.del(key);
  } catch (error) {
    console.log("Server Internal Error");
  }
};

const addRegisterSocketId = async (socketId, email) => {
  // know which client send register request
  try {
    const key = `registration:socket#${email}`;
    await redisClient.set(key, socketId, { EX: 3 * 3600 });
  } catch (error) {
    console.log("Server Internal Error");
  }
};

export {
  addOneSocketId,
  addRegisterSocketId,
  emitUserVerifySuccess,
  delOneSocketId,
  getUserSocketIds,
  delUserSocketIds,
  clearAllUserSocketIds,
  emitUserFetchNotifications,
};
