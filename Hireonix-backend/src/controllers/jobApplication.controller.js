const { jobApplicationService } = require("../services/index");

exports.uploadResume = async (req, res, next) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Resume file is required" });
  }
  try {
    console.log("request body", req.body, req.user, req.file);
    const application = await jobApplicationService.applyForJob(
      req.user.id,
      req.body.jobId,
      req.file
    );

    res.status(201).json({
      success: true,
      message:
        "Application submitted successfully. You will receive an email confirmation.",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

exports.getApplicationsByJobId = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const recruiterId = req.user.id; 
    const applications = await jobApplicationService.getApplications(
      jobId,
      recruiterId
    );
    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

exports.getApplicationById = async (req, res, next) => {
  console.log("In controller")
  try {
    const { applicationId } = req.params;
    const recruiterId = req.user.id;
    console.log(applicationId,recruiterId);
    

    const application = await jobApplicationService.getApplicationById(
      applicationId,
      recruiterId
    );

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const recruiterId = req.user.id;
    const { status } = req.body;

    const application = await jobApplicationService.updateApplicationStatus(
      applicationId,
      recruiterId,
      status
    );

    res.status(200).json({
      success: true,
      message: `Application ${status} successfully.`,
      application,
    });
  } catch (error) {
    next(error);
  }
};
