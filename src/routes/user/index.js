const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({ dest: "/src/uploads/" });
const UserController = require("../../controllers/user.controller");

router.get("/create", UserController.createPage);
router.get("/:id", UserController.userDetailPage);
router.get("/:id/edit", UserController.editPage);

router.post("/create", upload.single("avatar"), UserController.createUser);
router.get("/:id/avatar", UserController.getAvatarUser);
router.post("/:id/edit", upload.single("avatar"), UserController.editUser);
router.delete("/:id/delete", UserController.deleteUser);
router.get("/list", UserController.getUserList);

module.exports = router;
