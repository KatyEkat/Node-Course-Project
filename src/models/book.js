const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  author: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  year: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("book", bookSchema);
