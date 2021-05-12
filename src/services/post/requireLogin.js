import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import profileModal from "../profile/schema.js";

const module = (req, res, next) => {
  const JWT_SECRET = "husyeinpaulhafiz";
  const { authorization } = req.headers;
  //authorization === Bearer ewefwegwrherhe
  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }

    const { _id } = payload;
    profileModal.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};

export default module;
