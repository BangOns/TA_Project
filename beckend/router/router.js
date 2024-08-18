const {
  GetUsersAll,
  CreateUser,
  GetUserById,
  DeleteUserById,
  UpdateUserNotDataPelajaran,
  LoginUserOrAdminByNPM,
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
  GetPelajaran,
} = require("../controller/PelajaranController");
const approuter = require("express").Router();

approuter.get("/api/users", cookiesAuthJwt, GetUsersAll);
approuter.post("/api/users", ValidateCreateUser(), CreateUser);
approuter.post("/api/login", ValidateUserLogin(), LoginUserOrAdminByNPM);
approuter.get("/api/users/:id", cookiesAuthJwt, GetUserById);
approuter.delete("/api/users/:id", DeleteUserById);
approuter.put(
  "/api/users/:npm",
  ValidateUpdateUser(),
  UpdateUserNotDataPelajaran
);
// Table_Pelajaran
approuter.get("/api/pelajaran", cookiesAuthJwt, GetPelajaran);
approuter.post("/api/pelajaran", ValidatePelajaran(), AddPelajaran);
approuter.put("/api/pelajaran/:npm/:pelajaran", UpdateUserDataPelajaran);
approuter.delete("/api/pelajaran/:name", DeletePelajaran);

module.exports = approuter;
