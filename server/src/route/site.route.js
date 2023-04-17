import express from "express";

const router = express.Router();

import siteController from "../controllers/SiteController.js";

router.use("/signup", siteController.signUp);
router.use("/create-new-user", siteController.createNewUser);
router.use("/login", siteController.login);
router.use("/", siteController.home);

export default router;
