var EditTeamCultureAPI = {};

EditTeamCultureAPI.baseURL = "/tc/api/v1";

EditTeamCultureAPI.TeamCulture = function (teamSize, gcDirUrl, narrativeTextEn, narrativeTextFr, operatingContextEn, operatingContextFr, whatWeValueEn, whatWeValueFr, howWeWorkEn, howWeWorkFr) {
    this.team_size = teamSize;
    this.gc_directory_url = gcDirUrl;
    this.narrative_text_en = narrativeTextEn;
    this.narrative_text_fr = narrativeTextFr;
    this.operating_context_en = operatingContextEn;
    this.operating_context_fr = operatingContextFr;
    this.what_we_value_en = whatWeValueEn;
    this.what_we_value_fr = whatWeValueFr;
    this.how_we_work_en = howWeWorkEn;
    this.how_we_work_fr = howWeWorkFr;

};

EditTeamCultureAPI.parseTeamCultureResponse = function (responseText) {
    var json = JSON.parse(responseText);
    return new EditTeamCultureAPI.TeamCulture(json.team_size, json.gc_directory_url, json.narrative_text_en, json.narrative_text_fr, json.operating_context_en, json.operating_context_fr, json.what_we_value_en, json.what_we_value_fr, json.how_we_work_en, json.how_we_work_fr);
};

EditTeamCultureAPI.localizeEditTeamCulture = function () {
    if (siteContent) {
        try {
            document.getElementById("createEditProfile_teamCultureTitle").innerHTML = siteContent.teamCulture;
            document.getElementById("createEditProfile_teamSize_label").innerHTML = siteContent.teamSizePrompt;
            document.getElementById("createEditProfile_gcDirLink_label").innerHTML = siteContent.gcDirectoryLinkPrompt;
            //document.getElementById("createEditProfile_teamNarrative_label").innerHTML = siteContent.teamNarrativePrompt;
        } catch (e) {
            (console.error || console.log).call(console, e.stack || e);
        }

    }
};

EditTeamCultureAPI.initializeTeamCultureForm = function (managerProfileId) {
    //Fill previous form fields
    EditTeamCultureAPI.getTeamCulture(managerProfileId, function (response) {
        var teamCulture = EditTeamCultureAPI.parseTeamCultureResponse(response);
        EditTeamCultureAPI.populateTeamCultureForm(teamCulture);
    });
};

/**
 *
 * @param {EditTeamCultureAPI.TeamCulture} teamCulture
 * @return {undefined}
 */
EditTeamCultureAPI.populateTeamCultureForm = function (teamCulture) {
    document.getElementById('createEditProfile_teamSize').value =
            teamCulture.team_size ? teamCulture.team_size : "";
    document.getElementById('createEditProfile_gcDirLink').value =
            teamCulture.gc_directory_url ? teamCulture.gc_directory_url : "";
    document.getElementById('createEditProfile_teamNarrative_en').value =
            teamCulture.narrative_text_en ? teamCulture.narrative_text_en : "";
    document.getElementById('createEditProfile_teamNarrative_fr').value =
            teamCulture.narrative_text_fr ? teamCulture.narrative_text_fr : "";
    document.getElementById('createEditProfile_operatingContext_en').value =
            teamCulture.operating_context_en ? teamCulture.operating_context_en : "";
    document.getElementById('createEditProfile_operatingContext_fr').value =
            teamCulture.operating_context_fr ? teamCulture.operating_context_fr : "";
    document.getElementById('createEditProfile_whatWeValue_en').value =
            teamCulture.what_we_value_en ? teamCulture.what_we_value_en : "";
    document.getElementById('createEditProfile_whatWeValue_fr').value =
            teamCulture.what_we_value_fr ? teamCulture.what_we_value_fr : "";
    document.getElementById('createEditProfile_howWeWork_en').value =
            teamCulture.how_we_work_en ? teamCulture.how_we_work_en : "";
    document.getElementById('createEditProfile_howWeWork_fr').value =
            teamCulture.how_we_work_fr ? teamCulture.how_we_work_fr : "";
};

EditTeamCultureAPI.submitTeamCulture = function (managerProfileId) {
    var teamCulture = new EditTeamCultureAPI.TeamCulture();
    teamCulture.team_size = document.getElementById('createEditProfile_teamSize').value;
    teamCulture.gc_directory_url = document.getElementById('createEditProfile_gcDirLink').value;
    teamCulture.narrative_text_en = document.getElementById('createEditProfile_teamNarrative_en').value;
    teamCulture.narrative_text_fr = document.getElementById('createEditProfile_teamNarrative_fr').value;
    teamCulture.operating_context_en = document.getElementById('createEditProfile_operatingContext_en').value;
    teamCulture.operating_context_fr = document.getElementById('createEditProfile_operatingContext_fr').value;
    teamCulture.what_we_value_en = document.getElementById('createEditProfile_whatWeValue_en').value;
    teamCulture.what_we_value_fr = document.getElementById('createEditProfile_whatWeValue_fr').value;
    teamCulture.how_we_work_en = document.getElementById('createEditProfile_howWeWork_en').value;
    teamCulture.how_we_work_fr = document.getElementById('createEditProfile_howWeWork_fr').value;

    EditTeamCultureAPI.putTeamCulture(managerProfileId, teamCulture, function (response) {
        //TODO: handle response
    });
};

EditTeamCultureAPI.getTeamCulture = function (managerProfileId, responseCallback) {
    var url = EditTeamCultureAPI.baseURL + '/getTeamCultureByManagerProfile/' + managerProfileId;
    EditTeamCultureAPI.sendHttpRequest(url, 'GET', null, responseCallback);
};

EditTeamCultureAPI.putTeamCulture = function (managerProfileId, teamCulture, responseCallback) {
    var url = EditTeamCultureAPI.baseURL + '/putTeamCultureByManagerProfile/' + managerProfileId;
    EditTeamCultureAPI.sendHttpRequest(url, 'PUT', JSON.stringify(teamCulture), responseCallback);
};

EditTeamCultureAPI.sendHttpRequest = function (url, restMethod, payload, responseCallback) {
    var request = new XMLHttpRequest();
    if ("withCredentials" in request) {
        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        request.open(restMethod, url);

    } else if (typeof XDomainRequest != "undefined") {
        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        request = new XDomainRequest();
        request.open(restMethod, url);
    } else {
        // Otherwise, CORS is not supported by the browser.
        request = null;
        // TODO: indicate to user that browser is not supported
    }
    //Default to application/json if content-type not included in headersMap

    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    if (UserAPI.hasSessionUser()) {
        var authToken = UserAPI.getAuthToken();
        request.setRequestHeader("Authorization", "Bearer " + authToken);
    }

    request.addEventListener("progress", DataAPI.updateProgress, false);
    request.addEventListener("error", DataAPI.transferFailed, false);
    request.addEventListener("abort", DataAPI.transferAborted, false);
    request.addEventListener("load", function () {
        responseCallback(request.responseText);
    }, false);

    request.send(payload);
};
