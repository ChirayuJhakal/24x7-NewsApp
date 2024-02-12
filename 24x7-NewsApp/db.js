const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const NewsFeed = require("./models/NewsFeed");
dotenv.config();

const url = process.env.MONGO_URI;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Connection Error: ${err.message}`));

async function checkUser(email, password) {
  try {
    const user = await User.findOne({ email });
    return user && user.password === password;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function addUser(newUser) {
  try {
    await NewsFeed.create(newUser);
  } catch (error) {
    console.log(error);
  }
}

async function allData() {
  try {
    return await NewsFeed.find({});
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function latestNews() {
  try {
    return await NewsFeed.find({ sports: false })
      .sort({ published: -1 })
      .limit(3);
  } catch (err) {
    console.log(error);
    return null;
  }
}
async function deleteOne(id) {
  try {
    await NewsFeed.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
}

async function newUser(email, password) {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return null;
    }
    await User.create({ email, password });
    return 1;
  } catch (error) {
    console.error(error);
  }
}

async function latestSportsNews() {
  try {
    return await NewsFeed.find({ sports: true })
      .sort({ published: -1 })
      .limit(3);
  } catch (err) {
    console.log(error);
    return null;
  }
}

module.exports = {
  allData,
  addUser,
  checkUser,
  latestNews,
  deleteOne,
  newUser,
  latestSportsNews,
};
