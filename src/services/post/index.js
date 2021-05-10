import { Router } from "express";
import PostModel from "./schema.js";
import q2m from "query-to-mongo";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {cloudinary } from "cloudinary";
import multer from "multer";
const router = Router();

// Clouddniary storage

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "strive",
  },
});

// image upload things

const uploader = multer({ storage: cloudinaryStorage });
console.log(uploader);

// router.post("/upload", uploader.single("cover"), async (req, res, next) => {
//   try {
//     const newPic = req.file.path;

//     const photoModel = new UploadModel();
//     photoModel.imgURL = newPic;
//     console.log(newPic);
//     await photoModel.save();
//     res.send(req.file.path);
//   } catch (error) {
//     next(error);
//   }
// });

// getting all posts

router.get("/", async (req, res) => {
  try {
    const response = req.body;
    console.log(response);
    const post = await PostModel.find().populate("user", "firstName");
    res.send(post);
  } catch (error) {
    console.log(error);
  }
});

// getting single post

router.get("/:postId", async (req, res) => {
  try {
    const response = req.body;
    console.log(response);
    const post = await PostModel.findById(req.params.postId).populate(
      "user",
      "firstName"
    );
    const withUser = post.populate("user", "firstName");
    res.send(post);
  } catch (error) {
    console.log(error);
  }
});

//  posting from a specific user

router.post("/:userId", uploader.single("photo"), async (req, res) => {
  try {
    const newPic = req.file.path;
    const post = new PostModel({ ...req.body, user: req.params.userId });
    post.photo = newPic;
    console.log(post);
    const result = await post.save();

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// updating from a single user

router.put("/:postId", async (req, res, next) => {
  try {
    const modifiedPost = await PostModel.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { runValidators: true, new: true }
    );
    if (modifiedPost) {
      res.send(modifiedPost);
    }
  } catch (error) {
    console.log(error);
  }
});

// deleting post

router.delete("/delete/:postId", async (req, res) => {
  try {
    const deletedPost = await PostModel.findByIdAndDelete(req.params.postId);
    res.send("Post deleted!");
  } catch (error) {
    console.log(error);
  }
});

// post image upload

export default router;
