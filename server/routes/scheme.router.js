const express = require("express");
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
        schemeId: insertedId
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
    const { pillarObj } = req.body;
    const { name, displayName, slabs, schemeId } = pillarObj

    const { acknowledged } = await db.getDb().db("schemebuilder").collection("pillars").insertOne({
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

//slab updating
schemeRouter.post("/slab", async (req, res) => {
  try {
    const { input_value, slab_id, pillar, pid } = req.body;
    let thedb = db.getDb().db("schemebuilder").collection("pillars")
    const { acknowledged } = await thedb
      .updateOne(
        { _id: ObjectId(pid), name: pillar, "slabs.id": slab_id },
        {
          $set: { "slabs.$.value": input_value }
        })
    if (acknowledged) {
      res.status(200).json({
        message: "Slab Updated",
        status: "ok",
      });
    }
  } catch (error) {
    res.status(400).statusMessage("ERROR");
  }
});

//deleting Pillar
schemeRouter.delete("/pillar", async (req, res) => {
  try {
    const { _id } = req.body;
    let thedb = db.getDb().db("schemebuilder").collection("pillars")
    const { acknowledged } = await thedb.deleteOne({ _id: ObjectId(_id) })
    if (acknowledged) {
      res.status(200).json({
        message: "Pillar Deleted",
        status: "ok",
      });
    }
  } catch (error) {
    res.status(400).statusMessage("ERROR");
  }
});


module.exports = schemeRouter;
