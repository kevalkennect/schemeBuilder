const express = require("express");

const kpiRoute = express.Router();

kpiRoute.get("/", (req, res) => {
  res.send("KPIs");
});

module.exports = kpiRoute;
