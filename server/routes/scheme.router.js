const express = require("express");
const { schemes } = require("../models/schemeSet");
const db = require("../db.js");
const { ObjectId } = require("mongodb");
const schemeRouter = express.Router();


//add new scheme
schemeRouter.post("/", async (req, res) => {
  try {
    const { acknowledged, insertedId } = await db.getDb().db("schemebuilder").collection("schemes").insertOne(req.body)
    if (acknowledged) {
      res.status(200).json({
        message: "schemes added",
        status: "ok",
      });
    }
  } catch (error) {
    console.log(error)
    res.status(400)
  }
});


// add new pillar
schemeRouter.post("/pillar", async (req, res) => {
  try {
    const { schemeName, pillarObj } = req.body;
    const { name, displayName, slabs, schemeId } = pillarObj

    const { acknowledged, insertedId } = await db.getDb().db("schemebuilder").collection("pillars").insertOne({
      name, displayName, slabs, schemeId
    })

    if (acknowledged) {
      res.status(200).json({
        message: "Pillar added",
        status: "ok",
      });
    }
  } catch (error) {
    res.status(400).statusMessage(error);
  }
});


//update slabs
//pending (broken)
schemeRouter.post("/slab", async (req, res) => {
  try {

    const { SchemeName, input_value, slab_id, pillar, id } = req.body;
    console.log(SchemeName, input_value, slab_id, pillar, id)
    let thedb = db.getDb().db("schemebuilder").collection("pillars")

    const result = await thedb.updateOne({ schemeId: id, name: pillar, "slabs.id": slab_id }, { $set: { "slabs.$.value": input_value } })
    console.log(result)


  } catch (error) {
    res.status(400).statusMessage("ERROR");
  }
});


schemeRouter.delete("/pillar", (req, res) => {
  try {
    if (req.body) {
      try {
        const { pillarName, id } = req.body;
        console.log(pillarName, id);

        // const result = await pizza.updateOne(query, updateDocument);
        // console.log(pillarName, schemeId);
        db.getDb()
          .db("schemebuilder")
          .collection("schemes")
          .updateOne(
            { _id: ObjectId(id) },
            { $pull: { pillars: { name: pillarName } } },
            false,
            true
          )
          .then((result) => {
            console.log(result);
            res.status(200).json({
              message: "Pillar Deleted",
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

schemeRouter.get("/", (req, res) => {
  res.json(schemes);
});

module.exports = schemeRouter;
