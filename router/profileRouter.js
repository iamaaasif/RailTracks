// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  getProfilePage,
  getEditProfilePage,
  editProfile,
  profile_data,
  toogleHandler,
} = require("../controller/profileController");
const decorateHtmlResponse = require("../middlewares/common/decorateHTMLResponse");
const {
  checkLogin,
  checkLoginForLandingPage,
  redirectLoggedIn,
} = require("../middlewares/common/checkLogin");
const imageUpload = require("../middlewares/users/profilePicUpload");

router.get("/api/v1/profile/:username", profile_data);

router.get(
  "/:username",
  decorateHtmlResponse("Profile"),
  checkLoginForLandingPage,
  getProfilePage
);
router.post(
  "/:username",
  decorateHtmlResponse("Profile"),
  checkLoginForLandingPage,
  toogleHandler
);

router.get(
  "/editProfile/:username",
  decorateHtmlResponse("Profile"),
  checkLoginForLandingPage,
  getEditProfilePage
);
router.post(
  "/editProfile/:username",
  decorateHtmlResponse("Edit Profile"),
  checkLoginForLandingPage,
  imageUpload,
  editProfile
);
// router.get(
//   "/editProfile/:username",
//   decorateHtmlResponse("Edit Profile"),
//   getEditProfilePage
// );

module.exports = router;
