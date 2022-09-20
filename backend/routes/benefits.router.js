const express = require("express");
const benefitRoute = express.Router();
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


//add benefit
benefitRoute.post("/", async (req, res) => {
  try {
    // const { name, displayName, type, unit, value, schemeId, schemeName } = req.body;
    let thedb = db.getDb().db("schemebuilder").collection("benefits")
    const { acknowledged } = await thedb.insertOne(req.body)
    if (acknowledged) {
      res.status(200).json({
        message: "Benefit Added",
        status: "ok",
      });
    }
  } catch (error) {
    res.status(400).statusMessage("ERROR");
  }
});

benefitRoute.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id)
    let thedb = db.getDb().db("schemebuilder").collection("benefits")
    const { acknowledged } = await thedb.deleteOne({
      _id: ObjectId(id)
    })
    if (acknowledged) {
      res.status(200).json({
        message: "Benefit Deleted",
        status: "ok",
      });
    }

  } catch (error) {
    res.status(400).statusMessage("ERROR");
  }
});

benefitRoute.post("/", (req, res) => {
  console.log(req);
});
module.exports = benefitRoute;
