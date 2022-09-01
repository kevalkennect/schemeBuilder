const mclient = require("mongodb").MongoClient;
const dburl = "mongodb://127.0.0.1:27017";

module.exports.connect = function connect(callback) {
  mclient.connect(dburl, function (err, conn) {
    /* exports the connection */
    module.exports.db = conn;
    callback(err);
  });
};
