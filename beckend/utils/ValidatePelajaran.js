const { body } = require("express-validator");
const { List_pelajaran } = require("../schema/SchemaDB");

function ValidatePelajaran() {
  return body("name").custom(async (value) => {
    const user = await List_pelajaran.findOne({ name: value });
    if (user) {
      throw new Error("Pelajaran Already exists");
    } else {
      true;
    }
  });
}
function ValidateEditPelajaran() {
  return body("name").custom(async (value, { req }) => {
    const user = await List_pelajaran.findOne({ name: req.params.name });
    if (!user) {
      throw new Error("Pelajaran Not Found");
    } else {
      true;
    }
  });
}
module.exports = { ValidatePelajaran, ValidateEditPelajaran };
