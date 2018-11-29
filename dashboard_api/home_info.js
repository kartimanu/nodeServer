const dbconn = require('../config/sshdbconn');
const procedure = require('../utils/report_queries');

const reports = {};
var result_data = [];

//HOME Chart API's
reports.getTotalCasesByYear = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getTotalCasesByYEAR(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.getTotalCasesByYEARnMONTH(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data)
                res.send({ success: true, data: result_data });
                result_data.length = 0;
            }
        });
    });
}

reports.getCategoryByYear = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getCategoryByYEAR(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.getCategoryByYEARnMONTH(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data)
                res.send({ success: true, data: result_data });
                result_data.length = 0;
            }
        });
    });
}

reports.getBpNhByRange = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getBpNhByRange(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}
reports.getPreviousBpNhCount = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getPreviousBpNhCount(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}
reports.getBpByCategory = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getBpByCategory(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}
reports.getNhByCategory = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getNhByCategory(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}
reports.getBpNhByCategory = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getBpNhByCategory(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}
reports.getBpNhYearly = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getBpNhYearly(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}

exports.report = reports;