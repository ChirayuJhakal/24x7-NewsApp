const express = require("express");
const dotenv = require('dotenv')
const {
  checkUser,
  addUser,
  allData,
  latestNews,
  deleteOne,
  newUser,
  latestSportsNews,
} = require("./db");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

dotenv.config();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

async function middleware(req, res, nex) {
  let token = req.cookies.token;
  const user = jwt.verify(token, process.env.secret_key, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      nex();
    }
  });
}

app.get("/", (req, res) => {
  res.render("./auth");
});

app.post("/contact", (req, res) => {
  res.redirect("/contact");
});

app.post("/check", urlencodedParser, async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (await checkUser(email, password)) {
    const tkn = jwt.sign({ user: email }, process.env.secret_key);
    res.cookie("token", tkn, { httpOnly: true });
    console.log(res.cookie);
    res.redirect("./addnews");
  } else res.send("ERROR");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const status = await newUser(email, password);
  if (status == null) res.send("already here");
  const t = jwt.sign({ user: email }, process.env.secret_key);
  res.cookie("token", t, { httpOnly: true });
  console.log(res.cookie);
  res.redirect("./addnews");
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

app.get("/addnews", middleware, (req, res) => {
  res.render("./addnews");
});

app.get("/newslist", middleware, async (req, res) => {
  const data = await allData();
  res.render("./newslist", { maindata: data });
});

app.post("/add", middleware, urlencodedParser, async (req, res) => {
  var newUser = {
    title: req.body.Title,
    Description: req.body.Description,
    url: req.body.url,
    urlToImage: req.body.urlToImage,
    published: req.body.published === "" ? Date.now() : req.body.published,
    sports: req.body.sports,
  };
  await addUser(newUser);
  // console.log(newUser);
  res.redirect("/addnews");
});

app.post("/delete", middleware, async (req, res) => {
  await deleteOne(req.body.delete);
  res.redirect("./newslist");
});

app.get("/getNews", async (req, res) => {
  const data = await latestNews();
  res.json(data);
});

app.get("/getSportsNews", async (req, res) => {
  const data = await latestSportsNews();
  res.json(data);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("working on localhost:3000");
});
