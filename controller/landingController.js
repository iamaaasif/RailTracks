const User = require("../models/user");
const Mentor = require("../models/mentor");

function getLandingPage(req, res, next) {
  res.render("index");
}

function getSearchResult(req, res, next) {
  res.render("search");
}

// api
async function searchResult(req, res, next) {
  const skill = req.query.skill;
  console.log(skill);

  try {
    let mentor_results = await Mentor.find({
      skills: { $all: [skill] },
      isAvailable: true,
    });
    console.log(mentor_results);

    let results = [];
    for (let i = 0; i < mentor_results.length; i++) {
      let mentor = {};
      const username = mentor_results[i].username;

      const { profile_picture, firstName, lastName } = await User.findOne({
        username: username,
      });
      mentor.username = username;

      mentor.profile_picture = profile_picture;
      mentor.firstName = firstName;
      mentor.lastName = lastName;
      mentor.about = mentor_results[i].about;
      // console.log(mentor);
      results.push(mentor);
    }

    if (results) {
      res.json(results);
    } else {
      res.json({ error: "Not Found!" });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: "Not Found!" });
  }
}

// function getBlogPage(req, res, next) {
//   res.render("blogs");
// }
// function getCreateBlogPage(req, res, next) {
//   res.render("createBlogs");
// }
// function getViewBlog(req, res, next) {
//   res.render("viewBlog");
// }
module.exports = {
  getLandingPage,
  // getBlogPage,
  // getCreateBlogPage,
  // getViewBlog,
  searchResult,
  getSearchResult,
};
