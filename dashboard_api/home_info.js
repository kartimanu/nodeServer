const dbconn = require('../config/sshdbconn');
const procedure = require('../utils/report_queries');
const async = require("async");

const reports = {};
var result_data = [];

//HOME Chart API's
reports.getTotalCasesByProjectYear = async function (req, res, next) {
    try {
        var start_yr = 2015;
        var end_yr = (new Date()).getFullYear();
        var year_diff = end_yr - start_yr;
        var year_range = [];
        var result_data = [];
        for (var i = 0; i < year_diff; i++) {
            year_range[i] = { "from": [start_yr + i] + "-07-01", "to": [start_yr + (i + 1)] + "-06-30" };
        }
        async.each(year_range, function (yr_data, callback) {
            if (yr_data) {
                dbconn.mdb.then(function (con_mdb) {
                    con_mdb.query(procedure.func.getTotalCasesByP_YR(yr_data.from, yr_data.to), function (error, result, fields) {
                        if (error) {
                            console.log(error);
                            return;
                        } else if (result) {
                            result_data.push(result);
                            callback();
                        }
                    });
                }).catch(err => {
                    console.log(err);
                })
            }
        }, function (err) {
            if (err)
                console.log(err);
            console.log(JSON.stringify(result_data));
            res.send({ success: true, data: JSON.stringify(result_data) });
        })

    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.getcategoryByProjectYear = async function (req, res, next) {
    try {
        var start_yr = 2015;
        var end_yr = (new Date()).getFullYear();
        var year_diff = end_yr - start_yr;
        var year_range = [];
        var result_data = [];
        for (var i = 0; i < year_diff; i++) {
            year_range[i] = { "from": [start_yr + i] + "-07-01", "to": [start_yr + (i + 1)] + "-06-30" };
        }
        async.each(year_range, function (yr_data, callback) {
            if (yr_data) {
                dbconn.mdb.then(function (con_mdb) {
                    con_mdb.query(procedure.func.getparkcategory_YR(yr_data.from, yr_data.to), function (error, result, fields) {
                        if (error) {
                            res.send({ success: false, data: JSON.stringify(error) });
                            console.log(error);
                            return;
                        } else if (result) {
                            // if (result.length > 0)
                            //     result.forEach((v) => {
                            //         result_data.push(v);
                            //     })
                            result_data.push(result);
                            callback();
                        }
                    });
                }).catch(err => {
                    console.log(err);
                })
            }
        }, function (err) {
            if (err)
                console.log(err);
            // console.log(JSON.stringify(result_data));
            res.send({ success: true, data: JSON.stringify(result_data) });
        })

    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.getTopVillages_Bycategory_all = async function (req, res, next) {
    try {
        var CAT = ['CR','CRPD','PD','LP','HI','HD'];
        var result_data = [];
        async.each(CAT, function (val, callback) {
            if (val) {
                dbconn.mdb.then(function (con_mdb) {
                    con_mdb.query(procedure.func.gettopvillages_bycategory_all(val), function (error, result, fields) {
                        if (error) {
                            res.send({ success: false, data: JSON.stringify(error) });
                            console.log(error);
                            return;
                        } else if (result) {
                            result_data.push(result);
                            callback();
                        }
                    });
                }).catch(err => {
                    console.log(err);
                })
            }
        }, function (err) {
            if (err)
                console.log(err);
            // console.log(JSON.stringify(result_data));
            res.send({ success: true, data: JSON.stringify(result_data) });
        })

    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

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

reports.getRange_all = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getrange_year(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.getrange_monthyear(), function (error, data, fields) {
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
        con_mdb.query(procedure.func.getBPNH_Previousday(), function (error, data, fields) {
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
reports.get_park_Yearly = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getBpNhYearly_all(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}
reports.get_park_cat_Yearly = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getBpNhByCategory_all(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}
reports.getTopVillages = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.gettopvillages_all(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}

exports.report = reports;