const procedure = {};

procedure.bypark = function () {
    return "SELECT SUM(DC_NH_CASES) AS TOTAL_NH_CASES, SUM(DC_BP_CASES) AS TOTAL_BP_CASES FROM daily_count";
};

procedure.byFA = function () {
    const sum = "SUM(DC_CROP+DC_CROP_PROPERTY+DC_PROPERTY+DC_LIVESTOCK+DC_HUMAN_INJURY+DC_HUMAN_DEATH) AS TOTAL_CASES_BY_FA";
    return "SELECT DC_FA_UN AS FA_NAME, " + sum + " FROM dc_cases GROUP BY DC_FA_UN";
};

procedure.byHWCType = function () {
    return "SELECT SUM(DC_CROP) AS CROP_SUM, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY_SUM, SUM(DC_PROPERTY) AS PROPERTY_SUM, SUM(DC_LIVESTOCK) AS LIVESTOCK_SUM, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY_SUM, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH_SUM FROM dc_cases";
};

procedure.byHWCType_day = function () {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%y') AS CASE_DATE, SUM(DC_CROP) AS CROP_SUM, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY_SUM, SUM(DC_PROPERTY) AS PROPERTY_SUM, SUM(DC_LIVESTOCK) AS LIVESTOCK_SUM, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY_SUM, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH_SUM FROM dc_cases GROUP BY DC_CASE_DATE ORDER BY DC_CASE_DATE DESC";
};

procedure.byFA_day = function () {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%y') AS CASE_DATE, DC_FA_UN AS FA_NAME,  sum(DC_CROP + DC_CROP_PROPERTY + DC_PROPERTY + DC_LIVESTOCK + DC_HUMAN_DEATH + DC_HUMAN_INJURY) AS TOTAL_CASES_FA  FROM  dc_cases GROUP BY concat(DC_CASE_DATE,'_',DC_FA_UN) ORDER BY DC_CASE_DATE DESC";
};

procedure.bypark_day = function () {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%y') AS CASE_DATE, SUM(DC_NH_CASES) AS TOTAL_NH_CASES, SUM(DC_BP_CASES) AS TOTAL_BP_CASES FROM daily_count GROUP BY DC_CASE_DATE ORDER BY DC_CASE_DATE DESC";
};

procedure.bypark_range = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, SUM(DC_NH_CASES) AS TOTAL_NH_CASES, SUM(DC_BP_CASES) AS TOTAL_BP_CASES FROM daily_count WHERE (DATE_FORMAT(DC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) GROUP BY DC_CASE_DATE ORDER BY DC_CASE_DATE DESC";
};
procedure.byHWCType_range = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, SUM(DC_CROP) AS CROP_SUM, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY_SUM, SUM(DC_PROPERTY) AS PROPERTY_SUM, SUM(DC_LIVESTOCK) AS LIVESTOCK_SUM, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY_SUM, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH_SUM FROM dc_cases WHERE (DATE_FORMAT(DC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) GROUP BY DC_CASE_DATE ORDER BY DC_CASE_DATE DESC";
};

procedure.byFA_range = function (fromdate, todate) {
    return "SELECT  DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, DC_FA_UN AS FA_NAME,  sum(DC_CROP + DC_CROP_PROPERTY + DC_PROPERTY + DC_LIVESTOCK + DC_HUMAN_DEATH + DC_HUMAN_INJURY) AS TOTAL_CASES_FA  FROM  dc_cases WHERE (DATE_FORMAT(DC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) GROUP BY concat(DC_CASE_DATE,'_',DC_FA_UN) ORDER BY DC_CASE_DATE DESC";
};

procedure.gethwc_byNP = function () {
    return "SELECT HWC_PARK_NAME AS NATIONAL_PARK, Count(HWC_PARK_NAME) AS NO_OF_CASES FROM hwc_details group by HWC_PARK_NAME";
}

procedure.gethwc_byFA = function () {
    return "SELECT HWC_USER_NAME AS FIELD_ASSISTANT, Count(HWC_USER_NAME) AS NO_OF_CASES FROM hwc_details group by HWC_USER_NAME";
}

procedure.gethwc_byCAT = function () {
    return "SELECT HWC_CASE_CATEGORY AS CASE_CATEGORY, Count(HWC_CASE_CATEGORY) AS NO_OF_CASES FROM hwc_details group by HWC_CASE_CATEGORY";
}

