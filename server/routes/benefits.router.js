const express = require("express");
const benefitRoute = express.Router();

benefitRoute.get("/", (req, res) => {
  res.send("BENEFITS");
});
module.exports = benefitRoute;
