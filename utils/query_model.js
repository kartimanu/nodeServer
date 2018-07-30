
const helper = require('./helper');
const qmodels = {};
const queryscript = {};

//RDB QUERY 
queryscript.selectallDC = "SELECT * FROM odk.daily_count";
queryscript.selectDCuser = "SELECT * FROM odk.daily_count WHERE DC_CASE_ID = ?";
queryscript.getallFA = "SELECT * FROM odk.dc_cases WHERE DC_CASE_ID = ?";
queryscript.insertintoDC_table = "INSERT INTO odk.daily_count set ? ";
queryscript.insertintoDC_FAusers = "INSERT INTO odk.dc_cases set ? ";

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
exports.sqlquery = queryscript;
exports.datamodels = qmodels;
