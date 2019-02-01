'use strict';
var dbconn = require('../config/sshdbconn');
var async = require("async");
var util = require('../utils/helper');

const fetchquery = "SELECT * FROM HWC_Y3_M10_CORE C1 JOIN HWC_Y3_M10_CORE2 C2 ON C1._URI = C2._PARENT_AURI JOIN HWC_Y3_M10_CORE3 C3 ON C1._URI = C3._PARENT_AURI";
const fetchErrorRecordquery = "SELECT * FROM HWC_Y3_M10_CORE C1 JOIN HWC_Y3_M10_CORE2 C2 ON C1._URI = C2._PARENT_AURI JOIN HWC_Y3_M10_CORE3 C3 ON C1._URI = C3._PARENT_AURI WHERE C1._URI = ?";
const hwc_insertQuery = "INSERT IGNORE INTO hwc_details set ? ";
const hwc_crop_insertQuery = "INSERT IGNORE INTO hwc_case_crop set ? ";
const hwc_property_insertQuery = "INSERT IGNORE INTO hwc_case_property set ? ";
const hwc_livestock_insertQuery = "INSERT IGNORE INTO hwc_case_livestock set ? ";
const hwc_checkexistQuery = "SELECT *, CASE WHEN HWC_WSID = ? THEN 1 WHEN HWC_WSID = ? AND HWC_FULL_NAME = ? THEN 1 WHEN HWC_WSID = ? AND HWC_TALUK_NAME = ? THEN 1 WHEN HWC_WSID = ? AND HWC_VILLAGE_NAME = ? THEN 1 WHEN HWC_WSID = ? AND HWC_OLDPHONE_NUMBER = ? THEN 1 WHEN HWC_WSID = ? AND HWC_NEWPHONE_NUMBER = ? THEN 1 WHEN HWC_WSID = ? AND HWC_SURVEY_NUMBER = ? THEN 1 WHEN HWC_WSID = ? AND HWC_RANGE = ? THEN 1 WHEN HWC_WSID = ? AND HWC_FD_SUB_RANGE = ? THEN 1 ELSE 0 END AS \'PRESENT\' FROM (SELECT * FROM hwc_details WHERE HWC_WSID = ? || HWC_WSID = ? AND HWC_FULL_NAME = ? || HWC_WSID = ? AND HWC_TALUK_NAME = ? || HWC_WSID = ? AND HWC_VILLAGE_NAME = ? || HWC_WSID = ? AND HWC_OLDPHONE_NUMBER = ? || HWC_WSID = ? AND HWC_NEWPHONE_NUMBER = ? || HWC_WSID = ? AND HWC_SURVEY_NUMBER = ? || HWC_WSID = ? AND HWC_RANGE = ? || HWC_WSID = ? AND HWC_FD_SUB_RANGE = ?) AS RESULTSET";
const hwc_insert_dupQuery = "INSERT IGNORE INTO dup_hwc set ? ";
const hwc = {};
var img1, img2, img3, img4, img5, img6, img7, vid1, res_photo, res_sign, ackImg, fdimg1, fdimg2, fdimg3;
const hwc_image1query = "SELECT VALUE FROM HWC_Y4_M6_MEDIA_HWCIMAGE1_BLB where _TOP_LEVEL_AURI = ";
const hwc_image2query = "SELECT VALUE FROM HWC_Y4_M6_MEDIA_HWCIMAGE2_BLB where _TOP_LEVEL_AURI = ";
const hwc_image3query = "SELECT VALUE FROM HWC_Y4_M6_MEDIA_HWCIMAGE3_BLB where _TOP_LEVEL_AURI = ";
const hwc_image4query = "SELECT VALUE FROM HWC_Y4_M6_MEDIA_HWCIMAGE4_BLB where _TOP_LEVEL_AURI = ";
const hwc_image5query = "SELECT VALUE FROM HWC_Y4_M6_MEDIA_HWCIMAGE5_BLB where _TOP_LEVEL_AURI = ";
const hwc_image6query = "SELECT VALUE FROM HWC_Y4_M6_MEDIA_HWCIMAGE6_BLB where _TOP_LEVEL_AURI = ";
const hwc_image7query = "SELECT VALUE FROM HWC_Y4_M6_MEDIA_HWCIMAGE7_BLB where _TOP_LEVEL_AURI = ";
const hwc_video1query = "SELECT VALUE FROM HWC_Y4_M6_MEDIA_HWCVIDEO_BLB where _TOP_LEVEL_AURI = ";
const hwc_resPhotoquery = "SELECT VALUE FROM HWC_Y4_M6_EXITINFO_RESPPHOTO_BLB where _TOP_LEVEL_AURI = ";
const hwc_resSignquery = "SELECT VALUE FROM HWC_Y4_M6_EXITINFO_RESPSIGN_BLB where _TOP_LEVEL_AURI = ";
const hwc_ackimagequery = "SELECT VALUE FROM HWC_Y4_M6_FDSUBMISSION_ACK_IMAGE_BLB where _TOP_LEVEL_AURI = ";
const hwc_fdsub_img1query = "SELECT VALUE FROM HWC_Y4_M6_FDSUBMISSION_SUBIMAGE1_BLB where _TOP_LEVEL_AURI = ";
const hwc_fdsub_img2query = "SELECT VALUE FROM HWC_Y4_M6_FDSUBMISSION_SUBIMAGE2_BLB where _TOP_LEVEL_AURI = ";
const hwc_fdsub_img3query = "SELECT VALUE FROM HWC_Y4_M6_FDSUBMISSION_SUBIMAGE3_BLB where _TOP_LEVEL_AURI = ";

