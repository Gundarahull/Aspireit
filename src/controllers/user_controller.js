const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const uploadToCloudinary = require("../utils/cloudinary");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("../utils/asyncHandler");
const File = require("../models/files.model");

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

// API Controller for user registration
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullname, password } = req.body;
  console.log("body", req.body);
  console.log("username", username);
  console.log("passWord", password);

  //to better understand writing individual
  if (
    fullname === undefined ||
    fullname === null ||
    fullname === "" ||
    username === undefined ||
    username === null ||
    username === "" ||
    email === undefined ||
    email === null ||
    email === "" ||
    password === undefined ||
    password === null ||
    password === ""
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }
  //finding the match with username or email
  const userExicted = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log("userExcited", userExicted);

  if (userExicted) {
    throw new ApiError(400, "User already exists");
  }
  //sending into DB
  //preaparing the objcet
  const userforCreation = await User.create({
    username: username.toLowerCase(),
    email: email,
    fullname: fullname,
    password: password,
  });

  console.log("userFORCREATION", userforCreation);

  //semding the info except the pass and refrsh token to fornt wdn
  const userCreated = await User.findById(userforCreation._id).select(
    "-password -refreshToken"
  );
  console.log("userCreates", userCreated);

  if (!userCreated) {
    throw new ApiError(400, "User not created");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, userCreated, "User Creates Suceesfully"));
});

// API Controller for user login
const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie
  const { email, username, password } = req.body;
  console.log(email);

  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  // Here is an alternative of above code based on logic discussed in video:
  // if (!(username || email)) {
  //     throw new ApiError(400, "username or email is required")

  // }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const cookieOptions = {
    httpOnly: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

// API Controller for user logout
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

// API Controller refreshAcessToken
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

// API Controller for FileUpload
const fileupload = asyncHandler(async (req, res) => {
  console.log("reqyested file", req.file);
  const fileLocalPath = req.file?.path;
  if (!fileLocalPath) {
    throw new ApiError(400, " File is required");
  }
  const avatar = await uploadToCloudinary(fileLocalPath);
  if (!avatar) {
    throw new ApiError(400, "File is required");
  }

  const fileinDb = await File.create({
    file: avatar.url,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, fileinDb, "File Uploaded Successfully"));
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  fileupload,
};
