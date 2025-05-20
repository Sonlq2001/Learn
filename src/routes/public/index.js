const express = require("express");

const HomeController = require("../../controllers/home.controller");
const CreateController = require("../../controllers/create.controller");
const DetailController = require("../../controllers/detail.controller");

const router = express.Router();

router.get("/", HomeController.home);
router.get("/create", CreateController.create);
router.post("/create-user", CreateController.createUser);
router.delete("/delete-user/:userId", HomeController.deleteUser);
router.get("/profile/:id", DetailController.detail);

module.exports = router;
