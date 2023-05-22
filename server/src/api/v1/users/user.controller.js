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
      if (payload.message) throw payload;
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
      if (payload.message) throw payload;
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
}

export default new UserController();
