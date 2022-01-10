const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send(" Welcome to my graphql application ...");
});

app.listen(8000, () => {
  console.log("The app is connected to the database and  is running . . .");
});
