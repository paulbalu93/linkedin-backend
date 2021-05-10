import express from "express";
import mongoose from "mongoose";
import profileModal from "./schema.js";
import ExperienceModal from "../experience/schema.js";
import multer from "multer";

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
    const user = await profileModal.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    next(error);
  }
});
router.get("/:id/experience", async (req, res, next) => {
  try {
    const { experience } = await profileModal.findById(req.params.id, {
      experience: 1,
      _id: 0,
    });
    res.send(experience);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/experience/:exId", async (req, res, next) => {
  try {
    const { experience } = await profileModal.findOne(
      {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
      {
        experience: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.exId) },
        },
      }
    );
    res.send(experience);
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

// router.post('/:id/picture', multer().single('profilePic'), async (req, res, next) => {
// 	try {
// 		console.log(req.file);
// 		await writeStudentsPictures(req.file.originalname, req.file.buffer);
// 		res.send('ok');
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

router.delete("/:id", async (req, res, next) => {
  try {
    await profileModal.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
