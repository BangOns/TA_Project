const { Admin, User, List_pelajaran } = require("../schema/SchemaDB");
const { body, validationResult } = require("express-validator");
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
      const newUser = req.body;
      const getNewUser = await User.create(newUser);
      const responseAddPelajaranToNewUser = await AddPelajaranToUser(
        getNewUser._id
      );
      Response(200, responseAddPelajaranToNewUser, "success create user", res);
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
async function LoginUserOrAdminById(req, res) {
  try {
    const validateAndresult = validationResult(req);
    if (!validateAndresult.isEmpty()) {
      return Response(400, validateAndresult, "failed teg user by id", res);
    } else {
      const npmValue = req.body.npm;
      const user = await User.findOne({ npm: npmValue });
      const expiredsIn = 60 * 60 * 3;
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: expiredsIn,
      });
      Response(200, user, "success get user by id", res, token);
    }
  } catch (error) {
    Response(400, error, "failed tef user by id", res);
  }
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
      const { name, npm, password, role } = req.body;
      await User.findOneAndUpdate(
        { npm: req.params.id },
        {
          $set: {
            name,
            npm,
            password,
            role,
          },
        }
      );
    }
    const response = await User.findOne({ npm: req.body.npm });
    Response(200, response, "success delete user by npm", res);
  } catch (error) {
    Response(400, error, "failed update user by npm", res);
  }
}

module.exports = {
  GetUsersAll,
  CreateUser,
  GetUserById,
  DeleteUserById,
  LoginUserOrAdminById,
  UpdateUserNotDataPelajaran,
};
