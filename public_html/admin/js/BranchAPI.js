/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var BranchAPI = {};
BranchAPI.branches = [];


//below are the functions for the tabbed layout of the 'create job poster' page for managers
BranchAPI.loadFromJSON = function(data) {
    
    console.log(data);
    
    BranchAPI.branches = data;
    
    console.log(BranchAPI.branches);
    
    var createEditProfile_branch = document.getElementById("createEditProfile_branch");
    
    for(var branch in BranchAPI.branches){
        var option = document.createElement("option");
        option.setAttribute("value",BranchAPI.branches[branch].id);
        option.innerHTML = BranchAPI.branches[branch].value;
        createEditProfile_branch.appendChild(option);
    }
    
};

BranchAPI.filterCreateJobPosterBranches = function(firstLoad){
    var branchList = document.getElementById("createJobPoster_listOfDivisions");
    branchList.innerHTML = "";
    
    //Grab current text
    var branchSearchBox="";
    if(firstLoad !== true){
        branchSearchBox = document.getElementById("createJobPoster_branch").value;
    }
    for(var i = 0;i < BranchAPI.branches.length;i++){
        var branchData = BranchAPI.branches[i];
        console.log(branchData);
        if(BranchAPI.branches[i].toLowerCase().includes(branchSearchBox.toLowerCase())){
            var branch = document.createElement("li");
            var dLink = document.createElement("a");
            dLink.innerHTML = BranchAPI.branches[i];
            dLink.setAttribute("href","javascript:BranchAPI.fillField('"+BranchAPI.branches[i]+"')");
            branch.innerHTML = "";
            
            branch.appendChild(dLink);
            branchList.appendChild(branch);
        }
    }
};

/**
 * <a href="javascript:JobPostAPI.hideJobPoster()"
 * @param {type} element
 * @returns {undefined}
 */
BranchAPI.fillField = function(val){
    var branchSearchBox = document.getElementById("createJobPoster_branch");
    branchSearchBox.value = val;
    
};


BranchAPI.getBranches = function(locale){
    Utilities.debug?console.log("loading departments"):null;
    console.log("loading branches");
    var branches_url = DataAPI.baseURL+"/"+locale+"/Lookup/branch";
    getBranches_xhr = new XMLHttpRequest();
    if ("withCredentials" in getBranches_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      getBranches_xhr.open("GET", branches_url);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      getBranches_xhr = new XDomainRequest();
      getBranches_xhr.open("GET", branches_url);

    } else {

      // Otherwise, CORS is not supported by the browser.
      getBranches_xhr = null;

    }
    
    getBranches_xhr.addEventListener("progress",
    function(evt){
        DataAPI.updateProgress(evt);
    },false);
    getBranches_xhr.addEventListener("load",
        function(evt){
            BranchAPI.loadedManagerBranches(getBranches_xhr.response);
        },false);
    getBranches_xhr.addEventListener("error",DataAPI.transferFailed,false);
    getBranches_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    getBranches_xhr.open('GET',branches_url);
    getBranches_xhr.send(null);
};


BranchAPI.loadedManagerBranches = function(response){
    setTimeout(function(){
        BranchAPI.loadFromJSON(JSON.parse(response));
    }
    ,1000);
};