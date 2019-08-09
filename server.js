const userfunctions = require('./callfunctions/userfunctions');
const dcfunctions = require('./callfunctions/dcfunctions');
const pubfunctions = require('./callfunctions/pubfunctions');
const hwcfunctions = require('./callfunctions/hwcfunctions');
const csfunctions = require('./callfunctions/csfunctions');
const comfunctions = require('./callfunctions/comfunctions');
const errfunctions = require('./callfunctions/errorfunctions');
var pubSyncfunc = require('./datacheck/publicity');
var dcSyncfunc = require('./datacheck/dailycount');
var comSyncfunc = require('./datacheck/compensation');
var hwcSyncfunc = require('./datacheck/hwc');
var ImageSyncfunc = require('./datacheck/images');
var reportDCfunc = require('./reports/dc_reports');
var reportHWCfunc = require('./reports/hwc_reports');
var dash_chart_homefunc = require('./dashboard_api/home_info');
var dash_chartfunc = require('./dashboard_api/hwc_info');
var dash_chart_compfunc = require('./dashboard_api/comp_info');
var dash_chart_dcfunc = require('./dashboard_api/dc_info');
var dash_chart_pubfunc = require('./dashboard_api/pub_info');

var bodyParser = require("body-parser");
var express = require("express");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var app = express();

var port = process.env.port || 8080;
// var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Accept');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
    // res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
});
// app.use(function (req, res, next) {
//     if (req.url !== '/authUser' && req.url !== "/") {
//         var token = req.headers['authorization'];
//         if (token) {
//             try {
//                 var decoded = jwt.verify(token, 'sysarks');
//                 if (decoded) {
//                     req.decoded = decoded;
//                     next();
//                 }
//             } catch (err) {
//                 return res.status(403).send({ success: false, message: 'Invalid token' })
//             }
//         }
//         else {
//             return res.status(403).send({ success: false, message: 'no token provided' })
//         }
//     } else {
//         next();
//     }
// })

app.get("/", function (req, res) { res.send("[ Home - Page of API's (V1.1.24.0) ]") });

//Report API's - Daily Count
app.get("/getDCreportbyMonth", reportDCfunc.report.getdailycount);
app.get("/getDCreportbyday", reportDCfunc.report.getdailycountbyday);
app.post("/getDCreportbyrange", reportDCfunc.report.getdailycountbyrange);

//Report API's - HWC
app.get("/getHWCreport_byCat", reportHWCfunc.report.getHWC_byCat);
app.get("/getHWCreport_bycases", reportHWCfunc.report.getHWC_caseattended);
app.get("/getHWCreport_byday", reportHWCfunc.report.getHWC_eachday);
app.post("/getHWCreport_bycases_range", reportHWCfunc.report.getHWC_caseattended_byrange);
app.post("/getHWCreport_byday_range", reportHWCfunc.report.getHWC_eachday_byrange);
app.post("/getHWCreport_byspacial_range", reportHWCfunc.report.getHWC_bySpacial_byrange);

app.post("/authUser", userfunctions.caller.authUser);
app.get("/users", userfunctions.caller.getusers);
app.post("/createuser", userfunctions.caller.createUser);
app.get("/deleteuser/:id", userfunctions.caller.deleteUser);
app.post("/updateuser", userfunctions.caller.updateUser);

app.get("/getDailyCountAO", dcfunctions.caller.getdailyDAO);
app.get("/getDailyCountFA/:id", dcfunctions.caller.getFAusers);
app.get("/getallDC", dcfunctions.caller.getDailyCount);

app.get("/getCompensation_OM", comfunctions.caller.getOMdetails);
app.get("/getOM_cases/:id", comfunctions.caller.getOM_casedetails);

app.get("/getpublicity", pubfunctions.caller.getpubdata);

app.get("/getallhwc", hwcfunctions.caller.get_all_hwc);
app.get("/gethwc", hwcfunctions.caller.get_hwc);
app.get("/gethwc/:id", hwcfunctions.caller.get_hwcall_byid);

