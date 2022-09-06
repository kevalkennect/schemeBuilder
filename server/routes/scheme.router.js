const express = require("express");
const { Transform } = require("stream");
const { schemes } = require("../models/schemeSet");
const schemeSet = require("../models/schemeSet");
const db = require("../db.js");
const schemeRouter = express.Router();

const crypto = require("crypto");
const { ObjectId } = require("mongodb");

const key = "uOvNQtuuQSuGohRSnrBiSqKF3ekrwL2E";
const iv = "bz9Zu4absXF4abk8";
const cipher = crypto.createCipheriv("aes256", key, iv);

const encrypted = new Transform({
  transform(chunk, encoding, callback) {
    const encryptedMessage =
      cipher.update(chunk, "utf8", "hex") + cipher.final("hex");
    this.push(encryptedMessage);
    callback();
  },
});

// schemeRouter.get("/", (req, res) => {
//   res.
// });

schemeRouter.post("/", (req, res) => {
  try {
    if (req.body) {
      try {
        db.getDb()
          .db("schemebuilder")
          .collection("schemes")
          .insertOne(req.body)
          .then((result) => {
            console.log(result);
            res.status(200).json({
              message: "Product added",
              schemeId: result.insertedId,
              status: "ok",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "An error occurred." });
          });
        // schemes.push(req.body);
        // res.status(200).json({ status: "ok" });
      } catch (error) {
        res.send(error);
      }
    }
  } catch (error) {
    res.status(400).statusMessage("ERROR");
  }
});
schemeRouter.post("/slab", (req, res) => {
  try {
    if (req.body) {
      try {
        const { SchemeName, input_value, slab_id, pillar } = req.body;
        console.log(typeof SchemeName);
        db.getDb()
          .db("schemebuilder")
          .collection("schemes")
          .updateOne(
            {
              name: SchemeName,
              "pillars.name": pillar,
              "pillars.slabs.id": slab_id,
              // "pillars.name.slabs.id": slab_id,
            },
            {
              $set: { "pillars.slabs.id": input_value },
            }
          )
          .then((result) => {
            console.log(result);
            // res.send(result);
            // res.status(200).json({
            //   message: "Pillar added",
            //   schemeId: result.insertedId,
            //   status: "ok",
            // });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "An error occurred." });
          });

        // schemes.forEach((sch, i) => {
        //   if (sch.name == SchemeName) {
        //     sch.pillars.forEach((p, p_i) => {
        //       if (p.name == pillar) {
        //         p.slabs.forEach((s, s_i) => {
        //           if (s.id == slab_id) {
        //             schemes[i].pillars[p_i].slabs[s_i].value = +input_value;
        //           }
        //         });
        //       }
        //     });
        //   }
        // });
        // res.status(200).json({ status: "ok" });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    res.status(400).statusMessage("ERROR");
  }
});

// add pillar
schemeRouter.post("/pillar", (req, res) => {
  try {
    if (req.body) {
      try {
        const { schemeName, pillarObj } = req.body;
        console.log(schemeName, pillarObj);

        db.getDb()
          .db("schemebuilder")
          .collection("schemes")
          .updateOne(
            { name: schemeName },
            {
              $push: {
                pillars: pillarObj,
              },
            }
          )
          .then((result) => {
            console.log(result);
            res.status(200).json({
              message: "Pillar added",
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
