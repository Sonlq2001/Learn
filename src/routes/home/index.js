const express = require("express");

const HomeController = require("../../controllers/home.controller");

const router = express.Router();

router.get("/", HomeController.homePage);

module.exports = router;
