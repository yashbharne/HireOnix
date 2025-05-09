const { JobApplication, Job, User } = require("../models/index");
const { uploadResumeToCloudinary } = require("../utils/Cloudinary");
const fs = require("fs");
const ApiError = require("../utils/ApiError");
const { addToATSQueue } = require("../queues/ats.queues");

exports.applyForJob = async (candidateId, jobId, resumeFile) => {
  const job = await Job.findById(jobId);
  if (!job || job.status !== "active") {
    throw new ApiError("This job is no longer accepting applications.", 400);
  }

  const existingApp = await JobApplication.findOne({ candidateId, jobId });

  if (existingApp) {
    if (existingApp.status === "withdrawn") {
      throw new ApiError(
        "You have withdrawn your application and cannot re-apply.",
        400
      );
    }

    if (existingApp.resumeUrl) {
      throw new ApiError(
        "You have already applied and uploaded your resume.",
        400
      );
    }

    throw new ApiError("You have already applied for this job.", 400);
  }

  const result = await uploadResumeToCloudinary(resumeFile.path);
  fs.unlinkSync(resumeFile.path);

  const newApp = await JobApplication.create({
    jobId,
    candidateId,
    resumeUrl: result.secure_url,
    status: "pending",
    atsScore: null,
  });

  const newjobId = await addToATSQueue({
    applicationId: newApp._id,
    jobId,
    resumeUrl: result.secure_url,
    candidateId: candidateId,
  });

  return newApp;
};

exports.getApplications = async (jobId, recruiterId) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError("Job not found", 404);
  }

  if (job.recruiter.toString() !== recruiterId.toString()) {
    throw new ApiError(
      "You are not authorized to view applications for this job",
      403
    );
  }

  const applications = await JobApplication.find({ jobId: jobId }).populate(
    "candidateId",
    "_id name"
  );
  return applications;
};

exports.getApplicationById = async (applicationId, recruiterId) => {
  const application = await JobApplication.findById(applicationId)
    .populate("candidateId", "_id name email")
    .populate("jobId", "recruiter");
  if (!application) {
    throw new ApiError("Application not found", 404);
  }
  console.log(application);

  if (application.jobId.recruiter.toString() !== recruiterId.toString()) {
    throw new ApiError("You are not authorized to view this application", 403);
  }
  return application;
};

exports.updateApplicationStatus = async (
  applicationId,
  recruiterId,
  status
) => {
  const application = await JobApplication.findById(applicationId).populate(
    "jobId",
    "recruiter"
  );;

  if (!application) {
    throw new ApiError("Application not found", 404);
  }

  if (application.jobId.recruiter.toString() !== recruiterId.toString()) {
    throw new ApiError(
      "You are not authorized to update this application",
      403
    );
  }

  application.status = status;
  await application.save();
  return application;
};
