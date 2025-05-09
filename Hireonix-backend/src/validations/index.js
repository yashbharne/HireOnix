const { application } = require("express");

module.exports = {
  authValidateSchema: require("./auth.validations"),
  resume: require("./resume.validations"),
  jobValidateSchema: require("./job.validations"),
  application: require("./application.validations"),
};
