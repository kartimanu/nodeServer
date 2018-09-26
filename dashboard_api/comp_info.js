const dbconn = require('../config/sshdbconn');
const procedure = require('../utils/report_queries');

const reports = {};
var result_data = [];

reports.get_top50cases_bywsid_block2 = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {        
        con_mdb.query(procedure.func.get_top50_wsid_bycases(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.report = reports;