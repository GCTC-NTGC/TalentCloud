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
 * @param {type} element
 * @returns {undefined}
 */
BranchAPI.fillField = function(val){
    var branchSearchBox = document.getElementById("createJobPoster_branch");
    branchSearchBox.value = val;
    
};


BranchAPI.getBranches = function(locale){
    var branches_url = DataAPI.baseURL+"/"+locale+"/Lookup/branch";
    DataAPI.sendRequest(branches_url, 'GET', {}, null, function(request) {
        BranchAPI.loadedManagerBranches(request.response);
    });
};


BranchAPI.loadedManagerBranches = function(response){
    setTimeout(function(){
        BranchAPI.loadFromJSON(JSON.parse(response));
    }
    ,1000);
};