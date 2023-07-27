import JWT from "jsonwebtoken";
import * as dotenv from "dotenv";
import createHttpError from "http-errors";
import redisClient from "../helpers/init.redis.client.js";

dotenv.config();

// short form
const rtKey = process.env.REFRESH_TOKEN_SECRET;
const atKey = process.env.ACCESS_TOKEN_SECRET;

const extractAccessToken = async (req) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw createHttpError.Unauthorized();
  }

  return authorization.split(" ")[1];
};

const extractRefreshToken = async (req) => {
  // get refresh token
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) {
    throw createHttpError.Unauthorized();
  }

  return refreshToken;
};

/**
 * Check token integrity
 * @param {string} token - The token provided by user
 * @param {string} key   - The secret key used to verify the token
 */
const verifyToken = (token, key) => {
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
    const payload = verifyToken(accessToken, atKey);

    next(payload);
  } catch (err) {
    next(err);
  }
};

const verifyAdminAccessToken = async (req, res, next) => {
  try {
    const accessToken = await extractAccessToken(req);
    const payload = verifyToken(accessToken, atKey);

    if (!payload.is_admin) throw new createHttpError.Forbidden();
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Confirm the user refresh token in the whitelist.
 * @param {string} tokenId - The userId gets from the payload of the decode.
 * @param {string} refreshToken - The refresh token send by user
 */
const checkRefreshTokenInWhitelist = async (tokenId, refreshToken) => {
  try {
    const tokenInRedis = await redisClient.get(tokenId);
    return tokenInRedis === refreshToken;
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

const verifyRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = await extractRefreshToken(req);
    const payload = verifyToken(refreshToken, rtKey);

    // Check refresh token in redis
    const isTokenValid = await checkRefreshTokenInWhitelist(
      String(payload.user_id),
      refreshToken
    );

    if (!isTokenValid) throw new createHttpError.Unauthorized();
    next(payload);
  } catch (err) {
    next(err);
  }
};

export default {
  verifyAccessToken: verifyAccessToken,
  verifyAdminAccessToken: verifyAdminAccessToken,
  verifyRefreshToken: verifyRefreshToken,
};
