const { default: mongoose } = require("mongoose");

function connectToDatabase() {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    console.log("connect to database successfully");
  } catch (error) {
    console.log("failed to connect to database with error: " + error);
  }
}

module.exports = connectToDatabase;