const hwc_media_insertQuery = "INSERT IGNORE INTO hwc_case_image set ? ";
const hwc_media_fdinsertQuery = "INSERT IGNORE INTO hwc_fd_image set ? ";

hwc.syncallhwvdetails = function (req, res) {
    console.log("Syncing HWC . . . . ");
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(fetchquery, function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            // res.send(JSON.stringify(results));
            // console.log(results);
            // inserthwcusercase(JSON.parse(JSON.stringify(results)));
            checkhwcusercase(JSON.parse(JSON.stringify(results)));
        });
    }).catch(err => {
        console.log(err);
    });
}

hwc.setDupRecordDetails = function (req, res) {
    console.log("Inserting the Duplicate record in HWC . . . . ");
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(fetchErrorRecordquery, req.params.id, function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            // res.send(JSON.stringify(results[0]));
            inserthwcusercase(JSON.parse(JSON.stringify(results[0])));
        });
    }).catch(err => {
        console.log(err);
    });
}

function insertionset(ucdata) {
    const ins_set = [
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        ucdata.EXITINFO2_CONCAT_FULLNAME,
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        (!ucdata.EXITINFO2_CONCAT_TALUK) ? null : util.methods.format_taluk(ucdata.EXITINFO2_CONCAT_TALUK),
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        (!ucdata.EXITINFO2_CONCAT_VILLAGE) ? null : ucdata.EXITINFO2_CONCAT_VILLAGE.toLowerCase(),
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        ucdata.EXITINFO2_CONCAT_OLDPHNUM,
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        ucdata.EXITINFO2_CONCAT_NEWPHNUM,
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        ucdata.EXITINFO2_CONCAT_SURVEYNUM.replace("-", "/"),
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        (!ucdata.HWCINFO_RANGE) ? null : util.methods.format_range(ucdata.HWCINFO_RANGE),
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        (!ucdata.FDSUBMISSION_RANGE_FDSUB) ? null : util.methods.format_range(ucdata.FDSUBMISSION_RANGE_FDSUB),
        //WHERE CLAUSE
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        ucdata.EXITINFO2_CONCAT_FULLNAME,
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        (!ucdata.EXITINFO2_CONCAT_TALUK) ? null : util.methods.format_taluk(ucdata.EXITINFO2_CONCAT_TALUK),
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        (!ucdata.EXITINFO2_CONCAT_VILLAGE) ? null : ucdata.EXITINFO2_CONCAT_VILLAGE.toLowerCase(),
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        ucdata.EXITINFO2_CONCAT_OLDPHNUM,
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        ucdata.EXITINFO2_CONCAT_NEWPHNUM,
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        ucdata.EXITINFO2_CONCAT_SURVEYNUM.replace("-", "/"),
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        (!ucdata.HWCINFO_RANGE) ? null : util.methods.format_range(ucdata.HWCINFO_RANGE),
        ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        (!ucdata.FDSUBMISSION_RANGE_FDSUB) ? null : util.methods.format_range(ucdata.FDSUBMISSION_RANGE_FDSUB)
    ];
    return ins_set;
}

