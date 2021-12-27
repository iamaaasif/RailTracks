// internal imports
const User = require("../models/user");
const Mentor = require("../models/mentor");

function getProfilePage(req, res, next) {
  res.render("profile");
}
function getEditProfilePage(req, res, next) {
  res.render("edit_profile");
}

//api for fetch user profile data

async function profile_data(req, res, next) {
  const username = req.params.username;
}

async function editProfile(req, res, next) {
  let skills;
  try {
    skills = req.body.skills.split(",").map((item) => item.trim());
  } catch (error) {
    skills = req.body.skills;
  }
  try {
    const update = {
      emp_company: req.body.company,
      emp_role: req.body.role,
      about: req.body.about,
      skills: skills,
      phone: req.body.phone,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
    };

    let res1 = await Mentor.findOneAndUpdate(
      { username: req.params.username },
      { $set: update },
      {
        new: true,
      }
    );
    console.log(res1);

    if (req.body.firstName || req.body.lastName) {
      let res2 = await User.findOneAndUpdate(
        { username: req.params.username },
        {
          $set: { firstName: req.body.firstName, lastName: req.body.lastName },
        },
        {
          new: true,
        }
      );
      console.log(res2);
    }

    if (req.files) {
      let res3 = await User.findOneAndUpdate(
        { username: req.params.username },
        { profile_picture: req.files[0].filename },
        {
          new: true,
        }
      );
      console.log(res3);
    }

    res.redirect("/profile");
  } catch (err) {
    console.log(err);
  }
}

async function getProfile(req, res, next) {
  const userEmail = req.query.email;
  const user = await User.findOne({ email: userEmail });

  if (user) {
    res.render("profile", {
      title: "Profile",
      user_info: user,
    });
  } else {
    res.render("error", {
      title: "Not Found!",
    });
  }
}

module.exports = {
  getProfile,
  getProfilePage,
  getEditProfilePage,
  editProfile,
};
