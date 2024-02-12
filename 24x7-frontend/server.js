const express = require("express");
const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/sports.html", (req, res) => {
  res.sendFile(__dirname + "/public/sports.html");
});

app.get("/contact.html", (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
});

app.get("/aboutUs.html", (req, res) => {
  res.sendFile(__dirname + "/public/aboutUs.html");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Client Side Running on port ${PORT}`);
});
