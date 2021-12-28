const Blog = require("../models/blog");
const fs = require("fs");
const User = require("../models/user");
function getBlogPage(req, res, next) {
  res.render("blogs");
}
function getCreateBlogPage(req, res, next) {
  res.render("createBlogs");
}
function getViewBlog(req, res, next) {
  res.render("viewBlog");
}
function getMyBlogsPage(req, res, next) {
  res.render("myblog");
}
//api
async function getBlogs(req, res, next) {
  let blog = {};
  let blog_results = [];
  const blogs = await Blog.find()
    .select("url title text thumbnail createdAt author_username")
    .sort({ createdAt: -1 });
  // console.log(blogs);
  for (let i = 0; i < blogs.length; i++) {
    const username = blogs[i].author_username;
    blog.url = blogs[i].url;
    blog.title = blogs[i].title;
    blog.text = blogs[i].text;
    blog.thumbnail = blogs[i].thumbnail;
    blog.createdAt = blogs[i].createdAt;
    blog.author_username = blogs[i].author_username;
    const { firstName, lastName } = await User.findOne({ username: username });
    blog.firstName = firstName;
    blog.lastName = lastName;

    blog_results.push(blog);
  }
  // console.log(blog_results);
  if (blog_results) {
    res.json(blog_results);
  } else {
    res.json({ error: "Not Found!" });
  }
}

// get single blog
async function getBlog(req, res, next) {
  const url = req.params.blog_url;
  const blog = await Blog.findOne({ url: url });
  if (blog && blog._id) {
    // console.log(blog.title);
    res.json({
      blog_title: blog.title,
      blog_author: blog.author_name,
      blog_text: blog.text,
      blog_thumbnail: blog.thumbnail,
      createdAt: blog.createdAt,
    });
  } else {
    res.json({ error: "Not Found!" });
  }
}

async function getOwnBlogs(req, res, next) {
  const username = req.params.username;
  console.log(username);
  const blogs = await Blog.find({ author_username: username })
    .select("url title text thumbnail createdAt author_name")
    .sort({ createdAt: -1 });
  // console.log(blogs);
  if (blogs && blogs[0]._id) {
    res.json(blogs);
  } else {
    res.json({ error: "Not Found!" });
  }
}

// function
async function createBlog(req, res, next) {
  try {
    let newBlog;
    if (req.files[0]) {
      newBlog = new Blog({
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
        author_username: req.body.author_username,
        thumbnail: req.files[0].filename,
      });
    } else {
      newBlog = new Blog({
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
        author_username: req.body.author_username,
      });
    }

    const result = await newBlog.save();
    // console.log("This is result: ");
    // console.log(result);
    res.redirect("/blog");
  } catch (err) {
    console.log("Image deleted.");
    fs.unlink(
      `${__dirname}/../public/uploads/thumbnails/${req.files[0].filename}`,
      (err) => {
        if (err) console.log(err);
      }
    );

    console.log(err);
    res.render("createBlogs", {
      html: true,
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
  getBlogs,
  getBlog,
  getMyBlogsPage,
  getOwnBlogs,
};
