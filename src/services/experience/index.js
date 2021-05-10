import express from "express";

import ExperienceModel from "./schema.js";

const experiencesRouter = express.Router();

experiencesRouter.get("/", async (req, res, next) => {
  try {
    const exs = await ExperienceModel.find();
    res.send(exs);
  } catch (error) {
    next(error);
  }
});

experiencesRouter.get("/:exId", async (req, res, next) => {
  try {
    const id = req.params.exId;
    const ex = await ExperienceModel.findById(id);
    if (ex) {
      res.send(ex);
    } else {
      res.send("not found");
    }
  } catch (error) {
    console.log(error);
    next("While reading exs list a problem occurred!");
  }
});

experiencesRouter.post("/", async (req, res, next) => {
  try {
    const newExperience = new ExperienceModel(req.body);
    const { _id } = await newExperience.save();

    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});

experiencesRouter.put("/:exId", async (req, res, next) => {
  try {
    const ex = await ExperienceModel.findByIdAndUpdate(
      req.params.exId,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (ex) {
      res.send(ex);
    } else {
      res.send("opps");
    }
  } catch (error) {
    next(error);
  }
});

experiencesRouter.delete("/:exId", async (req, res, next) => {
  try {
    const ex = await ExperienceModel.findByIdAndDelete(req.params.exId);
    if (ex) {
      res.send("Deleted");
    } else {
      res.send("something went wrong");
    }
  } catch (error) {
    next(error);
  }
});

export default experiencesRouter;
