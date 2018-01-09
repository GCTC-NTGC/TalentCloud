/*
 * Messages contains the defined modal dialog definitions and functions.
 * Requires the MessageHandlerAPI, which manages the actions and objects associated with all modal dialogs in the custom forms and landing page UI.
 * 
 */

/**
 * 
 * Confirm Reset
 */
var resetButton=document.getElementById("resetButton");
if(resetButton!=null){
    resetButton.onclick=function(){
        var resetButtons=new Array();
        var resetYesButton=new Button("Yes",'yesNoModalYesButton','interactions.view.ConfirmReset',null);
        var resetNoButton=new Button("No",'yesNoModalYesButton','interactions.view.HideModal',showHideArgs);
        resetButtons.push(resetYesButton);
        resetButtons.push(resetNoButton);
        var confirmMessage=new Message();
        confirmMessage.elemId='yesNoModalOverlay';
        confirmMessage.hiddenClass='yesNoModalOverlay hidden';
        confirmMessage.visibleClass='yesNoModalOverlay visible';
        confirmMessage.title='Reset the Form';
        confirmMessage.text='Are you sure you want to reset your document submission?  You will lose all content entered so far.';
        confirmMessage.buttons=resetButtons;

        ShowHideModal(confirmMessage);
    };
}


/**
 * 
 * Confirm Cancellation
 */
var cancelButton=document.getElementById("cancelButton");
if(cancelButton!=null){
    cancelButton.onclick=function(){

        var cancelButtons=new Array();
        var yesButton=new Button("Yes",'yesNoModalYesButton','interactions.view.ConfirmCancel',null);
        var noButton=new Button("No",'yesNoModalYesButton','interactions.view.HideModal',showHideArgs);
        cancelButtons.push(yesButton);
        cancelButtons.push(noButton);
        var cancelMessage=new Message();
        cancelMessage.elemId='yesNoModalOverlay';
        cancelMessage.hiddenClass='yesNoModalOverlay hidden';
        cancelMessage.visibleClass='yesNoModalOverlay visible';
        cancelMessage.title='Cancel the Submission';
        cancelMessage.text='Are you sure you want to cancel your document submission?';
        cancelMessage.buttons=cancelButtons;
        ShowHideModal(cancelMessage);
    };
}


/**
 * 
 * Confirm Delete
 */
var deleteButton=document.getElementById("delete");
var contactForm = document.getElementById("addContactForm");
if(deleteButton!=null){
    deleteButton.onclick=function(){
        var deleteButtonArgs=new Array();
        deleteButtonArgs[0] = contactForm.elements.namedItem('id').value;
        var yesButton=new Button("Yes",'yesNoModalYesButton','DataAPI.deleteContact',deleteButtonArgs);
        var noButton=new Button("No",'yesNoModalYesButton','HideModal',showHideArgs);
        var buttons=new Array();
        buttons.push(yesButton);
        buttons.push(noButton);
        var deleteMessage=new Message();
        deleteMessage.elemId='yesNoModalOverlay';
        deleteMessage.hiddenClass='yesNoModalOverlay hidden';
        deleteMessage.visibleClass='yesNoModalOverlay visible';
        deleteMessage.title='Delete Contact';
        deleteMessage.text='Are you sure you want to delete this contact?';
        deleteMessage.buttons=buttons;
        ShowHideModal(deleteMessage);
    };
}

function NetworkErrorMessage(){
    var buttonArgs=new Array();
    buttonArgs[0]='yesNoModalOverlay';
    buttonArgs[1]='yesNoModalOverlay hidden';
    buttonArgs[2]='yesNoModalOverlay visible';
    var buttons=new Array();
    buttons.push(new Button("Close",'yesNoModalNoButton','HideModal',buttonArgs));
    var message=new Message();
    message.elemId='yesNoModalOverlay';
    message.hiddenClass='yesNoModalOverlay hidden';
    message.visibleClass='yesNoModalOverlay visible';
    message.title='Network Error';
    message.text='There was a problem communicating with the server.  Please contact your IT Administrator to inform them of the problem.';
    message.buttons=buttons;

    ShowHideModal(message);
}