const validator = require("validator");
const bcrypt = require("bcrypt");

const User = require("../models/user");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!validator.isLength(name, { min: 1, max: 15 })) {
      return res
        .status(400)
        .json({ error: "Name must be between 1 and 15 characters" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        error: "Password is not strong enough",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const newUser = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await newUser.save();
    res.status(200).json({ data: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
}
module.exports = { register };
