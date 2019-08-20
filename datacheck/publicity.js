const dbconn = require('../config/sshdbconn');
const helper = require('../utils/helper');

const qselect = "SELECT R._URI, R._MODEL_VERSION, R._UI_VERSION, R._SUBMISSION_DATE, R.TODAY, R.DEVICEID, R.SIMSERIAL, R.PHONENUMBER, R.USERNAME, R.PUB_VILL_PUB_DATE, R.PUB_VILL_PUB_PARK, R.PUB_VILL_PUB_TALUK, R.PUB_VILL_PUB_VILLAGE, R.PUB_VILL_PUB_OTHERVILLAGE, R.PUB_VILL_GPS_POINT_LAT, R.PUB_VILL_GPS_POINT_LNG, R.PUB_VILL_GPS_POINT_ALT, R.PUB_VILL_GPS_POINT_ACC, R.PUB_VILL_CONCAT_PUB_VILLAGE, I.VALUE AS IMG1, J.VALUE AS IMG2";
const qfrom = " FROM PUBLICITY_WILD_SEVE_CORE R  LEFT JOIN PUBLICITY_WILD_SEVE_PUB_VILL_PUB_IMG_1_BLB I ON R._URI = I._TOP_LEVEL_AURI LEFT JOIN PUBLICITY_WILD_SEVE_PUB_VILL_PUB_IMG_2_BLB J ON R._URI = J._TOP_LEVEL_AURI";


const joinQuery = "SELECT * FROM PUBLICITY_WILD_SEVE_CORE";//qselect + qfrom;
const insertQuery = "INSERT IGNORE INTO publicity set ? ";
const insertImgQuery = "INSERT IGNORE INTO publicity_images set ? ";

const pub = {};

pub.syncallformpublicitydata = function (req, res) {
    console.log("Syncing Publicity . . . .");
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(joinQuery, function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                sortdata(JSON.parse(JSON.stringify(data)));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

function sortdata(result) {
    var counter = 1;
    console.log("No of Publicity Records to Sync :: " + result.length);
    Array.from(result).forEach(resobj => {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(insertQuery, qModel(resobj), function (error, data, fields) {
                if (error) {
                    console.log(error);
                    return;
                } else {
                    if (data.affectedRows > 0)
                        console.log("PUBLICITY record inserted : " + counter++);
                }
            });
        }).catch(err => {
            console.log(err);
        });
    });
};

function insertImgData(id, img_res1, img_res2) {
    const insertSet = {
        "PB_METAINSTANCE_ID": id,
        "PB_IMAGE_1": img_res1,
        "PB_IMAGE_2": img_res2
    }
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(insertImgQuery, insertSet, function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (data.affectedRows > 0)
                    console.log("PUBLICITY image inserted : " + JSON.stringify(data.affectedRows));
            }
        });
    }).catch(err => {
        console.log(err);
    });

};

function qModel(resData) {
    try {
        const MIN_ID = resData._URI.split(":");
        // const img1_data = JSON.parse(JSON.stringify(resData.IMG1));
        // const img1_buf = !img1_data ? null : new Buffer(img1_data.data, 'binary');//.toString('base64');
        // const img2_data = JSON.parse(JSON.stringify(resData.IMG2));
        // const img2_buf = !img2_data ? null : new Buffer(img2_data.data, 'binary');//.toString('base64');

        var insertQuery = {
            "PB_METAINSTANCE_ID": MIN_ID[1],
            "PB_METAMODEL_VERSION": resData._MODEL_VERSION,
            "PB_METAUI_VERSION": resData._UI_VERSION,
            "PB_METASUBMISSION_DATE": resData._SUBMISSION_DATE,
            "PB_FILLIN_DATE": helper.methods.GetFormattedDate(resData.TODAY),
            "PB_DEVICE_ID": resData.DEVICEID,
            "PB_SIMCARD_ID": resData.SIMSERIAL,
            "PB_PHONE_NUMBER": resData.PHONENUMBER,
            "PB_USER_NAME": resData.USERNAME,
            "PB_V_DATE": helper.methods.GetFormattedDate(resData.PUB_VILL_PUB_DATE),
            "PB_PARK": helper.methods.format_park(resData.PUB_VILL_PUB_PARK),
            "PB_TALUK": helper.methods.format_taluk(resData.PUB_VILL_PUB_TALUK),
            "PB_VILLAGE_1": resData.PUB_VILL_PUB_VILLAGE,
            "PB_VILLAGE_2": resData.PUB_VILL_PUB_OTHERVILLAGE,
            "PB_LAT": resData.PUB_VILL_GPS_POINT_LAT,
            "PB_LONG": resData.PUB_VILL_GPS_POINT_LNG,
            "PB_ALT": resData.PUB_VILL_GPS_POINT_ALT,
            "PB_ACC": resData.PUB_VILL_GPS_POINT_ACC,
            "PB_C_VILLAGE": resData.PUB_VILL_CONCAT_PUB_VILLAGE
        }
        // insertImgData(insertQuery.PB_METAINSTANCE_ID, img1_buf, img2_buf);
        return insertQuery;
    }
    catch (e) {
        console.log("Some Exception Occured" + e);
    }
}

exports.func = pub;