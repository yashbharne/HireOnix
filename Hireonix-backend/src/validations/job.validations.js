const Joi = require("joi");

exports.createJobSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(20).required(),
  location: Joi.string().required(), // Can be 'Remote' or a city/state
  jobType: Joi.string().valid("Full-time", "Part-time", "Contract").required(),
  salaryRange: Joi.object({
    min: Joi.number().min(0).required(),
    max: Joi.number().min(0).required(),
  }).required(),
  experience: Joi.string()
    .regex(/^[0-9]+\+? years?$/)
    .required(), // e.g. '2+ years'
  skills: Joi.array().items(Joi.string().min(1)).min(1).required(),
  applicationDeadline: Joi.date().greater("now").optional(),
});

exports.updateJobSchema = Joi.object({
  title: Joi.string().min(5).max(100),
  description: Joi.string().min(20),
  location: Joi.string(), // Can be 'Remote' or a city/state
  jobType: Joi.string().valid("Full-time", "Part-time", "Contract"),
  salaryRange: Joi.object({
    min: Joi.number().min(0),
    max: Joi.number().min(0),
  }),
  experience: Joi.string().regex(/^[0-9]+\+? years?$/), // e.g. '2+ years'
  skills: Joi.array().items(Joi.string().min(1)).min(1),
  applicationDeadline: Joi.date().greater("now"),
  status: Joi.string().valid("active", "inactive", "closed"),
});