function checkhwcusercase(res) {
    Array.from(res).forEach(ucdata => {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(hwc_checkexistQuery, insertionset(ucdata), function (error, ext_result, fields) {
                if (error) {
                    console.log(error);
                    return;
                } else {
                    var resp = JSON.parse(JSON.stringify(ext_result));
                    if (resp.length > 0) {
                        var exist = resp[0].PRESENT;
                        // console.log(ucdata.EXITINFO2_CONCAT_WSID.toUpperCase());
                        if (exist == 0)
                            inserthwcusercase(ucdata);
                        else {
                            // console.log(resp[0].HWC_METAINSTANCE_ID + "::" + ucdata.META_INSTANCE_ID);
                            var MIN_ID = ucdata.META_INSTANCE_ID.split(":");
                            if (resp[0].HWC_METAINSTANCE_ID != MIN_ID[1])
                                insert_duplicates(resp[0].HWC_METAINSTANCE_ID, ucdata.META_INSTANCE_ID);
                        }
                    }
                    else {
                        inserthwcusercase(ucdata);
                    }
                }
            });
        }).catch(err => {
            console.log(err);
        });
    });
}

function insert_duplicates(org_id, dup_id) {

    const inserthwc_dupdataset = {
        HWC_ORG_METAID: org_id,
        HWC_DUP_METAID: dup_id
    }
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(hwc_insert_dupQuery, inserthwc_dupdataset, function (error, dup_result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (dup_result.affectedRows > 0)
                    console.log("HWC Duplicate Record inserted - " + JSON.stringify(dup_result.affectedRows));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

function inserthwcusercase(ucdata) {
    // Array.from(res).forEach(ucdata => {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(hwc_insertQuery, setHWCdata(ucdata), function (error, uc_result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                insert_hwc_crop(ucdata);
                insert_hwc_property(ucdata);
                insert_hwc_livestock(ucdata);
                if (uc_result.affectedRows > 0)
                    console.log("HWC Record inserted :" + JSON.stringify(uc_result.affectedRows));
                // else
                //     console.log("HWC : No new records inserted.");
            }
        });
    }).catch(err => {
        console.log(err);
    });
    // });
}

function insert_hwc_crop(cropdata) {
    var insertcrop_data = [];
    for (var i = 1; i < 5; i++) {
        insertcrop_data[i - 1] = setHWC_cropdata(cropdata, i);
    }
    async.each(insertcrop_data, function (inc_data, callback) {
        if (inc_data) {
            dbconn.mdb.then(function (con_mdb) {
                con_mdb.query(hwc_crop_insertQuery, inc_data, function (error, crop_result, fields) {
                    if (error) {
                        console.log(error);
                        return;
                    } else {
                        if (crop_result.affectedRows > 0)
                            console.log("CR inserted :" + JSON.stringify(crop_result.affectedRows));
                        // else
                        //     console.log("CR : No new records inserted.");
                    }
                });
            }).catch(err => {
                console.log(err);
            })
        }
    }, function (err, data) {
        if (err)
            console.log(err);
    })
}

function insert_hwc_property(pd_data) {
    var insertPD_data = [];
    for (var i = 1; i < 5; i++) {
        insertPD_data[i - 1] = setHWC_propertydata(pd_data, i);
    }
    async.each(insertPD_data, function (inpd_data, callback) {
        if (inpd_data) {
            dbconn.mdb.then(function (con_mdb) {
                con_mdb.query(hwc_property_insertQuery, inpd_data, function (error, property_result, fields) {
                    if (error) {
                        console.log(error);
                        return;
                    } else {
                        if (property_result.affectesRows > 0)
                            console.log("PD inserted :" + JSON.stringify(property_result.affectedRows));
                        // else
                        //     console.log("PD : No new records inserted.");
                    }
                });
            }).catch(err => {
                console.log(err);
            })
        }
    }, function (err, data) {
        if (err)
            console.log(err);
    })
}

function insert_hwc_livestock(lp_data) {
    var insertLP_data = [];
    for (var i = 1; i < 4; i++) {
        insertLP_data[i - 1] = setHWC_livestockdata(lp_data, i);
    }
    async.each(insertLP_data, function (inl_data, callback) {
        if (inl_data) {
            dbconn.mdb.then(function (con_mdb) {
                con_mdb.query(hwc_livestock_insertQuery, inl_data, function (error, livestock_result, fields) {
                    if (error) {
                        console.log(error);
                        return;
                    } else {
                        if (livestock_result.affectedRows > 0)
                            console.log("LS inserted:" + JSON.stringify(livestock_result.affectedRows));
                        // else
                        //     console.log("LS : No new records inserted.");
                    }
                });
            }).catch(err => {
                console.log(err);
            })
        }
    }, function (err, data) {
        if (err)
            console.log(err);
    })
}

