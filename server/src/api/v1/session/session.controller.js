import * as dotenv from "dotenv";

import sessionService from "./session.service.js";
import ipMonitor from "../helpers/helper.ipMonitor.js";

dotenv.config();

class SessionController {
  handleSignInReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      const [accessToken, refreshToken] = await sessionService.authenticate(
        payload
      );

      await ipMonitor.trackingReqPerMinutes(req);
      res
        .status(201)
        .cookie("refresh_token", refreshToken, {
          sameSite: "strict",
          domain: process.env.DOMAIN_NAME,
          secure: process.env.NODE_ENV === "production" ? true : false,
          httpOnly: true,
          path: "/",
        })
        .json({
          status: "success",
          message: null,
          elements: [{ access_token: accessToken }],
        });
    } catch (err) {
      await ipMonitor.trackingReqPerMinutes(req);
      if (err.status === 401) sessionService.updateLoginAttempt(payload);
      next(err);
    }
  };

  handleSignOutReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      await sessionService.removeRefreshToken(payload.user_id);

      res
        .status(204)
        .clearCookie("refresh_token", {
          domain: process.env.DOMAIN_NAME,
          path: "/",
        })
        .end();
    } catch (err) {
      next(err);
    }
  };

  handleRefreshTokenReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;

      const [accessToken, refreshToken] = await sessionService.refreshToken(
        payload
      );

      res
        .status(201)
        .cookie("refresh_token", refreshToken, {
          sameSite: "strict",
          domain: process.env.DOMAIN_NAME,
          secure: process.env.NODE_ENV === "production" ? true : false,
          httpOnly: true,
          path: "/",
        })
        .json({
          status: "success",
          message: null,
          elements: [{ access_token: accessToken }],
        });
    } catch (err) {
      next(err);
    }
  };
}

export default new SessionController();
