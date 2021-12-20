const Blog = require("../models/blog");
const fs = require("fs");
function getBlogPage(req, res, next) {
  res.render("blogs");
}
function getCreateBlogPage(req, res, next) {
  res.render("createBlogs");
}
function getViewBlog(req, res, next) {
  res.render("viewBlog");
}

async function createBlog(req, res, next) {
  let author_name = "Asif";
  // res.locals.loggedInUser.firstName + " " + res.locals.loggedInUser.lastName;

  const newBlog = new Blog({
    url:
      req.body.title
        .toLowerCase()
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
        .split(" ")
        .join("-") +
      "-" +
      Date.now(),
    title: req.body.title,
    text: req.body.text,
    author_name: author_name,
    // author_email: res.locals.loggedInUser.email,
    author_email: "iamaasif@gmail.com",
    thumbnail: req.files[0].filename,
  });
  try {
    const result = await newBlog.save();
    console.log("This is result: ");
    console.log(result);
    if (!(result && result._id)) {
      fs.unlink(
        `${__dirname}/../public/uploads/thumbnails/${req.files[0].filename}`,
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(200).json({
      message: "Blog was created Successfully.",
    });
    res.redirect("/blog");
  } catch (err) {
    console.log(err);
    res.render("createBlogs", {
      errors: {
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }
}

module.exports = {
  getBlogPage,
  getCreateBlogPage,
  getViewBlog,
  createBlog,
};
