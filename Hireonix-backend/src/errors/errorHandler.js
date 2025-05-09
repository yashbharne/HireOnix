const errorHandler = (err, req, res, next) => {
  // Set default values
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const response = {
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === "dev" && { stack: err.stack }),
  };

  // Log only if not operational
  if (process.env.NODE_ENV === "production" && !err.isOperational) {
    console.error("UNHANDLED ERROR:", err);
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
