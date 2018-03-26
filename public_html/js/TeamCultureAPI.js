var TeamCultureAPI = {};

TeamCultureAPI.baseURL = "/tc/api/v1";

TeamCultureAPI.TeamCulture = function(teamSize, gcDirUrl, narrativeText) {
    this.team_size = teamSize;
    this.gc_directory_url = gcDirUrl;
    this.narrative_text = narrativeText;
};

TeamCultureAPI.parseTeamCultureResponse = function(responseText) {
    var json = JSON.parse(responseText);
    return new TeamCultureAPI.TeamCulture(json.team_size, json.gc_directory_url, json.narrative_text);
};

TeamCultureAPI.localizeTeamCulture = function() {
    if (siteContent) {
        document.getElementById("jobPosterTeamCultureLabel").innerHTML = siteContent.teamCulture;
        document.getElementById("jobPosterTeamSize_label").innerHTML = siteContent.teamSize;
        document.getElementById("jobPosterGcDirLink_label").innerHTML = siteContent.gcDirectoryLink;
    }
};

TeamCultureAPI.loadTeamCultureSummary = function(managerProfileId) {
    TeamCultureAPI.getTeamCulture(managerProfileId, function(response) {
        var teamCulture = TeamCultureAPI.parseTeamCultureResponse(response);
        TeamCultureAPI.populateTeamCultureSummary(teamCulture);
    });
};

TeamCultureAPI.populateTeamCultureSummary = function(teamCulture) {
    document.getElementById('jobPosterTeamSize').innerHTML = teamCulture.team_size;
    document.getElementById('jobPosterGcDirLink').href = teamCulture.gc_directory_url;
    document.getElementById('jobPosterTeamNarrativeText').innerHTML = teamCulture.narrative_text;
};

TeamCultureAPI.getTeamCulture = function(managerProfileId, responseCallback) {
    var url = TeamCultureAPI.baseURL + '/' + TalentCloudAPI.getLanguageFromCookie() + '/getTeamCultureByManagerProfile/' + managerProfileId;
    TeamCultureAPI.sendHttpRequest(url, 'GET', null, responseCallback);
};

TeamCultureAPI.sendHttpRequest = function(url, restMethod, payload, responseCallback) {
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