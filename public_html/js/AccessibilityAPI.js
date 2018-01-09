/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var AccessibilityAPI = {};

/**
 * 
 * @param {type} firstFocusableItemId
 * @param {type} lastFocusableItemId
 * @returns {undefined}
 */
AccessibilityAPI.preventModalEscape = function(firstFocusableItemId,lastFocusableItemId){
    AccessibilityAPI.preventModalEscapeBackward(firstFocusableItemId);
    AccessibilityAPI.preventModalEscapeForward(lastFocusableItemId);
};

/**
 * 
 * @param {type} lastFocusableItemId
 * @returns {undefined}
 */
AccessibilityAPI.preventModalEscapeForward = function(lastFocusableItemId){
    var lastFocusableItem = document.getElementById(lastFocusableItemId);
    lastFocusableItem.addEventListener("keydown",function(evt){
        var evt = evt || window.event;
        if (evt.which === 9 && !evt.shiftKey) {
            evt.preventDefault();
        }
    });
};

/**
 * 
 * @param {type} firstFocusableItemId
 * @returns {undefined}
 */
AccessibilityAPI.preventModalEscapeBackward = function(firstFocusableItemId){
    var firstFocusableItem = document.getElementById(firstFocusableItemId);
    firstFocusableItem.addEventListener("keydown",function(evt){
        var evt = evt || window.event;
        if (evt.which === 9 && evt.shiftKey) {
            evt.preventDefault();
        }
    });
};

/**
 * 
 * @returns {undefined}
 */
AccessibilityAPI.onKeydownPreventEscapeBackward = function(){
    var evt = evt || window.event;
    if (evt.which === 9 && evt.shiftKey) {
        evt.preventDefault();
    }
};

/**
 * 
 * @returns {undefined}
 */
AccessibilityAPI.onKeydownPreventEscapeForward = function(){
    var evt = evt || window.event;
    //console.log(evt);
    if (evt.which === 9 && !evt.shiftKey) {
        evt.preventDefault();
    }
};

/**
 * 
 * @param {type} ele
 * @param {type} labelledById
 * @returns {undefined}
 */
AccessibilityAPI.setARIALabelledBy = function(ele,labelledById){ 
    ele.setAttribute("aria-labelledby",labelledById);
};

/**
 * 
 * @param {type} ele
 * @param {type} describedById
 * @returns {undefined}
 */
AccessibilityAPI.setARIADescribedBy = function(ele,describedById){
    ele.setAttribute("aria-labelledby",describedById);
};

AccessibilityAPI.focusElement = function(elementId){
    var elementToFocus = document.getElementById(elementId);
    elementToFocus.focus();
};

AccessibilityAPI.enableTabIndex = function(elementId){
    var ele = document.getElementById(elementId);
    if(ele !== undefined){
        ele.setAttribute("tabIndex","0");
    }
};