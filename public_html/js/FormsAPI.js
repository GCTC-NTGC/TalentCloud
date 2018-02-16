/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var FormsAPI = {};

FormsAPI.steppedForm = {};

//below are the functions for the tabbed layout of the 'create job poster' page for managers
FormsAPI.steppedForm.goToStep = function(stepId, stepGroupsClassName, saveInProgress, saveFunctionName, focusElementId) {
    var stepGroups = document.getElementsByClassName(stepGroupsClassName);
    
    for (var s = 0; s < stepGroups.length; s++) {
        var stepGroup = stepGroups[s];
        
        if (!stepGroup.classList.contains('hidden')) {
            stepGroup.classList.add('hidden');
        }
        if (stepGroup.id === stepId) {
            stepGroup.classList.remove('hidden');
        }
    }
    if(focusElementId !== null){
        AccessibilityAPI.focusElement(focusElementId);
    }
};

FormsAPI.steppedForm.validateStep = function(stepId, stepGroupsClassName, saveInProgress, saveFunctionName, focusElementId) {
    
    var valid = true;
    
    if(saveInProgress){
        eval(saveFunctionName)();
    }
    
    if (valid) {
        FormsAPI.steppedForm.goToStep(stepId, stepGroupsClassName, saveInProgress, saveFunctionName, focusElementId);
    }
    
};
