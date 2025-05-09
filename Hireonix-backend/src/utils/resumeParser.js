// src/utils/resumeParser.js
module.exports = async function extractResumeData(resumeUrl) {
  // Simulate downloading and parsing PDF content from Cloudinary URL
  console.log(`📄 Simulating resume parsing for: ${resumeUrl}`);

  // Mock data (normally you'd extract this from resume text)
  return {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
    experience: "2 years at XYZ Company",
    education: "B.Tech in Computer Science",
  };
};
