const mongoose = require("mongoose");

module.exports = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);

    console.log("✅Connecting to MongoDB");
  } catch (error) {
    console.log("❌Failed to connect to MongoDB with error: " + error);
  }
};
