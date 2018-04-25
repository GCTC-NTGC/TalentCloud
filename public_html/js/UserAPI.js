/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var UserAPI = {};

UserAPI.version = "v1";

UserAPI.baseURL = "/tc/api/" + UserAPI.version + "";

UserAPI.User = function () {
    this.user_id = null;
    this.name = null;
    this.email = null;
    this.password = null;
    this.is_confirmed = null;
    this.user_role = null;
    this.open_id = null;
};

/**
 * @param {XMLHttpRequest} httpResponse - returned from http request
 * @return {UserAPI.User}
 */
UserAPI.parseUserResponse = function(httpResponse) {
    var userJson = JSON.parse(httpResponse);

    var user = new UserAPI.User();
    user.user_id = userJson.user_id;
    user.email = userJson.email;
    user.password = userJson.password;
    user.name = userJson.name;
    user.is_confirmed = userJson.is_confirmed;
    user.user_role = userJson.user_role;
    user.open_id = userJson.open_id;

    return user;
};

/**
 *
 * @returns {undefined}
 */
UserAPI.login = function (isAdmin) {
    var credentials = {};
    if (UserAPI.hasSessionUser()){
        credentials = UserAPI.getSessionUserAsJSON();
        if (UserAPI.hasAuthToken() && credentials !== null) {
            idToken = UserAPI.getOpenIDToken();
            credentials.idToken = idToken;
            credentials.user_role = TalentCloudAPI.roles.jobseeker;
            if(isAdmin){
                credentials.user_role = TalentCloudAPI.roles.admin;
            }
            UserAPI.authenticate(credentials,isAdmin);
        }
    } else {
        UserAPI.failedLogin();
    }
};

/**
 *
 * @param {type} credentials
 * @returns {undefined}
 */
UserAPI.authenticate = function (credentials,isAdmin) {
    
    var auth_url = UserAPI.baseURL + "/authenticate";
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open("POST", auth_url);

    } else if (typeof XDomainRequest != "undefined") {
        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open("POST", auth_url);
    } else {
        // Otherwise, CORS is not supported by the browser.
        xhr = null;
        // TODO: indicate to user that browser is not supported
    }

    xhr.open('POST', auth_url);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + credentials.idToken);
    xhr.addEventListener("progress", UserAPI.updateProgress, false);
    xhr.addEventListener("load", function () {
        UserAPI.loaded(xhr.response,isAdmin);
    }, false);
    xhr.addEventListener("error", UserAPI.transferFailed, false);
    xhr.addEventListener("abort", UserAPI.transferAborted, false);

    xhr.send(JSON.stringify(credentials));
};

/**
 *
 * @param {type} credentials
 * @returns {undefined}
 */
UserAPI.getUserById = function (credentials,isAdmin) {
    authToken = credentials.idToken;
    var open_id = credentials.sub;

    var auth_url = UserAPI.baseURL + "/user/"+open_id;
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open("GET", auth_url);

    } else if (typeof XDomainRequest != "undefined") {
        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open("GET", auth_url);
    } else {
        // Otherwise, CORS is not supported by the browser.
        xhr = null;
        // TODO: indicate to user that browser is not supported
    }

    xhr.open('GET', auth_url);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + authToken);
    xhr.addEventListener("progress", UserAPI.updateProgress, false);
    xhr.addEventListener("load", function () {
        UserAPI.loaded(xhr.response,isAdmin);
    }, false);
    xhr.addEventListener("error", UserAPI.transferFailed, false);
    xhr.addEventListener("abort", UserAPI.transferAborted, false);

    xhr.send();
};

/**
 *
 * @returns {undefined}
 */
UserAPI.updateProgress = function () {

};

/**
 *
 * @returns {Boolean}
 */
UserAPI.register = function (isManager) {
    /*var registerForm = document.getElementById("registerForm");
    var email = registerForm.register_email.value;
    var email_confirm = registerForm.register_email_confirm.value;
    var password = registerForm.register_password.value;
    var password_confirm = registerForm.register_password_confirm.value;
    var userrole = "jobseeker";
    if (isManager) {
        userrole = "manager";
    }
    var isValid = FormValidationAPI.validateRegisterForm(email, email_confirm, password, password_confirm);

    var credentials = {};
    credentials.email = email;
    credentials.password = password;
    credentials.userrole = userrole;
    // TODO: store name, email, hash in db and send validation email
    if (isValid) {
        UserAPI.registerUser(credentials);
    }*/
    var openIdInfo = "";
};