app.get("/getcase_users", csfunctions.caller.get_case_users);
app.get("/img", pubfunctions.caller.getpubImg);

//HWC FLAGGING API's
app.get("/getDuplicateRecord/:id", errfunctions.caller.get_hwcDuplicateData);
app.get("/getParentRecord/:id", errfunctions.caller.get_hwcParentData);
app.get("/getErrorRecords", errfunctions.caller.get_errorRecords);
app.post("/updateParentRecord", errfunctions.caller.update_hwcParentData);
app.get("/updateErrorRecord/:id", errfunctions.caller.update_errorRecord);
app.get("/insertErrorRecord/:id", hwcSyncfunc.func.setDupRecordDetails);
app.get("/getImage/:metaid", hwcSyncfunc.func.getRawImage);
app.post("/getMarked", errfunctions.caller.get_markDuplicateData);

//Home API's
app.post("/getBpNhByRange", dash_chart_homefunc.report.getBpNhByRange);
app.post("/getBpByCategory", dash_chart_homefunc.report.getBpByCategory);
app.post("/getNhByCategory", dash_chart_homefunc.report.getNhByCategory);
app.post("/getBpNhByCategory", dash_chart_homefunc.report.getBpNhByCategory);
//Query By Puttayya ---Start---
app.post("/getBpNhByDate_all", dash_chart_homefunc.report.getBPNH_Bydate);
app.get("/getBpNh_prevday_all", dash_chart_homefunc.report.getBPNH_prevday);
app.get("/getBpNh_projectyr", dash_chart_homefunc.report.getParkTotal_ByProjectYear);
app.get("/getBpNh_cat_projectyr", dash_chart_homefunc.report.getParknCategory_ByProjectYear);
app.post("/getdcvshwc", dash_chart_homefunc.report.getdcvshwc);
app.post("/getdcvshwc_category", dash_chart_homefunc.report.getdcvshwcCategory);
app.get("/getOverallCompensation", dash_chart_homefunc.report.OverallCompensation);
app.post("/getCompensation_ByDate", dash_chart_homefunc.report.getCompensationByDate);
app.post("/getCompensation_ByCategory", dash_chart_homefunc.report.getCompensationByCategory);
app.post("/getCompensation_ProcessedDays", dash_chart_homefunc.report.getTimeTakenForCompensation);
app.post("/getCompensation_TotalProcessedDays", dash_chart_homefunc.report.getTotalTimeTakenForCompensation);
app.post("/getCompensation_TotalProcessedDays_ByCategory", dash_chart_homefunc.report.getTotalTimeTakenForCompensationByCategory);

app.post("/getCompensation_ByProjectYear", dash_chart_homefunc.report.getCompensation_ByProjectYear);
app.post("/getCompensation_ByCategory_ProjectYear", dash_chart_homefunc.report.getCompensation_ByCategory_ByProjectYear);
app.post("/getCompensation_ByProjectYear_ByCategoryInSheet", dash_chart_homefunc.report.getCompensation_ByCategorySheet_ByProjectYear);
app.post("/getCompensation_ByProjectYear_BYCategory", dash_chart_homefunc.report.getCompensation_ByCategoryAll_ByProjectYear);
app.post("/getCompensation_ByProjectYear_BYSheet", dash_chart_homefunc.report.getCompensationBySheet_ByProjectYear);

//--- END ---

app.post("/getBp_Nh_cat_projectyr", dash_chart_homefunc.report.getPark_ByProjectYear);
app.post("/getCategorybyYear", dash_chart_homefunc.report.getCategoryByYear);
app.post("/getTotalCasesbyYear", dash_chart_homefunc.report.getTotalCasesByYear);
app.post("/getcases_byrange", dash_chart_homefunc.report.getRange_all);
app.post("/getpark_yearmonth", dash_chart_homefunc.report.getPark_ByYearnMonth);
app.post("/getTimeTaken_HWCdate_FDdate", dash_chart_homefunc.report.getTimeTaken_btwHWCFD_date);
app.post("/getTimeTaken_HWCdate_FDdate_Total", dash_chart_homefunc.report.getTimeTaken_btwHWCFD_Total);
app.post("/getAvgTimeTaken_HWCdate_FDdate", dash_chart_homefunc.report.getAvgTimeTaken_btwHWCFD);
app.post("/getcases_DCvsHWC", dash_chart_homefunc.report.getcases_dcvshwc);
app.post("/getFAcases_DCvsHWC", dash_chart_homefunc.report.getFAcases_dcvshwc);

