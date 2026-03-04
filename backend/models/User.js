const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true,
  },

  password: String,

  age: Number,
  gender: String,
  state: String,
  occupation: String,
  income: Number,
  category: String
});

module.exports = mongoose.model("User", UserSchema);