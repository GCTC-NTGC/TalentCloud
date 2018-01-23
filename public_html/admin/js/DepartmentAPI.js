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
    
    var departments = data;
    
    for(var department in departments) {
        DepartmentAPI.departments.push( department + " : " + departments[department]);
    }
    console.log(DepartmentAPI.departments);
};

DepartmentAPI.filterCreateJobPosterDepartments = function(firstLoad){
    var departmentList = document.getElementById("createJobPoster_listOfDepartments");
    departmentList.innerHTML = "";
    
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
 * <a href="javascript:JobPostAPI.hideJobPoster()"
 * @param {type} element
 * @returns {undefined}
 */
DepartmentAPI.fillField = function(val){
    var departmentSearchBox = document.getElementById("createJobPoster_department");
    departmentSearchBox.value = val;
    
};
