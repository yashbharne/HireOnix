const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const errorConverter = require("./errors/errorConvertor");
const errorHandler = require("./errors/errorHandler");
const routes = require("./routes/index");
require("./queues/resume.processor");
dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/", routes);
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
