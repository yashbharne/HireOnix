const { jobService } = require("../services");

exports.createJob = async (req, res, next) => {
  try {
    const recruiterId = req.user.id;
    const job = await jobService.createJob(recruiterId, req.body);
    res.status(201).json({ success: true, job });
  } catch (err) {
    next(err);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const recruiterId = req.user.id;
    const { jobId } = req.params;
    const update = await jobService.updateJob(jobId, recruiterId, req.body);
    res.status(200).json({ success: true, update });
  } catch (err) {
    next(err);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const recruiterId = req.user.id;
    const { jobId } = req.params;
    const deleted = await jobService.deleteJob(jobId, recruiterId);
    res.status(200).json({ success: true, deleted });
  } catch (err) {
    next(err);
  }
};

exports.getAllJobs = async (req, res, next) => {
  console.log("In controller");
  
  try {
    const recruiterId = req.user.id;
    const jobs = await jobService.getAllJobs(recruiterId);
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    next(err);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await jobService.getJobById(jobId);
    res.status(200).json({ success: true, job });
  } catch (err) {
    next(err);
  }
};
