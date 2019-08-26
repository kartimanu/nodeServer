
const helper = require('./helper');
const global_const = require('./global');
const qmodels = {};
const queryscript = {};

//RDB QUERY : USERS
queryscript.selectallWSusers = "SELECT * FROM wls_users";
queryscript.insertuser = "INSERT INTO wls_users set ? ";
queryscript.updateuser = "UPDATE wls_users SET ? WHERE User_name = ?";
queryscript.deleteuser = "DELETE FROM wls_users WHERE User_name = ?";
queryscript.checkuser = "SELECT * FROM wls_users WHERE User_name = ?";

//RDB QUERY : PUBLICITY
queryscript.getpublicitydata = "SELECT * FROM publicity";
queryscript.getPublicityImgData = "SELECT * FROM publicity_images";// WHERE PB_METAINSTANCE_ID = ?";

//RDB QUERY : DAILY COUNT
queryscript.selectallDAO = "SELECT * FROM daily_count";
queryscript.selectDCuser = "SELECT * FROM dc_cases WHERE DC_CASE_ID = ?";
queryscript.getallDC = "SELECT * FROM daily_count DC JOIN dc_cases FA ON DC.DC_CASE_ID=FA.DC_CASE_ID";
queryscript.insertintoDC_table = "INSERT IGNORE INTO daily_count set ? ";
queryscript.insertintoDC_FAusers = "INSERT IGNORE INTO dc_cases set ? ";

//RDB QUERY : COMPENSATION
queryscript.selectOM_data = "SELECT * FROM compensation_details";
queryscript.selectOM_casedata = "SELECT * FROM com_cases_details WHERE COM_WSID_FORM_DATE = ?";

//RDB QUERY : HWC
const line1 = "SELECT * FROM hwc_details HD LEFT JOIN hwc_case_crop HC ";
const line2 = "ON (HD.HWC_WSID = HC.HWC_WSID && HD.HWC_CASE_DATE=HC.HWC_CASE_DATE) ";
const line3 = "LEFT JOIN hwc_case_property HP ";
const line4 = "ON (HD.HWC_WSID = HP.HWC_WSID && HD.HWC_CASE_DATE=HP.HWC_CASE_DATE) ";
const line5 = "LEFT JOIN hwc_case_livestock HL ";
const line6 = "ON (HD.HWC_WSID = HL.HWC_WSID && HD.HWC_CASE_DATE=HL.HWC_CASE_DATE) ";
const line7 = "WHERE HWC_METAINSTANCE_ID = ?";

queryscript.select_hwc = "SELECT * FROM hwc_details";
queryscript.selectall_hwc = line1+line2+line3+line4+line5+line6;
queryscript.selecthwc_user_byid = line1+line2+line3+line4+line5+line6+line7;

queryscript.getHWCrecord = "SELECT * FROM hwc_details WHERE HWC_METAINSTANCE_ID = ?";
queryscript.getCROPdetails = "SELECT * FROM hwc_case_crop WHERE HWC_PARENT_ID = ?";
queryscript.getLIVESTOCKdetails = "SELECT * FROM hwc_case_livestock WHERE HWC_PARENT_ID = ?";
queryscript.getPROPERTYdetails = "SELECT * FROM hwc_case_property WHERE HWC_PARENT_ID = ?";

queryscript.updateParentHWC = "UPDATE hwc_details SET ? WHERE HWC_METAINSTANCE_ID = ? ";
queryscript.updateCropData = "UPDATE hwc_case_crop SET ? WHERE HWC_META_ID = ? ";
queryscript.updateLivestockData = "UPDATE hwc_case_livestock SET ? WHERE HWC_META_ID = ? ";
queryscript.updatePropertyData = "UPDATE hwc_case_property SET ? WHERE HWC_META_ID = ? ";

queryscript.get_case_users = "SELECT * FROM wildseve_users";

//PROD RDB QUERY
queryscript.insertintowsDC_table = "INSERT IGNORE INTO odk.daily_count set ? ";

//FORM QUERY 
queryscript.selectallFormDC = "SELECT * FROM wsodk_dailycount_apr_18_results";

//Duplicate Data Query
queryscript.getErrorRecordIDs = "SELECT * FROM dup_hwc WHERE HWC_VERIFIED = 'N'";
queryscript.getDuplicateData = "SELECT * FROM HWC"+global_const.CONST.HWC_FORM+"CORE C1 JOIN HWC"+global_const.CONST.HWC_FORM+"CORE2 C2 ON C1._URI = C2._PARENT_AURI JOIN HWC"+global_const.CONST.HWC_FORM+"CORE3 C3 ON C3._PARENT_AURI = C1._URI WHERE C1._URI = ? ";
queryscript.getParentData = "SELECT * FROM hwc_details WHERE HWC_METAINSTANCE_ID = ? ";
queryscript.getFlaggedData = "SELECT * FROM hwc_details_flagged WHERE HWC_METAINSTANCE_ID = ? ";
queryscript.updateParentData = "UPDATE hwc_details SET ? WHERE HWC_METAINSTANCE_ID = ? ";
queryscript.updateFlaggedData = "UPDATE hwc_details_flagged SET ? WHERE HWC_METAINSTANCE_ID = ? ";
queryscript.updateErrorRecord = "UPDATE dup_hwc SET HWC_VERIFIED = ? WHERE HWC_DUP_METAID = ? ";
queryscript.transferFlaggedRecord = "INSERT INTO hwc_details SELECT * FROM hwc_details_flagged WHERE HWC_METAINSTANCE_ID = ?";

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
        User_name: data.username,
        User_pwd: data.password,
        Email_id: data.email,
        Phone_number: data.phone,
        User_Role_Id: data.roleid
    };

    console.log("inserting user");
    return insertquery;
}

exports.sqlquery = queryscript;
exports.datamodels = qmodels;
