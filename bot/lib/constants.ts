export const COHORT_ROLE_REGEX = /^[a-zA-Z]{2,4}\d{4}$/;
export const COHORT_YEAR_REGEX = /\d{4}/;
export const COHORT_ROLE_MAP = new Map<string, string>([
    ["ФПМИ / ИСН", "iss"],
    ["ФКСТ / КСТ", "cst"],
    ["ЕФ / ЕТ", "ee"]
]);
