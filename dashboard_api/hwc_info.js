const dbconn = require('../config/sshdbconn');
const procedure = require('../utils/report_queries');

const reports = {};
var result_data = [];

reports.getHWC_block1 = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_hwc_category(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_animal(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                    result_data.push(data);
                
            }
        });
        con_mdb.query(procedure.func.get_hwc_park(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_taluk(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_range(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_village(), function (error, data, fields) {
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

reports.getHWC_block1_byhwcdate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_hwc_category_byhwcdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_animal_byhwcdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                    result_data.push(data);
                
            }
        });
        con_mdb.query(procedure.func.get_hwc_park_byhwcdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_taluk_byhwcdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_range_byhwcdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_village_byhwcdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
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

reports.getHWC_block1_byfadate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_hwc_category_byfadate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_animal_byfadate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                    result_data.push(data);
                
            }
        });
        con_mdb.query(procedure.func.get_hwc_park_byfadate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_taluk_byfadate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_range_byfadate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_village_byfadate(req.body.fromdate, req.body.todate), function (error, data, fields) {
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

reports.getfreq_block2_byhwcdate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {        
        con_mdb.query(procedure.func.get_freq_byhwcdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
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

reports.getfreq_block2_byfadate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {        
        con_mdb.query(procedure.func.get_freq_byfadate(req.body.fromdate, req.body.todate), function (error, data, fields) {
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

reports.get_cases_byyear_month_block2 = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {        
        con_mdb.query(procedure.func.get_cases_byyear_month(), function (error, data, fields) {
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

reports.get_top20cases_bycat_block2 = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {        
        con_mdb.query(procedure.func.get_top20_wsid_bycat(), function (error, data, fields) {
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

reports.get_topfreq_block3 = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {        
        con_mdb.query(procedure.func.get_top10_crop(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_top10_property(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_top10_livestock(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_top30_villages(), function (error, data, fields) {
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