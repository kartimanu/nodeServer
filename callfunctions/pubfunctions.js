var prom = require('../config/sshdbconn');
var query = require('../utils/query_model');
var qmodel_set = require('../utils/query_model');

var demo = {};
demo.getformdata = function (req, res) {
    // async connection to database
    prom.then(function (conn) {
        // query database 
        conn.query('SELECT * FROM `DAILY_COUNT_Y3_M10_CORE`', function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            res.send(results);
            sortform2dcdata(results);
            // prom.close(conn);
        });
    }).catch(err => {
        console.log(err)
    });
};

demo.getdcdata = function (req, res) {
    // async connection to database
    prom.then(function (conn) {
        // query database 
        conn.query('SELECT * FROM `DAILY_COUNT_Y3_M10_CORE`', function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            res.send(results);
        });
    }).catch(err => {
        console.log(err)
    });
};

function sortform2dcdata(result) {
    result.forEach(data => {
        console.log("MYDATA" + qmodel_set.datamodels.get_do(data));

        // prom.then(function (con) {
        //     con.query(query.sqlquery.insertintowsDC_table, qmodel_set.datamodels.get_do, function () {

        //     });
        // }).catch(err => {
        //     console.log(err);
        // });

    });

}
module.exports.caller = demo;