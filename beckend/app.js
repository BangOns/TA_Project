const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router/router");
const { List_pelajaran, User } = require("./schema/SchemaDB");
require("dotenv").config();
require("./connect/connectMongoDb");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use("/", (req, res) => {
  res.status(404).send("page not found");
});

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
