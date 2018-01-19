/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var FileUploadAPI = {};

FileUploadAPI.FileUpload = function (name, content, last_updated) {
    this.file_name = name;
    this.file_content = content;
    this.last_updated = last_updated;
};

function Date_toYMD(date) {
    var year, month, day;
    year = String(date.getFullYear());
    month = String(date.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }
    day = String(date.getDate());
    if (day.length == 1) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
}

FileUploadAPI.uploadTestFile = function() {
    var testFile = new FileUploadAPI.FileUpload('test_file.txt', 'This is test file content', Date_toYMD(new Date()));
    return FileUploadAPI.saveFileUpload('user',1, testFile);
}

FileUploadAPI.saveFileUpload = function(ownerType, ownerId, fileUpload) {
    var saveFileUpload_url = [DataAPI.baseURL,'uploads',ownerType,ownerId,fileUpload.file_name].join('/');
    var jsonData=JSON.stringify(fileUpload);

    var saveFileUpload_xhr = new XMLHttpRequest();
    if ("withCredentials" in saveFileUpload_xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        saveFileUpload_xhr.open("PUT", saveFileUpload_url);

    } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        saveFileUpload_xhr = new XDomainRequest();
        saveFileUpload_xhr.open("PUT", saveFileUpload_url);

    } else {

        // Otherwise, CORS is not supported by the browser.
        saveFileUpload_xhr = null;

    }
    
    saveFileUpload_xhr.setRequestHeader("Content-Type","application/json");
    
    saveFileUpload_xhr.addEventListener("progress",DataAPI.updateToggleProgress,false);
    saveFileUpload_xhr.addEventListener("load",function(){
            FileUploadAPI.saveFileUploadLoaded(saveFileUpload_xhr.response);
    }
    ,false);
    saveFileUpload_xhr.addEventListener("error",DataAPI.transferFailed,false);
    saveFileUpload_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    saveFileUpload_xhr.send(jsonData);
};

FileUploadAPI.saveFileUploadLoaded = function(response) {
    console.log(response);
}
