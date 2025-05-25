const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "/src/uploads/" });

const HomeController = require("../../controllers/home.controller");
const CreateController = require("../../controllers/create.controller");
const DetailController = require("../../controllers/detail.controller");

const router = express.Router();

router.get("/", HomeController.home);
router.get("/create", CreateController.createPage);
router.post(
  "/create-user",
  upload.single("avatar"),
  CreateController.createUser
);
router.delete("/delete-user/:userId", HomeController.deleteUser);
router.get("/profile/:id", DetailController.detail);
router.get("/user/:id/avatar", DetailController.avatarUser);

router.get("/edit/:id/user", CreateController.editPage);
router.post(
  "/edit/:id/user",
  upload.single("avatar"),
  CreateController.editUser
);

module.exports = router;
