// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  getProfilePage,
  getEditProfilePage,
  editProfile,
} = require("../controller/profileController");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLResponse");
const {
  checkLogin,
  checkLoginForLandingPage,
  redirectLoggedIn,
} = require("../middlewares/common/checkLogin");
const imageUpload = require("../middlewares/users/imageUpload");

router.get("/", decorateHtmlResponse("Profile"), getProfilePage);
router.get(
  "/editProfile/:username",
  decorateHtmlResponse("Edit Profile"),
  getEditProfilePage
);
router.post(
  "/editProfile/:username",
  decorateHtmlResponse("Edit Profile"),
  imageUpload,
  editProfile
);
// router.get(
//   "/editProfile/:username",
//   decorateHtmlResponse("Edit Profile"),
//   getEditProfilePage
// );

module.exports = router;
