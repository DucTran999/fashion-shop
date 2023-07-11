import redisClient from "../api/v1/helpers/init.redis.client.js";

const refuseBlackIp = async (req, res, next) => {
  const ip = req.socket.remoteAddress;
  const key = `blacklist:IP#${ip}`;
  const isInBlackList = await redisClient.exists(key);

  if (isInBlackList) res.end();
  else next();
};

export default { refuseBlackIp };
