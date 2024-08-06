const jwt = require("jsonwebtoken");
function cookiesAuthJwt(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      status: "fail",
      message: "unauthorized",
    });
  } else {
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "unauthorized",
      });
    } else {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).json({
          status: "fail",
          message: "unauthorized",
        });
      }
    }
  }
}
module.exports = { cookiesAuthJwt };
