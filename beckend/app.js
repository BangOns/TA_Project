const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieMiddleware = require("universal-cookie-express");
const router = require("./router/router");
require("dotenv").config();
require("./connect/connectMongoDb");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieMiddleware());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use("/", (req, res) => {
  res.status(404).send("page not found");
});

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
