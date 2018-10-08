const dbconn = require('../config/sshdbconn');
const procedure = require('../utils/report_queries');

const reports = {};
var result_data = [];

reports.get_total_comp = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_total_comp(), function (error, data, fields) {
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

reports.get_comp_topwsid_topvillage = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_comp_top30_wsid(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_comp_top20_village(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
                res.send(JSON.stringify(result_data));
                result_data.length = 0;
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_comp_block12_bydate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_comp_bycategory(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_comp_bypark(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_comp_bytaluk(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_comp_byvillage(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
                res.send(JSON.stringify(result_data));
                result_data.length = 0;
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.report = reports;