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
            } else
                res.send(util.methods.setresponse(setHWCdata(results[0])));
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
        HWC_PARK_NAME: format_park(hwcformdata.EXITINFO2_CONCAT_PARK),
        HWC_TALUK_NAME: format_taluk(hwcformdata.EXITINFO2_CONCAT_TALUK),
        HWC_VILLAGE_NAME: (!hwcformdata.EXITINFO2_CONCAT_VILLAGE) ? null : hwcformdata.EXITINFO2_CONCAT_VILLAGE.toLowerCase(),
        HWC_OLDPHONE_NUMBER: hwcformdata.EXITINFO2_CONCAT_OLDPHNUM,
        HWC_NEWPHONE_NUMBER: hwcformdata.EXITINFO2_CONCAT_NEWPHNUM,
        HWC_SURVEY_NUMBER: hwcformdata.EXITINFO2_CONCAT_SURVEYNUM.replace("-", "/"),
        HWC_RANGE: format_range(hwcformdata.HWCINFO_RANGE),
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
        HWC_FD_SUB_DATE: hwcformdata.FDSUBMISSION_DATE_FDSUB,
        HWC_FD_SUB_RANGE: format_range(hwcformdata.FDSUBMISSION_RANGE_FDSUB),
        HWC_FD_NUM_FORMS: hwcformdata.FDSUBMISSION_NUMFORMS_FDSUB,
        HWC_FD_COMMENT: (!hwcformdata.EXITINFO2_ADDCOMMENTS2) ? null : hwcformdata.EXITINFO2_ADDCOMMENTS2.toLowerCase(),
        HWC_START: hwcformdata.START,
        HWC_END: hwcformdata.END,
        HWC_DEVICE_ID: hwcformdata.DEVICEID,
        HWC_SIMCARD_ID: hwcformdata.SIMSERIAL,
        HWC_FA_PHONE_NUMBER: hwcformdata.PHONENUMBER,
        HWC_USER_NAME: (!hwcformdata.USERNAME) ? null : hwcformdata.USERNAME.toLowerCase(),
        HWC_CASE_TYPE: (!hwcformdata.WILDSEVEIDDETAILS_CASE_WSIDINFO) ? null : hwcformdata.WILDSEVEIDDETAILS_CASE_WSIDINFO.toLowerCase()
    }

    return inserthwcdataset;
}

function format_park(park_name) {
    const park_list =
    {
        "bandipurprk": "Bandipur",
        "nagaraholeprk": "Nagarahole"
    }

    return park_name.allReplace(park_list).toLowerCase();
}

String.prototype.allReplace = function (obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

function format_taluk(taluk_name) {
    const taluk_list =
    {
        "gundlupettlk": "gundlupet",
        "hdkotetlk": "hdkote",
        "HD_Kote": "hdkote",
        "hd_kote": "hdkote",
        "hunsurtlk": "hunsur",
        "nanjangudtlk": "nanjangud",
        "piriyapatnatlk": "piriyapatna",
        "chamrajnagartlk": "chamrajnagar"
    }

    return taluk_name.allReplace(taluk_list).toLowerCase();
}

function format_range(range_name) {
    const range_list =
    {
        "antersantherng": "Antersanthe",
        "db_kupperng": "DBKuppe",
        "dbkupperng": "DBKuppe",
        "gsbettarng": "GSBetta",
        "gundlupetrng": "Gundlupet",
        "hdkoterng": "HDKote",
        "hediyalarng": "Hediyala",
        "hunsurrng": "Hunsur",
        "kachuvinahallyrng": "Kachuvinahally",
        "kundkererng": "Kundkere",
        "maddururng": "Madduru",
        "metikupperng": "Metikuppe",
        "moleyururng": "Moleyuru",
        "nbegururng": "NBeguru",
        "nugurng": "Nugu",
        "omkarrng": "Omkar",
        "piriyapattanarng": "Piriyapattana",
        "sargururng": "Sarguru",
        "veeranahosahallirng": "Veeranahosahalli"
    }

    return range_name.allReplace(range_list).toLowerCase();

}

exports.caller = myfunctions;