const { body } = require("express-validator");
const { User } = require("../schema/SchemaDB");

function ValidateUserLogin() {
  return body("npm").custom(async (value) => {
    const user = await User.findOne({ npm: value });
    if (!user) {
      throw new Error("user not found");
    } else {
      true;
    }
  });
}

function ValidateUpdateUser() {
  return body("npm").custom(async (value, { req }) => {
    const user = await User.findOne({ npm: value });
    if (value !== req.params.id && user) {
      throw new Error("NPM is already exists");
    } else {
      true;
    }
  });
}

function ValidateCreateUser() {
  return body("npm").custom(async (value) => {
    const user = await User.findOne({ npm: value }).exec();
    if (user) {
      throw new Error("NPM is already exists");
    } else {
      true;
    }
  });
}

module.exports = { ValidateUserLogin, ValidateCreateUser, ValidateUpdateUser };
