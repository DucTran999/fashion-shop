import createHttpError from "http-errors";

import { EMAIL_TYPE } from "../../utils/constVariable.js";
import ipMonitor from "../helpers/helper.ipMonitor.js";
import userServices from "./user.services.js";

class UserController {
  signUpReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;

      await userServices.createTempUser(payload);
      await ipMonitor.trackingReqPerMinutes(req);

      res.status(201).json({ status: "success", message: null });
    } catch (err) {
      await ipMonitor.trackingReqPerMinutes(req);
      next(err);
    }
  };

  getAllUsersReq = async (req, res, next) => {
    try {
      let users = await userServices.getAllUsers();
      res
        .status(200)
        .json({ status: "success", message: null, elements: users });
    } catch (err) {
      next(err);
    }
  };

  getUserInfoReq = async (payload, req, res, next) => {
    try {
      // Check payload
      if (payload instanceof Error) throw payload;

      // Check id in access_token are match to id user requested.
      if (req.params.id !== payload.user_id) {
        throw createHttpError.Unauthorized();
      }

      let user = await userServices.getUserInfoById(req.params.id);

      res
        .status(200)
        .json({ status: "success", message: null, elements: user });
    } catch (err) {
      next(err);
    }
  };

  verifyEmailReq = async (req, res, next) => {
    try {
      const { cipher, token } = req.params;

      const service = await userServices.getServiceFromVerifyToken(
        cipher,
        token
      );

      if (service === EMAIL_TYPE.verifyNewRegister) {
        await userServices.verifyEmailRegistration(cipher, token);
      } else if (service === EMAIL_TYPE.verifyUnlockLogin) {
        await userServices.verifyEmailUnlockAccount(cipher, token);
      }

      res.status(200).json({ status: "success", message: null });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  updateUserInfoReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;

      if (payload.user_id !== req.params.id) {
        throw createHttpError.Unauthorized();
      }
      await userServices.updateUserInfo(payload.user_id, req.body);

      res.status(200).json({ status: "success", message: null });
    } catch (err) {
      next(err);
    }
  };

  changeUserPasswordReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;

      if (payload.user_id !== req.params.id) {
        throw createHttpError.Unauthorized();
      }
      await userServices.updateUserPassword(payload.user_id, req.body);

      res.status(200).json({ status: "success", message: null });
    } catch (err) {
      next(err);
    }
  };
}

export default new UserController();
