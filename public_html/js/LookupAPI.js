var LookupAPI = {};

LookupAPI.lookupMap = {};

LookupAPI.loadLookupData = function () {
    //DivisionAPI.getDivisions(locale);
    //BranchAPI.getBranches(locale);
    var locales = ["en_CA", "fr_CA"];
    //var lookupTypes = ["department", "branch", "division", "province", "jobterm"];
    var lookupTypes = ["department", "province", "jobterm", "skill_level", "experience_level"];
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
    //console.log('Talent cloud url data:   ' + talentcloudData_URL);
    //var talentcloudData_URL = "/wiremock/mappings/GET_ContentByLocale.json";//TEMPORARY for bh.browse_job_seekers branch

    var lookupData_xhr = new XMLHttpRequest();
    if ("withCredentials" in lookupData_xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        lookupData_xhr.open("GET", lookup_URL);

    } else if (typeof XDomainRequest !== "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        lookupData_xhr = new XDomainRequest();
        lookupData_xhr.open("GET", lookup_URL);

    } else {

        // Otherwise, CORS is not supported by the browser.
        lookupData_xhr = null;

    }

    lookupData_xhr.addEventListener("progress",
            function (evt) {
                DataAPI.talentcloudDataUpdateProgress(evt);
            }, false);
    lookupData_xhr.addEventListener("load",
            function (evt) {
                LookupAPI.addToLookupMap(lookupType, locale, lookupData_xhr.response);
                if (requestCallback) {
                    requestCallback(lookupData_xhr);
                }
            }, false);
    lookupData_xhr.addEventListener("error", DataAPI.transferFailed, false);
    lookupData_xhr.addEventListener("abort", DataAPI.transferAborted, false);

    lookupData_xhr.send();
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
    var elements = LookupAPI.lookupMap[locale][lookupType];
    for (i in elements) {
        if (elements[i].id == valueId) {
            return elements[i].value;
        }
    }
    return null;
}

// populates elements passed by element id
LookupAPI.populateDropdown = function (lookupType, elementId, useLookupValueAsOptionValue) {
    var selectElem = document.getElementById(elementId);
    if (selectElem) {
        var locale = TalentCloudAPI.getLanguageFromCookie();
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