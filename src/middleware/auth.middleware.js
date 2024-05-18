const User = require("../models/user.model");
const  ApiError  = require("../utils/apiError");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    console.log("cookies",req.cookies);
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log(token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

module.exports = verifyJWT;
