// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getLandingPage } = require("../controller/landingController");
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

// landing page
router.get(
  "/",
  decorateHtmlResponse("Home"),
  checkLoginForLandingPage,
  getLandingPage
);
// logout
router.delete("/", logout);
module.exports = router;
