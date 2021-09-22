const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Make server listen to requests on port 3001
app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