/**
 *
 * @param {type} credentials
 * @returns {undefined}
 */
UserAPI.registerUser = function (credentials) {

    var registerUser_url = UserAPI.baseURL + "/user/register";
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open("POST", registerUser_url);

    } else if (typeof XDomainRequest != "undefined") {
        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open("POST", registerUser_url);
    } else {
        // Otherwise, CORS is not supported by the browser.
        xhr = null;
        // TODO: indicate to user that browser is not supported
    }

    xhr.open('POST', registerUser_url);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    //xhr.setRequestHeader('X-CSRF-Token', UserAPI.getCSRFTokenValue());
    xhr.addEventListener("progress", UserAPI.updateProgress, false);
    xhr.addEventListener("load", function () {
        UserAPI.userRegistered(xhr.response);
    }, false);
    xhr.addEventListener("error", UserAPI.transferFailed, false);
    xhr.addEventListener("abort", UserAPI.transferAborted, false);

    xhr.send(JSON.stringify(credentials));
};

UserAPI.userRegistered = function (response) {
    //console.log(response);
    var result = JSON.parse(response);
    var registerSuccess = result.userRegistered;
    var confEmailSuccess = result.confEmailSent;
    UserAPI.clearFormFields("registerForm");
    UserAPI.showRegisterConf(registerSuccess, confEmailSuccess);
};

UserAPI.showRegisterConf = function (registerSuccess, confEmailSuccess) {
    var registrationForm = document.getElementById("registerFormOverlay");
    var registrationStatus = document.getElementById("registerStatusOverlay");
    var registrationFormStatusMessage = document.getElementById("registrationStatusSuccessMessage");
    var registrationFormEmailConfMessage = document.getElementById("registrationStatusEmailConfMessage");

    var registrationSuccessMessage = "<h4>Registration Successful</h4>";
    var registrationFailureMessage = "<h4>Registration Unsuccessful</h4>";
    if (registerSuccess) {
        registrationFormStatusMessage.innerHTML = registrationSuccessMessage;
    } else {
        registrationFormStatusMessage.innerHTML = registrationFailureMessage;
    }

    AccessibilityAPI.preventModalEscape("registerStatusCloseBtn", "registerStatusLoginBtn");
    AccessibilityAPI.focusElement("registerStatusLoginBtn");

    UserAPI.clearFormFields("registerForm");
    registrationForm.classList.add("hidden");

    registrationStatus.classList.remove("hidden");

    modalSize();

};


/**
 *
 * @returns {undefined}
 */
UserAPI.hideRegisterConf = function () {
    /*var stateInfo = {pageInfo: 'talent_cloud', pageTitle: 'Talent Cloud'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#');*/

    var registrationFormStatusMessage = document.getElementById("registrationStatusSuccessMessage");
    registrationFormStatusMessage.innerHTML = "";
    var registrationFormEmailConfMessage = document.getElementById("registrationStatusEmailConfMessage");
    registrationFormEmailConfMessage.innerHTML = "";

    var registrationStatus = document.getElementById("registerStatusOverlay");
    registrationStatus.classList.add("hidden");
};


/**
 *
 * @returns {Boolean}
 */
UserAPI.submitNewJobPoster = function () {
    var newJobPosterForm = document.getElementById("createJobPosterForm");
    var title = newJobPosterForm.newJobPoster_title.value;
    var closeDate = newJobPosterForm.newJobPoster_closeDate.value;
    var id = newJobPosterForm.newJobPoster_id.value;
    var department = newJobPosterForm.newJobPoster_department.value;
    var isValid = FormValidationAPI.validateNewJobPosterForm(title, closeDate, id, department);
    // TODO: store name, email, hash in db
    // TODO: send validation email
    return isValid;
};

/**
 *
 * @param {type} response
 * @returns {undefined}
 */
UserAPI.authTokenCallback = function (response, credentials) {
    var tokenJSON = JSON.parse(response);
    if (tokenJSON.failed) {
        UserAPI.authenticationFail();
    } else {
        UserAPI.storeAuthToken(tokenJSON);
        if (credentials !== null) {
            credentials.authToken = tokenJSON.token;
        }
        UserAPI.getUserById(credentials);
    }
};

