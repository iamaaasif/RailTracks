const User = require("../models/user");

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
    const results = await User.find({ skills: { $all: [skill] } });
    console.log(results);
    if (results && results[0]._id) {
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
