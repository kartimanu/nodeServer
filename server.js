const db = require('./config/dbconnect');
var bodyParser = require("body-parser");
var express = require("express");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.port || 2000;
var router = express.Router();

// app.use("/data", router);

app.get("/forms/getDailyCountUsers", function (req, res, next) {
    db.data.connect(function (err) {
        if (err) console.log(err);
        db.data.query("SELECT * FROM wsodk_dailycount_apr_18_results", function (err, result, fields) {
            if (err) console.log(err);//throw err;
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": result
            }));
            savedata(result);
        });
    });
});

app.get("/getDailyCountUsers", function(req,res,next){
    db.con2.connect(function(err){
        if (err) console.log(err);
        db.data.query("SELECT * FROM odk.daily_count", function (err, result, fields) {
            if (err) console.log(err);//throw err;
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": result
            }));
        });
    });
});

function savedata(res) {
    res.forEach(data => {

        console.log(data['details:dc_date']);
    });
}



app.listen(port, () => console.log("Server running on port %d", port));