var EditTeamCultureAPI = {};

EditTeamCultureAPI.baseURL = "/tc/api/v1";

EditTeamCultureAPI.TeamCulture = function(teamSize, gcDirUrl, narrativeTextEn, narrativeTextFr) {
    this.team_size = teamSize;
    this.gc_directory_url = gcDirUrl;
    this.narrative_text_en = narrativeTextEn;
    this.narrative_text_fr = narrativeTextFr;
};

EditTeamCultureAPI.parseTeamCultureResponse = function(responseText) {
    var json = JSON.parse(responseText);
    return new EditTeamCultureAPI.TeamCulture(json.team_size, json.gc_directory_url, json.narrative_text_en, json.narrative_text_fr);
};

EditTeamCultureAPI.localizeEditTeamCulture = function() {
    if (siteContent) {
        document.getElementById("createEditProfile_teamCultureTitle").innerHTML = siteContent.teamCulture;
        document.getElementById("createEditProfile_teamSize_label").innerHTML = siteContent.teamSizePrompt;
        document.getElementById("createEditProfile_gcDirLink_label").innerHTML = siteContent.gcDirectoryLinkPrompt;
        //document.getElementById("createEditProfile_teamNarrative_label").innerHTML = siteContent.teamNarrativePrompt;
    }
};

EditTeamCultureAPI.initializeTeamCultureForm = function(managerProfileId) {
    //Fill previous form fields
    EditTeamCultureAPI.getTeamCulture(managerProfileId, function(response) {
        var teamCulture = EditTeamCultureAPI.parseTeamCultureResponse(response);
        EditTeamCultureAPI.populateTeamCultureForm(teamCulture);
    });
};

/**
 * 
 * @param {EditTeamCultureAPI.TeamCulture} teamCulture
 * @return {undefined}
 */
EditTeamCultureAPI.populateTeamCultureForm = function(teamCulture) {
    document.getElementById('createEditProfile_teamSize').value = teamCulture.team_size;
    document.getElementById('createEditProfile_gcDirLink').value = teamCulture.gc_directory_url;
    document.getElementById('createEditProfile_teamNarrative_en').value = teamCulture.narrative_text_en;
    document.getElementById('createEditProfile_teamNarrative_fr').value = teamCulture.narrative_text_fr;
};

EditTeamCultureAPI.submitTeamCulture = function(managerProfileId) {
    var teamCulture = new EditTeamCultureAPI.TeamCulture();
    teamCulture.team_size = document.getElementById('createEditProfile_teamSize').value;
    teamCulture.gc_directory_url = document.getElementById('createEditProfile_gcDirLink').value;
    teamCulture.narrative_text_en = document.getElementById('createEditProfile_teamNarrative_en').value;
    teamCulture.narrative_text_fr = document.getElementById('createEditProfile_teamNarrative_fr').value;
    
    EditTeamCultureAPI.putTeamCulture(managerProfileId, teamCulture, function(response) {
       //TODO: handle response 
    });
};

EditTeamCultureAPI.getTeamCulture = function(managerProfileId, responseCallback) {
    var url = EditTeamCultureAPI.baseURL + '/getTeamCultureByManagerProfile/' + managerProfileId;
    EditTeamCultureAPI.sendHttpRequest(url, 'GET', null, responseCallback);
};

EditTeamCultureAPI.putTeamCulture = function(managerProfileId, teamCulture, responseCallback) {
    var url = EditTeamCultureAPI.baseURL + '/putTeamCultureByManagerProfile/' + managerProfileId;
    EditTeamCultureAPI.sendHttpRequest(url, 'PUT', JSON.stringify(teamCulture), responseCallback);
};

EditTeamCultureAPI.sendHttpRequest = function(url, restMethod, payload, responseCallback) {
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
    request.addEventListener("load", function() {
        responseCallback(request.responseText);
    },false);

    request.send(payload);
};