procedure.gethwc_byNP_byday = function () {
    return "SELECT HWC_CASE_DATE AS CASE_DATE, HWC_PARK_NAME AS NATIONAL_PARK, Count(HWC_PARK_NAME) AS NO_OF_CASES FROM hwc_details group by HWC_PARK_NAME, HWC_CASE_DATE order by HWC_CASE_DATE";
}

procedure.gethwc_byFA_byday = function () {
    return "SELECT HWC_CASE_DATE AS CASE_DATE, HWC_USER_NAME AS FIELD_ASSISTANT, Count(HWC_USER_NAME) AS NO_OF_CASES FROM hwc_details group by HWC_USER_NAME, HWC_CASE_DATE order by HWC_CASE_DATE;";
}

procedure.gethwc_byCAT_byday = function () {
    return "SELECT HWC_CASE_DATE AS CASE_DATE,HWC_CASE_CATEGORY AS CASE_CATEGORY, Count(HWC_CASE_CATEGORY) AS NO_OF_CASES FROM hwc_details group by HWC_CASE_CATEGORY, HWC_CASE_DATE order by HWC_CASE_DATE;";
}

procedure.gethwc_byNP_range = function (fromdate, todate) {
    return "SELECT HWC_PARK_NAME AS NATIONAL_PARK, Count(HWC_PARK_NAME) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_PARK_NAME";
}

procedure.gethwc_byFA_range = function (fromdate, todate) {
    return "SELECT HWC_USER_NAME AS FIELD_ASSISTANT, Count(HWC_USER_NAME) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_USER_NAME";
}

procedure.gethwc_byCAT_range = function (fromdate, todate) {
    return "SELECT HWC_CASE_CATEGORY AS CASE_CATEGORY, Count(HWC_CASE_CATEGORY) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_CASE_CATEGORY";
}

procedure.gethwc_byNP_byday_byrange = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, HWC_PARK_NAME AS NATIONAL_PARK, Count(HWC_PARK_NAME) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_PARK_NAME, HWC_CASE_DATE order by HWC_CASE_DATE";
}

procedure.gethwc_byFA_byday_byrange = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, HWC_USER_NAME AS FIELD_ASSISTANT, Count(HWC_USER_NAME) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_USER_NAME, HWC_CASE_DATE order by HWC_CASE_DATE;";
}

procedure.gethwc_byCAT_byday_byrange = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE,HWC_CASE_CATEGORY AS CASE_CATEGORY, Count(HWC_CASE_CATEGORY) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_CASE_CATEGORY, HWC_CASE_DATE order by HWC_CASE_DATE;";
}

procedure.gethwc_byNP_byrange = function (fromdate, todate) {
    return "SELECT HWC_PARK_NAME AS NATIONAL_PARK, Count(HWC_PARK_NAME) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_PARK_NAME";
}

procedure.gethwc_byVillage_byrange = function (fromdate, todate) {
    return "SELECT HWC_VILLAGE_NAME AS VILLAGE, Count(HWC_VILLAGE_NAME) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_VILLAGE_NAME";
}

procedure.gethwc_byTaluk_byrange = function (fromdate, todate) {
    return "SELECT HWC_TALUK_NAME AS TALUK, Count(HWC_TALUK_NAME) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_TALUK_NAME";
}

procedure.gethwc_byRange_byrange = function (fromdate, todate) {
    return "SELECT HWC_RANGE , Count(HWC_RANGE) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_RANGE";
}

procedure.gethwc_byFARange_byrange = function (fromdate, todate) {
    return "SELECT HWC_FD_SUB_RANGE AS FA_SUB_RANGE, Count(HWC_FD_SUB_RANGE) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_FD_SUB_RANGE";
}

procedure.gethwc_bycat_all = function () {
    return "select HWC_CASE_CATEGORY AS HWC_CATEGORY, count(HWC_CASE_CATEGORY) AS FREQ from hwc_details group by HWC_CASE_CATEGORY";
}

procedure.gethwc_bycat_animal = function () {
    return "select HWC_ANIMAL AS HWC_ANIMAL, count(HWC_ANIMAL) AS FREQ from hwc_details group by HWC_ANIMAL";
}

procedure.gethwc_bycat_crop = function () {
    return "select HWC_CROP_NAME AS HWC_CROP, count(HWC_CROP_NAME) AS FREQ from hwc_case_crop group by HWC_CROP_NAME";
}