function setHWC_cropdata(hwcformdata, pos) {

    var MIN_ID = hwcformdata.META_INSTANCE_ID.split(":");
    const inserthwc_cropdataset = {
        HWC_META_ID: MIN_ID[1] + "_" + pos,
        HWC_CASE_DATE: hwcformdata.HWCINFO_INCIDENTINFO_HWCDATE,
        HWC_WSID: hwcformdata.EXITINFO2_CONCAT_WSID,
        HWC_CROP_NAME: hwcformdata['HWCINFO_CR_GROUP_CR_GROUP' + pos + '_CROP_NAME' + pos],
        HWC_OTHER_CROP_NAME: hwcformdata['HWCINFO_CR_GROUP_CR_GROUP' + pos + '_OTHERCROP' + pos],
        HWC_AREA_GROWN: hwcformdata['HWCINFO_CR_GROUP_CR_GROUP' + pos + '_AREAGROWN_' + pos],
        HWC_AREA_DAMAGE: hwcformdata['HWCINFO_CR_GROUP_CR_GROUP' + pos + '_CROPAREADAMAGE' + pos],
        HWC_CROP_DAMAGE_AMOUNT: hwcformdata['HWCINFO_CR_GROUP_CR_GROUP' + pos + '_CROPESTAMT' + pos],
        HWC_CROP_GEO_SHAPE: hwcformdata['HWCINFO_CR_GROUP_CR_GROUP' + pos + '_CROPGEOSHAPE' + pos],
    }
    if (inserthwc_cropdataset.HWC_CROP_NAME)
        return inserthwc_cropdataset;
    else return null;
}

function setHWC_propertydata(hwcformdata, pos) {

    var MIN_ID = hwcformdata.META_INSTANCE_ID.split(":");
    const inserthwc_property_dataset = {
        HWC_META_ID: MIN_ID[1] + "_" + pos,
        HWC_CASE_DATE: hwcformdata.HWCINFO_INCIDENTINFO_HWCDATE,
        HWC_WSID: hwcformdata.EXITINFO2_CONCAT_WSID,
        HWC_PROPERY_NAME: hwcformdata['HWCINFO_PD_GROUP_PD_GROUP' + pos + '_PROPERTY_NAME' + pos],
        HWC_OTHER_PROPERTY_NAME: hwcformdata['HWCINFO_PD_GROUP_PD_GROUP' + pos + '_OTHERPROPERTY' + pos],
        HWC_PROPERTY_DAMAGE: hwcformdata['HWCINFO_PD_GROUP_PD_GROUP' + pos + '_PROPERTYDAMAGEEXTENT' + pos]
    }
    if (inserthwc_property_dataset.HWC_PROPERY_NAME)
        return inserthwc_property_dataset;
    else return null;
}

