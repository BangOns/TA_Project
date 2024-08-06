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
module.exports = { ValidatePelajaran };
