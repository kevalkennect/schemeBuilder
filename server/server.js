const express = require("express");
const scheme = require("./models/schemeSet");
const mongo = require("./db");
const app = express();
const PORT = 3001;
const cors = require("cors");
const db = require("./db");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencode

const schemeRouter = require("./routes/scheme.router");
const kpiRouter = require("./routes/kpi.router");
const benefitsRouter = require("./routes/benefits.router");
const { displayName } = require("./models/schemeSet");
const { ObjectId } = require("mongodb");

app.use(cors());
app.use("/api/schemes", schemeRouter);
app.use("/api/kpi", kpiRouter);
app.use("/api/benefits", benefitsRouter);

app.get("/", async (req, res) => {
  //agreeration here  
  try {
    const result = await db.getDb().db("schemebuilder").collection("schemes").aggregate(
      [
        {
          $project: {
            _id: {
              "$toString": "$_id"
            },
            displayName: 1,
            name: 1
          }
        },
        {
          $lookup: {
            from: "pillars",
            localField: "_id",
            foreignField: "schemeId",
            as: "pillars"
          }
        },
        {
          $lookup: {
            from: "benefits",
            localField: "_id",
            foreignField: "schemeId",
            as: "benefits"
          }
        }
      ]
    ).toArray()
    if (result) {
      // res.json(result)
      res.status(200).json({
        message: "Pillar added",
        status: "ok",
        result
      });
    } else {
      res.send(400)
    }
  } catch (error) {
    res.status(400).statusMessage(error);
  }
});




app.delete("/", async (req, res) => {

  try {
    const { id } = req.body

    console.log(id)


    const { acknowledged } = await db.getDb().db("schemebuilder").collection("schemes").deleteOne({
      _id: ObjectId(id)
    })
    const { acknowledged: isTrue } = await db.getDb().db("schemebuilder").collection("pillars").deleteOne({
      schemeId: ObjectId(id)
    })
    const { acknowledged: final } = await db.getDb().db("schemebuilder").collection("benefits").deleteOne({
      schemeId: ObjectId(id)
    })



    if (acknowledged && isTrue && final) {
      res.status(200).json({
        message: "Documents Deleted",
        status: "ok",
      });
    }

  } catch (error) {
    console.log(error)
    res.status(400).statusMessage(error);
  }

})
db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log("listing on", PORT);
    });
  }
});
// scheme (/api/scheme) --> GET, POST,DELETE,PUT
// schemes(/api/schems) -->GET all the schemes

// benefit ""
// get all benefit

// KPI ""
// get all KPI's
