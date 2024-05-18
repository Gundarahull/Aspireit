const express = require("express");
const verifyJWT=require('../middleware/auth.middleware')
const upload=require('../middleware/multer.middleware')

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  fileupload,
} = require("../controllers/user_controller");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/fileupload").post(verifyJWT, upload.single("file"), fileupload);
router.route("/refresh-token").post(refreshAccessToken);

module.exports = router;
