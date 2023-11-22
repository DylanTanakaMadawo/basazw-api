import express from "express";
import { Post } from "../Models/postModels.js";
import cors from "cors";
import bodyParser from "body-parser";

const router = express.Router();

router.use(
  cors({
    credentials: true,
    // origin: "http://localhost:3000",
    origin: "https://basazw.onrender.com/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    // optionsSuccessStatus: 200,
  })
);
// router.options("*", cors());

//Route to post
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.fee ||
      !req.body.contact ||
      !req.body.description ||
      !req.body.fee ||
      !req.body.myImage
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: location, contact, description, fee",
      });
    }

    const newPost = {
      location: req.body.location,
      contact: req.body.contact,
      description: req.body.description,
      fee: req.body.fee,
      myImage: req.body.myImage,
      author: req.body.author,
      myTime: req.body.myTime,
    };

    const post = await Post.create(newPost);

    return res.status(201).send(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//Route to get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});

    return res.status(200).json({
      count: posts.length,
      data: posts,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//Route to get One posts
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    return res.status(200).json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//Route to Update a post
router.put("/:id", async (req, res) => {
  try {
    if (true) {
      return res.status(400).send({
        message:
          "Send All Required fields: location, contact, description, fee",
      });
    }

    const { id } = req.params;

    const result = await Post.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).send({ message: "Job updated successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//Route to delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Post.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ mesage: "Job not found" });
    }
    return res.status(200).send({ message: "Job deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;
