import JWT from "jsonwebtoken";
import * as dotenv from "dotenv";
import createHttpError from "http-errors";
import redisClient from "../helpers/init.redis.client.js";

dotenv.config();

const extractAccessToken = async (req) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw createHttpError.Unauthorized();
  }

  return authorization.split(" ")[1];
};

const extractRefreshToken = async (req) => {
  // get refresh token
  const { refresh_token } = req.cookies;
  if (!refresh_token) {
    throw createHttpError.Unauthorized();
  }

  return refresh_token;
};

const verifyToken = async (token, key) => {
  return JWT.verify(token, key, (err, decoded) => {
    if (err) {
      if (err.name === "JsonWebTokenError") {
        throw new createHttpError.Unauthorized("Invalid Token");
      }
      throw new createHttpError.Forbidden(err.message);
    }

    return decoded;
  });
};

const verifyAccessToken = async (req, res, next) => {
  try {
    const accessToken = await extractAccessToken(req);
    const payload = await verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    next(payload);
  } catch (err) {
    next(err);
  }
};

const verifyAdminAccessToken = async (req, res, next) => {
  try {
    const accessToken = await extractAccessToken(req);
    const payload = await verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!payload.is_admin) throw new createHttpError.Forbidden();
    next();
  } catch (err) {
    next(err);
  }
};

const isRefreshTokenInWhiteList = async (tokenId, refreshToken) => {
  await redisClient.connect();
  const tokenInRedis = await redisClient.get(tokenId);
  await redisClient.disconnect();

  return tokenInRedis === refreshToken;
};

const verifyRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = await extractRefreshToken(req);

    const payload = await verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Check refresh token in redis
    const isTokenValid = await isRefreshTokenInWhiteList(
      payload.user_id.toString(),
      refreshToken
    );

    if (isTokenValid) {
      next(payload);
    } else {
      throw new createHttpError.Unauthorized();
    }
  } catch (err) {
    next(err);
  }
};

export default {
  verifyAccessToken,
  verifyAdminAccessToken,
  verifyRefreshToken,
};
