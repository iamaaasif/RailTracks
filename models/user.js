const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: String,
      default: "no-img.jpg",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "verified", "inactive"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
const User = new mongoose.model("User", userSchema);

module.exports = User;
