const express = require("express");
const benefitRoute = express.Router();
const { schemes } = require("../models/schemeSet");
const db = require("../db.js");

benefitRoute.get("/", (req, res) => {
  res.send("BENEFITS");
});

benefitRoute.post("/", (req, res) => {
  try {
    if (req.body) {
      try {
        const { schemeName, benefitObj } = req.body;

        db.getDb()
          .db("schemebuilder")
          .collection("benefits")
          .insertOne({ schemeName, benefitObj })
          .then((result) => {
            console.log(result);
            res.status(200).json({
              message: "benefit added",
              schemeId: result.insertedId,
              status: "ok",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "An error occurred." });
          });
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
