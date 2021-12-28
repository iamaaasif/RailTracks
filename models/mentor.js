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
    },
    skills: {
      type: [String],
    },
    emp_company: {
      type: String,
    },
    emp_role: {
      type: String,
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
    },
    linkedin: {
      type: String,
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
