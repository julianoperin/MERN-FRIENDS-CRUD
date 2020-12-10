const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");

app.use(cors());

//! FRIENDS SCHEMA
const FriendModel = require("./models/Friends");

//! DATABASE CONNECTION
mongoose.connect(
  "mongodb://localhost:27017/friendsdb?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useNewUrlParser: true }
);

//! INSERT
app.get("/insert", async (req, res) => {
  const friend = new FriendModel({
    name: "Patricia",
    age: 26,
    description: "She's AWESOME!!!",
  });
  await friend.save();
  res.send("Friend inserted!");
});

//! READ
app.get("/read", async (req, res) => {
  FriendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//! SERVER
app.listen(3001, () => {
  console.log("You are connected to PORT 3001");
});
