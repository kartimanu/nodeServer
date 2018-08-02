
const helper = require('./helper');
const qmodels = {};
const queryscript = {};

//RDB QUERY 
queryscript.selectallWSusers = "SELECT * FROM odk.wls_users";
queryscript.insertuser = "INSERT INTO odk.wls_users set ? ";
queryscript.updateuser = "UPDATE odk.wls_users SET ? WHERE user_name = ?";
queryscript.deleteuser = "DELETE FROM odk.wls_users WHERE user_name = ?";
queryscript.selectallDC = "SELECT * FROM odk.daily_count";
queryscript.selectDCuser = "SELECT * FROM odk.daily_count WHERE DC_CASE_ID = ?";
queryscript.getallFA = "SELECT * FROM odk.dc_cases WHERE DC_CASE_ID = ?";
queryscript.insertintoDC_table = "INSERT IGNORE INTO odk.daily_count set ? ";
queryscript.insertintoDC_FAusers = "INSERT IGNORE INTO odk.dc_cases set ? ";

//PROD RDB QUERY
queryscript.insertintowsDC_table = "INSERT IGNORE INTO odk.daily_count set ? ";


//FORM QUERY 
queryscript.selectallFormDC = "SELECT * FROM wsodk_dailycount_apr_18_results";

qmodels.get_dcofficers = function (data) {
    var MIN_ID = data['meta:instanceID'].split(":");

    var insertquery = {

        DC_METAINSTANCE_ID: MIN_ID[1],
        DC_FILLIN_DATE: data.today,
        DC_DEVICE_ID: data.deviceid,
        DC_SIMCARD_ID: data.simserial,
        DC_PHONE_NUMBER: data.phonenumber,
        DC_USER_NAME: data.username,
        DC_CASE_DATE: helper.methods.GetFormattedDate(data['details:dc_date']),
        DC_NH_CASES: data['details:nh_cases'],
        DC_BP_CASES: data['details:bp_cases'],
        DC_TOTAL_CASES: data['details:ws_cases'],
        DC_CASE_ID: MIN_ID[1] + "_" + data.username

    };

    console.log("inserting" + insertquery.DC_CASE_DATE);
    return insertquery;
}

qmodels.createuser = function (data) {
    var insertquery = {
        First_name: data.firstname,
        Last_name: data.lastname,
        user_name: data.username,
        user_pwd: data.password,
        Email_id: data.email,
        Phone_number: data.phone
    };

    console.log("inserting user");
    return insertquery;
}

qmodels.get_dcusers = function (data, i) {
    var MIN_ID = data['meta:instanceID'].split(":");
    var insertcasesquery = {
        DC_CROP: data['fa_mck:fa_hwc_' + i + ':fa_' + i + '_cr'],
        DC_CROP_PROPERTY: data['fa_mck:fa_hwc_' + i + ':fa_' + i + '_crpd'],
        DC_PROPERTY: data['fa_mck:fa_hwc_' + i + ':fa_' + i + '_pd'],
        DC_LIVESTOCK: data['fa_mck:fa_hwc_' + i + ':fa_' + i + '_lp'],
        DC_HUMAN_INJURY: data['fa_mck:fa_hwc_' + i + ':fa_' + i + '_hi'],
        DC_HUMAN_DEATH: data['fa_mck:fa_hwc_' + i + ':fa_' + i + '_hd'],
        DC_TOTAL_ATTENDED_CASE: data['fa_mck:fa_' + i + '_casetally'],
        DC_CASE_ID: MIN_ID[1] + "_" + data.username,
        DC_FA_ID: MIN_ID[1] + "_FA" + i
    }
    console.log(insertcasesquery.DC_CASE_ID);
    return insertcasesquery;
}

qmodels.get_do = function (data) {
    var MIN_ID = data._URI.split(":");

    var insertquery = {

        DC_METAINSTANCE_ID: MIN_ID[1],
        DC_FILLIN_DATE: data.TODAY,
        DC_DEVICE_ID: data.DEVICEID,
        DC_SIMCARD_ID: data.SIMSERIAL,
        DC_PHONE_NUMBER: data.PHONENUMBER,
        DC_USER_NAME: data.USERNAME,
        DC_CASE_DATE: helper.methods.GetFormattedDate(data.DETAILS_DC_DATE),
        DC_NH_CASES: data.DETAILS_NH_CASES,
        DC_BP_CASES: data.DETAILS_BP_CASES,
        DC_TOTAL_CASES: data.DETAILS_WS_CASES,
        DC_CASE_ID: MIN_ID[1] + "_" + data.USERNAME

    };

    console.log("inserting" + insertquery.DC_CASE_DATE);
    return insertquery;
}
exports.sqlquery = queryscript;
exports.datamodels = qmodels;
