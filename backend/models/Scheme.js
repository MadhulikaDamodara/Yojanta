const mongoose = require("mongoose");

const SchemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  categoryType: String,

  minAge: Number,
  maxAge: Number,

  gender: String,

  state: String,

  occupation: String,

  maxIncome: Number,

  casteCategory: String,

  benefits: String,
  description: String,

  deadline: String,

  officialLink: String
});

module.exports = mongoose.model("Scheme", SchemeSchema);