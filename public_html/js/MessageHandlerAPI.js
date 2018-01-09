/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*Common arguments for show Hide function*/
var showHideArgs=new Array();
showHideArgs.push('yesNoModalOverlay');
showHideArgs.push('yesNoModalOverlay hidden');
showHideArgs.push('yesNoModalOverlay visible');

/**
 * 
 * @param {string} elemId
 * @param {string} hiddenClass
 * @param {string} visibleClass
 * @param {string} messageTitle
 * @param {string} messageText
 * @param {string} messageButtons
 * @returns {Message.message|Object}
 */
function Message(elemId,hiddenClass,visibleClass,messageTitle,messageText,messageButtons){
    var message=new Object();
    message.elemId=elemId;
    message.hiddenClass=hiddenClass;
    message.visibleClass=visibleClass;
    message.title=messageTitle;
    message.text=messageText;
    message.buttons=messageButtons;
    return message;
}

/**
 * 
 * @param {string} buttonText
 * @param {string} buttonCallback
 * @param {string} buttonClassName
 * @param {Array} buttonCallbackArgs
 * @returns {Button.button|Element}
 */
function Button(buttonText,buttonClassName,buttonCallback,buttonCallbackArgs){

    var button=new Object();
    button.text=buttonText;
    button.className=buttonClassName;
    if(buttonCallbackArgs!==null){
        var stringArgs="'"+buttonCallbackArgs.join("','")+"'";
        button.callback=buttonCallback+"("+stringArgs+")";
    }else{
        button.callback=buttonCallback+"()";
    }

    var buttonWrapper=document.createElement('div');
    var thisButton=document.createElement('input');
    thisButton.setAttribute('type','button');
    thisButton.value=button.text;

    if(button.className!==null){
        thisButton.setAttribute('class',button.className);
    }

    if(button.callback!==null){
        thisButton.setAttribute('onclick',button.callback);
    }

    buttonWrapper.appendChild(thisButton);
    button.html=buttonWrapper;
    return button;
}

/**
 * 
 * @param {Object} message
 * @returns {undefined}
 */
function ShowHideModal(message){
    //console.log(message);
    clearModal();

    var elem=document.querySelector('#'+message.elemId);

    var messageTitleArea=document.querySelector('#yesNoModalTitle');

    var messageTextArea=document.querySelector('#yesNoModalText');

    var formElement=null;

    if(message.theForm!==null){
        formElement=document.forms[message.theForm];
    }

    if(message.buttons!==null&&message.buttons.length>0){
        //console.log(message.buttons);
        var modalButtons=document.getElementById('modalButtons');
        for(var b=0;b<message.buttons.length;b++){
            //console.log(buttons[b]);
            var button=message.buttons[b];
            //console.log(button);
            //console.log(button);
            modalButtons.appendChild(button.html);
        }
    }

    if(elem.getAttribute("class")===message.hiddenClass){
        messageTitleArea.innerHTML=message.title;
        messageTextArea.innerHTML=message.text;
        elem.setAttribute("class",message.visibleClass);

    }else{
        elem.setAttribute("class",message.hiddenClass);
        messageTitleArea.innerHTML="";
        messageTextArea.innerHTML="";
    }
}

/**
 * 
 * @returns {undefined}
 */
function clearModal(){

    var messageTitleArea=document.querySelector('#yesNoModalTitle');
    messageTitleArea.innerHTML="";

    var messageTextArea=document.querySelector('#yesNoModalText');
    messageTextArea.innerHTML="";

    var modalButtons=document.getElementById('modalButtons');
    //used this instead of innerHTML due to IE bug when using innerHTML = "";
    while(modalButtons.hasChildNodes()){
        modalButtons.removeChild(modalButtons.lastChild);
    }

}


/*
 * @description Shows and hides the element identified by the elemId with the associate from and too states
 * @param {string} elemId
 * @param {string} hiddenClass
 * @param {string} visibleClass
 * @returns  N/A
 */
function HideModal(elemId,hiddenClass,visibleClass){
    var elem=document.querySelector('#'+elemId);
    if(elem.getAttribute("class")===visibleClass){
        elem.setAttribute("class",hiddenClass);
    }
};