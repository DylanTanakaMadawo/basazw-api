import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fee: {
    type: String,
    required: true,
  },
  myImage: {
    type: String,
  },
  myFile: {
    type: String,
  },
  author: {
    type: String,
  },
  myTime: {
    type: String,
  },
});

export const Post = mongoose.model("Post", postSchema);
