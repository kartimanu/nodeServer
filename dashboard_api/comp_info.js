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

reports.get_total_comp_bycategory = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_total_comp_bycategory(), function (error, data, fields) {
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

reports.getcomp_omsheet = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_com_omsheet(), function (error, data, fields) {
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

reports.getcomp_byFDdate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_com_fdrange(req.body.fromdate, req.body.todate), function (error, data, fields) {
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

reports.getcomp_omsheetbydate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_com_omsheet_bydate(req.body.fromdate, req.body.todate), function (error, data, fields) {
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

reports.getcomp_byomsheet = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_comp_byomsheet(req.body.fromdate, req.body.todate), function (error, data, fields) {
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

reports.getcomp_byomsheetdate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_comp_byomsheetdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
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

reports.getcompamount_byomsheetdate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_comp_amount_byomsheetdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
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

reports.getcompamount_omsheetdate_bycategory = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_comp_amount_byomsheetdate_bycategory(req.body.fromdate, req.body.todate), function (error, data, fields) {
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