procedure.gethwc_bycat_property = function () {
    return "select HWC_PROPERY_NAME AS HWC_CROP, count(HWC_PROPERY_NAME) AS FREQ from hwc_case_property group by HWC_PROPERY_NAME";
}

procedure.gethwc_bycat_livestock = function () {
    return "select HWC_LIVE_STOCK_NAME AS HWC_CROP, count(HWC_LIVE_STOCK_NAME) AS FREQ from hwc_case_livestock group by HWC_LIVE_STOCK_NAME";
}

// HOME Chart API's
procedure.getTotalCasesByYEAR = function () {
    return "select year(HWC_CASE_DATE) as YEAR, count(HWC_CASE_CATEGORY) as NO_OF_CASES from hwc_details where (year(HWC_CASE_DATE) between YEAR(CURDATE())-3 and YEAR(CURDATE())) group by year(HWC_CASE_DATE)";
}

procedure.getTotalCasesByYEARnMONTH = function () {
    return "select year(HWC_CASE_DATE) as YEAR, monthname(HWC_CASE_DATE) as MONTH, count(HWC_CASE_CATEGORY) as NO_OF_CASES from hwc_details where (year(HWC_CASE_DATE) between YEAR(CURDATE())-3 and YEAR(CURDATE())) group by year(HWC_CASE_DATE), month(HWC_CASE_DATE) order by year(HWC_CASE_DATE), month(HWC_CASE_DATE)";
}

procedure.getCategoryByYEAR = function () {
    return "select HWC_CASE_CATEGORY, YEAR(HWC_CASE_DATE) as YEAR, count(HWC_CASE_CATEGORY) as NO_OF_CASES from hwc_details where (year(HWC_CASE_DATE) between YEAR(CURDATE())-3 and YEAR(CURDATE())) group by year(HWC_CASE_DATE),  HWC_CASE_CATEGORY order by year(HWC_CASE_DATE)";
}

procedure.getCategoryByYEARnMONTH = function () {
    return "select HWC_CASE_CATEGORY, monthname(HWC_CASE_DATE) as MONTH, YEAR(HWC_CASE_DATE) as YEAR, count(HWC_CASE_CATEGORY) as NO_OF_CASES from hwc_details where (year(HWC_CASE_DATE) between YEAR(CURDATE())-3 and YEAR(CURDATE())) group by year(HWC_CASE_DATE), month(HWC_CASE_DATE),  HWC_CASE_CATEGORY order by year(HWC_CASE_DATE), month(HWC_CASE_DATE)";
}

procedure.getBpNhByRange = function (fromdate, todate) {
    return "SELECT  DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE,  sum(DC_NH_CASES) AS NH_CASES, sum(DC_BP_CASES) as BP_CASE  FROM  daily_count WHERE (DATE_FORMAT(DC_CASE_DATE, '%Y-%m-%d') BETWEEN '"+fromdate+"' AND '"+todate+"' ) GROUP BY DC_CASE_DATE ORDER BY DC_CASE_DATE DESC";
}
procedure.getPreviousBpNhCount = function () {
    return "select DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, sum(DC_NH_CASES) AS NH_CASES, sum(DC_BP_CASES) as BP_CASE from daily_count WHERE DC_CASE_DATE BETWEEN CURDATE() - INTERVAL 1 DAY AND CURDATE()"
}
procedure.getBpByCategory = function (fromdate, todate) {
    return "select DATE_FORMAT(d.DC_CASE_DATE, '%d-%m-%Y')  as CASE_DATE, h.HWC_CASE_CATEGORY as CATEGORY, d.DC_BP_CASES AS BP_CASES , sum(d.DC_BP_CASES) AS BP_CASES from daily_count d, hwc_details h where (h.HWC_CASE_DATE between '"+fromdate+"' AND '"+todate+"') and (d.DC_CASE_DATE between '"+fromdate+"' AND '"+todate+"') group by d.DC_CASE_DATE, h.HWC_CASE_DATE;"
}
procedure.getNhByCategory = function (fromdate, todate) {
    return "select DATE_FORMAT(d.DC_CASE_DATE, '%d-%m-%Y')  as CASE_DATE, h.HWC_CASE_CATEGORY as CATEGORY, d.DC_NH_CASES AS NH_CASES , sum(d.DC_NH_CASES) AS NH_CASES from daily_count d, hwc_details h where (h.HWC_CASE_DATE between '"+fromdate+"' AND '"+todate+"') and (d.DC_CASE_DATE between '"+fromdate+"' AND '"+todate+"') group by d.DC_CASE_DATE, h.HWC_CASE_DATE;"
}
procedure.getBpNhByCategory = function (fromdate, todate) {
    return "select DATE_FORMAT(d.DC_CASE_DATE, '%d-%m-%Y')  as CASE_DATE, h.HWC_CASE_CATEGORY as CATEGORY, sum(d.DC_NH_CASES+d.DC_BP_CASES) AS TOTAL_BP_NH_CASES from daily_count d, hwc_details h where (h.HWC_CASE_DATE between '"+fromdate+"' AND '"+todate+"') and (d.DC_CASE_DATE between '"+fromdate+"' AND '"+todate+"') group by d.DC_CASE_DATE, h.HWC_CASE_DATE;"
}
procedure.getBpNhYearly = function () {
    return "select year(DC_CASE_DATE) as YEAR, sum(DC_NH_CASES) AS NH_CASES, sum(DC_BP_CASES) as BP_CASE from daily_count WHERE (year(DC_CASE_DATE) between YEAR(CURDATE())-3 and YEAR(CURDATE())) group by year(DC_CASE_DATE);"
}

