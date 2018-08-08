const procedure = {};

procedure.bypark = function () {
    return "SELECT SUM(DC_NH_CASES) AS TOTAL_NH_CASES, SUM(DC_BP_CASES) AS TOTAL_BP_CASES FROM DAILY_COUNT";
};

procedure.byFA = function () {
    const sum = "DC_CROP+DC_CROP_PROPERTY+DC_PROPERTY+DC_LIVESTOCK+DC_HUMAN_INJURY+DC_HUMAN_DEATH AS TOTAL_CASES_BY_FA";
    return "SELECT DC_FA_UN AS FA_NAME," + sum + " FROM dc_cases GROUP BY DC_FA_UN";
};

procedure.byEffectType = function () {
    return "SELECT SUM(DC_CROP) AS CROP_SUM, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY_SUM, SUM(DC_PROPERTY) AS PROPERTY_SUM, SUM(DC_LIVESTOCK) AS LIVESTOCK_SUM, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY_SUM, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH_SUM FROM dc_cases";
};

procedure.byCRPR = function () {
    return "SELECT SUM(DC_CROP_PROPERTY) FROM dc_cases";
};

procedure.byPR = function () {
    return "SELECT SUM(DC_PROPERTY) FROM dc_cases";
};

procedure.byLS = function () {
    return "SELECT SUM(DC_LIVESTOCK) FROM dc_cases";
};

procedure.byHI = function () {
    return "SELECT SUM(DC_HUMAN_INJURY) FROM dc_cases";
};

procedure.byHD = function () {
    return "SELECT SUM(DC_HUMAN_DEATH) FROM dc_cases";
};

exports.func = procedure;
