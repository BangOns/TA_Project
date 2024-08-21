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
    const user = await User.findOne({ _id: req.params.id });
    if (value !== user.npm && user) {
      throw new Error("NPM is already exists");
    } else if (value.length < 12 || value.length > 12) {
      throw new Error("npm must have 12 numbers");
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
