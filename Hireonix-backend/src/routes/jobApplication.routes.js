const express = require("express");
const router = express.Router();
const { jobApplicationController } = require("../controllers/index");
const upload = require("../middlewares/upload.middleware");
const auth = require("../middlewares/auth.middleware"); // ensure user is authenticated
const asyncHandler = require("../middlewares/async.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { application } = require("../validations/index");

router
  .route("/upload")
  .post(
    auth("candidate"),
    upload.single("resume"),
    asyncHandler(jobApplicationController.uploadResume)
  );

router
  .route("/jobs/:jobId")
  .get(
    auth("recruiter"),
    asyncHandler(jobApplicationController.getApplicationsByJobId)
  );

router
  .route("/:applicationId")
  .get(
    auth("recruiter"),
    asyncHandler(jobApplicationController.getApplicationById)
  );

router
  .route("/:applicationId/status")
  .patch(
    auth("recruiter"),
    validate(application.updateApplicationStatusSchema),
    asyncHandler(jobApplicationController.updateApplicationStatus)
  );

module.exports = router;
