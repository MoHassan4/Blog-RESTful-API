const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const mongodbConnect = require("./init/mongodb");
const { authRoute, categoryRoute, fileRoute, postRoute } = require("./routes");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares");
const notFound = require("./controllers/notFound");

//init app
const app = express();

//Database Connection
mongodbConnect();

//third-party-modules
app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(morgan("dev"));

//route section
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/file", fileRoute);
app.use("/api/v1/posts", postRoute);

// not found route
app.use(notFound);

//error handling middleware
app.use(errorHandler);

module.exports = app;
