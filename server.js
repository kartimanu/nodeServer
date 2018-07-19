const db = require('./config/dbconnect');
var bodyParser = require("body-parser");
var express = require("express");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.port || 2000;
var router = express.Router();

app.use("/api/users", router);

router.get("/", function (req, res, next) {
  db.data.connect(function (err) {
      if (err) console.log(err);
      db.data.query("SELECT * FROM localuser", function (err, result, fields) {
          if (err) console.log(err);//throw err;
          res.send(JSON.stringify({
              "status": 200,
              "error": null,
              "response": result
          }));
      });
  });
});

app.listen(port, () => console.log("Server running on port %d", port));