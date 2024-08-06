const mongoose = require("mongoose");
require("dotenv").config();
const uri = `${process.env.URL_KEY}/${process.env.DB_KEY}`;

mongoose.connect(uri);
