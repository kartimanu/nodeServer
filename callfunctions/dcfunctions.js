const db_model = require('../utils/query_model');
const db = require('../config/dbconnect');
const myfunctions = {};


myfunctions.getformdailyusers = function (req, res, next) {
    db.conn.rawdb.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            console.log(err);
        }
        conn.query(db_model.sqlquery.selectallFormDC, function (err, result, fields) {
            if (err) {
                res.send(JSON.stringify({
                    "status": 404,
                    "error": err.sqlMessage
                }));
                console.log(err.sqlMessage);
            };
            res.send(JSON.stringify({
                "status": 200,
                "response": result
            }));
            conn.release();
            savedata(result);
        });
    });
}

function savedata(res) {
    db.conn.rawdb.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            console.log(err);
        }
        res.forEach(data => {
            conn.query(db_model.sqlquery.insertintoDC_table, db_model.datamodels.get_dcofficers(data), function (err, result, fields) {
                if (err) console.log(err.sqlMessage);
                for (i = 1; i < 11; i++) {
                    conn.query(db_model.sqlquery.insertintoDC_FAusers, db_model.datamodels.get_dcusers(data, i), function (err, result, fields) {
                        if (err) console.log(err.sqlMessage);
                    });
                }
                conn.release();
            });
        });
    });
}



myfunctions.getdailyusers = function (req, res, next) {
    db.conn.moddb.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            console.log(err);
        }
        conn.query(db_model.sqlquery.selectallDC, function (err, rows, fields) {
            if (err) {
                res.send(JSON.stringify({
                    "status": 404,
                    "error": err.sqlMessage
                }));
                console.log(err.sqlMessage);
            };
            res.send(JSON.stringify({
                "status": 200,
                "response": rows
            }));
            conn.release();
        });
    });
}

myfunctions.getFOuser = function (req, res, next) {
    db.conn.moddb.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            console.log(err);
        }
        conn.query(db_model.sqlquery.selectDCuser, [req.params.id], function (err, result, fields) {
            if (err) {
                res.send(JSON.stringify({
                    "status": 404,
                    "error": err.sqlMessage
                }));
                console.log(err.sqlMessage);
            };
            res.send(JSON.stringify({
                "status": 200,
                "response": result
            }));
            conn.release();
        });
    });
}

myfunctions.getallFAusers = function (req, res, next) {
    db.conn.moddb.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            console.log(err);
        }
        conn.query(db_model.sqlquery.getallFA, [req.params.id], function (err, result, fields) {
            if (err) {
                res.send(JSON.stringify({
                    "status": 404,
                    "error": err.sqlMessage
                }));
                console.log(err.sqlMessage);
            };
            res.send(JSON.stringify({
                "status": 200,
                "response": result
            }));
            conn.release();
        });
    });
}

myfunctions.checkdailyusers = function (req, res, next) {
    db.conn.moddb.getConnection(function (err, conn) {
        if (err) {
            conn.release();           
            console.log(err);
        } else {
            conn.query(db_model.sqlquery.selectallDC, function (err, rows, fields) {
                conn.release();
                if (err)
                    console.log(err.sqlMessage);
                else console.log("status: 200, rows fetched:" + rows.length);
            });
        }
    });
}

exports.caller = myfunctions;