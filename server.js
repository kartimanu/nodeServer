const userfunctions = require('./callfunctions/userfunctions');
const dcfunctions = require('./callfunctions/dcfunctions');
var db = require('./config/db');
var pubfunc = require('./callfunctions/pubfunctions');

var bodyParser = require("body-parser");
var express = require("express");
var cors = require("cors");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
var port = process.env.port || 2000;
// var router = express.Router();

app.get("/", pubfunc.caller.getformdata); 
    // res.send(
    //     "[ Home - Page of API's ]"
    // )
// });

app.get("/users", userfunctions.caller.getusers);
app.post("/createuser", userfunctions.caller.createUser);
app.get("/deleteuser/:id", userfunctions.caller.deleteUser);
app.post("/updateuser", userfunctions.caller.updateUser);

app.get("/forms/getDailyCountUsers", dcfunctions.caller.getformdailyusers);
app.get("/getDailyCountUsers", dcfunctions.caller.getdailyusers);
app.get("/getDailyCountUser/:id", dcfunctions.caller.getFOuser);
app.get("/getallFA/:id", dcfunctions.caller.getallFAusers);


//observer
setInterval(dcfunctions.caller.checkdailyusers, 1000 * 60 * 5)

app.listen(port, () => console.log("Server running on port %d", port));