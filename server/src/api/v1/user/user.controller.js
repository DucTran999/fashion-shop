import createHttpError from "http-errors";
import userServices from "./user.services.js";

class UserController {
  handleSignUpReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      await userServices.createUser(payload);

      res.status(201).json({ status: "success", message: null });
    } catch (err) {
      next(err);
    }
  };

  handleGetUserListReq = async (req, res, next) => {
    try {
      let users = await userServices.getAllUsers();
      res
        .status(200)
        .json({ status: "success", message: null, elements: users });
    } catch (err) {
      next(err);
    }
  };

  handleGetUserInfoReq = async (payload, req, res, next) => {
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

  handleUpdateUserInfoReq = async (payload, req, res, next) => {
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

  handleChangeUserPasswordReq = async (payload, req, res, next) => {
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
