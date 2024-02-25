const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Init App
const app = express();

// Middleware
app.use(express.json());

// Port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ( ${process.env.NODE_ENV} ) mode on port => ${PORT} `
  );
});