//HWC chart API's

procedure.get_hwc_category = function () {
    return "select HWC_CASE_CATEGORY AS CATEGORY, COUNT(HWC_CASE_CATEGORY) AS CAT_FREQ from hwc_details GROUP BY HWC_CASE_CATEGORY"; // between YEAR(CURDATE())-3 and YEAR(CURDATE())) group by year(DC_CASE_DATE);"
}
procedure.get_hwc_animal = function () {
    return "select HWC_ANIMAL AS ANIMAL, COUNT(HWC_ANIMAL) AS ANIMAL_FREQ from hwc_details GROUP BY HWC_ANIMAL";
}
procedure.get_hwc_taluk = function () {
    return "select HWC_TALUK_NAME AS TALUK, COUNT(HWC_TALUK_NAME) AS TALUK_FREQ from hwc_details GROUP BY HWC_TALUK_NAME";
}
procedure.get_hwc_village = function () {
    return "select HWC_VILLAGE_NAME AS VILLAGE, COUNT(HWC_VILLAGE_NAME) AS VILLAGE_FREQ from hwc_details GROUP BY HWC_VILLAGE_NAME";
}
procedure.get_hwc_park = function () {
    return "select HWC_PARK_NAME AS PARK, COUNT(HWC_PARK_NAME) AS PARK_FREQ from hwc_details GROUP BY HWC_PARK_NAME";
}
procedure.get_hwc_range = function () {
    return "select HWC_RANGE, COUNT(HWC_RANGE) AS RANGE_FREQ from hwc_details GROUP BY HWC_RANGE";
}

//by HWC_date
procedure.get_hwc_category_byhwcdate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS HWC_DATE, HWC_CASE_CATEGORY AS CATEGORY, COUNT(HWC_CASE_CATEGORY) AS CAT_FREQ from hwc_details where HWC_CASE_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY HWC_CASE_DATE, HWC_CASE_CATEGORY";
}
procedure.get_hwc_animal_byhwcdate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS HWC_DATE, HWC_ANIMAL AS ANIMAL, COUNT(HWC_ANIMAL) AS ANIMAL_FREQ from hwc_details where HWC_CASE_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY HWC_CASE_DATE, HWC_ANIMAL";
}
procedure.get_hwc_taluk_byhwcdate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS HWC_DATE, HWC_TALUK_NAME AS TALUK, COUNT(HWC_TALUK_NAME) AS TALUK_FREQ from hwc_details where HWC_CASE_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY HWC_CASE_DATE, HWC_TALUK_NAME";
}
procedure.get_hwc_village_byhwcdate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS HWC_DATE, HWC_VILLAGE_NAME AS VILLAGE, COUNT(HWC_VILLAGE_NAME) AS VILLAGE_FREQ from hwc_details where HWC_CASE_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY HWC_CASE_DATE, HWC_VILLAGE_NAME";
}
procedure.get_hwc_park_byhwcdate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS HWC_DATE, HWC_PARK_NAME AS PARK, COUNT(HWC_PARK_NAME) AS PARK_FREQ from hwc_details where HWC_CASE_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY HWC_CASE_DATE, HWC_PARK_NAME";
}
procedure.get_hwc_range_byhwcdate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS HWC_DATE, HWC_RANGE, COUNT(HWC_RANGE) AS RANGE_FREQ from hwc_details where HWC_CASE_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY HWC_CASE_DATE, HWC_RANGE";
}

