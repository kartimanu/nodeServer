const db_model = require('../utils/query_model');
const dbconn = require('../config/sshdbconn');
const util = require('../utils/helper');
const myfunctions = {};

myfunctions.get_errorRecords = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.getErrorRecordIDs, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else {
                //    console.log(results);
                res.send(util.methods.setresponse(results));
            }
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}

myfunctions.update_errorRecord = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.updateErrorRecord, [req.params.id], function (error, results, fields) {
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

myfunctions.get_hwcDuplicateData = function (req, res, next) {
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(db_model.sqlquery.getDuplicateData, [req.params.id], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else {
                console.log(results[0]);
                res.send(util.methods.setresponse(setHWCdata(results[0])));
            }
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}

myfunctions.get_hwcParentData = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.getParentData, [req.params.id], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else {
                res.send(util.methods.setresponse(results));
            }
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}

myfunctions.update_hwcParentData = function (req, res, next) {
    console.log("ID: " + req.body.HWC_METAINSTANCE_ID);
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.updateParentData, [req.body, req.body.HWC_METAINSTANCE_ID], function (error, results, fields) {
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


function setHWCdata(hwcformdata) {
    try {
        var MIN_ID = hwcformdata.META_INSTANCE_ID.split(":");

        if (hwcformdata.HWCINFO_INCIDENTINFO_ANI_NAME.toLowerCase() == 'otheranimal')
            hwcformdata.HWCINFO_INCIDENTINFO_ANI_NAME = (!hwcformdata.HWCINFO_INCIDENTINFO_OTHERANIMAL) ? null : hwcformdata.HWCINFO_INCIDENTINFO_OTHERANIMAL.toLowerCase();


        const inserthwcdataset = {
            HWC_METAINSTANCE_ID: MIN_ID[1],
            HWC_METAMODEL_VERSION: hwcformdata._MODEL_VERSION,
            HWC_METAUI_VERSION: hwcformdata._UI_VERSION,
            HWC_METASUBMISSION_DATE: util.methods.GetFormattedDate(hwcformdata._SUBMISSION_DATE),
            HWC_WSID: hwcformdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            HWC_FIRST_NAME: hwcformdata.EXITINFO2_CONCAT_FIRSTNAME,
            HWC_FULL_NAME: hwcformdata.EXITINFO2_CONCAT_FULLNAME,
            HWC_PARK_NAME: util.methods.format_park(hwcformdata.EXITINFO2_CONCAT_PARK),
            HWC_TALUK_NAME: util.methods.format_taluk(hwcformdata.EXITINFO2_CONCAT_TALUK),
            HWC_VILLAGE_NAME: (!hwcformdata.EXITINFO2_CONCAT_VILLAGE) ? null : hwcformdata.EXITINFO2_CONCAT_VILLAGE.toLowerCase(),
            HWC_OLDPHONE_NUMBER: hwcformdata.EXITINFO2_CONCAT_OLDPHNUM,
            HWC_NEWPHONE_NUMBER: hwcformdata.EXITINFO2_CONCAT_NEWPHNUM,
            HWC_SURVEY_NUMBER: hwcformdata.EXITINFO2_CONCAT_SURVEYNUM.replace("-", "/"),
            HWC_RANGE: util.methods.format_range(hwcformdata.HWCINFO_RANGE),
            HWC_LATITUDE: hwcformdata.HWCINFO_SPATIALINFO_GPS_POINT_LAT,
            HWC_LONGITUDE: hwcformdata.HWCINFO_SPATIALINFO_GPS_POINT_LNG,
            HWC_ALTITUDE: hwcformdata.HWCINFO_SPATIALINFO_GPS_POINT_ALT,
            HWC_ACCURACY: hwcformdata.HWCINFO_SPATIALINFO_GPS_POINT_ACC,
            HWC_CASE_DATE: util.methods.GetFormattedDate(hwcformdata.HWCINFO_INCIDENTINFO_HWCDATE),
            HWC_CASE_CATEGORY: hwcformdata.HWCINFO_INCIDENTINFO_HWC_CAT.toUpperCase(),
            HWC_ANIMAL: (!hwcformdata.HWCINFO_INCIDENTINFO_ANI_NAME) ? null : hwcformdata.HWCINFO_INCIDENTINFO_ANI_NAME.toLowerCase(),
            // HWC_OTHER_ANIMAL: (!hwcformdata.HWCINFO_INCIDENTINFO_OTHERANIMAL) ? null : hwcformdata.HWCINFO_INCIDENTINFO_OTHERANIMAL.toLowerCase(),
            HWC_HI_NAME: (!hwcformdata.HWCINFO_HIINFO_HINAME) ? null : hwcformdata.HWCINFO_HIINFO_HINAME.toLowerCase(),
            HWC_HI_VILLAGE: (!hwcformdata.HWCINFO_HIINFO_HIVILLAGE) ? null : hwcformdata.HWCINFO_HIINFO_HIVILLAGE.toLowerCase(),
            HWC_HI_AREA: hwcformdata.HWCINFO_HIINFO_HIAREA,
            HWC_HI_DETAILS: hwcformdata.HWCINFO_HIINFO_HIDETAILS,
            HWC_HD_NAME: (!hwcformdata.HWCINFO_HDINFO_HDNAME) ? null : hwcformdata.HWCINFO_HDINFO_HDNAME.toLowerCase(),
            HWC_HD_VILLAGE: (!hwcformdata.HWCINFO_HDINFO_HDVILLAGE) ? null : hwcformdata.HWCINFO_HDINFO_HDVILLAGE.toLowerCase(),
            HWC_HD_DETAILS: hwcformdata.HWCINFO_HDINFO_HDDETAILS,
            HWC_COMMENT: (!hwcformdata.EXITINFO1_ADDCOMMENTS) ? null : hwcformdata.EXITINFO1_ADDCOMMENTS.toLowerCase(),
            HWC_FD_SUB_DATE: util.methods.GetFormattedDate(hwcformdata.FDSUBMISSION_DATE_FDSUB),
            HWC_FD_SUB_RANGE: util.methods.format_range(hwcformdata.FDSUBMISSION_RANGE_FDSUB),
            HWC_FD_NUM_FORMS: hwcformdata.FDSUBMISSION_NUMFORMS_FDSUB,
            HWC_FD_COMMENT: (!hwcformdata.EXITINFO2_ADDCOMMENTS2) ? null : hwcformdata.EXITINFO2_ADDCOMMENTS2.toLowerCase(),
            HWC_START: util.methods.GetFormattedDate(hwcformdata.START),
            HWC_END: util.methods.GetFormattedDate(hwcformdata.END),
            HWC_DEVICE_ID: hwcformdata.DEVICEID,
            HWC_SIMCARD_ID: hwcformdata.SIMSERIAL,
            HWC_FA_PHONE_NUMBER: hwcformdata.PHONENUMBER,
            HWC_USER_NAME: (!hwcformdata.USERNAME) ? null : hwcformdata.USERNAME.toLowerCase(),
            HWC_CASE_TYPE: (!hwcformdata.WILDSEVEIDDETAILS_CASE_WSIDINFO) ? null : hwcformdata.WILDSEVEIDDETAILS_CASE_WSIDINFO.toLowerCase()
        }

        return inserthwcdataset;
    }
    catch (e) {
        console.log("Some Exception Occured" + e);
    }
}

exports.caller = myfunctions;