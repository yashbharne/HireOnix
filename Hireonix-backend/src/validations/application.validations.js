// validations/application.validation.js
const Joi = require("joi");

exports.updateApplicationStatusSchema = Joi.object({
  status: Joi.string().valid("shortlisted", "rejected").required(),
});
