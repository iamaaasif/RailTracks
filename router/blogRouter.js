// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  getBlogPage,
  getCreateBlogPage,
  getViewBlog,
  createBlog,
} = require("../controller/blogController");
const imageUpload = require("../middlewares/users/imageUpload");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLResponse");
const {
  checkLogin,
  checkLoginForLandingPage,
  redirectLoggedIn,
} = require("../middlewares/common/checkLogin");
router.get("/", decorateHtmlResponse("Blogs"), getBlogPage);
router.get(
  "/createBlog",
  decorateHtmlResponse("CreateBlog"),
  checkLoginForLandingPage,
  getCreateBlogPage
);
router.get(
  "/viewBlog",
  decorateHtmlResponse("viewBlog"),

  getViewBlog
);

// post
router.post("/createBlog", imageUpload, createBlog);

module.exports = router;
