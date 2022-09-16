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

  const { id } = req.body
  console.log(id)
  //transection
  //TODO: pending work
  const transactionOptions = {
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' },
    readPreference: 'primary'
  };

  const session = await db.getDb().startSession();

  try {
    // session.startTransaction(transactionOptions)
    // console.log(session)

    await session.withTransaction(
      async (session) => { /* your transaction here */

        await db.getDb().db("schemebuilder").collection("pillars").deleteOne({
          schemeId: id
        })
        await db.getDb().db("schemebuilder").collection("benefits").deleteOne({
          schemeId: id
        })
        await db.getDb().db("schemebuilder").collection("schemes").deleteOne({
          _id: ObjectId(id)
        })
      },
      transactionOptions);
    console.log('Transaction successfully committed.', result);
    res.status(200).json({
      message: "Deleted all",
      status: "ok",
    });
    // await session.commitTransaction();

  } catch (error) {
    console.log(error);
    // if (error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')) {
    //   // add your logic to retry or handle the error
    // }
    // else if (error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')) {
    //   // add your logic to retry or handle the error
    // } else {
    //   console.log('An error occured in the transaction, performing a data rollback:' + error);
    //   res.json({
    //     ok: false,
    //     message: "An error occured in the transaction, performing a data rollback"
    //   })
    // }
    // await session.abortTransaction();


  } finally {
    await session.endSession();
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
