import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import imageDonwloader from "image-downloader";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import multer from "multer";

import UserModel from "./models/User.js";
import PlaceModel from "./models/Place.js";
import BookingModel from "./models/Booking.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "jsdksvsjdvf45sdfsdk6sdf";

// mongodb connection with mongoose
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));

const getUserFromToken = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
};

// test server endpoint
app.get("/", (req, res) => {
  res.json("test ok");
});

// user register endpoint
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

// user login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const passOk = bcrypt.compareSync(password, user.password);
      if (passOk) {
        jwt.sign(
          { email: user.email, id: user._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(user);
          }
        );
      } else {
        res.status(422).json("Incorrect password");
      }
    } else {
      res.json("not found");
    }
  } catch (err) {
    res.status(422).json(err);
  }
});

// user profile endpoint
app.get("/profile", async (req, res) => {
  const user = await getUserFromToken(req);
  try {
    const { name, email, _id } = await UserModel.findById(user.id);
    res.json({ name, email, _id });
  } catch (err) {
    res.status(422).json(err);
  }
});

// user logout endpoint
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// photo upload by link endpoint
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const filename = Date.now() + ".jpg";
  await imageDonwloader.image({
    url: link,
    dest: __dirname + "/uploads/" + filename,
  });
  res.json(filename);
});

// photos upload endpoint
const photoMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    const file = newPath.replace("uploads\\", "");
    uploadedFiles.push(file);
  }
  res.json(uploadedFiles);
});

// add an accommodation place endpoint
app.post("/place", async (req, res) => {
  const user = await getUserFromToken(req);
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  try {
    const place = await PlaceModel.create({
      owner: user.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(place);
  } catch (err) {
    res.status(422).json(err);
  }
});

// add an accommodation place endpoint
app.put("/place/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUserFromToken(req);
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  try {
    const place = await PlaceModel.findById(id);
    if (user.id === place.owner.toString()) {
      place.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await place.save();
      res.json(place);
    }
  } catch (err) {
    res.status(422).json(err);
  }
});

// fetch accommodation places endpoint
app.get("/user-places", async (req, res) => {
  const user = await getUserFromToken(req);
  try {
    res.json(await PlaceModel.find({ owner: user.id }));
  } catch (err) {
    res.status(422).json(err);
  }
});

// fetch an accommodation place endpoint
app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await PlaceModel.findById(id));
});

// fetch all places for index
app.get("/places", async (req, res) => {
  res.json(await PlaceModel.find());
});

// booking create
app.post("/booking", async (req, res) => {
  const user = await getUserFromToken(req);
  const { place, checkIn, checkOut, numberOfGuests, price } = req.body;
  try {
    const booking = await BookingModel.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      price,
      owner: user.id,
    });
    res.json(booking);
  } catch (err) {
    res.status(422).json(err);
  }
});

// bookings fetch
app.get("/bookings", async (req, res) => {
  const user = await getUserFromToken(req);
  res.json(await BookingModel.find({ owner: user.id }).populate("place"));
});

app.listen(5000, () => console.log("Server is running on port 5000"));