//by FA_date
procedure.get_hwc_category_byfadate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_FD_SUB_DATE, '%d-%m-%Y') AS FA_DATE, HWC_CASE_CATEGORY AS CATEGORY, COUNT(HWC_CASE_CATEGORY) AS CAT_FREQ from hwc_details where HWC_FD_SUB_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY HWC_FD_SUB_DATE, HWC_CASE_CATEGORY";
}
procedure.get_hwc_animal_byfadate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_FD_SUB_DATE, '%d-%m-%Y') AS FA_DATE, HWC_ANIMAL AS ANIMAL, COUNT(HWC_ANIMAL) AS ANIMAL_FREQ from hwc_details where HWC_FD_SUB_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY HWC_FD_SUB_DATE, HWC_ANIMAL";
}
procedure.get_hwc_taluk_byfadate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_FD_SUB_DATE, '%d-%m-%Y') AS FA_DATE, HWC_TALUK_NAME AS TALUK, COUNT(HWC_TALUK_NAME) AS TALUK_FREQ from hwc_details where HWC_FD_SUB_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY HWC_FD_SUB_DATE, HWC_TALUK_NAME";
}
procedure.get_hwc_village_byfadate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_FD_SUB_DATE, '%d-%m-%Y') AS FA_DATE, HWC_VILLAGE_NAME AS VILLAGE, COUNT(HWC_VILLAGE_NAME) AS VILLAGE_FREQ from hwc_details where HWC_FD_SUB_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY HWC_FD_SUB_DATE, HWC_VILLAGE_NAME";
}
procedure.get_hwc_park_byfadate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_FD_SUB_DATE, '%d-%m-%Y') AS FA_DATE, HWC_PARK_NAME AS PARK, COUNT(HWC_PARK_NAME) AS PARK_FREQ from hwc_details where HWC_FD_SUB_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY HWC_FD_SUB_DATE, HWC_PARK_NAME";
}
procedure.get_hwc_range_byfadate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_FD_SUB_DATE, '%d-%m-%Y') AS FA_DATE, HWC_RANGE, COUNT(HWC_RANGE) AS RANGE_FREQ from hwc_details where HWC_FD_SUB_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY HWC_FD_SUB_DATE, HWC_RANGE";
}

procedure.get_freq_byhwcdate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS HWC_DATE, COUNT(HWC_CASE_DATE) AS DATE_FREQ from hwc_details where HWC_CASE_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY HWC_CASE_DATE";
}

procedure.get_freq_byfadate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_FD_SUB_DATE, '%d-%m-%Y') AS FA_DATE, COUNT(HWC_FD_SUB_DATE) AS DATE_FREQ from hwc_details where HWC_FD_SUB_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY HWC_FD_SUB_DATE";
}

procedure.get_cases_byyear_month = function () {
    return "select year(HWC_CASE_DATE) as YEAR, monthname(HWC_CASE_DATE) as MONTH, count(HWC_CASE_DATE) AS TOTAL_CASES from hwc_details WHERE (year(HWC_CASE_DATE) between YEAR(CURDATE())-3 and YEAR(CURDATE())) group by month(HWC_CASE_DATE), year(HWC_CASE_DATE) order by year(HWC_CASE_DATE), month(HWC_CASE_DATE)";
}

procedure.get_top50_wsid_bycases = function () {
    return "select HWC_WSID, count(HWC_WSID) AS CASES from hwc_details group by HWC_WSID order by count(HWC_WSID) desc limit 50";
}

procedure.get_top20_wsid_bycat = function () {
    return "select HWC_WSID, HWC_CASE_CATEGORY, count(HWC_WSID) AS CASES from odk.hwc_details group by HWC_CASE_CATEGORY, HWC_WSID order by count(HWC_WSID) desc limit 20";
}

procedure.get_top10_crop = function () {
    return "SELECT HWC_CROP_NAME AS CROP_NAME, count(HWC_CROP_NAME) AS CROP_FREQ FROM hwc_case_crop GROUP BY HWC_CROP_NAME ORDER BY count(HWC_CROP_NAME) DESC LIMIT 10;";
}

