import createHttpError from "http-errors";
import userServices from "./user.services.js";

class UserController {
  requestSignUp = async (req, res, next) => {
    try {
      await userServices.addNewUser(req.body);
      res.status(200).json({ status: "success", message: null });
    } catch (err) {
      next(err);
    }
  };

  requestSignIn = async (req, res, next) => {
    try {
      const [accessToken, refreshToken] = await userServices.authentication(
        req.body
      );
      res
        .status(200)
        .cookie("refresh_token", refreshToken, {
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

  requestSignOut = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      await userServices.removeRefreshToken(payload.user_id);

      res
        .status(200)
        .clearCookie("refresh_token")
        .json({ status: "success", message: "Logout Successful" });
    } catch (err) {
      next(err);
    }
  };

  requestRefreshToken = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) {
        throw payload;
      }

      const [accessToken, refreshToken] = await userServices.refreshToken(
        payload
      );

      res
        .status(200)
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          path: "/",
        })
        .json({
          status: "success",
          message: null,
          elements: [
            {
              access_token: accessToken,
            },
          ],
        });
    } catch (err) {
      next(err);
    }
  };

  requestGetUserList = async (req, res, next) => {
    try {
      let users = await userServices.getAllUsers();
      res.status(200).json({ status: 200, message: null, elements: users });
    } catch (err) {
      next(err);
    }
  };

  getUserInfo = async (payload, req, res, next) => {
    try {
      // Check payload
      if (payload instanceof Error) {
        throw payload;
      }

      // Check id in access_token are match to id user requested.
      if (req.params.id !== payload.user_id) {
        throw createHttpError.Unauthorized();
      }

      let user = await userServices.findUserById(req.params.id);

      res.status(200).json({ status: 200, message: null, elements: user });
    } catch (err) {
      next(err);
    }
  };

  updateUserInfo = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;

      if (payload.user_id !== req.params.id) {
        throw createHttpError.Unauthorized();
      }
      await userServices.updateUser(payload.user_id, req.body);

      res.status(200).json({ status: 200, message: "Updated Successfully" });
    } catch (err) {
      next(err);
    }
  };

  updateUserPassword = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;

      if (payload.user_id !== req.params.id) {
        throw createHttpError.Unauthorized();
      }
      await userServices.updateNewPassword(payload.user_id, req.body);

      res.status(200).json({ status: 200, message: "Updated Successfully" });
    } catch (err) {
      next(err);
    }
  };
}

export default new UserController();
