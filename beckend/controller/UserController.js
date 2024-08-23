const { User } = require("../schema/SchemaDB");
const { validationResult } = require("express-validator");
const Response = require("../schema/SchemaResponse");
const jwt = require("jsonwebtoken");
const AddPelajaranToUser = require("../utils/AddPelajaranToUser");
async function GetUsersAll(req, res) {
  try {
    const users = await User.find();

    Response(200, users, "success get all users", res);
  } catch (error) {
    Response(400, error, "failed get all users", res);
  }
}
async function CreateUser(req, res) {
  try {
    const resultValidate = validationResult(req);
    if (!resultValidate.isEmpty()) {
      return Response(400, resultValidate, "failed create user", res);
    } else {
      var newUser;
      if (req.body.npm.startsWith("111")) {
        newUser = { ...req.body, role: "admin" };
      } else {
        newUser = { ...req.body, role: "user" };
      }
      const getNewUser = await User.create(newUser);
      const responseNewUser =
        getNewUser.role === "user"
          ? await AddPelajaranToUser(getNewUser._id)
          : getNewUser;
      Response(200, responseNewUser, "success create user", res);
    }
  } catch (error) {
    Response(400, error, "failed create user", res);
  }
}

async function GetUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    Response(200, user, "success get user by id", res);
  } catch (error) {
    Response(400, error, "failed get user by id", res);
  }
}
async function LoginUserOrAdminByNPM(req, res) {
  try {
    const validateAndresult = validationResult(req);
    if (!validateAndresult.isEmpty()) {
      return Response(400, validateAndresult, "failed teg user by id", res);
    } else {
      const npmValue = req.body.npm;
      const user = await User.findOne({ npm: npmValue });
      const dataInToken = {
        name: user.name,
        role: user.role,
      };
      const token = jwt.sign(dataInToken, process.env.JWT_SECRET);
      Response(200, user, "success get user by id", res, token);
    }
  } catch (error) {
    Response(400, error, "failed tef user by id", res);
  }
}

async function Logout(req, res) {
  res.clearCookie("token");
  Response(200, null, "success logout", res);
}

async function DeleteUserById(req, res) {
  try {
    const id = req.params.id;
    const response = await User.deleteOne({ _id: id });
    Response(200, response, "success delete user by id", res);
  } catch (error) {
    Response(400, error, "failed delete user by id", res);
  }
}

async function UpdateUserNotDataPelajaran(req, res) {
  try {
    const validateAndresult = validationResult(req);
    if (!validateAndresult.isEmpty()) {
      return Response(400, validateAndresult, "failed update user by id", res);
    } else {
      const data = req.body;
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            ...data,
          },
        }
      );
    }
    const response = await User.findOne({ _id: req.params.id });
    Response(200, response, "success update user by id", res);
  } catch (error) {
    Response(400, error, "failed update user by id", res);
  }
}

module.exports = {
  GetUsersAll,
  CreateUser,
  GetUserById,
  DeleteUserById,
  LoginUserOrAdminByNPM,
  UpdateUserNotDataPelajaran,
  Logout,
};
