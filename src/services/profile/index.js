import express from "express";
import mongoose from "mongoose";
import profileModal from "./schema.js";
import multer from "multer";

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

router.delete("/:id", async (req, res, next) => {
  try {
    await profileModal.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
export default router;
