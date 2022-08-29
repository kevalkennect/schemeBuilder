const express = require("express");
const { Transform } = require("stream");
const { schemes } = require("../models/schemeSet");
const schemeSet = require("../models/schemeSet");

const schemeRouter = express.Router();

const crypto = require("crypto");

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
        schemes.push(req.body);
        res.status(200).json({ status: "ok" });
      } catch (error) {
        res.status(401).json({ status: error });
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
        schemes.forEach((sch, i) => {
          if (sch.name == SchemeName) {
            sch.pillars.forEach((p, p_i) => {
              if (p.name == pillar) {
                p.slabs.forEach((s, s_i) => {
                  if (s.id == slab_id) {
                    schemes[i].pillars[p_i].slabs[s_i].value = +input_value;
                  }
                });
              }
            });
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

// add pillar

schemeRouter.post("/pillar", (req, res) => {
  try {
    if (req.body) {
      try {
        const { schemeName, pillarObj } = req.body;
        console.log(schemeName, pillarObj);
        schemes.forEach((sche, i) => {
          if (sche.name == schemeName) {
            schemes[i].pillars.push(pillarObj);
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

schemeRouter.get("/", (req, res) => {
  res.json(schemes);
});

module.exports = schemeRouter;
