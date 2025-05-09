const multer = require("multer");
const path = require("path");
const ApiError = require("../utils/ApiError")

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("pdf")
  ) {
    cb(null, true);
  } else {
    cb(new ApiError("Only PDF files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
