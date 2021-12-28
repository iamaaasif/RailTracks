// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  getLandingPage,
  searchResult,
  getSearchResult,
} = require("../controller/landingController");
const {
  login,
  logout,
  getLoginPage,
} = require("../controller/loginController");
const {
  checkLogin,
  checkLoginForLandingPage,
  redirectLoggedIn,
} = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLResponse");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidator");

// apis
router.get("/api/v1/skillSearch", searchResult);

// landing page
router.get(
  "/",
  decorateHtmlResponse("Home"),
  checkLoginForLandingPage,
  getLandingPage
);

router.get(
  "/search",
  decorateHtmlResponse("Search Result"),
  checkLoginForLandingPage,
  getSearchResult
);

// router.get("/blogs", decorateHtmlResponse("Blogs"), getBlogPage);
// router.get(
//   "/createBlog",
//   decorateHtmlResponse("CreateBlog"),
//   getCreateBlogPage
// );
// router.get("/viewBlog", decorateHtmlResponse("viewBlog"), getViewBlog);
// logout
router.delete("/", logout);
module.exports = router;
