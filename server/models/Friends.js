const mongoose = require("mongoose");

//! How will the the SCHEMA / DATABASE be:
const FriendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});
//! friends is the collection in our "friendsdb", friendSchema is the structure
//! FriendModel is the one that we are going to use it
const FriendModel = mongoose.model("friends", FriendSchema);

module.exports = FriendModel;
