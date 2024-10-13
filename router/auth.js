const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("../db/conn");
const Music1 = require("../model/userSchema");

// Welcome Route
router.get("/", (req, res) => {
  res.send("Hello world from the server router");
});

// Registration Route
router.post("/signup", (req, res) => {
  console.log(req.body); // Log incoming request body

  const { fullName, email, password, passwordConfirm } = req.body;

  if (!fullName || !email || !password || !passwordConfirm) {
    return res
      .status(422)
      .json({ error: "Please fill in all fields properly." });
  }

  Music1.findOne({ email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "Email already exists." });
      } else if (password !== passwordConfirm) {
        return res.status(422).json({ error: "Passwords do not match." });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const music = new Music1({
        fullName,
        email,
        password: hashedPassword,
        // Don't save passwordConfirm to the database
      });

      return music.save();
    })
    .then(() => {
      res.status(201).json({ message: "User registered successfully." });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to register." });
    });
});

// Sign-In Route
router.post("/login", async (req, res) => {
  console.log(req.body); // Log the incoming request body

  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all fields." });
    }

    const userLogin = await Music1.findOne({ email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials." });
      }

      // Generate the token here
      token = await userLogin.genrateAuthToken(); // Ensure this method exists
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      return res.json({ message: "User signed in successfully.", token });
    } else {
      return res.status(400).json({ error: "Invalid credentials." });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
