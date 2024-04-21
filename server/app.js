const express = require("express");
const connectToDatabase = require("./config/connectToDatabase");
require("dotenv").config();

connectToDatabase();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `server is running in ( ${process.env.NODE_ENV} ) mode on port => ${PORT} `
  );
});
