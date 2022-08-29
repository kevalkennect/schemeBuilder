const express = require("express");
const benefitRoute = express.Router();
const { schemes } = require("../models/schemeSet");

benefitRoute.get("/", (req, res) => {
  res.send("BENEFITS");
});

benefitRoute.post("/", (req, res) => {
  try {
    if (req.body) {
      try {
        const { schemeName, benefitObj } = req.body;
        schemes.forEach((schme, i) => {
          if (schme.name == schemeName) {
            schemes[i].benefits.push(benefitObj);
          }
        });
        res.status(200).json({ status: "ok" });
      } catch (error) {
        res.status(401).json({ status: error });
      }
    }
  } catch (error) {
    res.status(400).statusMessage("ERROR");
  }
});

benefitRoute.post("/", (req, res) => {
  console.log(req);
});
module.exports = benefitRoute;
