const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const app = express();

app.use(express.urlencoded());

// config template ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// config file static
const rootDir = path.resolve(__dirname, "..");
app.use(express.static(path.join(rootDir, "public")));

// set default layout
app.use(expressLayouts);
app.set("layout", "layouts/common");

app.use("", require("./routes"));

module.exports = app;
