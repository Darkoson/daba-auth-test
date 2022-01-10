const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  photo: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
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