function setHWC_livestockdata(hwcformdata, pos) {

    var MIN_ID = hwcformdata.META_INSTANCE_ID.split(":");
    const inserthwc_livestock_dataset = {
        HWC_META_ID: MIN_ID[1] + "_" + pos,
        HWC_CASE_DATE: hwcformdata.HWCINFO_INCIDENTINFO_HWCDATE,
        HWC_WSID: hwcformdata.EXITINFO2_CONCAT_WSID,
        HWC_LIVE_STOCK_NAME: hwcformdata['HWCINFO_LP_GROUP_LP_GROUP' + pos + '_LIVESTOCK_NAME' + pos],
        HWC_OTHER_LIVE_STOCK_NAME: hwcformdata['HWCINFO_LP_GROUP_LP_GROUP' + pos + '_OTHERLIVESTOCK' + pos],
        HWC_LIVE_STOCK_PREDATED_NUMBER: hwcformdata['HWCINFO_LP_GROUP_LP_GROUP' + pos + '_LIVESTOCKPREDATEDNUMBER' + pos]
    }
    if (inserthwc_livestock_dataset.HWC_LIVE_STOCK_NAME)
        return inserthwc_livestock_dataset;
    else return null;
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
        HWC_PARK_NAME: (!hwcformdata.EXITINFO2_CONCAT_PARK) ? null : util.methods.format_park(hwcformdata.EXITINFO2_CONCAT_PARK),
        HWC_TALUK_NAME: (!hwcformdata.EXITINFO2_CONCAT_TALUK) ? null : util.methods.format_taluk(hwcformdata.EXITINFO2_CONCAT_TALUK),
        HWC_VILLAGE_NAME: (!hwcformdata.EXITINFO2_CONCAT_VILLAGE) ? null : hwcformdata.EXITINFO2_CONCAT_VILLAGE.toLowerCase(),
        HWC_OLDPHONE_NUMBER: hwcformdata.EXITINFO2_CONCAT_OLDPHNUM,
        HWC_NEWPHONE_NUMBER: hwcformdata.EXITINFO2_CONCAT_NEWPHNUM,
        HWC_SURVEY_NUMBER: hwcformdata.EXITINFO2_CONCAT_SURVEYNUM.replace("-", "/"),
        HWC_RANGE: (!hwcformdata.HWCINFO_RANGE) ? null : util.methods.format_range(hwcformdata.HWCINFO_RANGE),
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
        HWC_FD_SUB_RANGE: (!hwcformdata.FDSUBMISSION_RANGE_FDSUB) ? null : util.methods.format_range(hwcformdata.FDSUBMISSION_RANGE_FDSUB),
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

function insert_imageset(hwc_data) {
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(hwc_image1query + "'" + hwc_data.META_INSTANCE_ID + "'", function (err, result, fields) {
            if (err) {
                console.log(err);
                return;
            } else {
                var img_buf = JSON.parse(JSON.stringify(result[0].VALUE));
                img1 = !img_buf ? null : new Buffer(img_buf.data, 'binary');//.toString('base64');
                console.log("1");
            }
        });
        con_rdb.query(hwc_image2query + "'" + hwc_data.META_INSTANCE_ID + "'", function (error, result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (result.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(result[0].VALUE));
                    img2 = !img_buf ? null : new Buffer(img_buf.data, 'binary');
                    console.log("2");
                }
            }
        });
        con_rdb.query(hwc_image3query + "'" + hwc_data.META_INSTANCE_ID + "'", function (error, result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (result.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(result[0].VALUE));
                    img3 = !img_buf ? null : new Buffer(img_buf.data, 'binary');
                    console.log("3");
                }
            }
        });
        con_rdb.query(hwc_image4query + "'" + hwc_data.META_INSTANCE_ID + "'", function (error, result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (result.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(result[0].VALUE));
                    img4 = !img_buf ? null : new Buffer(img_buf.data, 'binary');
                    console.log("4");
                }
            }
        });
        con_rdb.query(hwc_image5query + "'" + hwc_data.META_INSTANCE_ID + "'", function (error, result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (result.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(result[0].VALUE));
                    img5 = !img_buf ? null : new Buffer(img_buf.data, 'binary');
                    console.log("5");
                }
            }
        });
        con_rdb.query(hwc_image6query + "'" + hwc_data.META_INSTANCE_ID + "'", function (error, result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (result.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(result[0].VALUE));
                    img6 = !img_buf ? null : new Buffer(img_buf.data, 'binary');
                    console.log("6");
                }
            }
        });
        con_rdb.query(hwc_image7query + "'" + hwc_data.META_INSTANCE_ID + "'", function (error, result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (result.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(result[0].VALUE));
                    img7 = !img_buf ? null : new Buffer(img_buf.data, 'binary');
                    console.log("7");
                }
            }
        });
        con_rdb.query(hwc_video1query + "'" + hwc_data.META_INSTANCE_ID + "'", function (error, result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (result.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(result[0].VALUE));
                    vid1 = !img_buf ? null : new Buffer(img_buf.data, 'binary');
                    console.log("video")
                }
            }
        });
        con_rdb.query(hwc_resPhotoquery + "'" + hwc_data.META_INSTANCE_ID + "'", function (error, result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (result.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(result[0].VALUE));
                    res_photo = !img_buf ? null : new Buffer(img_buf.data, 'binary');
                }
            }
        });
        con_rdb.query(hwc_resSignquery + "'" + hwc_data.META_INSTANCE_ID + "'", function (error, result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (result.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(result[0].VALUE));
                    res_sign = !img_buf ? null : new Buffer(img_buf.data, 'binary');
                }
            }
        });
        con_rdb.query(hwc_ackimagequery + "'" + hwc_data.META_INSTANCE_ID + "'", function (error, result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {

                if (result.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(result[0].VALUE));
                    ackImg = !img_buf ? null : new Buffer(img_buf.data, 'binary');
                }
                insert_imgSet(hwc_data, img1, img2, img3, img4, img5, img6, img7, vid1, res_photo, res_sign, ackImg);
            }
        });
        con_rdb.query(hwc_fdsub_img1query + "'" + hwc_data.META_INSTANCE_ID + "'", function (error, result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (result.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(result[0].VALUE));
                    fdimg1 = !img_buf ? null : new Buffer(img_buf.data, 'binary');
                }
            }
        });
        con_rdb.query(hwc_fdsub_img2query + "'" + hwc_data.META_INSTANCE_ID + "'", function (error, result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (result.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(result[0].VALUE));
                    fdimg2 = !img_buf ? null : new Buffer(img_buf.data, 'binary');
                }
            }
        });
        con_rdb.query(hwc_fdsub_img3query + "'" + hwc_data.META_INSTANCE_ID + "'", function (error, result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (result.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(result[0].VALUE));
                    fdimg3 = !img_buf ? null : new Buffer(img_buf.data, 'binary');
                }
                insert_fdimgSet(hwc_data, fdimg1, fdimg2, fdimg3);
            }
        });
    }).catch(err => {
        console.log("Error Occured :" + err);
    });
}

