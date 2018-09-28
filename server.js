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
var dash_chartfunc = require('./dashboard_api/hwc_info');

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

app.get("/", function (req, res) { res.send("[ Home - Page of API's (V1.1.2)]") });

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
app.post("/getBpNhByRange", reportDCfunc.report.getBpNhByRange);
app.get("/getPreviousBpNhCount", reportDCfunc.report.getPreviousBpNhCount);
app.post("/getBpByCategory", reportDCfunc.report.getBpByCategory);
app.post("/getNhByCategory", reportDCfunc.report.getNhByCategory);
app.post("/getBpNhByCategory", reportDCfunc.report.getBpNhByCategory);
app.get("/getBpNhYearly", reportDCfunc.report.getBpNhYearly);

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

// //observer
setInterval(hwcSyncfunc.func.syncallhwvdetails, 1000 * 60 * 1);
setInterval(dcSyncfunc.func.syncformdailyusers, 1000 * 60 * 1);
setInterval(comSyncfunc.func.syncallcompensationdetails, 1000 * 60 * 1);
setInterval(pubSyncfunc.func.syncallformpublicitydata, 1000 * 60 * 1);

app.listen(port, () => console.log("Server running on port %d", port));