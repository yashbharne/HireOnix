const { Queue } = require("bullmq");
const Redis = require("ioredis");

const redis = new Redis();

const atsQueue = new Queue("ats-scan", {
  connection: redis,
});

const addToATSQueue = async (jobData) => {
  const id = await atsQueue.add("scan-resume", jobData, {
    attempts: 3,
    backoff: 5000,
    removeOnComplete: true, // ✅ this removes job after it's completed
    removeOnFail: false,
  });
  return id;
};

module.exports = {
  atsQueue,
  addToATSQueue,
};
