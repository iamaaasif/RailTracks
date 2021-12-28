// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

// internal imports
const User = require("../../models/user");

// add user
const signUpValidators = [
  check("firstName")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("username")
    .isLength({ min: 3 })
    .withMessage("Username is required")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ username: value });
        if (user) {
          throw createError("username already exist! Please try with another.");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("email")
    .isLength({ min: 3 })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password").isLength({ min: 3 }).withMessage("pasword is required"),
  check("confirmPassword")
    .isLength({ min: 3 })
    .withMessage("pasword is required")
    .custom(async (confirmPassword, { req }) => {
      if (confirmPassword != req.body.password) {
        throw createError("Password and confirm password does not match!");
      }
    }),
];

const signUpValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    // no errors
    next();
  } else {
    // res.status(500).json({
    //   errors: mappedErrors,
    // });
    res.render("register", {
      errors: mappedErrors,
    });
  }
};

module.exports = {
  signUpValidators,
  signUpValidatorHandler,
};
