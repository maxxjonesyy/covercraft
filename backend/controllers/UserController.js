const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

class Verify {
  static checkName(name) {
    if (validator.isLength(name, { min: 1, max: 15 })) {
      return true;
    } else {
      return res
        .status(400)
        .json({ error: "Name must be between 1 and 15 characters" });
    }
  }

  static checkEmail(email) {
    if (validator.isEmail(email)) {
      return true;
    } else {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address" });
    }
  }

  static checkPassword(password) {
    if (validator.isStrongPassword(password)) {
      return true;
    } else {
      return res.status(400).json({ error: "Password is not strong enough" });
    }
  }
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    Verify.checkName(name);
    Verify.checkEmail(email);
    Verify.checkPassword(password);

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

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      data: {
        name: user.name,
        email: user.email,
        tokenCount: user.tokenCount,
        totalCoverLetters: user.totalCoverLetters,
        token: token,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
}

async function updateProfile(req, res) {
  const { fieldToUpdate, currentEmail } = req.body;
  const { name, email, currentPassword, newPassword } = req.body;

  function updatedUser(user) {
    return {
      name: user.name,
      email: user.email,
    };
  }

  try {
    const user = await User.findOne({ email: currentEmail });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (fieldToUpdate === "name" && name && Verify.checkName(name)) {
      user.name = name;
      await user.save();
      return res.status(200).json({ data: updatedUser(user) });
    }

    if (fieldToUpdate === "email" && email && Verify.checkEmail(email)) {
      user.email = email;
      await user.save();
      return res.status(200).json({ data: updatedUser(user) });
    }

    if (
      fieldToUpdate === "password" &&
      newPassword &&
      Verify.checkPassword(newPassword)
    ) {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!passwordMatch) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      return res.status(200).json({ data: updatedUser(user) });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "An error occurred while updating profile" });
  }
}

async function addTokensToUser(email, tokensToAdd) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("addTokensToUser: User not found");
      return false;
    }

    if (!tokensToAdd) {
      console.log("addTokensToUser: no tokens found");
      return false;
    }

    user.tokenCount = Number(user.tokenCount) + tokensToAdd;
    await user.save();

    return true;
  } catch (error) {
    console.error("Error adding tokens to user:", error);
    return false;
  }
}

async function getTokens(email) {
  try {
    const user = await User.findOne({ email });

    return Number(user.tokenCount);
  } catch (error) {
    console.error("Error getting tokens:", error);
  }
}

module.exports = {
  register,
  login,
  updateProfile,
  addTokensToUser,
  getTokens,
};
