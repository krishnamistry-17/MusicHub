const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello world from the server router");
});

router.post("/register", (req, res) => {
  console.log(req.body.name);
  // res.json({ message: req.body });
  // res.send("Register page");
});
module.exports = router;
