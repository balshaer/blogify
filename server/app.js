const express = require("express");
const connectToDatabase = require("./config/connectToDatabase");
require("dotenv").config();
connectToDatabase();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;
const { notFound, errorHandler } = require("./middlewares/error");

app.use("/api/auth", require("./routes/auth/authRoute"));
app.use("/api/auth", require("./routes/auth/authRoute"));

app.use("/api/users", require("./routes/users/usersRoute"));

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(
    `server is running in ( ${process.env.NODE_ENV} ) mode on port => ${PORT} `
  );
});
