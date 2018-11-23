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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
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
var port = process.env.port || 8080;
// var router = express.Router();

app.get("/", function (req, res) { res.send("[ Home - Page of API's (V1.1.7)]") });

app.get("/getDCreportbyMonth", reportDCfunc.report.getdailycount);
app.get("/getDCreportbyday", reportDCfunc.report.getdailycountbyday);
app.post("/getDCreportbyrange", reportDCfunc.report.getdailycountbyrange);

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

app.get("/getDuplicateRecord/:id",errfunctions.caller.get_hwcDuplicateData);
app.get("/getParentRecord/:id",errfunctions.caller.get_hwcParentData);
app.get("/getErrorRecords",errfunctions.caller.get_errorRecords);
app.post("/updateParentRecord",errfunctions.caller.update_hwcParentData);
app.get("/updateErrorRecord/:id",errfunctions.caller.update_errorRecord);
app.get("/insertErrorRecord/:id",hwcSyncfunc.func.setDupRecordDetails);


//home
app.post("/getBpNhByRange", dash_chart_homefunc.report.getBpNhByRange);
app.get("/getPreviousBpNhCount", dash_chart_homefunc.report.getPreviousBpNhCount);
app.post("/getBpByCategory", dash_chart_homefunc.report.getBpByCategory);
app.post("/getNhByCategory", dash_chart_homefunc.report.getNhByCategory);
app.post("/getBpNhByCategory", dash_chart_homefunc.report.getBpNhByCategory);
app.get("/getBpNhYearly", dash_chart_homefunc.report.getBpNhYearly);

//HWC
app.get("/getblock1",dash_chartfunc.report.getHWC_block1);
app.post("/getblock1_byhwcdate",dash_chartfunc.report.getHWC_block1_byhwcdate);
app.post("/getblock1_byfadate",dash_chartfunc.report.getHWC_block1_byfadate);
app.post("/getblock2_byhwcdate_freq",dash_chartfunc.report.getfreq_block2_byhwcdate);
app.post("/getblock2_byfadate_freq",dash_chartfunc.report.getfreq_block2_byfadate);
app.get("/getblock2_totalcases_byyear_month",dash_chartfunc.report.get_cases_byyear_month_block2);
app.get("/getblock2_top20cases_bycat",dash_chartfunc.report.get_top20cases_bycat_block2);
app.get("/getblock2_top50cases_bywsid",dash_chartfunc.report.get_top50cases_bywsid_block2);
app.get("/getblock3_topcases",dash_chartfunc.report.get_topfreq_block3);

//Compensation
app.get("/gettotalcomp",dash_chart_compfunc.report.get_total_comp);
app.post("/getcomp_filter",dash_chart_compfunc.report.get_comp_block12_bydate);
app.post("/get_top_comp",dash_chart_compfunc.report.get_comp_topwsid_topvillage);

//Daily Count
app.get("/gettotaldc",dash_chart_dcfunc.report.get_total_dc);
app.post("/getdc_total_hwc_bydate",dash_chart_dcfunc.report.get_dc_bydate);

//Publicity
app.get("/getpublicity_total",dash_chart_pubfunc.report.get_publicity_total);
app.get("/getpublicity_all",dash_chart_pubfunc.report.get_publicity);
app.post("/getpublicity_bydate",dash_chart_pubfunc.report.get_pub_bydate);

//Data Sync
app.get("/syncdata",function(req,res){
    res.send("Syncing Started...");syncData();});

// //observer
function syncData(){
    setTimeout(hwcSyncfunc.func.syncallhwvdetails, 1000 * 1 );
    setTimeout(dcSyncfunc.func.syncformdailyusers, 1000 * 30 );
    setTimeout(comSyncfunc.func.syncallcompensationdetails, 1000 * 60);
    setTimeout(pubSyncfunc.func.syncallformpublicitydata, 1000 * 90);
}

app.listen(port, () => console.log("Server running on port %d", port));