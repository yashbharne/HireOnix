const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    atsScore: {
      type: Number,
      default: null, // Will be filled after ATS scan
    },
    status: {
      type: String,
      enum: ["pending", "shortlisted", "rejected",'withdrawn'],
      default: "pending",
    },
    parsedResumeData: {
      skills: [String],
      experience: Number, // Years
      education: String,
      summary: String,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
