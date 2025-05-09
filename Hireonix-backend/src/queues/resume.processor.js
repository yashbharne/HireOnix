const { Worker } = require("bullmq");
const extractResumeData = require("../utils/resumeParser"); 
const matchResumeWithJD = require("../utils/matchWithJD"); 
const { JobApplication } = require("../models/index");


const resumeWorker = new Worker(
  "ats-scan",
  async (job) => {
    try {
      const { resumeUrl, candidateId, jobId } = job.data;

      console.log("🔍 Processing resume for:", candidateId);

      if (!candidateId || !resumeUrl || !jobId) {
        throw new Error("Missing job data fields.");
      }

      const resumeData = await extractResumeData(resumeUrl);

      const jobDescription = "React, Node.js, MongoDB, 2+ years experience";

      const atsScore = matchResumeWithJD(resumeData.skills, jobDescription);

      await JobApplication.findOneAndUpdate(
        { candidateId, jobId },
        {
          resumeData,
          atsScore,
          resumeScanned: true,
        },
        { new: true }
      );

      console.log("✅ ATS score processed:", atsScore);
    } catch (error) {
      console.error("❌ Worker failed:", error);
      throw error; 
    }
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
    lockDuration: 120000, 
    concurrency: 1,
  }
);
resumeWorker.on("active", (job) => {
  console.log("🔧 Job started:", job.name, job.id, job.data);
});

resumeWorker.on("completed", (job) => {
  console.log(`🎉 Job ${job.id} completed`);
});

resumeWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err);
});

module.exports = resumeWorker;
