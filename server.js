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

app.get("/", function (req, res) { res.send("[ Home - Page of API's (V1.1.12) ]") });

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

app.get("/getDuplicateRecord/:id", errfunctions.caller.get_hwcDuplicateData);
app.get("/getParentRecord/:id", errfunctions.caller.get_hwcParentData);
app.get("/getErrorRecords", errfunctions.caller.get_errorRecords);
app.post("/updateParentRecord", errfunctions.caller.update_hwcParentData);
app.get("/updateErrorRecord/:id", errfunctions.caller.update_errorRecord);
app.get("/insertErrorRecord/:id", hwcSyncfunc.func.setDupRecordDetails);


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
app.get("/getBp_Nh_cat_projectyr", dash_chart_homefunc.report.getPark_ByProjectYear);
app.get("/getpark_yearmonth", dash_chart_homefunc.report.getPark_ByYearnMonth);
//--- END ---

app.get("/getPark_Previousday", dash_chart_homefunc.report.getPreviousBpNhCount);
app.get("/getCategorybyYear", dash_chart_homefunc.report.getCategoryByYear);

app.get("/getTotalCasesbyYear", dash_chart_homefunc.report.getTotalCasesByYear);
app.get("/getpark_yearwise", dash_chart_homefunc.report.get_park_Yearly);
app.get("/getparkcategory_yearwise", dash_chart_homefunc.report.get_park_cat_Yearly);
app.get("/getpark_byProject", dash_chart_homefunc.report.getTotalCasesByProjectYear);
app.get("/getparkcategory_byProject", dash_chart_homefunc.report.getcategoryByProjectYear);
app.get("/gettopvillages", dash_chart_homefunc.report.getTopVillages);
app.get("/gettopvillages_bycategory", dash_chart_homefunc.report.getTopVillages_Bycategory_all);
app.get("/getcases_byrange", dash_chart_homefunc.report.getRange_all);

//HWC
app.get("/getblock1", dash_chartfunc.report.getHWC_block1);
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

//Compensation
app.get("/gettotalcomp", dash_chart_compfunc.report.get_total_comp);
app.post("/getcomp_filter", dash_chart_compfunc.report.get_comp_block12_bydate);
app.post("/get_top_comp", dash_chart_compfunc.report.get_comp_topwsid_topvillage);

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

function syncData() {
    console.log("Syncing.....");
    setTimeout(hwcSyncfunc.func.syncallhwvdetails, 1000 * 1);
    setTimeout(dcSyncfunc.func.syncformdailyusers, 1000 * 30);
    setTimeout(comSyncfunc.func.syncallcompensationdetails, 1000 * 60);
    setTimeout(pubSyncfunc.func.syncallformpublicitydata, 1000 * 90);
}

app.listen(port, () => console.log("Server running on port %d", port));