import express from "express";
import mongoose from "mongoose";
import profileModal from "./schema.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 } from "cloudinary";

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "linkedin",
  },
});
const uploader = multer({ storage: cloudinaryStorage });
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await profileModal.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const user = await profileModal
      .findById(req.params.id)
      .populate("experiences");
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id/experiences", async (req, res, next) => {
  try {
    const user = await profileModal
      .findById(req.params.id)
      .populate("experiences");
    if (user) {
      res.send(user.experiences);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id/experience/:exId", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const modifiedUsers = await profileModal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    res.send(modifiedUsers);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newUser = new profileModal(req.body);
    const { _id } = await newUser.save();
    res.status(201).send(_id);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.post(
  "/:id/picture",
  uploader.single("image"),
  async (req, res, next) => {
    try {
      const image = { image: req.file.path };
      const modifiedUser = await profileModal.findByIdAndUpdate(
        req.params.id,
        image,
        {
          runValidators: true,
          new: true,
        }
      );
      console.log(modifiedUser);
      res.send({ cloudinaryURL: req.file.path });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/:id/experience", async (req, res, next) => {
  try {
    const experienceToInsert = new experienceModal(req.body);
    const { _id } = await experienceToInsert.save();
    // console.log(experienceToInsert);
    const user = await profileModal.findByIdAndUpdate(
      req.params.id,
      { $push: { experience: experienceToInsert } },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await profileModal.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
