const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  photo: {
    type: String,
    require: false,
  },
  name: {
    type: String,
    require: false,
  },
  bio: {
    type: String,
    require: false,
  },
  phone: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  
  lastLogin: {
    type: Date,
    require: false,
  },
});

module.exports = mongoose.model("User", userSchema);
