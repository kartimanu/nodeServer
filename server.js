const db = require('./config/dbconnect');
const db_model = require('./utils/query_model');
var bodyParser = require("body-parser");
var express = require("express");
var cors = require("cors");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var port = process.env.port || 2000;
var router = express.Router();

app.get("/", function(req,res){
    res.send(
        "[ Home - Page of API's ]"
    )
});

app.get("/forms/getDailyCountUsers", function (req, res, next) {
    db.con1.connect(function (err) {
        if (err) console.log(err);
        db.con1.query(db_model.sqlquery.selectallFormDC, function (err, result, fields) {
            if (err) {
                res.send(JSON.stringify({
                    "status": 404,
                    "error": err.toString,
                    "response": "Something went wrong!"
                }));
                console.log(err);
            };//throw err;
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": result
            }));
            // savedata(result);
            
            // db.con1.end();
        });
    });
});

app.get("/getDailyCountUsers", function (req, res, next) {
    db.con2.connect(function (err) {
        if (err) console.log(err);
        db.con2.query(db_model.sqlquery.selectallDC, function (err, result, fields) {
            if (err) {
                res.send(JSON.stringify({
                    "status": 404,
                    "error": err.toString,
                    "response": "Something went wrong!"
                }));
                console.log(err);
            };//throw err;
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": result.length
            }));            
            // db.con2.end();
        });
    });
});

app.get("/getDailyCountUser/:id", function (req, res, next) {
    db.con2.connect(function (err) {
        if (err) console.log(err);
        db.con2.query(db_model.sqlquery.selectDCuser,[req.params.id], function (err, result, fields) {
            if (err) {
                res.send(JSON.stringify({
                    "status": 404,
                    "error": err.toString,
                    "response": "Something went wrong!"
                }));
                console.log(err);
            };//throw err;
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": result
            }));
            // db.con2.end();
        });
    });
});

app.get("/getallFA/:id", function (req, res, next) {
    db.con2.connect(function (err) {
        if (err) console.log(err);
        db.con2.query(db_model.sqlquery.getallFA,[req.params.id], function (err, result, fields) {
            if (err) {
                res.send(JSON.stringify({
                    "status": 404,
                    "error": err.toString,
                    "response": "Something went wrong!"
                }));
                console.log(err);
            };//throw err;
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": result
            }));
            
            // db.con2.end();
        });
    });
});


function savedata(res) {
    res.forEach(data => {  
        db.con2.connect(function (err) {
            if (err) console.log(err);
            db.con1.query(db_model.sqlquery.insertintoDC_table, db_model.datamodels.get_dcofficers(data), function (err, result, fields) {
                if (err) console.log(err);//throw err;
                console.log("INSERT PARENT");
                for (i = 1; i < 11; i++) {
                    db.con1.query(db_model.sqlquery.insertintoDC_FAusers, db_model.datamodels.get_dcusers(data, i), function (err, result, fields) {
                        if (err) console.log(err);//throw err;
                        console.log("INSERT CHILD");

                    });
                }
            });
        });
    });
}

var watcher = db.myCon.add(
    'odk.daily_count',
    function (oldRow, newRow, event) {
        //row inserted
        if (oldRow === null) {
            //insert code goes here
            console.log("NEW ROW"+oldRow);
        }

        //row deleted
        if (newRow === null) {
            //delete code goes here
            console.log("DELETE"+newRow);
        }

        //row updated
        if (oldRow !== null && newRow !== null) {
            //update code goes here
            console.log("UPDATED"+newRow);
        }

        //detailed event information
        console.log(event)
    },
    'Active'
);

// var event1 = db.myCon.add(
//     'dbName.tableName.fieldName.value',
//     function (oldRow, newRow, event) {
//         //code goes here
//     },
//     'Active'
// );



app.listen(port, () => console.log("Server running on port %d", port));