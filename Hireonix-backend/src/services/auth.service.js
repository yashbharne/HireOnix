const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require("../models/index");
const dotenv = require("dotenv");
const ApiError = require("../utils/ApiError");
dotenv.config();

exports.registerUser = async ({ name, email, password, role }) => {
  const existingUser = await models.User.findOne({ email });
  if (existingUser) {
    throw new ApiError("User Already Exists", 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new models.User({ name, email, passwordHash, role });
  if (role === "recruiter") {
    newUser.isApproved = false;
  }
  await newUser.save();

  return {
    message: "User registered successfully",
  };
};

exports.loginUser = async ({ email, password }) => {
  const user = await models.User.findOne({ email });
  if (!user) throw new ApiError("Invalid credentials", 401);

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new ApiError("Invalid credentials", 401);
  // if (user.role === "recruiter" && !user.isApproved) {
  //   throw new ApiError("Your recruiter account is pending approval", 403);
  // }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
