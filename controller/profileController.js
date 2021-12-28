// internal imports
const User = require("../models/user");
const Mentor = require("../models/mentor");
const Blog = require("../models/blog");

function getProfilePage(req, res, next) {
  console.log(`user name from param : ${req.params.username}`);
  console.log(
    ` Global data is (inside profile controller) : ${global.loggedInUser.username}`
  );

  if (req.params.username === global.loggedInUser.username) {
    res.render("my_profile");
  } else {
    res.render("public_profile");
  }
}
function getEditProfilePage(req, res, next) {
  res.render("edit_profile");
}

//api for fetch user profile data

async function profile_data(req, res, next) {
  const username = req.params.username;
  try {
    const { firstName, lastName, profile_picture, email } = await User.findOne({
      username: username,
    });
    const {
      twitter,
      linkedin,
      emp_company,
      emp_role,
      phone,
      about,
      skills,
      isAvailable,
      callsPerMonth,
      maximunResponseTime,
    } = await Mentor.findOne({ username: username });
    const latestBlog = await Blog.findOne({ author_name: username });

    let hasWrittenBlog = false;
    if (latestBlog) {
      hasWrittenBlog = true;
    }
    const result = {
      username,
      firstName,
      lastName,
      profile_picture,
      twitter,
      linkedin,
      emp_company,
      emp_role,
      phone,
      email,
      about,
      skills,
      isAvailable,
      latestBlog,
      hasWrittenBlog,
      callsPerMonth,
      maximunResponseTime,
    };

    // console.log(result);
    res.json(result);
  } catch (err) {
    res.json({ error: "no data found" });

    console.log(err);
  }
}

async function editProfile(req, res, next) {
  try {
    if (req.files) {
      let res3 = await User.findOneAndUpdate(
        { username: req.params.username },
        { profile_picture: req.files[0].filename },
        {
          new: true,
        }
      );
      console.log(res3);
      res.redirect("#");
    }
  } catch (err) {
    console.log(err);
  }

  try {
    if (req.body.firstName.length > 3 || req.body.lastName.length > 3) {
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

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }

  let skills;
  try {
    skills = req.body.skills.split(",").map((item) => item.trim());
  } catch (error) {
    skills = req.body.skills;
  }
  try {
    const update = {};

    if (req.body.role.length > 3) {
      update.emp_role = req.body.role;
    }
    if (req.body.company.length > 3) {
      update.emp_company = req.body.company;
    }

    if (req.body.about.length > 3) {
      update.about = req.body.about;
    }
    if (skills.length > 1) {
      update.skills = skills;
    }
    if (req.body.twitter.length > 2) {
      update.twitter = req.body.twitter;
    }
    if (req.body.linkedin.length > 3) {
      update.linkedin = req.body.linkedin;
    }
    if (req.body.callsPerMonth.length > 0) {
      update.callsPerMonth = req.body.callsPerMonth;
    }

    if (req.body.maximunResponseTime.length > 0) {
      update.maximunResponseTime = req.body.maximunResponseTime;
    }

    let res1 = await Mentor.findOneAndUpdate(
      { username: req.params.username },
      { $set: update },
      {
        new: true,
      }
    );

    console.log(res1);

    res.redirect("/");
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

async function toogleHandler(req, res, next) {
  // const username = req.params.username;
  const isChecked = req.body.checkbox;
  // console.log(isChecked);

  try {
    const result = await Mentor.findOneAndUpdate(
      { username: req.params.username },
      { isAvailable: isChecked },
      {
        new: true,
      }
    );

    // console.log(` Is available : ${result.isAvailable}`);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getProfile,
  getProfilePage,
  getEditProfilePage,
  editProfile,
  profile_data,
  toogleHandler,
};
