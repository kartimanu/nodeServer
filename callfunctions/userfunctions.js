const db_model = require('../utils/query_model');
const dbconn = require('../config/sshdbconn');
const util = require('../utils/helper');
const myfunctions = {};

myfunctions.getusers = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.selectallWSusers, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else
                res.send(util.methods.setresponse(results));
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}

myfunctions.createUser = function (req, res, next) {

    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.insertuser, db_model.datamodels.createuser(req.body), function (error, results, fields) {
            if (error) {
                console.log(error);
                res.setHeader("Content-Type", "application/json");
                res.send(util.methods.seterror(error));
                return;
            } else {
                res.setHeader("Content-Type", "application/json");
                res.send(util.methods.setresponse(results));
            }
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}

myfunctions.updateUser = function (req, res, next) {

    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.updateuser, [db_model.datamodels.createuser(req.body), req.body.username], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.setHeader("Content-Type", "application/json");
                res.send(util.methods.seterror(error));
                return;
            } else {
                res.setHeader("Content-Type", "application/json");
                res.send(util.methods.setresponse(results));
            }
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });

}

myfunctions.deleteUser = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.deleteuser, req.params.id, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.setHeader("Content-Type", "application/json");
                res.send(util.methods.seterror(error));
                return;
            } else {
                res.setHeader("Content-Type", "application/json");
                res.send(util.methods.setresponse(results));
            }
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}

exports.caller = myfunctions;