app.get("/getPark_Previousday", dash_chart_homefunc.report.getPreviousBpNhCount);
app.get("/getpark_yearwise", dash_chart_homefunc.report.get_park_Yearly);
app.get("/getparkcategory_yearwise", dash_chart_homefunc.report.get_park_cat_Yearly);
app.get("/getpark_byProject", dash_chart_homefunc.report.getTotalCasesByProjectYear);
app.get("/getparkcategory_byProject", dash_chart_homefunc.report.getcategoryByProjectYear);
app.get("/gettopvillages", dash_chart_homefunc.report.getTopVillages);
app.get("/gettopvillages_bycategory", dash_chart_homefunc.report.getTopVillages_Bycategory_all);

//HWC
app.get("/getblock1", dash_chartfunc.report.getHWC_block1);
//formatted to category order ('CR','CRPD','PD','LP','HI','HD')
app.post("/getblock1_byhwcdate", dash_chartfunc.report.getHWC_block1_byhwcdate);
app.post("/getblock1_byfadate", dash_chartfunc.report.getHWC_block1_byfadate);
app.post("/getblock2_byhwcdate_freq", dash_chartfunc.report.getfreq_block2_byhwcdate);
app.post("/getblock2_byfadate_freq", dash_chartfunc.report.getfreq_block2_byfadate);
app.get("/getblock2_totalcases_byyear_month", dash_chartfunc.report.get_cases_byyear_month_block2);
app.get("/getblock2_totalcases_byprojectyear", dash_chartfunc.report.getFreqCasesByProjectYear);
app.get("/getblock2_top20cases_bycat", dash_chartfunc.report.get_top20cases_bycat_block2);
app.get("/getblock2_top50cases_bywsid", dash_chartfunc.report.get_top50cases_bywsid_block2);
app.get("/getblock3_topcases", dash_chartfunc.report.get_topfreq_block3);
app.get("/get_incidents_all", dash_chartfunc.report.get30incidents);
app.get("/get_wsidincidents_bycat", dash_chartfunc.report.getwsidincidents_bycategory);
app.get("/get_villageincidents_bycat", dash_chartfunc.report.getvillageincidents_bycategory);
app.get("/get_rangeincidents_bycat", dash_chartfunc.report.getrangeincidents_bycategory);
app.post("/get_HWC_DB", dash_chartfunc.report.get_HWCDB_projectwise);
app.post("/get_DC_DB", dash_chartfunc.report.get_DCDB_projectwise);
app.post("/get_PUB_DB", dash_chartfunc.report.get_PUBDB_projectwise);
app.post("/get_COMP_DB", dash_chartfunc.report.get_COMPDB_projectwise);
app.post("/get_FA_ByDate_Category", dash_chartfunc.report.get_FA_bydateCategory);
app.post("/get_AVG_SubTime_ByFA", dash_chartfunc.report.get_FA_AVG_bySubTime);

//New MAP APi's
app.post("/get_MAP_byanimal", dash_chartfunc.report.get_HWC_mapbyanimal);
app.post("/get_MAP_bycategory", dash_chartfunc.report.get_HWC_mapbycategory);
app.post("/get_MAP_bycat_CR", dash_chartfunc.report.get_HWC_mapbyCR);
app.post("/get_MAP_bycat_CRPD", dash_chartfunc.report.get_HWC_mapbyCRPD);
app.post("/get_MAP_bycat_PD", dash_chartfunc.report.get_HWC_mapbyPD);
app.post("/get_MAP_bycat_LP", dash_chartfunc.report.get_HWC_mapbyLP);
app.post("/get_MAP_bycat_HI", dash_chartfunc.report.get_HWC_mapbyHI);
app.post("/get_MAP_bycat_HD", dash_chartfunc.report.get_HWC_mapbyHD);
app.post("/get_MAP_byFA", dash_chartfunc.report.get_HWC_mapbyFA);
app.post("/getpublicity_mapincidents_bydate", dash_chart_pubfunc.report.get_mapincidents_byrange);

