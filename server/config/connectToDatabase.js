const mongoose = require("mongoose");

module.exports = function () {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    console.log("connecting to database successfully");
  } catch (error) {
    console.log("failed to connect to database with error" + error);
  }
};
