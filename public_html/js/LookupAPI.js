var LookupAPI = {};

LookupAPI.lookupMap = {};

LookupAPI.loadLookupData = function () {
    //DivisionAPI.getDivisions(locale);
    //BranchAPI.getBranches(locale);
    var locales = ["en_CA", "fr_CA"];
    //var lookupTypes = ["department", "branch", "division", "province", "jobterm"];
    var lookupTypes = ["department", "province", "jobterm", "skill_level", "experience_level", "clearance", "language"];
    for (i in locales) {
        for (j in lookupTypes) {
            var locale = locales[i];
            var lookupType = lookupTypes[j];
            LookupAPI.getLookupData(lookupType, locale, null);
        }
    }
};


LookupAPI.getLookupData = function (lookupType, locale, requestCallback) {
    var lookup_URL = DataAPI.baseURL + "/" + locale + "/Lookup/" + lookupType;
    DataAPI.sendRequest(lookup_URL, 'GET', {}, null, function(request){
        LookupAPI.addToLookupMap(lookupType, locale, request.response);
        if (requestCallback) {
            requestCallback(request);
        }
    });
};

LookupAPI.addToLookupMap = function (lookupType, locale, response) {
    if (!LookupAPI.lookupMap[locale]) {
        LookupAPI.lookupMap[locale] = {};
    }
    if (!LookupAPI.lookupMap[locale][lookupType]) {
        LookupAPI.lookupMap[locale][lookupType] = {};
    }
    LookupAPI.lookupMap[locale][lookupType] = JSON.parse(response);
};

/**
 * If the requested lookupType is already in the lookupMap, send it to the lookupCallback
 * immediately. If not, request the lookup data, then call lookupCallback with
 * the response.
 * 
 * @param {string} lookupType
 * @param {function} lookupCallback
 * @return {undefined}
 */
LookupAPI.getLookupResponse = function (lookupType, lookupCallback) {
    var locale = TalentCloudAPI.getLanguageFromCookie();
    if (!LookupAPI.lookupMap[locale]) {
        LookupAPI.lookupMap[locale] = {};
    }
    if (LookupAPI.lookupMap[locale][lookupType]) {
        lookupCallback(LookupAPI.lookupMap[locale][lookupType]);
    } else {
        LookupAPI.getLookupData(lookupType, locale, function (request) {
            if (request.status === 200) {
                lookupCallback(LookupAPI.lookupMap[locale][lookupType]);
            }
        });
    }
};

LookupAPI.getLocalizedLookupValue = function (lookupType, valueId) {
    var locale = TalentCloudAPI.getLanguageFromCookie();
    if (!LookupAPI.lookupMap[locale]) {
        LookupAPI.lookupMap[locale] = {};
    }
    var elements = LookupAPI.lookupMap[locale][lookupType];
    if (elements) {
        for (i in elements) {
            if (elements[i].id == valueId) {
                return elements[i].value;
            }
        }
    } else {
        LookupAPI.getLookupData(lookupType, locale, function (request) {
            if (request.status === 200 && LookupAPI.lookupMap[locale][lookupType]) {
                elements = LookupAPI.lookupMap[locale][lookupType];
                for (i in elements) {
                    if (elements[i].id == valueId) {
                        return elements[i].value;
                    }
                }
            }
        });
    }

    return null;
};

// populates elements passed by element id
LookupAPI.populateDropdown = function (lookupType, elementId, useLookupValueAsOptionValue) {
    var selectElem = document.getElementById(elementId);
    if (selectElem) {
        var locale = TalentCloudAPI.getLanguageFromCookie();
        if (!LookupAPI.lookupMap[locale]) {
            LookupAPI.lookupMap[locale] = {};
        }
        var lookupList = LookupAPI.lookupMap[locale][lookupType];
        if (lookupList) {
            Utilities.clearSelectOptions(selectElem);
            for (var item in lookupList) {
                var option = document.createElement("option");
                if (useLookupValueAsOptionValue === true) {
                    option.value = lookupList[item].value;
                } else {
                    option.value = lookupList[item].id;
                }
                option.innerHTML = lookupList[item].value;
                selectElem.appendChild(option);
            }
        } else {
            LookupAPI.getLookupData(lookupType, locale, function (request) {
                if (LookupAPI.lookupMap[locale][lookupType]) {
                    LookupAPI.populateDropdown(lookupType, elementId, useLookupValueAsOptionValue);
                }
            });
        }
    }

};

//Populates select elements passed directly
LookupAPI.populateDropdownElement = function (lookupType, element, useLookupValueAsOptionValue) {
    if (element) {
        var locale = TalentCloudAPI.getLanguageFromCookie();
        if (!LookupAPI.lookupMap[locale]) {
            LookupAPI.lookupMap[locale] = {};
        }
        var lookupList = LookupAPI.lookupMap[locale][lookupType];
        if (lookupList) {
            Utilities.clearSelectOptions(element);
            for (var item in lookupList) {
                var option = document.createElement("option");
                if (useLookupValueAsOptionValue === true) {
                    option.value = lookupList[item].value;
                } else {
                    option.value = lookupList[item].id;
                }
                option.innerHTML = lookupList[item].value;
                element.appendChild(option);
            }
        } else {
            LookupAPI.getLookupData(lookupType, locale, function (request) {
                if (LookupAPI.lookupMap[locale][lookupType]) {
                    LookupAPI.populateDropdownElement(lookupType, element, useLookupValueAsOptionValue);
                }
            });
        }
    }
};