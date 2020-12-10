const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");

//! CORS
app.use(cors());

//! JSON
app.use(express.json());

//! FRIENDS SCHEMA
const FriendModel = require("./models/Friends");

//! DATABASE CONNECTION
mongoose.connect(
  "mongodb://localhost:27017/friendsdb?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useNewUrlParser: true }
);

//! POST
app.post("/insert", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const description = req.body.description;

  const friend = new FriendModel({
    name: name,
    age: age,
    description: description,
  });

  try {
    await friend.save();
    console.log("Inserted new friend");
  } catch (err) {
    console.log(err);
  }
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
