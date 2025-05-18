"use strict";

const app = require("./src/app");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running port::: ${port}`);
});
