import JWT from "jsonwebtoken";
import * as dotenv from "dotenv";
import redisClient from "./init.redis.client.js";

dotenv.config();

const signToken = (user, exp, key) => {
  return new Promise((resolve, reject) => {
    const payload = {
      user_id: user.user_id,
      is_admin: user.is_admin,
      first_name: user.first_name,
    };

    const secret = key;

    const options = {
      algorithm: "HS512",
      expiresIn: exp,
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

const signAccessToken = async (user) => {
  return await signToken(user, "1h", process.env.ACCESS_TOKEN_SECRET);
};

const saveRefreshTokenToRedis = async (user, refreshToken) => {
  await redisClient.connect();
  await redisClient.set(user.user_id.toString(), refreshToken, {
    EX: 365 * 24 * 60 * 60,
  });
  await redisClient.disconnect();
};

const removeRefreshTokenOnRedis = async (key) => {
  await redisClient.connect();
  await redisClient.del(key);
  await redisClient.disconnect();
};

const signRefreshToken = async (user) => {
  const refreshToken = await signToken(
    user,
    "1y",
    process.env.REFRESH_TOKEN_SECRET
  );

  await saveRefreshTokenToRedis(user, refreshToken);
  return refreshToken;
};

export default { signAccessToken, signRefreshToken, removeRefreshTokenOnRedis };
