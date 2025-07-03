// userRouter.js
import express from "express";
import { register, login } from "../controllers/authController.js";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const router = express.Router();
const client = new OAuth2Client();

// Traditional email/password routes
router.post("/register", register);
router.post("/login", login);

// Google Login Route
router.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Google payload:", payload);

    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ username: name, email, googleId });
       try {
        await user.save();  // ✅ attempt to save
        console.log("✅ Google user saved:", user);
      } catch (err) {
        console.error("❌ Error saving Google user:", err.message);  // ✅ log DB error
        return res.status(500).json({ message: "Failed to save user" });
      }
    }

    res.status(200).json({ message: "Google login successful" });

  } catch (err) {
    console.error("Google login error:", err.message);
    res.status(401).json({ message: "Invalid Google token" });
  }
});

export default router;
