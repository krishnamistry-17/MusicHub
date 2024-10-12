const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });
require("./db/conn");
// const Music1 = require("./model/userSchema");
app.use(express.json());
//link the router file to make the route
app.use(require("./router/auth"));

const PORT = process.env.PORT;

// Middleware
const middleware = (req, res, next) => {
  console.log("Hello middleware");
  next();
};

app.use(middleware); // Apply middleware to all routes

app.get("/", (req, res) => {
  res.send("Hello world from the server");
});

app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});

// dotenv-you can have a dedicated file where you store all your environment variables, and then they get automatically loaded into the runtime environment.
//username mistrykrishna18282 /// password krish17103//     mongodb+srv://mongodb+srv://mistrykrishna18282:krish17103@cluster0.tl9zk.mongodb.net//
