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
