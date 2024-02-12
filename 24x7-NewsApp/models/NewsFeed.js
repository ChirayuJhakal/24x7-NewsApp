const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const newsFeedSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  urlToImage: {
    type: String,
    required: true,
  },
  published: {
    type: Date,
    default: Date.now
  },
  sports: {
    type: Boolean,
    default: false
  },
});

module.exports = NewsFeed = mongoose.model("NewsFeed", newsFeedSchema);
