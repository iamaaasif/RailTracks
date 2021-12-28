const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author_username: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: "no-img.jpg",
    },
  },
  {
    timestamps: true,
  }
);
const Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog;
