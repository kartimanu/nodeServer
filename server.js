const userfunctions = require('./callfunctions/userfunctions');
const dcfunctions = require('./callfunctions/dcfunctions');
const pubfunctions = require('./callfunctions/pubfunctions');
var db = require('./config/db');
var pubSyncfunc = require('./datacheck/publicity');
var dcSyncfunc = require('./datacheck/dailycount');
var comSyncfunc = require('./datacheck/compensation');

var bodyParser = require("body-parser");
var express = require("express");
var cors = require("cors");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var port = process.env.port || 2000;
// var router = express.Router();

app.get("/", comSyncfunc.func.syncallcompensationdetails);
// function(req,res){res.send("[ Home - Page of API's ]")});

app.get("/users", userfunctions.caller.getusers);
app.post("/createuser", userfunctions.caller.createUser);
app.get("/deleteuser/:id", userfunctions.caller.deleteUser);
app.post("/updateuser", userfunctions.caller.updateUser);

app.get("/getDailyCountAO", dcfunctions.caller.getdailyDAO);
app.get("/getDailyCountFA/:id", dcfunctions.caller.getFAusers);
app.get("/getallDC", dcfunctions.caller.getDailyCount);


app.get("/getpublicity", pubfunctions.caller.getpubdata);

//observer
setInterval(pubSyncfunc.func.syncallformpublicitydata, 1000 * 60 * 90);
setInterval(dcSyncfunc.func.syncformdailyusers, 1000 * 60 * 60);

app.listen(port, () => console.log("Server running on port %d", port));