procedure.get_top10_property = function () {
    return "SELECT HWC_PROPERY_NAME AS PROPERTY_NAME, count(HWC_PROPERY_NAME) AS PROPERTY_FREQ FROM hwc_case_property GROUP BY HWC_PROPERY_NAME ORDER BY count(HWC_PROPERY_NAME) DESC LIMIT 10;";
}

procedure.get_top10_livestock = function () {
    return "SELECT HWC_LIVE_STOCK_NAME AS LIVESTOCK_NAME, count(HWC_LIVE_STOCK_NAME) AS LIVESTOCK_FREQ FROM hwc_case_livestock GROUP BY HWC_LIVE_STOCK_NAME ORDER BY count(HWC_LIVE_STOCK_NAME) DESC LIMIT 10;";
}

procedure.get_top30_villages = function () {
    return "SELECT HWC_VILLAGE_NAME AS VILLAGE_NAME, count(HWC_VILLAGE_NAME) AS VILLAGE_FREQ FROM hwc_details GROUP BY HWC_VILLAGE_NAME ORDER BY count(HWC_VILLAGE_NAME) DESC LIMIT 30;";
}

procedure.get_total_comp = function () {
    return "SELECT SUM(COM_AMOUNT) AS TOTAL, AVG(COM_AMOUNT) AS AVERAGE, MAX(COM_AMOUNT)AS COMP_MAX, MIN(COM_AMOUNT) AS COMP_MIN FROM com_cases_details;";
}

procedure.get_total_comp = function () {
    return "SELECT SUM(COM_AMOUNT) AS TOTAL, AVG(COM_AMOUNT) AS AVERAGE, MAX(COM_AMOUNT)AS COMP_MAX, MIN(COM_AMOUNT) AS COMP_MIN FROM com_cases_details;";
}

procedure.get_comp_bycategory = function (fromdate, todate) {
    return "SELECT COM_HWC_CATAGORY as CATAGORY, count(COM_HWC_CATAGORY) AS FREQ, SUM(COM_AMOUNT) AS TOTAL, AVG(COM_AMOUNT) AS AVERAGE, MAX(COM_AMOUNT)AS COMP_MAX, MIN(COM_AMOUNT) AS COMP_MIN FROM com_cases_details where COM_HWC_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY COM_HWC_CATAGORY;";
}

procedure.get_comp_byvillage = function (fromdate, todate) {
    return "SELECT COM_VILLAGE AS VILLAGE, count(COM_VILLAGE) AS FREQ, SUM(COM_AMOUNT) AS TOTAL, AVG(COM_AMOUNT) AS AVERAGE, MAX(COM_AMOUNT)AS COMP_MAX, MIN(COM_AMOUNT) AS COMP_MIN FROM com_cases_details where COM_HWC_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY COM_VILLAGE;";
}

procedure.get_comp_bytaluk = function (fromdate, todate) {
    return "SELECT COM_TALUK AS TALUK, count(COM_TALUK) AS FREQ, SUM(COM_AMOUNT) AS TOTAL, AVG(COM_AMOUNT) AS AVERAGE, MAX(COM_AMOUNT)AS COMP_MAX, MIN(COM_AMOUNT) AS COMP_MIN FROM com_cases_details where COM_HWC_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY COM_TALUK;";
}

procedure.get_comp_bypark = function (fromdate, todate) {
    return "SELECT COM_PARK AS PARK, count(COM_PARK) AS FREQ, SUM(COM_AMOUNT) AS TOTAL, AVG(COM_AMOUNT) AS AVERAGE, MAX(COM_AMOUNT)AS COMP_MAX, MIN(COM_AMOUNT) AS COMP_MIN FROM com_cases_details where COM_HWC_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY COM_PARK;";
}

procedure.get_comp_top30_wsid = function (fromdate, todate) {
    return "select COM_WSID AS WSID, count(COM_WSID) AS FREQ, AVG(COM_AMOUNT) AS AVERAGE, MAX(COM_AMOUNT)AS COMP_MAX, MIN(COM_AMOUNT) AS COMP_MIN from com_cases_details where COM_HWC_DATE between '"+fromdate+"' AND '"+todate+"' group by COM_WSID order by count(COM_WSID) DESC limit 30;"
}

