const utils = {};

utils.GetFormattedDate = function (convertdate) {
    var todayTime = new Date(convertdate);
    return (todayTime.getFullYear() + "-" + (todayTime.getMonth() + 1) + "-" + (todayTime.getDate()) + " " + (todayTime.getHours()) + ":" + (todayTime.getMinutes()) + ":" + (todayTime.getSeconds()));
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