import sessionService from "./session.service.js";
import * as dotenv from "dotenv";
dotenv.config();

class SessionController {
  handleSignInReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      const [accessToken, refreshToken] = await sessionService.authenticate(
        payload
      );

      res
        .status(200)
        .cookie("refresh_token", refreshToken, {
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
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

  handleSignOutReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      await sessionService.removeRefreshToken(payload.user_id);

      res
        .status(200)
        .clearCookie("refresh_token", {
          domain: process.env.DOMAIN_NAME,
          path: "/",
        })
        .json({ status: "success", message: "Logout Successful" });
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
        .status(200)
        .cookie("refresh_token", refreshToken, {
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
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
