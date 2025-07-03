import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Function to create JWT
const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register Controller
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Password strength check
    if (password.length < 6 || !/\d|[^a-zA-Z0-9]/.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters and include a number or special character",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Save user
    const user = new User({ username, email, password });
    await user.save();

    // Return token
    const token = createToken(user);
    res.status(201).json({ user: { id: user._id, username, email }, token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Return token
    const token = createToken(user);
    res.json({ user: { id: user._id, username: user.username, email }, token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
