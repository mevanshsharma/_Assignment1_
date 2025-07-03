import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  // ✅ Conditionally required password
  password: {
    type: String,
    validate: {
      validator: function (value) {
        // If NOT Google login, password is required
        if (!this.googleId && (!value || value.length < 6)) {
          return false;
        }
        return true;
      },
      message: "Password is required and must be at least 6 characters unless using Google Sign-In",
    },
  },

  // ✅ Google ID field
  googleId: { type: String, required: false },
});

// ✅ Pre-save hook to hash password if it exists
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Method to compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
