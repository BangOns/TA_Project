const {
  GetUsersAll,
  CreateUser,
  GetUserById,
  DeleteUserById,
  LoginUserOrAdminById,
  UpdateUserNotDataPelajaran,
} = require("../controller/UserController");

const { cookiesAuthJwt } = require("../utils/cookies");
const {
  ValidateUserLogin,
  ValidateCreateUser,
  ValidateUpdateUser,
} = require("../utils/ValidateNpmUser");
const { ValidatePelajaran } = require("../utils/ValidatePelajaran");
const {
  AddPelajaran,
  DeletePelajaran,
  UpdateUserDataPelajaran,
} = require("../controller/PelajaranController");
const approuter = require("express").Router();

approuter.get("/users", cookiesAuthJwt, GetUsersAll);
approuter.post("/users", ValidateCreateUser(), CreateUser);
approuter.post("/login", ValidateUserLogin(), LoginUserOrAdminById);
approuter.get("/users/:id", cookiesAuthJwt, GetUserById);
approuter.delete("/users/:id", DeleteUserById);
approuter.put("/users/:id", ValidateUpdateUser(), UpdateUserNotDataPelajaran);
// Table_Pelajaran
approuter.post("/pelajaran", ValidatePelajaran(), AddPelajaran);
approuter.put("/pelajaran/:npm/:pelajaran", UpdateUserDataPelajaran);
approuter.delete("/pelajaran/:name", DeletePelajaran);

module.exports = approuter;
