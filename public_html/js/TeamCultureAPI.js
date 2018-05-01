var TeamCultureAPI = {};

TeamCultureAPI.baseURL = "/tc/api/v1";

TeamCultureAPI.TeamCulture = function(teamSize, gcDirUrl, narrativeText, operatingContext, whatWeValue, howWeWork) {
    this.team_size = teamSize;
    this.gc_directory_url = gcDirUrl;
    this.narrative_text = narrativeText;
    this.operating_context = operatingContext;
    this.what_we_value = whatWeValue;
    this.how_we_work = howWeWork;
};

TeamCultureAPI.parseTeamCultureResponse = function(responseText) {
    var json = JSON.parse(responseText);
    return new TeamCultureAPI.TeamCulture(json.team_size, json.gc_directory_url, json.narrative_text, json.operating_context, json.what_we_value, json.how_we_work);
};

TeamCultureAPI.localizeTeamCulture = function() {
    if (siteContent) {
        document.getElementById("jobPosterTeamCultureLabel").innerHTML = siteContent.teamCulture;
        document.getElementById("jobPosterTeamSize_label").innerHTML = siteContent.teamSize;
        document.getElementById("jobPosterGcDirLink_label").innerHTML = siteContent.gcDirectoryLink;

        //document.getElementById("jobPosterOperatingContext_label").innerHTML = siteContent.operatingContextLabel;
        //document.getElementById("jobPosterWhatWeValue_label").innerHTML = siteContent.whatWeValueLabel;
        //document.getElementById("jobPosterHowWeWork_label").innerHTML = siteContent.howWeWorkLabel;
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

    document.getElementById('jobPosterOperatingContext_text').innerHTML = teamCulture.operating_context;
    document.getElementById('jobPosterWhatWeValue_text').innerHTML = teamCulture.what_we_value;
    document.getElementById('jobPosterHowWeWork_text').innerHTML = teamCulture.how_we_work;
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
