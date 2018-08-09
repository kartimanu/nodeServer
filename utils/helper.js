const utils = {};

utils.GetFormattedDate = function (convertdate) {
    var todayTime = new Date(convertdate);
    return ((todayTime.getFullYear()) + "-" + (todayTime.getMonth() + 1) + "-" + todayTime.getDate() + " " + (todayTime.getHours()) + ":" + (todayTime.getMinutes()) + ":" + (todayTime.getSeconds()));
}

utils.GetDAY = function (convertdate) {
    var todayTime = new Date(convertdate);
    return todayTime.getDate();
}

utils.GetMONTH = function (convertdate) {
    var todayTime = new Date(convertdate);
    return (todayTime.getMonth() + 1);
}

utils.GetYEAR = function (convertdate) {
    var todayTime = new Date(convertdate);
    return todayTime.getFullYear();
}

utils.GetRandomId = function () {
    return Math.floor((Math.random() * 100000) + 100);
}

utils.seterror = function (msg) {
    return JSON.stringify({
        "status": 404,
        "error": msg
    })
}

utils.setresponse = function (result) {
    return JSON.stringify({
        "status": 200,
        "response": result
    })
}


exports.methods = utils;