function insert_imgSet(hwc_data, img_1, img_2, img_3, img_4, img_5, img_6, img_7, vid_1, resPhoto, resSign, ackImage) {
    var MIN_ID = hwc_data.META_INSTANCE_ID.split(":");
    const inserthwc_image_dataset = {
        HWC_META_ID: MIN_ID[1],
        HWC_CASE_DATE: util.methods.GetFormattedDate(hwc_data.HWCINFO_INCIDENTINFO_HWCDATE),
        HWC_WSID: hwc_data.EXITINFO2_CONCAT_WSID.toUpperCase(),
        HWC_CASE_IMAGE1: img_1,
        HWC_CASE_IMAGE2: img_2,
        HWC_CASE_IMAGE3: img_3,
        HWC_CASE_IMAGE4: img_4,
        HWC_CASE_IMAGE5: img_5,
        HWC_CASE_IMAGE6: img_6,
        HWC_CASE_IMAGE7: img_7,
        HWC_CASE_VIDEO: vid_1,
        HWC_CASE_RESP_PHOTO: resPhoto,
        HWC_CASE_RESP_SIGN: resSign,
        HWC_CASE_ACK_IMAGE: ackImage
    }

    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(hwc_media_insertQuery, inserthwc_image_dataset, function (error, result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (result.affectesRows > 0)
                    console.log("images inserted :" + JSON.stringify(result.affectedRows));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

function insert_fdimgSet(hwc_data, img_1, img_2, img_3) {
    var MIN_ID = hwc_data.META_INSTANCE_ID.split(":");
    const inserthwc_image_dataset = {
        HWC_META_ID: MIN_ID[1],
        HWC_CASE_DATE: util.methods.GetFormattedDate(hwc_data.HWCINFO_INCIDENTINFO_HWCDATE),
        HWC_WSID: hwc_data.EXITINFO2_CONCAT_WSID.toUpperCase(),
        HWC_CASE_IMAGE1: img_1,
        HWC_CASE_IMAGE2: img_2,
        HWC_CASE_IMAGE3: img_3
    }

    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(hwc_media_fdinsertQuery, inserthwc_image_dataset, function (error, result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (result.affectesRows > 0)
                    console.log("fdimages inserted :" + JSON.stringify(result.affectedRows));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

hwc.syncimg = function (req, res) {
    console.log("Syncing Image . . . . ");
    const dataset = {
        META_INSTANCE_ID: "uuid:d6ea1b05-ceef-4e79-97df-612dbc3584dd",
        HWCINFO_INCIDENTINFO_HWCDATE: util.methods.GetFormattedDate("2019-01-09 09:30:09.337000"),
        EXITINFO2_CONCAT_WSID: "AAF_335"
    }
    insert_imageset(dataset);

}


exports.func = hwc;