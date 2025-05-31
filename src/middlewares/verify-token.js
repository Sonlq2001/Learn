const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    res.redirect("/auth/login");
    return;
  }

  try {
    const decoded = jwt.verify(token, "123");

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = verifyToken;
