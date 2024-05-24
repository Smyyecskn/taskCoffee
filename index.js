"use strict";

//express()
const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Coffee API",
    user: req.user,
  });
});

// Routes:
app.use(require("./src/routes"));

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

/* ------------------------------------------------------- */

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));
