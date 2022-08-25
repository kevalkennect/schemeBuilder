const express = require("express");
const { Transform } = require("stream");
const { schemes } = require("../models/schemeSet");

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


schemeRouter.get("/", (req, res) => {
  res.json(schemes);
});

module.exports = schemeRouter;
