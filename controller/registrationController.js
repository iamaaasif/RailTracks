// external imports
const bcrypt = require("bcrypt");
const { body } = require("express-validator");

// internal imports
const User = require("../models/user");
const Mentor = require("../models/mentor");

function getRegistration(req, res, next) {
  res.render("register", {
    title: "RailTracks | Sign Up",
  });
}

async function userRegistration(req, res, next) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const result = await newUser.save();

    const newMentor = new Mentor({ username: req.body.username });
    const mentorResult = await newMentor.save();

    res.render("login", {
      html: true,
      title: "Login - RailTracks",
      newUser: true,
      userLastName: req.body.lastName,
      loggedInUser: {},
      errors: {},
      data: { email: req.body.email, username: req.body.username },
    });

    res.status(200).json({
      message: "User was added succesfully.",
    });
  } catch (err) {
    console.log(err);
    res.render("register", {
      errors: {
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }
}

module.exports = {
  getRegistration,
  userRegistration,
};
