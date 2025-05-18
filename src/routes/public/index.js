const express = require("express");

const HomeController = require("../../controllers/home.controller");
const CreateController = require("../../controllers/create.controller");

const router = express.Router();

router.get("/", HomeController.home);
router.get("/create", CreateController.create);

module.exports = router;