/**
 *
 * @param {type} response
 * @returns {undefined}
 */
UserAPI.loaded = function (response,isAdmin) {
    //console.log(response);
    var authJSON = JSON.parse(response);
    //console.log(authJSON);
    var sessionUser = UserAPI.getSessionUserAsJSON();
    if(isAdmin){
        if(sessionUser.user_role === TalentCloudAPI.roles.jobseeker){
            UserAPI.logout();
        }
    }
    
    if(!authJSON.failed){
        sessionUser.user_id = authJSON.user_id;
        sessionUser.user_role = authJSON.user_role;
        UserAPI.storeSessionUser(sessionUser);
        
        if (sessionUser.user_id !== "") {

            var loggedIn = document.getElementById("loggedIn");
            loggedIn.classList.remove("hidden");

            var loggedOut = document.getElementById("loggedOut");
            loggedOut.classList.add("hidden");

            var registerLink = document.getElementById("register");
            registerLink.classList.add("hidden");

            EventsAPI.hideBodyOverflow(false);

            console.log(sessionUser.user_role);
            if (sessionUser.user_role === TalentCloudAPI.roles.jobseeker) {
                DataAPI.getJobSeekerProfileByUserId(sessionUser.user_id, JobSeekerAPI.populateJobSeekerProfile);
                JobSeekerAPI.refreshJobSeekerProfilePic();

                var dashBoardLink = document.getElementById("dashBoardLink");

                if (dashBoardLink !== null) {
                    var dashBoardLinkListItem = document.getElementById("dashBoardLinkListItem");
                    dashBoardLink.classList.remove("hidden");
                    dashBoardLinkListItem.setAttribute("aria-hidden", "false");
                }
            }

            var myProfileLink = document.getElementById("profileLink");

            if (myProfileLink !== null) {
                var profileLinkListItem = document.getElementById("profileLinkListItem");
                myProfileLink.classList.remove("hidden");
                profileLinkListItem.setAttribute("aria-hidden", "false");
                AccessibilityAPI.focusElement("profileLinkListItem");
            }
            if (sessionUser.user_role === TalentCloudAPI.roles.admin || sessionUser.user_role === TalentCloudAPI.roles.manager) {
                var jobPostersLinkListItem = document.getElementById("jobPostersLinkListItem");
                if (jobPostersLinkListItem){
                    jobPostersLinkListItem.setAttribute("aria-hidden", "false");
                }
                var jobPostersLink = document.getElementById("jobPostersLink");
                if (jobPostersLink){
                    jobPostersLink.classList.remove("hidden");
                }
            }

            EventsAPI.hideBodyOverflow(false);

        }
    } else {
        UserAPI.logout();
    }

};

/**
 *
 * @returns {undefined}
 */
UserAPI.transferFailed = function () {
    NetworkErrorMessage();
};

/**
 *
 * @returns {undefined}
 */
UserAPI.transferAborted = function () {
    NetworkErrorMessage();
};

/**
 *
 * @returns {undefined}
 */
UserAPI.logout = function () {
    var stateInfo = {pageInfo: 'talent_cloud', pageTitle: 'Talent Cloud'};
    document.title = stateInfo.pageTitle;
    history.replaceState(stateInfo, stateInfo.pageInfo, '#');
    
    var storage = window.sessionStorage;
    storage.removeItem('accessToken');
    storage.removeItem('idToken');
    storage.removeItem('refreshToken');
    storage.removeItem('sessionUser');
    storage.removeItem('expires_in');
    storage.removeItem('expires_at');

    window.location.reload();
    
};

UserAPI.logoutCallback = function(){
    window.location.reload();
};

UserAPI.authenticationFail = function () {
    UserAPI.logout();
    UserAPI.showLogin();
    var loginErrors = document.getElementById("loginErrors");
    loginErrors.innerHTML = "Login unsuccessful. Please verify your email address and password.";
    loginErrors.classList.remove('hidden');
};

/**
 *
 * @param {type} linkElement
 * @returns {undefined}
 */
UserAPI.showLogin = function () {
    //var stateInfo = {pageInfo: 'user_login', pageTitle: 'Talent Cloud: Login'};
    //document.title = stateInfo.pageTitle;
    //history.pushState(stateInfo, stateInfo.pageInfo, '#Login');

    var loginDialog = document.getElementById("loginOverlay");
    loginDialog.classList.remove("hidden");
    EventsAPI.setFormFocus("switchToRegister");
    EventsAPI.hideBodyOverflow(true);
    AccessibilityAPI.preventModalEscape("register_email", "loginFormLoginBtn");
    modalSize();
};

