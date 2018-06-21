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
 * @param {type} element
 * @returns {undefined}
 */
DivisionAPI.fillField = function(val){
    var divisionSearchBox = document.getElementById("createJobPoster_division");
    divisionSearchBox.value = val;
    
};


DivisionAPI.getDivisions = function(locale){
    var divisions_url = DataAPI.baseURL+"/"+locale+"/Lookup/division";
    DataAPI.sendRequest(divisions_url, "GET", {}, null, function(request) {
        DivisionAPI.loadedManagerDivisions(request.response);
    });
};


DivisionAPI.loadedManagerDivisions = function(response){
    setTimeout(function(){
        DivisionAPI.loadFromJSON(JSON.parse(response));
    }
    ,1000);
};