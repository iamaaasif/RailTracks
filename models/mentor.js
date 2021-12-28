const mongoose = require("mongoose");

const mentorSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    about: {
      type: String,
      default: "Welcome to my Profile.",
    },
    skills: {
      type: [String],
      default: ["A", "B", "C"],
    },
    emp_company: {
      type: String,
      default: "Eastern University",
    },
    emp_role: {
      type: String,
      default: "Student",
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },

    facebook: {
      type: String,
    },
    twitter: {
      type: String,
      default: "#",
    },
    linkedin: {
      type: String,
      default: "#",
    },

    isAvailable: {
      type: Boolean,
      default: false,
    },
    callsPerMonth: {
      type: Number,
      default: 12,
    },
    maximunResponseTime: {
      type: Number,
      default: 12,
    },
  },
  {
    timestamps: true,
  }
);
const Mentor = new mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
