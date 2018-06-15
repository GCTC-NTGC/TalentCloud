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
    xhr.addEventListener("load", function () {
        UserAPI.loaded(xhr.response,isAdmin);
    }, false);

    xhr.send();
};

/**
 *
 * @returns {undefined}
 */
UserAPI.logout = function () {
    var stateInfo = {pageInfo: 'talent_cloud', pageTitle: 'Talent Cloud'};
    document.title = stateInfo.pageTitle;
    history.replaceState(stateInfo, stateInfo.pageInfo, '#');
    
    //User role could be used to reload proper homepage
    //var role = TalentCloudAPI.roles.jobseeker;
    //if (UserAPI.hasSessionUser()) {
    //    role = UserAPI.getSessionUserAsJSON().user_role;
    //}
    
    window.sessionStorage.removeItem('sessionUser');
    
    Utilities.deleteCookie("idToken");
    Utilities.deleteCookie("accessToken");
    Utilities.deleteCookie("refreshToken");

    //reload without url parameters
    window.location = window.location.pathname;
};

/**
 *
 * @param {type} userObj
 * @returns {undefined}
 */
UserAPI.storeSessionUser = function (userObj) {
    window.sessionStorage.sessionUser = JSON.stringify(userObj);
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

UserAPI.updateUser = function(user, updateUserCallback) {
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
};