/**
 *
 * @returns {undefined}
 */
UserAPI.failedLogin = function () {
    //UserAPI.showLogin();
};

/**
 *
 * @returns {undefined}
 */
UserAPI.cancelLogin = function () {
    /*var stateInfo = {pageInfo: 'talent_cloud', pageTitle: 'Talent Cloud'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#');//*/

    var loginOverlay = document.getElementById("loginOverlay");
    loginOverlay.classList.add("hidden");

    var loginErrors = document.getElementById("loginErrors");
    loginErrors.innerHTML = "";
    loginErrors.classList.add('hidden');

    UserAPI.clearFormFields('loginForm');

    EventsAPI.hideBodyOverflow(false);
};

/**
 *
 * @param {type} linkElement
 * @returns {undefined}
 */
UserAPI.showRegisterForm = function () {
    //var stateInfo = {pageInfo: 'register', pageTitle: 'Talent Cloud: Register'};
    //document.title = stateInfo.pageTitle;
    //history.pushState(stateInfo, stateInfo.pageInfo, '#Register');//last parameter just replaced with #Register instead of url

    var registerDialog = document.getElementById("registerFormOverlay");
    registerDialog.classList.remove("hidden");

    EventsAPI.setFormFocus("switchToLogin");
    EventsAPI.hideBodyOverflow(true);
    AccessibilityAPI.preventModalEscape("switchToLogin","registerFormRegisterBtn");
    modalSize();
};

/**
 *
 * @returns {undefined}
 */
UserAPI.hideRegisterForm = function () {
    /*var stateInfo = {pageInfo: 'talent_cloud', pageTitle: 'Talent Cloud'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#');*/

    var registerDialog = document.getElementById("registerFormOverlay");
    registerDialog.classList.add("hidden");

    EventsAPI.hideBodyOverflow(false);
    UserAPI.clearFormFields("registerForm");
};


/**
 *
 * @param {type} authToken
 * @returns {undefined}
 */
UserAPI.storeAuthToken = function (authToken) {
    window.sessionStorage.authToken = JSON.stringify(authToken);
};

/**
 *
 * @param {type} accessToken
 * @returns {undefined}
 */
UserAPI.storeOpenIDAccessToken = function (accessToken) {
    window.sessionStorage.accessToken = JSON.stringify(accessToken);
};

/**
 *
 * @param {type} idToken
 * @returns {undefined}
 */
UserAPI.storeOpenIDToken = function (idToken) {
    window.sessionStorage.idToken = JSON.stringify(idToken);
};

/**
 *
 * @param {type} refreshToken
 * @returns {undefined}
 */
UserAPI.storeOpenIDRefreshToken = function (refreshToken) {
    window.sessionStorage.refreshToken = JSON.stringify(refreshToken);
};

/**
 *
 * @param {type} refreshToken
 * @returns {undefined}
 */
UserAPI.storeOpenIDExpiry = function (expires_in) {
    window.sessionStorage.expires_in = expires_in;
};

/**
 *
 * @returns {Window.sessionStorage.authToken|Storage.authToken|String}
 */
UserAPI.getOpenIDAccessToken = function () {
    var existingToken = JSON.parse(window.sessionStorage.accessToken);
    //console.log(existingToken);
    return existingToken;
};

UserAPI.getOpenIDToken = function () {
    var existingIDToken = JSON.parse(window.sessionStorage.idToken);
    //console.log(existingToken);
    return existingIDToken;
};


UserAPI.getOpenIDRefreshToken = function () {
    var existingRefreshToken = JSON.parse(window.sessionStorage.refreshToken);
    //console.log(existingToken);
    return existingRefreshToken;
};

/**
 *
 * @return {undefined}
 */
UserAPI.getAuthToken = function () {
    var existingIDToken = JSON.parse(window.sessionStorage.idToken);
    //console.log(existingToken);
    return existingIDToken;
};

/**
 *
 * @returns {Window.sessionStorage.authToken|Storage.authToken|String}
 */
UserAPI.getAuthTokenAsJSON = function () {
    var existingToken = window.sessionStorage.idToken;
    if (UserAPI.hasAuthToken) {
        return JSON.parse(existingToken);
    } else {
        return null;
    }
};


