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
    AccessibilityAPI.preventModalEscapeBackward(firstFocusableItemId, lastFocusableItemId);
    AccessibilityAPI.preventModalEscapeForward(firstFocusableItemId, lastFocusableItemId);
};

/**
 * 
 * @param {type} firstFocusableItemId
 * @param {type} lastFocusableItemId
 * @returns {undefined}
 */
AccessibilityAPI.preventModalEscapeForward = function(firstFocusableItemId, lastFocusableItemId){
    var firstFocusableItem = document.getElementById(firstFocusableItemId);
    var lastFocusableItem = document.getElementById(lastFocusableItemId);
    lastFocusableItem.addEventListener("keydown",function(evt){
        var evt = evt || window.event;
        if (evt.which === 9 && !evt.shiftKey) {
            evt.preventDefault();
            firstFocusableItem.focus();
        }
    });
};

/**
 * 
 * @param {type} firstFocusableItemId
 * @param {type} lastFocusableItemId
 * @returns {undefined}
 */
AccessibilityAPI.preventModalEscapeBackward = function(firstFocusableItemId, lastFocusableItemId){
    var firstFocusableItem = document.getElementById(firstFocusableItemId);
    var lastFocusableItem = document.getElementById(lastFocusableItemId);
    firstFocusableItem.addEventListener("keydown",function(evt){
        var evt = evt || window.event;
        if (evt.which === 9 && evt.shiftKey) {
            evt.preventDefault();
            lastFocusableItem.focus();
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

/**
 * 
 * @param {type} evt
 * @param {type} callback
 * @param {type} params
 * @returns {undefined}
 */
AccessibilityAPI.addEscapeListener = function(evt,callback, params){
    console.log("escaping");
    !evt?evt=window.event:null;
    document.onkeydown = function(evt){
        AccessibilityAPI.escapeModal(evt,callback, params);
    };
};

/**
 * 
 * @param {type} evt
 * @param {type} callback
 * @param {type} params
 * @return {undefined}
 */
AccessibilityAPI.escapeModal = function(evt, callback, params){
    if((evt.key==='Escape'||evt.key==='Esc'||evt.keyCode===27)){
        eval(callback)(params);

        // IE and compatible
        evt.cancelBubble = true;
        evt.returnValue = false;

        // FF and compatible
        if (evt.stopPropagation) {
            evt.stopPropagation();
            evt.preventDefault();
        }
    }
};
