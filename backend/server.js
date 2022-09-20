const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const db = require("./db");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencode

const schemeRouter = require("./routes/scheme.router");
const kpiRouter = require("./routes/kpi.router");
const benefitsRouter = require("./routes/benefits.router");
const { ObjectId, MongoError } = require("mongodb");

app.use(cors());
app.use("/api/schemes", schemeRouter);
app.use("/api/kpi", kpiRouter);
app.use("/api/benefits", benefitsRouter);

app.get("/", async (req, res) => {
  //agreeration here
  try {
    const result = await db
      .getDb()
      .db("schemebuilder")
      .collection("schemes")
      .aggregate([
        {
          $project: {
            _id: {
              $toString: "$_id",
            },
            displayName: 1,
            name: 1,
          },
        },
        {
          $lookup: {
            from: "pillars",
            localField: "_id",
            foreignField: "schemeId",
            as: "pillars",
          },
        },
        {
          $lookup: {
            from: "benefits",
            localField: "_id",
            foreignField: "schemeId",
            as: "benefits",
          },
        },
      ])
      .toArray();
    if (result) {
      // res.json(result)
      res.status(200).json({
        status: "ok",
        result,
      });
    } else {
      res.send(400);
    }
  } catch (error) {
    res.status(400).statusMessage(error);
  }
});

app.delete("/", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  //transection
  const transactionOptions = {
    readConcern: { level: "snapshot" },
    writeConcern: { w: "majority" },
    readPreference: "primary",
  };

  const session = await db.getDb().startSession();

  try {
    await session.withTransaction(async (session) => {
      /* your transaction here */
      await db.getDb().db("schemebuilder").collection("pillars").deleteOne({
        schemeId: id,
      });
      await db.getDb().db("schemebuilder").collection("benefits").deleteOne({
        schemeId: id,
      });
      await db
        .getDb()
        .db("schemebuilder")
        .collection("schemes")
        .deleteOne({
          _id: ObjectId(id),
        });
    }, transactionOptions);
    res.status(200).json({
      message: "Deleted all",
      status: "ok",
    });
  } catch (error) {
    console.log(error);
    res.send(200).json({
      ok: false,
      message: "Somthing went wrong while deleting scheme",
    });
  } finally {
    await session.endSession();
  }
});

// app.listen(PORT, () => {
//   console.log("running");
// });

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log("listing on", PORT);
    });
  }
});
