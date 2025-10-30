const { check, param } = require("express-validator");
const mongoose = require("mongoose");

const categoryAddValidator = [
  check("title").notEmpty().withMessage("Title is required"),
  check("desc").notEmpty().withMessage("Description is required"),
];

const updateCategoryValidator = [
  check("title").notEmpty().withMessage("Title is required"),
  check("desc").notEmpty().withMessage("Description is required"),
];

const idValidator = [
  param("id").custom(async (id) => {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Category");
    }
  }),
];

module.exports = { categoryAddValidator, updateCategoryValidator, idValidator };