procedure.get_comp_top20_village = function (fromdate, todate) {
    return "select COM_VILLAGE AS VILLAGE, count(COM_VILLAGE) AS FREQ, AVG(COM_AMOUNT) AS AVERAGE, MAX(COM_AMOUNT)AS COMP_MAX, MIN(COM_AMOUNT) AS COMP_MIN from com_cases_details where COM_HWC_DATE between '"+fromdate+"' AND '"+todate+"' group by COM_VILLAGE order by count(COM_VILLAGE) DESC limit 20;"
}

//QUERY for Daily count
procedure.get_dc_total_cases = function () {
    return "SELECT SUM(DC_TOTAL_CASES) AS DC_TOTAL_CASES, SUM(DC_NH_CASES) AS TOTAL_NH_CASES, SUM(DC_BP_CASES) AS TOTAL_BP_CASES FROM daily_count;"
}

procedure.get_dc_total_cases_byhwc_cat = function () {
    return "SELECT SUM(DC_TOTAL_ATTENDED_CASE) AS TOTAL, SUM(DC_CROP) AS CROP, SUM(DC_PROPERTY) AS PROPERTY, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY, SUM(DC_LIVESTOCK) AS LIVESTOCK, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH FROM dc_cases;"
}

procedure.get_dc_total_cases_byFA = function () {
    return "SELECT SUM(DC_TOTAL_ATTENDED_CASE) AS TOTAL, DC_FA_UN AS FIELD_ASSISTANT FROM dc_cases GROUP BY DC_FA_UN;"
}

procedure.get_dc_total_cases_hwc_byFA = function () {
    return "SELECT DC_FA_UN AS FIELD_ASSISTANT, SUM(DC_TOTAL_ATTENDED_CASE) AS TOTAL, SUM(DC_CROP) AS CROP, SUM(DC_PROPERTY) AS PROPERTY, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY, SUM(DC_LIVESTOCK) AS LIVESTOCK, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH FROM odk.dc_cases GROUP BY DC_FA_UN;"
}

procedure.get_dc_cases_bydate = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, SUM(DC_TOTAL_CASES) AS DC_TOTAL_CASES FROM odk.daily_count where DC_CASE_DATE between '"+fromdate+"' AND '"+todate+"' group by DC_CASE_DATE order by DC_CASE_DATE DESC;"
}

procedure.get_dc_cases_hwc_bydate = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, SUM(DC_TOTAL_ATTENDED_CASE) AS TOTAL, SUM(DC_CROP) AS CROP, SUM(DC_PROPERTY) AS PROPERTY, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY, SUM(DC_LIVESTOCK) AS LIVESTOCK, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH FROM odk.dc_cases where DC_CASE_DATE between '"+fromdate+"' AND '"+todate+"' group by DC_CASE_DATE order by count(DC_CASE_DATE) DESC;"
}

//Publicity Query
procedure.get_pb_total = function () {
    return "SELECT count(PB_C_VILLAGE) AS TOTAL_VILLAGE from publicity;"
}

procedure.get_pb_byvillage = function () {
    return "SELECT PB_C_VILLAGE AS VILLAGE_NAME, count(PB_C_VILLAGE) AS VILLAGE_FREQ from publicity GROUP BY PB_C_VILLAGE;"
}

procedure.get_pb_bypark = function () {
    return "SELECT PB_PARK AS PARK, count(PB_PARK) AS PARK_FREQ from publicity GROUP BY PB_PARK;"
}

procedure.get_pb_bytaluk = function () {
    return "SELECT PB_TALUK AS TALUK, count(PB_TALUK) AS TALUK_FREQ from publicity GROUP BY PB_TALUK;"
}

procedure.get_pb_byvillage_bydate = function (fromdate, todate) {
    return "SELECT PB_C_VILLAGE AS VILLAGE_NAME, count(PB_C_VILLAGE) AS VILLAGE_FREQ from publicity where PB_V_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY PB_C_VILLAGE;"
}

procedure.get_pb_bypark_bydate = function (fromdate, todate) {
    return "SELECT PB_PARK AS PARK, count(PB_PARK) AS PARK_FREQ from publicity where PB_V_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY PB_PARK;"
}

procedure.get_pb_bytaluk_bydate = function (fromdate, todate) {
    return "SELECT PB_TALUK AS TALUK, count(PB_TALUK) AS TALUK_FREQ from publicity where PB_V_DATE between '"+fromdate+"' AND '"+todate+"' GROUP BY PB_TALUK;"
}

exports.func = procedure;
