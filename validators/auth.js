const { check } = require("express-validator");
const validateEmail = require("./validateEmail");
const { default: mongoose } = require("mongoose");

const signupValidator = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email")
    .isEmail()
    .withMessage("inValid Email")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password Length Must be 6 chars at least")
    .notEmpty()
    .withMessage("Password is required"),
];

const signinValidatior = [
  check("email")
    .isEmail()
    .withMessage("Email is not valid")
    .notEmpty()
    .withMessage("Email is required"),
  check("password").notEmpty().withMessage("Password is required"),
];

const emailValidator = [
  check("email")
    .isEmail()
    .withMessage("Email is not valid")
    .notEmpty()
    .withMessage("Email is required"),
];

const verifyUserValidator = [
  check("email")
    .isEmail()
    .withMessage("Email is not valid")
    .notEmpty()
    .withMessage("Email is required"),
  check("code").notEmpty().withMessage("Code is required"),
];

const recoverPasswordValidator = [
  check("email")
    .isEmail()
    .withMessage("Email is not valid")
    .notEmpty()
    .withMessage("Email is required"),
  check("code").notEmpty().withMessage("Code is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password Length Must be 6 chars at least")
    .notEmpty()
    .withMessage("Password is required"),
];

const changePasswordValidator = [
  check("oldPassword").notEmpty().withMessage("Old Password is required"),
  check("newPassword").notEmpty().withMessage("New Password is required"),
];

const updateProfileValidator = [
  check("email").custom(async (email) => {
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      throw "Invalid Email";
    }
  }),
  check("profilePic").custom(async (profilePic) => {
    if (profilePic && !mongoose.Types.ObjectId.isValid(profilePic)) {
      throw "invalid Profile Picture";
    }
  }),
];

module.exports = {
  signupValidator,
  signinValidatior,
  emailValidator,
  verifyUserValidator,
  recoverPasswordValidator,
  changePasswordValidator,
  updateProfileValidator,
};
