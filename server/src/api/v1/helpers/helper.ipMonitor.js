import redisClient from "./init.redis.client.js";

const updateProfile = async (ip) => {
  const key = `tracking:IP#${ip}`;
  const isExisted = await redisClient.exists(key);
  if (isExisted) {
    await redisClient.incr(key);
  } else {
    await redisClient.set(key, 1, { EX: 160, NX: true });
  }
};

const addToBlacklist = async (ip) => {
  const key = `tracking:IP#${ip}`;
  const reqTimes = await redisClient.get(key);

  // 15 req in 2 mins block
  if (reqTimes > 15) {
    const blKey = `blacklist:IP#${ip}`;
    await redisClient.set(blKey, "1", { EX: 3600 });
    await redisClient.del(key);
  }
};

const trackingReqPerMinutes = async (req) => {
  const ip = req.socket.remoteAddress;
  await updateProfile(ip);
  await addToBlacklist(ip);
};

export default { trackingReqPerMinutes };
