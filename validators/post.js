const { check, param } = require("express-validator");
const mongoose = require("mongoose");

const addPostValidator = [
  check("title").notEmpty().withMessage("Title is Required"),
  check("file").custom(async (file) => {
    if (file && !mongoose.Types.ObjectId.isValid(file)) {
      throw "File is Invalid";
    }
  }),
  check("category")
    .notEmpty()
    .withMessage("Category is Required")
    .custom(async (category) => {
      if (category && !mongoose.Types.ObjectId.isValid(category)) {
        throw "Category is Invalid";
      }
    }),
];

const updatePostValidator = [
  check("file").custom(async (file) => {
    if (file && !mongoose.Types.ObjectId.isValid(file)) {
      throw "File is Invalid";
    }
  }),
  check("category").custom(async (category) => {
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      throw "Category is Invalid";
    }
  }),
];

const idValidator = [
  param("id").custom(async (id) => {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw "Invalid post id";
    }
  }),
];

module.exports = { addPostValidator, updatePostValidator, idValidator };
