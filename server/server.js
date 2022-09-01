const express = require("express");
const scheme = require("./models/schemeSet");
// const { run } = require("./db.js");
const app = express();
const PORT = 3001;
const cors = require("cors");


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencode

const schemeRouter = require("./routes/scheme.router");
const kpiRouter = require("./routes/kpi.router");
const benefitsRouter = require("./routes/benefits.router");
app.use(cors());
app.use("/api/schemes", schemeRouter);
app.use("/api/kpi", kpiRouter);
app.use("/api/benefits", benefitsRouter);

app.get("/", (req, res) => {
  res.json(scheme);
});

app.listen(PORT, () => {
  console.log("listing on", PORT);
});

// scheme (/api/scheme) --> GET, POST,DELETE,PUT
// schemes(/api/schems) -->GET all the schemes

// benefit ""
// get all benefit

// KPI ""
// get all KPI's
