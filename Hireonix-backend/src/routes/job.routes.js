const express = require("express");
const router = express.Router();
const { jobController } = require("../controllers/index");
const auth = require("../middlewares/auth.middleware");
const asyncHandler = require("../middlewares/async.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { jobValidateSchema } = require("../validations");

router
  .route("/create")
  .post(
    validate(jobValidateSchema.createJobSchema),
    auth("recruiter"),
    asyncHandler(jobController.createJob)
  );

router
  .route("/update/:jobId")
  .patch(
    validate(jobValidateSchema.updateJobSchema),
    auth("recruiter"),
    asyncHandler(jobController.updateJob)
  );

router
  .route("/delete/:jobId")
  .delete(auth("recruiter"), asyncHandler(jobController.deleteJob));

router
  .route("/getAllJobs")
  .get(auth("recruiter"), asyncHandler(jobController.getAllJobs));

router
  .route("/getJob/:jobId")
  .get(auth("recruiter"), asyncHandler(jobController.getJob));

module.exports = router;
