const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/index");
const { validate } = require("../middlewares/validate.middleware");
const { authValidateSchema } = require("../validations/index");
const asyncHandler = require("../middlewares/async.middleware");

router
  .route("/register")
  .post(
    validate(authValidateSchema.registerSchema),
    asyncHandler(authController.register)
  );
router
  .route("/login")
  .post(
    validate(authValidateSchema.loginSchema),
    asyncHandler(authController.login)
  );

module.exports = router;
