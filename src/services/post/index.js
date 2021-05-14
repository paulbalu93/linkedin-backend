import { Router } from "express";
import PostModel from "./schema.js";
import mongoose from "mongoose";
import q2m from "query-to-mongo";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 } from "cloudinary";
import multer from "multer";
import cloudinary from "cloudinary";
import { Result } from "express-validator";
import requireLogin from "./requireLogin.js";
const router = Router();
const Post = mongoose.model("Post");
// Clouddniary storage

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   CLOUDINARY_URL: process.env.CLOUDINARY_URL,
// });

// const cloudinaryStorage = new CloudinaryStorage({
//   cloudinary: v2,
//   params: {
//     folder: "strive",
//   },
// });

// const uploader = multer({ storage: cloudinaryStorage });
// console.log(uploader);

// getting all posts

router.get("/", requireLogin, async (req, res) => {
  try {
    const response = req.body;
    console.log(response);
    const post = await Post.find()
      .populate("postedBy", "_id email")
      .sort("-createdAt");
    res.send(post);
  } catch (error) {
    console.log(error);
  }
});

// getting single post

router.get("/:postId", requireLogin, async (req, res) => {
  try {
    const response = req.body;
    console.log(response);
    const post = await Post.findById(req.params.postId)
      .populate("postedBy", "_id email")
      .sort("-createdAt");
    res.send(post);
  } catch (error) {
    console.log(error);
  }
});

//  posting from a specific user

router.post("/:userid", async (req, res) => {
  try {
    // const newPic = req.file.path
    const post = new Post({ ...req.body, userid: req.params.userid });
    console.log(post);
    // post.photo = newPic;
    const result = await post.save();
    res.send(result);

    // console.log(post);
  } catch (error) {
    console.log(error);
  }
});

// updating from a single user

router.put("/:id", async (req, res, next) => {
  try {
    const modifiedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { runValidators: true, new: true }
    );
    if (modifiedPost) {
      res.send(modifiedPost);
    } else {
      console.log("nop");
    }
  } catch (error) {
    console.log(error);
  }
});

// deleting post

router.delete("/:postId", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    res.send("Post deleted!");
  } catch (error) {
    console.log(error);
  }
});

// post image upload

export default router;
