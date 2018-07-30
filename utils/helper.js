const utils = {};

utils.GetFormattedDate = function(convertdate) {
    var todayTime = new Date(convertdate);
    return (todayTime.getFullYear() + "-" + (todayTime.getMonth()+ 1) + "-" + (todayTime.getDate()) +" "+(todayTime .getHours()) +":"+(todayTime .getMinutes())+":"+(todayTime .getSeconds()));
}


exports.methods = utils;