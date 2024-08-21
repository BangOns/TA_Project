const { Schema, model } = require("mongoose");

const list_pelajaran = new Schema({
  name: String,
});

const RekapNilaipelajaran = new Schema({
  name: String,
  nilai: Number,
  kehadiran: Number,
  Total_nilai: Number,
});

const user = new Schema({
  name: String,
  npm: String,
  password: String,
  role: String,
  data_pelajaran: [RekapNilaipelajaran],
});
user.pre("save", function (next) {
  if (this.role === "admin") {
    this.data_pelajaran = undefined;
  }
  next();
});
const admin = new Schema({
  name: String,
  npm: String,
  password: String,
});

const User = model("Users", user);
const Admin = model("Admin", admin);
const List_pelajaran = model("table_pelajaran", list_pelajaran);

module.exports = { User, Admin, List_pelajaran };
