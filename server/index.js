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

//! UPDATE
app.put("/update", async (req, res) => {
  const newFriendName = req.body.newFriendName;
  const id = req.body.id;

  try {
    await FriendModel.findById(id, (err, updatedFriend) => {
      updatedFriend.name = newFriendName;
      updatedFriend.save();
      res.send("update");
    });
  } catch (error) {
    console.log(error);
  }
});

//! DELETE
app.delete("/delete:id", async (req, res) => {
  const id = req.params.id;

  if (err) {
    res.send(err);
  }

  try {
    await (await FriendModel.findByIdAndRemove(id)).exec();
    res.send("Deleted");
  } catch (error) {
    console.log(error);
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
