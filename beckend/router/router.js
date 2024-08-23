const {
  GetUsersAll,
  CreateUser,
  GetUserById,
  DeleteUserById,
  UpdateUserNotDataPelajaran,
  LoginUserOrAdminByNPM,
  Logout,
} = require("../controller/UserController");

const { cookiesAuthJwt } = require("../utils/cookies");
const {
  ValidateUserLogin,
  ValidateCreateUser,
  ValidateUpdateUser,
} = require("../utils/ValidateUser");
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
approuter.delete("/api/logout", Logout);
approuter.post("/api/login", ValidateUserLogin(), LoginUserOrAdminByNPM);
approuter.get("/api/users/:id", cookiesAuthJwt, GetUserById);
approuter.delete("/api/users/:id", cookiesAuthJwt, DeleteUserById);
approuter.put(
  "/api/users/:id",
  ValidateUpdateUser(),
  UpdateUserNotDataPelajaran
);
// Table_Pelajaran
approuter.get("/api/pelajaran", cookiesAuthJwt, GetPelajaran);
approuter.post("/api/pelajaran", ValidatePelajaran(), AddPelajaran);
approuter.put("/api/pelajaran/:npm/:idpelajaran", UpdateUserDataPelajaran);
approuter.delete("/api/pelajaran/:name", DeletePelajaran);

module.exports = approuter;
