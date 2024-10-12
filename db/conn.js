const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to MongoDB successful");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
