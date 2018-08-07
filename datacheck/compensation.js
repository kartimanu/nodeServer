var dbconn = require('../config/sshdbconn');

const fetchquery = "SELECT * FROM COMP_Y3_M8_CORE c1 JOIN COMP_Y3_M8_CORE2 c2 ON c1._URI = c2._PARENT_AURI JOIN COMP_Y3_M8_CORE3 c3 ON c1._URI = c3._PARENT_AURI";
const insertQuery = "INSERT IGNORE INTO compensation_details set ? ";
const comp = {};

comp.syncallcompensationdetails = function (req, res) {
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(fetchquery, function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            res.send(JSON.stringify(results));
            // console.log(results);
            sortdata(JSON.parse(JSON.stringify(results)));
        });
    }).catch(err => {
        console.log(err);
    });
}

function sortdata(res) {
    Array.from(res).forEach(data => {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(insertQuery, setOM(data), function (error, om_result, fields) {
                if (error) {
                    console.log(error);
                    return;
                } else {
                    // for (i = 1; i < 9; i++) {
                    //     insertFAdata(data, i);
                    // }
                    console.log(JSON.stringify(om_result));
                }
            });
        }).catch(err => {
            console.log(err);
        });
    });
}

function setOM(data) {
    var MIN_ID = data.META_INSTANCE_ID.split(":");

    var insertquery = {

        COM_METAINSTANCE_ID: MIN_ID[1],
        COM_METAMODEL_VERSION:data._MODEL_VERSION,
        COM_METAUI_VERSION:data._UI_VERSION,
        COM_METASUBMISSION_DATE:data._SUBMISSION_DATE,
        COM_FORMSTART_DATE:data.TODAY,
        COM_FORMEND_DATE:data.END,
        COM_FILLIN_DATE:data.START,
        COM_DEVICE_ID:data.DEVICEID,
        COM_SIM_ID:data.SIMSERIAL,
        COM_FA_PHONE_NUM:data.PHONENUMBER,
        COM_USER_NAME:data.USERNAME,
        COM_OM_UID:data.OMDETAILS_OM_SHEETNO,
        COM_OM_RANGE:data.OMDETAILS_OM_RANGE,
        COM_OM_FORM_DATE:data.OMDETAILS_OM_DATE,
        COM_OM_IMAGE1:null,
        COM_OM_IMAGE2:null,
        COM_OM_IMAGE3:null,
        COM_OM_TOTAL_CASES:data.OMDETAILS_OM_TOTNO,
        COM_OM_WS_CASES:data.OMDETAILS_OM_WSNO,
        COM_WSID_FORM_DATE: MIN_ID[1] +":"+data.OMDETAILS_OM_DATE

    };
    console.log("model" + JSON.stringify(insertquery));
    return insertquery;
}
exports.func = comp;