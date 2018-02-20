/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var DivisionAPI = {};
DivisionAPI.divisions = [];


//below are the functions for the tabbed layout of the 'create job poster' page for managers
DivisionAPI.loadFromJSON = function(data) {
    
    console.log(data);
    
    DivisionAPI.divisions = data;
    
    console.log(DivisionAPI.divisions);
    
    var createEditProfile_division = document.getElementById("createEditProfile_division");
    
    for(var division in DivisionAPI.divisions){
        var option = document.createElement("option");
        option.setAttribute("value",DivisionAPI.divisions[division].id);
        option.innerHTML = DivisionAPI.divisions[division].value;
        createEditProfile_division.appendChild(option);
    }
    
};

DivisionAPI.filterCreateJobPosterDivisions = function(firstLoad){
    var divisionList = document.getElementById("createJobPoster_listOfDivisions");
    divisionList.innerHTML = "";
    
    //Grab current text
    var divisionSearchBox="";
    if(firstLoad !== true){
        divisionSearchBox = document.getElementById("createJobPoster_division").value;
    }
    for(var i = 0;i < DivisionAPI.divisions.length;i++){
        var divisionData = DivisionAPI.divisions[i];
        console.log(divisionData);
        if(DivisionAPI.divisions[i].toLowerCase().includes(divisionSearchBox.toLowerCase())){
            var division = document.createElement("li");
            var dLink = document.createElement("a");
            dLink.innerHTML = DivisionAPI.divisions[i];
            dLink.setAttribute("href","javascript:DivisionAPI.fillField('"+DivisionAPI.divisions[i]+"')");
            division.innerHTML = "";
            
            division.appendChild(dLink);
            divisionList.appendChild(division);
        }
    }
};

/**
 * <a href="javascript:JobPostAPI.hideJobPoster()"
 * @param {type} element
 * @returns {undefined}
 */
DivisionAPI.fillField = function(val){
    var divisionSearchBox = document.getElementById("createJobPoster_division");
    divisionSearchBox.value = val;
    
};


DivisionAPI.getDivisions = function(locale){
    Utilities.debug?console.log("loading departments"):null;
    console.log("loading divisions");
    var divisions_url = DataAPI.baseURL+"/"+locale+"/Lookup/division";
    getDivisions_xhr = new XMLHttpRequest();
    if ("withCredentials" in getDivisions_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      getDivisions_xhr.open("GET", divisions_url);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      getDivisions_xhr = new XDomainRequest();
      getDivisions_xhr.open("GET", divisions_url);

    } else {

      // Otherwise, CORS is not supported by the browser.
      getDivisions_xhr = null;

    }
    
    getDivisions_xhr.addEventListener("progress",
    function(evt){
        DataAPI.updateProgress(evt);
    },false);
    getDivisions_xhr.addEventListener("load",
        function(evt){
            DivisionAPI.loadedManagerDivisions(getDivisions_xhr.response);
        },false);
    getDivisions_xhr.addEventListener("error",DataAPI.transferFailed,false);
    getDivisions_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    getDivisions_xhr.open('GET',divisions_url);
    getDivisions_xhr.send(null);
};


DivisionAPI.loadedManagerDivisions = function(response){
    setTimeout(function(){
        DivisionAPI.loadFromJSON(JSON.parse(response));
    }
    ,1000);
};