//Compensation
app.get("/gettotalcomp", dash_chart_compfunc.report.get_total_comp);
app.get("/gettotalcomp_bycategory", dash_chart_compfunc.report.get_total_comp_bycategory);
app.get("/getcomp_omsheet", dash_chart_compfunc.report.getcomp_omsheet);
app.post("/getcomp_omsheet_bydate", dash_chart_compfunc.report.getcomp_omsheetbydate);
app.post("/getcomp_filter", dash_chart_compfunc.report.get_comp_block12_bydate);
app.post("/get_top_comp", dash_chart_compfunc.report.get_comp_topwsid_topvillage);
app.post("/getcomp_amt_omsheetdate", dash_chart_compfunc.report.getcompamount_byomsheetdate);
app.post("/getcomp_amt_omsheetdate_bycategory", dash_chart_compfunc.report.getcompamount_omsheetdate_bycategory);
app.post("/getcomp_byomsheet", dash_chart_compfunc.report.getcomp_byomsheet);
app.post("/getcomp_byomsheetdate", dash_chart_compfunc.report.getcomp_byomsheetdate);
app.post("/getcomp_byFDrange", dash_chart_compfunc.report.getcomp_byFDdate);

//Daily Count
app.get("/gettotaldc", dash_chart_dcfunc.report.get_total_dc);
app.post("/getdc_total_hwc_bydate", dash_chart_dcfunc.report.get_dc_bydate);

//Publicity
app.get("/getpublicity_total", dash_chart_pubfunc.report.get_publicity_total);
app.get("/getpublicity_all", dash_chart_pubfunc.report.get_publicity);
//Query by puttayya -- start --
app.get("/getpublicity_village_freq", dash_chart_pubfunc.report.get_villagevisit_freq);
app.get("/getpublicity_village_FA", dash_chart_pubfunc.report.get_villagevisit_byFA);
app.post("/getpublicity_village_freq_bydate", dash_chart_pubfunc.report.get_villagevisit_freq_bydate);
app.post("/getpublicity_village_FA_bydate", dash_chart_pubfunc.report.get_villagevisit_byFA_bydate);
//-- end --
app.post("/getpublicity_bydate", dash_chart_pubfunc.report.get_pub_bydate);
app.get("/getpublicity_mapincidents", dash_chart_pubfunc.report.get_mapincidents);

//Data Sync
app.get("/syncdata", function (req, res) {
    res.send(JSON.stringify({
        "status": 200,
        "response": "Syncing in progress"
    }));
    syncData();
});

// //observer
// setInterval(hwcSyncfunc.func.syncallhwvdetails, 1000 * 60 * 60 * 12);
// setInterval(dcSyncfunc.func.syncformdailyusers, 1000 * 60 * 60 * 12);
// setInterval(comSyncfunc.func.syncallcompensationdetails, 1000 * 60 * 60 * 12);
// setInterval(pubSyncfunc.func.syncallformpublicitydata, 1000 * 60 * 60 * 12);

// setTimeout(hwcSyncfunc.func.syncimg, 1000);
// setTimeout(ImageSyncfunc.func.getForm, 1000);

function syncData() {
    console.log("Syncing.....");
    setTimeout(hwcSyncfunc.func.syncallhwcdetails, 1000 * 1);
    // setTimeout(dcSyncfunc.func.syncformdailyusers, 1000 * 30);
    // setTimeout(comSyncfunc.func.syncallcompensationdetails, 1000 * 60);
    // setTimeout(pubSyncfunc.func.syncallformpublicitydata, 1000 * 90);
}

app.listen(port, () => console.log("Server running on port %d", port));