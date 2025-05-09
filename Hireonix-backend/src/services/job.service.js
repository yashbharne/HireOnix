const { Job, JobApplication } = require("../models");
const ApiError = require("../utils/ApiError");
const sanitizeHtml = require("sanitize-html");

exports.createJob = async (recruiterId, jobData) => {
  const {
    title,
    description,
    location,
    jobType,
    salaryRange,
    experience,
    skills,
    applicationDeadline,
  } = jobData;

  const since = new Date();
  since.setDate(since.getDate() - 1);

  const recentJobCount = await Job.countDocuments({
    recruiter: recruiterId,
    createdAt: { $gte: since },
  });

  if (recentJobCount >= 10) {
    throw new ApiError("Job posting limit reached (10 per day).", 429);
  }

  const existing = await Job.findOne({
    title,
    description,
    recruiter: recruiterId,
  });
  if (existing) {
    throw new ApiError("You have already posted this job.", 400);
  }

  if (salaryRange.min >= salaryRange.max) {
    throw new ApiError("Minimum salary must be less than maximum salary.", 400);
  }

  const sanitizedDescription = sanitizeHtml(description);

  const newJob = await Job.create({
    title,
    description: sanitizedDescription,
    location,
    jobType,
    salaryRange,
    experience,
    skills,
    applicationDeadline,
    recruiter: recruiterId,
  });

  return newJob;
};

// Update Job
exports.updateJob = async (jobId, recruiterId, updateData) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError("Job not found", 404);
  }

  if (!job.recruiter.equals(recruiterId)) {
    throw new ApiError("Unauthorized to update this job", 403);
  }

  const updatedjob = await Job.findByIdAndUpdate(jobId, updateData, {
    new: true,
  });
  await updatedjob.save();
  return updatedjob;
};

exports.deleteJob = async (jobId, recruiterId) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError("Job not found", 404);
  }

  if (!job.recruiter.equals(recruiterId)) {
    throw new ApiError("Unauthorized to delete this job", 403);
  }

  await job.deleteOne();
  return { message: "Job deleted successfully" };
};

exports.getAllJobs = async (recruiterId) => {
  const jobs = await Job.find({ recruiter: recruiterId });
  if (!jobs) {
    throw new ApiError("You haven't posted any Job yet", 400);
  }
  return jobs;
};

exports.getJobById = async (jobId) => {
  const job = await Job.findById(jobId);
  const countOfApplication = await JobApplication.countDocuments({
    jobId: jobId,
  });
  console.log(countOfApplication);

  if (!job) {
    throw new ApiError("Job is not available", 400);
  }
  return { ...job.toObject(), TotalApplicants: countOfApplication };
};
