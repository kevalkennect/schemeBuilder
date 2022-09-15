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

app.use(cors());
app.use("/api/schemes", schemeRouter);
app.use("/api/kpi", kpiRouter);
app.use("/api/benefits", benefitsRouter);

app.get("/", async (req, res) => {

  //agreeration here  

  try {

    //   db.orders.aggregate( [
    //     {
    //       $lookup:
    //         {
    //           from: "inventory",
    //           localField: "item",
    //           foreignField: "sku",
    //           as: "inventory_docs"
    //         }
    //    }
    //  ] )

    const result = await db.getDb().db("schemebuilder").collection("schemes").aggregate(
      [{ "$project": { "userObjId": { "$toObjectId": "_id" } } },
      {
        "$lookup": {
          "from": "pillars",
          "localField": "userObjId",
          "foreignField": "schemeId",
          "as": "allPillars"
        }
      }
      ]
    )
    // const ress = await db.getDb().db("schemebuilder").collection("schemes").find().toArray()
    console.log(result)
    res.json(result)
    // db.getDb()
    //   .db("schemebuilder") 
    //   .collection("schemes")
    //   .find()
    //   .toArray()
    //   .then((data) => {
    //     console.log(data.length);
    //     res.json(data);
    //   })
    //   .catch((err) => console.log(err));
  } catch (error) {
    console.log(error)
  }
  // .then((result) => {
  //   console.log(result);
  //   res.status(200).json(result);
  // })
  // .catch((err) => {
  //   console.log(err);
  //   res.status(500).json({ message: "An error occurred." });
  // });
});

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
