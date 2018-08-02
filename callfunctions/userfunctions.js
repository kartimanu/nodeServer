const db_model = require('../utils/query_model');
const db = require('../config/dbconnect');
const myfunctions = {};

myfunctions.getusers = function (req, res, next) {
    db.con1.connect(function (err) {
        if (err) console.log(err);
        db.con1.query(db_model.sqlquery.selectallWSusers, function (err, result, fields) {
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
            // db.con1.end();
        });
    });
}

myfunctions.createUser = function (req, res, next) {
    
    db.con1.query(db_model.sqlquery.insertuser, db_model.datamodels.createuser(req.body), function (err, result, fields) {
        if (err) {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({
                "status": 404,
                "response": err.sqlMessage
            }));
        } else {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({
                "status": 200,
                "response": ("Inserted: " + JSON.stringify(req.body))
            }));
        }
    });
    
}

myfunctions.updateUser = function (req, res, next) {
    
    db.con1.query(db_model.sqlquery.updateuser, [db_model.datamodels.createuser(req.body), req.body.username], function (err, result, fields) {
        if (err) {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({
                "status": 404,
                "response": err.sqlMessage
            }));
        } else {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({
                "status": 200,
                "response": ("Inserted: " + JSON.stringify(req.body))
            }));
        }
    });
    
}

myfunctions.deleteUser = function (req, res, next) {
    
    db.con1.query(db_model.sqlquery.deleteuser, req.params.id, function (err, result, fields) {
        if (err) {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({
                "status": 404,
                "response": err.sqlMessage
            }));
        } else {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({
                "status": 200,
                "response": ("delete user: " + req.params.id + JSON.stringify(result))
            }));
        }
    });
    
}

exports.caller = myfunctions;