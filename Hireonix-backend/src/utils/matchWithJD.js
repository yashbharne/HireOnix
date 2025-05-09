// src/utils/matchWithJD.js

module.exports = function matchResumeWithJD(resumeSkills, jobDescription) {
  // Extract keywords from job description (could improve with NLP)
  const jobSkills = jobDescription
    .toLowerCase()
    .split(/[^a-zA-Z0-9+]+/) // split on punctuation, whitespace
    .filter(Boolean);

  const resumeSet = new Set(resumeSkills.map((s) => s.toLowerCase()));
  const jobSet = new Set(jobSkills);

  let matchCount = 0;
  for (let skill of jobSet) {
    if (resumeSet.has(skill)) {
      matchCount++;
    }
  }

  const score = Math.round((matchCount / jobSet.size) * 100);
  return score;
};
