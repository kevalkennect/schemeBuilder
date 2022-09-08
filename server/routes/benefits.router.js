const express = require("express");
const benefitRoute = express.Router();
const { schemes } = require("../models/schemeSet");
const db = require("../db.js");
const { ObjectId } = require("mongodb");

benefitRoute.get("/", (req, res) => {
  // > db.findByIdDemo.find({"_id" :ObjectId("5e07158c25ddae1f53b621fd")});\
  try {
    console.log(req.query.id);
    db.getDb()
      .db("schemebuilder")
      .collection("benefits")
      .findOne({ _id: ObjectId(req.query.id) })
      .then((data) => {
        console.log(data);
        res.status(200).json({ data, status: "ok" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "An error occurred." });
      });
  } catch (e) {
    console.log(e);
  }
  // res.send("mast");
});

benefitRoute.post("/", (req, res) => {
  try {
    if (req.body) {
      try {
        const { schemeName, benefitObj } = req.body;
        const { name, displayName, type, unit, value, _id } = benefitObj;
        db.getDb()
          .db("schemebuilder")
          .collection("benefits")
          .updateOne(
            { _id: ObjectId(_id) },
            {
              $push: {
                benefits: { schemeName, name, displayName, type, unit, value },
              },
            }
          )
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

benefitRoute.delete("/", (req, res) => {
  try {
    console.log(req.body);
    const { benefit, id } = req.body;
    console.log("from the beckand deleet benefit", benefit, id);
    db.getDb()
      .db("schemebuilder")
      .collection("benefits")
      .updateOne(
        { _id: ObjectId(id) },
        { $pull: { benefits: { name: benefit.name } } },
        false,
        true
      )
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "Benefit Deleted",
          schemeId: result.insertedId,
          status: "ok",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "An error occurred." });
      });
  } catch (error) {
    res.status(400).statusMessage("ERROR");
  }
});

benefitRoute.post("/", (req, res) => {
  console.log(req);
});
module.exports = benefitRoute;
