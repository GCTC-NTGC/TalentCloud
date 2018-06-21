/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var DepartmentAPI = {};
DepartmentAPI.departments = [];


//below are the functions for the tabbed layout of the 'create job poster' page for managers
DepartmentAPI.loadFromJSON = function(data) {
    
    console.log(data);
    
    DepartmentAPI.departments = data;
    
    /*for(var department in departments) {
        DepartmentAPI.departments.push( department.id );
    }*/
    
    console.log(DepartmentAPI.departments);
    
    var createEditProfile_department = document.getElementById("createEditProfile_department");
    
    for(var department in DepartmentAPI.departments){
        var option = document.createElement("option");
        option.setAttribute("value",DepartmentAPI.departments[department].id);
        option.innerHTML = DepartmentAPI.departments[department].value;
        createEditProfile_department.appendChild(option);
    }
    
};

DepartmentAPI.filterCreateJobPosterDepartments = function(firstLoad){
    var departmentList = document.getElementById("createJobPoster_listOfDepartments");
    Utilities.clearSelectOptions(departmentList);
    
    //Grab current text
    var departmentSearchBox="";
    if(firstLoad !== true){
        departmentSearchBox = document.getElementById("createJobPoster_department").value;
    }
    for(var i = 0;i < DepartmentAPI.departments.length;i++){
        var departmentData = DepartmentAPI.departments[i];
        console.log(departmentData);
        if(DepartmentAPI.departments[i].toLowerCase().includes(departmentSearchBox.toLowerCase())){
            var department = document.createElement("li");
            var dLink = document.createElement("a");
            dLink.innerHTML = DepartmentAPI.departments[i];
            dLink.setAttribute("href","javascript:DepartmentAPI.fillField('"+DepartmentAPI.departments[i]+"')");
            department.innerHTML = "";
            
            department.appendChild(dLink);
            departmentList.appendChild(department);
        }
    }
};

/**
 * @param {type} element
 * @returns {undefined}
 */
DepartmentAPI.fillField = function(val){
    var departmentSearchBox = document.getElementById("createJobPoster_department");
    departmentSearchBox.value = val;
    
};


DepartmentAPI.getDepartments = function(locale){
    var departments_url = DataAPI.baseURL+"/"+locale+"/Lookup/department";
    DataAPI.sendRequest(departments_url, "GET", {}, null, function(request) {
        DepartmentAPI.loadedManagerDepartments(request.response);
    });
};


DepartmentAPI.loadedManagerDepartments = function(response){
    setTimeout(function(){
        DepartmentAPI.loadFromJSON(JSON.parse(response));
    }
    ,1000);
};