function Response(statusCode, data, message, res, token = "") {
  if (token) {
    res.cookie("token", token, { httpOnly: true });
  }
  res.status(statusCode).json({
    status: statusCode,
    data,
    message,
    token,
  });
}
module.exports = Response;
