const dbconn = require('../config/sshdbconn');
const procedure = require('../utils/report_queries');

const reports = {};
var result_data = [];

reports.getdailycountbypark = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.bypark(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(JSON.stringify(data));
            }
        });
        con_mdb.query(procedure.func.byFA(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(JSON.stringify(data));
            }
        });
        con_mdb.query(procedure.func.byEffectType(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                // result_data.push( JSON.stringify(data[0]));
                res.send(JSON.stringify(result_data)+JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.report = reports;