/**
 *
 * @returns {Window.sessionStorage.authToken|Storage.authToken|String}
 */
UserAPI.hasAuthToken = function () {
    return window.sessionStorage.idToken === undefined ? false : true;
};

/**
 *
 * @param {type} userObj
 * @returns {undefined}
 */
UserAPI.storeSessionUser = function (userObj) {
    window.sessionStorage.sessionUser = JSON.stringify(userObj);
};

UserAPI.storeSessionObject = function(objName, obj, asString){
    window.sessionStorage[objName] = asString?JSON.stringify(obj):obj;
};

/**
 *
 * @param {type} userObj
 * @returns {undefined}
 */
UserAPI.storeOpenIdSessionUser = function (userObj) {
    window.sessionStorage.openIdSessionUser = JSON.stringify(userObj);
};

/**
 *
 * @returns {Window.sessionStorage.authToken|Storage.authToken|String}
 */
UserAPI.hasSessionUser = function () {
    return window.sessionStorage.sessionUser === undefined ? false : true;
};

/**
 *
 * @returns {Window.sessionStorage.authToken|Storage.authToken|String}
 */
UserAPI.getSessionUserAsJSON = function () {
    var sessionUser = window.sessionStorage.sessionUser;
    //console.log(sessionUser);
    if (sessionUser) {
        return JSON.parse(sessionUser);
    } else {
        return null;
    }
};

/**
 *
 * @returns {Window.sessionStorage.authToken|Storage.authToken|String}
 */
UserAPI.hasAuthTokenExpired = function () {
    var hasExpired = true;
    if (UserAPI.hasAuthToken()) {
        var token = UserAPI.getAuthTokenAsJSON();
        //console.log(token);
        var tokenExpiry = new Date(token.expires_in * 1000);
        var now = new Date();
        //console.log(Utilities.addDays(now,1).getTime());
        //console.log(tokenExpiry.getTime());
        //console.log(Utilities.addDays(now,1).getTime() <= tokenExpiry.getTime());
        if (Utilities.addDays(now, 1).getTime() >= tokenExpiry) {
            hasExpired = false;
        } else {
            hasExpired = true;
        }
    } else {
        hasExpired = true;
    }
    return hasExpired;
};

/**
 *
 * @param {type} formId
 * @returns {undefined}
 */
UserAPI.clearFormFields = function (formId) {
    var formToClear = document.getElementById(formId);

    var inputElementTypesToClear = ["text", "email", "password"];
    var elementsToClear = ["textarea", "select", "range"];

    var elements = formToClear.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {

        if (inputElementTypesToClear.includes(elements[i].type)) {
            elements[i].value = "";
        }

        if (elementsToClear.includes(elements[i].tagName)) {
            elements[i].value = "";
        }

    }
};

UserAPI.updateUser = function(user, updateUserCallback) {
    var authToken = UserAPI.getAuthToken();

    Utilities.debug?console.log("updating user"):null;
    var updateUser_url = UserAPI.baseURL+"/user/update/";
    var jsonData=JSON.stringify(user);

    var updateUser_xhr = new XMLHttpRequest();
    if ("withCredentials" in updateUser_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      updateUser_xhr.open("PUT", updateUser_url);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      updateUser_xhr = new XDomainRequest();
      updateUser_xhr.open("PUT", updateUser_url);

    } else {

      // Otherwise, CORS is not supported by the browser.
      updateUser_xhr = null;

    }

    updateUser_xhr.open('PUT',updateUser_url);
    updateUser_xhr.setRequestHeader("Content-Type","application/json");
    updateUser_xhr.setRequestHeader("Authorization", "Bearer " + authToken);

    //updateUser_xhr.addEventListener("progress",DataAPI.updateToggleProgress,false);
    //updateUser_xhr.addEventListener("error",DataAPI.transferFailed,false);
    //updateUser_xhr.addEventListener("abort",DataAPI.transferAborted,false);
    updateUser_xhr.addEventListener("load",function(){
        var responseJson = JSON.parse(updateUser_xhr.responseText);
        if (responseJson.userUpdated && responseJson.updatedUser) {
            UserAPI.storeSessionUser(responseJson.updatedUser);
        }
        updateUserCallback(updateUser_xhr.response);
    }
    ,false);
    updateUser_xhr.send(jsonData);
}
