const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error?.statusCode || error instanceof mongoose.Error
        ? 400
        : 500;
    const message = error?.message || 'Something went Wrong';
    error = new ApiError(message, statusCode, false, err?.stack);
  }
  next(error);
};

module.exports = errorConverter;
