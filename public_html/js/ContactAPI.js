/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var noContactsDiv = document.getElementById("noContacts");

var ContactAPI = {};
ContactAPI.contacts = [];

/**
 * Model object
 * @param {type} id
 * @param {type} firstName
 * @param {type} lastName
 * @param {type} emailAddress
 * @param {type} phoneNumber
 * @param {boolean} isFavourite
 * @param {type} imgSrc
 * @returns {ContactAPI.Contact}
 */
ContactAPI.Contact = function(id,firstName,lastName,emailAddress,phoneNumber,isFavourite,imgSrc){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.isFavourite = isFavourite;
    this.imgSrc = imgSrc;
};

/**
 *
 * @param {type} data
 * @returns {undefined}
 */
ContactAPI.populateContactObjects = function(data){

    Utilities.debug?console.log("populating contact Objects"):null;
    Utilities.debug?console.log(data):null;

    var contacts = data.contacts;

    for(var contact in contacts){

        Utilities.debug?console.log(contacts[contact]):null;

        var contact = ContactAPI.populateContactObject(contacts[contact]);

        ContactAPI.contacts.push(contact);
    }

    ContactAPI.populateContacts();
};

/**
 *
 * @param {type} JSONContact
 * @returns {ContactAPI.Contact|ContactAPI.populateContactObject.contactObj}
 */
ContactAPI.populateContactObject = function(JSONContact){

    Utilities.debug?console.log("populating contact Objects"):null;
    Utilities.debug?console.log(JSONContact):null;

    var contact = JSONContact;

    Utilities.debug?console.log(contact):null;

    var contactObj = new ContactAPI.Contact();

    contactObj.id = contact.id;
    contactObj.firstName = contact.firstName;
    contactObj.lastName = contact.lastName;
    contactObj.emailAddress = contact.emailAddress;
    contactObj.phoneNumber = contact.phoneNumber;
    contactObj.isFavourite = contact.isFavourite;

    Utilities.debug?console.log(contactObj):null;

    return contactObj;
};

/**
 *
 * @returns {undefined}
 */
ContactAPI.populateContacts = function(){

    Utilities.debug?console.log("populating contacts"):null;
    var contactsDiv = document.getElementById("contacts");

    for(var c = 0; c < ContactAPI.contacts.length; c++){
        var contact = ContactAPI.contacts[c];

        ContactAPI.populateContact(contact);

    }

    //hide no contacts div
    if(ContactAPI.contacts.length > 0){
        var noContacts = document.getElementById("noContacts");
        noContacts.classList.remove("visible");
        noContacts.classList.add("hidden");
    }

    /*var addedCards = contactsDiv.getElementsByClassName('contactCardHighlighted');
    for(var cards = 0; cards < addedCards.length; cards++){
        var addedCard = addedCards[cards];
        addedCard.classList.remove("hidden");
    }*/

    //hide overlay
    var loadingOverlay = document.getElementById("loadingOverlay");
    document.body.removeChild(loadingOverlay);
    document.body.classList.remove("overFlowHidden");

};

/**
 *
 * @param {type} contact
 * @returns {undefined}
 */
ContactAPI.populateContact = function(contact){

    Utilities.debug?console.log("populating contact"):null;
    var contactsDiv = document.getElementById("contacts");

    //create card
    var contactCard = document.createElement("div");
    contactCard.setAttribute("id",contact.id);
    contactCard.setAttribute("class","contactCard hidden");

    //create contactImageWrapper div
    var contactImageWrapper = document.createElement("div");
    contactImageWrapper.setAttribute("class","contactImageWrapper");

    //add image child to contactImageWrapper
    var defaultContactImage = new Image();
    defaultContactImage.src = "images/user.png";
    var contactImage = document.createElement("img");
    contactImage.src = defaultContactImage.src;
    contactImage.setAttribute("class","contactImage");
    contactImageWrapper.appendChild(contactImage);
    contactCard.appendChild(contactImageWrapper);

    //create contactDetails div
    var contactDetailsDiv = document.createElement("div");
    contactDetailsDiv.setAttribute("class","contactDetails");

    //create contactRow for Firstname and lastname
    var contactRow1 = document.createElement("div");
    contactRow1.setAttribute("class","contactRow");
    contactRow1.innerHTML = contact.lastName + ", " + contact.firstName;
    contactDetailsDiv.appendChild(contactRow1);

    //create contact Row for emaili and phone number images
    //var contactRow2 = document.createElement("div");
    //contactRow2.setAttribute("class","contactRow");

    //create contactActionColLeft
    var contactActionColLeft = document.createElement("div");
    contactActionColLeft.setAttribute("class","contactActionColLeft");

    if(contact.emailAddress !== ""){
        var contactEmailLink = document.createElement("a");
        contactEmailLink.setAttribute("href","mailto:"+contact.emailAddress);
    }
    var contactEmailImage = new Image();
    contactEmailImage.src = "images/email.svg";

    var contactEmailLinkImage = document.createElement("img");
    contactEmailLinkImage.src = contactEmailImage.src;
    if(contact.emailAddress !== ""){
        contactEmailLinkImage.setAttribute("class","contactEmailLinkImage");
    }else{
        contactEmailLinkImage.setAttribute("class","contactNoEmailLinkImage");
    }

    if(contact.emailAddress !== ""){
        contactEmailLink.appendChild(contactEmailLinkImage);
        contactActionColLeft.appendChild(contactEmailLink);
    }else{
        contactActionColLeft.appendChild(contactEmailLinkImage);
    }

    //create contactActionColRight
    var contactActionColRight = document.createElement("div");
    contactActionColRight.setAttribute("class","contactActionColRight");

    var contactPhoneLink = document.createElement("a");
    contactPhoneLink.setAttribute("href","tel:"+contact.phoneNumber);

    var contactPhoneImage = new Image();
    contactPhoneImage.src = "images/call-answer.svg";

    var contactPhoneLinkImage = document.createElement("img");
    contactPhoneLinkImage.src = contactPhoneImage.src;
    contactPhoneLinkImage.setAttribute("class","contactPhoneLinkImage");

    contactPhoneLink.appendChild(contactPhoneLinkImage);
    contactActionColRight.appendChild(contactPhoneLink);

    //contactRow2.appendChild(contactActionColLeft);
    //contactRow2.appendChild(contactActionColRight);

    contactDetailsDiv.appendChild(contactActionColRight);
    contactDetailsDiv.appendChild(contactActionColLeft);

    contactCard.appendChild(contactDetailsDiv);

    //create hidden div for favourite action
    var favouriteImageWrapper = document.createElement("div");
    favouriteImageWrapper.setAttribute("class","favouriteImageWrapper");

    var favouriteLink = document.createElement("a");
    favouriteLink.setAttribute("href","javascript:void(0)");
    favouriteLink.setAttribute("onclick","ContactAPI.toggleFavourite('"+contact.id+"')");


    favouriteImageWrapper.appendChild(favouriteLink);

    var notFavouriteImage = new Image();
    notFavouriteImage.src = "images/not-favourite.svg";

    var favouriteImage = new Image();
    favouriteImage.src = "images/favourite.svg";

    var contactFavouriteLinkImage = document.createElement("img");

    if(contact.isFavourite){
        contactFavouriteLinkImage.src = favouriteImage.src;
        contactFavouriteLinkImage.setAttribute("class","favouriteImage");
    }else{
        contactFavouriteLinkImage.src = notFavouriteImage.src;
        contactFavouriteLinkImage.setAttribute("class","favouriteImage");
    }

    favouriteLink.appendChild(contactFavouriteLinkImage);

    contactCard.appendChild(favouriteImageWrapper);


    //create hidden div for favourite action
    var editImageWrapper = document.createElement("div");
    editImageWrapper.setAttribute("class","editImageWrapper");

    var editLink = document.createElement("a");
    editLink.setAttribute("href","javascript:void(0)");
    editLink.setAttribute("onclick","ContactAPI.editContact('"+contact.id+"')");

    editImageWrapper.appendChild(editLink);

    var editImage = new Image();
    editImage.src = "images/edit.svg";

    var editLinkImage = document.createElement("img");

    editLinkImage.src = editImage.src;
    editLinkImage.setAttribute("class","editImage");

    editLink.appendChild(editLinkImage);

    contactCard.appendChild(editImageWrapper);

    contactsDiv.appendChild(contactCard);
    contactCard.classList.remove("hidden");
};


/**
 *
 * @param {type} contact
 * @returns {undefined}
 */
ContactAPI.removeContact = function(contactId){

    Utilities.debug?console.log("removing contact"):null;
    var contactCard = document.getElementById(contactId);

    contactCard.remove();

};

/**
 *
 * @returns {undefined}
 */
ContactAPI.showFavourites = function(){

    var noContactsDiv = document.getElementById("noContacts");
    Utilities.debug?console.log("showing favourite contacts"):null;
    Utilities.debug?console.log(ContactAPI.contacts):null;

    var showByAlphaLength = 0;
    for(var c = 0; c < ContactAPI.contacts.length; c++){
        var contact = ContactAPI.contacts[c];
        Utilities.debug?console.log(contact):null;

            var contactToHide = document.getElementById(contact.id);
        if(!contact.isFavourite){
            contactToHide.classList.add("hidden");
        }else{
            showByAlphaLength++;
            contactToHide.classList.remove("hidden");
        }
    }

    var alphaList = document.getElementById("alphaList");
    var alphas = alphaList.getElementsByClassName("alphaLink alphaLinkActive");
    alphas[0].classList.remove("alphaLinkActive");

    var alpha_favs = document.getElementById("alpha_favs");
    alpha_favs.classList.add("alphaLinkActive");
    alpha_favs.getElementsByTagName("img")[0].src = "images/favourite.svg";


    if(showByAlphaLength > 0){
        noContactsDiv.classList.add("hidden");
        noContactsDiv.classList.remove("visible");
    }else{
        noContactsDiv.classList.add("visible");
        noContactsDiv.classList.remove("hidden");
    }
};

/**
 *
 * @param {type} responseText
 * @returns {undefined}
 */
ContactAPI.toggleFavourite = function(contactId){
    Utilities.debug?console.log(contactId):null;

    if(contactId !== ""){
        DataAPI.toggleFavourite(contactId);
    }
};

ContactAPI.updateFavourite = function(isFav,contactId){

    var contactToUpdate = document.getElementById(contactId);

    var favImg = contactToUpdate.getElementsByClassName('favouriteImage')[0];

    var notFavouriteImage = new Image();
    notFavouriteImage.src = "images/not-favourite.svg";

    var favouriteImage = new Image();
    favouriteImage.src = "images/favourite.svg";

    if(isFav){
        favImg.src = favouriteImage.src;
    }else{
        favImg.src = notFavouriteImage.src;
    }

    Utilities.debug?console.log(favImg.src):null;
}

/**
 *
 * @returns {undefined}
 */
ContactAPI.showAll = function(){

    var noContactsDiv = document.getElementById("noContacts");
    Utilities.debug?console.log("showing favourite contacts"):null;
    Utilities.debug?console.log(ContactAPI.contacts):null;

    var showByAlphaLength = 0;
    for(var c = 0; c < ContactAPI.contacts.length; c++){
        var contact = ContactAPI.contacts[c];
        Utilities.debug?console.log(contact):null;

        showByAlphaLength++;
        var contactToShow = document.getElementById(contact.id);
        contactToShow.classList.remove("hidden");

    }

    var alphaList = document.getElementById("alphaList");
    var alphas = alphaList.getElementsByClassName("alphaLink alphaLinkActive");
    alphas[0].classList.remove("alphaLinkActive");

    var alpha_all = document.getElementById("alpha_all");
    alpha_all.classList.add("alphaLinkActive");

    var alpha_favs = document.getElementById("alpha_favs");
    alpha_favs.classList.remove("alphaLinkActive");
    alpha_favs.getElementsByTagName("img")[0].src = "images/favourite_link.svg";

    if(showByAlphaLength > 0){
        noContactsDiv.classList.add("hidden");
        noContactsDiv.classList.remove("visible");
    }else{
        noContactsDiv.classList.add("visible");
        noContactsDiv.classList.remove("hidden");
    }
};

/**
 *
 * @param {type} alpha
 * @returns {undefined}
 */
ContactAPI.showByAlpha = function(alpha){

    var noContactsDiv = document.getElementById("noContacts");
    Utilities.debug?console.log(noContactsDiv):null;
    var showByAlphaLength = 0;
    for(var c = 0; c < ContactAPI.contacts.length; c++){
        var contact = ContactAPI.contacts[c];
        Utilities.debug?console.log(contact.lastName.search(new RegExp(search.value,"i"))):null;
        var contactToHide = document.getElementById(contact.id);
        if(contact.lastName.search(new RegExp('^' + alpha)) !== -1){
            Utilities.debug?console.log(contactToHide):null;
            contactToHide.classList.remove("hidden");
            showByAlphaLength++;
        }else{
            contactToHide.classList.add("hidden");
        }
    }
    Utilities.debug?console.log("showByAlphaLength="+showByAlphaLength):null;
    if(showByAlphaLength > 0){
        noContactsDiv.classList.add("hidden");
        noContactsDiv.classList.remove("visible");
    }else{
        noContactsDiv.classList.add("visible");
        noContactsDiv.classList.remove("hidden");
    }


    var alphaList = document.getElementById("alphaList");
    var alphas = alphaList.getElementsByClassName("alphaLink alphaLinkActive");
    alphas[0].classList.remove("alphaLinkActive");

    var alpha_active = document.getElementById("alpha_"+alpha);
    alpha_active.classList.add("alphaLinkActive");

    var alpha_favs = document.getElementById("alpha_favs");
    alpha_favs.classList.remove("alphaLinkActive");
    alpha_favs.getElementsByTagName("img")[0].src = "images/favourite_link.svg";
};

/**
 *
 * @returns {undefined}
 */
ContactAPI.search = function(){

    Utilities.debug?console.log("searching contacts"):null;
    Utilities.debug?console.log(ContactAPI.contacts):null;

    var search = document.getElementById("search");

    for(var c = 0; c < ContactAPI.contacts.length; c++){
        var contact = ContactAPI.contacts[c];
        Utilities.debug?console.log(contact.lastName.search(new RegExp(search.value,"i"))):null;
        var contactToHide = document.getElementById(contact.id);
        if(contact.lastName.search(new RegExp(search.value,"i")) !== -1){
            Utilities.debug?console.log(contactToHide):null;
            contactToHide.classList.remove("hidden");
        }else if(contact.firstName.search(new RegExp(search.value,"i")) !== -1){
            Utilities.debug?console.log(contactToHide):null;
            contactToHide.classList.remove("hidden");
        }/*else if(contact.emailAddress.search(new RegExp(search.value,"i")) !== -1){
            Utilities.debug?console.log(contactToHide):null;
            contactToHide.classList.remove("hidden");
        }else if(contact.phoneNumber.search(new RegExp(search.value,"i")) !== -1){
            Utilities.debug?console.log(contactToHide):null;
            contactToHide.classList.remove("hidden");
        }*/else{
            contactToHide.classList.add("hidden");
        }

    }

};

/**
 *
 * @returns {undefined}
 */
ContactAPI.showContactForm = function(isAdd){
    var addContactOverlay = document.getElementById("addContactOverlay");
    addContactOverlay.classList.remove("hidden");

    var addContactForm = document.getElementById("addContactForm");

    var submitButton = document.getElementById("submit");
    var updateButton = document.getElementById("update");
    var deleteButton = document.getElementById("delete");

    if(!isAdd){
        updateButton.classList.remove('hidden');
        deleteButton.classList.remove('hidden');
        submitButton.classList.add('hidden');
    }else{
        updateButton.classList.add('hidden');
        deleteButton.classList.add('hidden');
        submitButton.classList.remove('hidden');
        addContactForm.firstName.focus();
    }

    modalSize();

};

/**
 *
 * @returns {undefined}
 */
ContactAPI.hideContactForm = function(){
    var addContactOverlay = document.getElementById("addContactOverlay");
    addContactOverlay.classList.add("hidden");
    ContactAPI.clearContactForm();
};

/**
 *
 * @returns {undefined}
 */
ContactAPI.clearContactForm = function(){
    var contactForm = document.getElementById("addContactForm");

    var validationMessage_firstName = document.getElementById('validationMessage_firstName');
    validationMessage_firstName.innerHTML = "";
    var validationMessage_lastName = document.getElementById('validationMessage_lastName');
    validationMessage_lastName.innerHTML = "";
    var validationMessage_emailAddress = document.getElementById('validationMessage_emailAddress');
    validationMessage_emailAddress.innerHTML = "";
    var validationMessage_phoneNumber = document.getElementById('validationMessage_phoneNumber');
    validationMessage_phoneNumber.innerHTML = "";
    contactForm.elements.namedItem("firstName").value = "";
    contactForm.elements.namedItem("lastName").value = "";
    contactForm.elements.namedItem("emailAddress").value = "";
    contactForm.elements.namedItem("phoneNumber").value = "";
    if(contactForm.elements.namedItem("isFavourite").checked){
        contactForm.elements.namedItem("isFavourite").checked = false;
    }
};

/**
 *
 * @returns {Boolean}
 */
ContactAPI.addContact = function(){
    //if(ContactAPI.validateContact){
        var contactForm = document.getElementById("addContactForm");

        if(ContactAPI.validateContact(contactForm)){

            var newContact = new ContactAPI.Contact();

            newContact.firstName = contactForm.elements.namedItem("firstName").value;
            newContact.lastName = contactForm.elements.namedItem("lastName").value;

            if(contactForm.elements.namedItem("emailAddress").value !== ""){
                newContact.emailAddress = contactForm.elements.namedItem("emailAddress").value;
            }

            newContact.phoneNumber = contactForm.elements.namedItem("phoneNumber").value;

            if(contactForm.elements.namedItem("isFavourite").checked){
                newContact.isFavourite = true;
            }else{
                newContact.isFavourite = false;
            }

            Utilities.debug?console.log(newContact):null;
            if(newContact !== null){
                Utilities.debug?console.log(newContact):null;
                DataAPI.addContact(newContact);
                return true;
            }else{
                DataAPI.transferFailed();
                return false;
            }
        }
    //}
};

/**
 *
 * @returns {undefined}
 */
ContactAPI.refreshContacts = function(){
    ContactAPI.populateContacts();
};

/**
 *
 * @returns {Boolean}
 */
ContactAPI.validateContact = function(contactForm){
    var isValid = true;
    var validFirstName = true;
    var validationMessage_firstName = document.getElementById('validationMessage_firstName');
    var validlastName = true;
    var validationMessage_lastName = document.getElementById('validationMessage_lastName');
    var validEmailAddress = true;
    var validationMessage_emailAddress = document.getElementById('validationMessage_emailAddress');
    var validPhoneNumber = true;
    var validationMessage_phoneNumber = document.getElementById('validationMessage_phoneNumber');
    if(contactForm.elements.namedItem("firstName").value === ""){
        validFirstName = false;
        validationMessage_firstName.innerHTML = "First name is a required field.";
    }else{
        validationMessage_firstName.innerHTML = "";
    }

    if(contactForm.elements.namedItem("lastName").value === ""){
        validlastName = false;
        validationMessage_lastName.innerHTML = "Last name is a required field.";
    }else{
        validationMessage_lastName.innerHTML = "";
    }

    /*
    if(contactForm.elements.namedItem("emailAddress").value === ""){
        validEmailAddress = false;
    }else{

        var emailAddress = contactForm.elements.namedItem("emailAddress").value;

        var validEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        //validate email address
        if(emailAddress === ""){
            validationMessage_emailAddress.innerHTML = "Email address is required.";
            validEmailAddress = false;
        }else{
            validationMessage_emailAddress.innerHTML = "";
        }

        if(isValid){
            if(!validEmail.test(emailAddress)){
            validationMessage_emailAddress.innerHTML = "Email address is not valid.";
                validEmailAddress = false;
            }
        }
    }*/

    if(contactForm.elements.namedItem("phoneNumber").value === ""){
        validPhoneNumber = false;
        validationMessage_phoneNumber.innerHTML = "Phone number is a required field.";
    }else{
        validationMessage_phoneNumber.innerHTML = "";
    }


    if(!validFirstName || !validlastName || !validEmailAddress || !validPhoneNumber){
        isValid = false;
    }

    return isValid;
};


ContactAPI.validateLogin = function(loginForm){
    var isValid = true;
    var validFirstName = true;
    var validationMessage_firstName = document.getElementById('validationMessage_firstName');
    var validlastName = true;
    var validationMessage_lastName = document.getElementById('validationMessage_lastName');
    var validEmailAddress = true;
    var validationMessage_emailAddress = document.getElementById('validationMessage_emailAddress');
    var validPhoneNumber = true;
    var validationMessage_phoneNumber = document.getElementById('validationMessage_phoneNumber');
    if(contactForm.elements.namedItem("firstName").value === ""){
        validFirstName = false;
        validationMessage_firstName.innerHTML = "First name is a required field.";
    }else{
        validationMessage_firstName.innerHTML = "";
    }

    if(contactForm.elements.namedItem("lastName").value === ""){
        validlastName = false;
        validationMessage_lastName.innerHTML = "Last name is a required field.";
    }else{
        validationMessage_lastName.innerHTML = "";
    }

    /*
    if(contactForm.elements.namedItem("emailAddress").value === ""){
        validEmailAddress = false;
    }else{

        var emailAddress = contactForm.elements.namedItem("emailAddress").value;

        var validEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        //validate email address
        if(emailAddress === ""){
            validationMessage_emailAddress.innerHTML = "Email address is required.";
            validEmailAddress = false;
        }else{
            validationMessage_emailAddress.innerHTML = "";
        }

        if(isValid){
            if(!validEmail.test(emailAddress)){
            validationMessage_emailAddress.innerHTML = "Email address is not valid.";
                validEmailAddress = false;
            }
        }
    }*/

    if(contactForm.elements.namedItem("phoneNumber").value === ""){
        validPhoneNumber = false;
        validationMessage_phoneNumber.innerHTML = "Phone number is a required field.";
    }else{
        validationMessage_phoneNumber.innerHTML = "";
    }


    if(!validFirstName || !validlastName || !validEmailAddress || !validPhoneNumber){
        isValid = false;
    }

    return isValid;
};

/**
 *
 * @param {type} contactId
 * @returns {undefined}
 */
ContactAPI.editContact = function(contactId){
    Utilities.debug?console.log("edit Contact"):null;
    var contactForm = document.getElementById("addContactForm");

    if(contactId !== ""){
        var contactToEdit;

        for(var c = 0; c < ContactAPI.contacts.length; c++){
            var contact = ContactAPI.contacts[c];
            Utilities.debug?console.log(contact.lastName.search(new RegExp(search.value,"i"))):null;
            if(contact.id === contactId){
                contactToEdit = contact;
                Utilities.debug?console.log(contactToEdit):null;
                break;
            }
        }

        contactForm.elements.namedItem("firstName").value = contactToEdit.firstName;
        contactForm.elements.namedItem("lastName").value = contactToEdit.lastName;
        contactForm.elements.namedItem("emailAddress").value = contactToEdit.emailAddress;
        contactForm.elements.namedItem("phoneNumber").value = contactToEdit.phoneNumber;
        contactForm.elements.namedItem("id").value = contactToEdit.id;
        if(contactToEdit.isFavourite){
            contactForm.elements.namedItem("isFavourite").checked = "checked";
        }

        ContactAPI.showContactForm();

    }
};

/**
 *
 * @param {type} contactId
 * @returns {undefined}
 */
ContactAPI.deleteContact = function(contactId){
    Utilities.debug?console.log("delete Contact"):null;

    if(contactId !== ""){

        DataAPI.deleteContact(contactId);
    }
};

/**
 *
 * @param {type} contactId
 * @returns {undefined}
 */
ContactAPI.updateContact = function(){
    Utilities.debug?console.log("update Contact"):null;

    var contactForm = document.getElementById("addContactForm");

    if(ContactAPI.validateContact(contactForm)){
        var updatedContact = new ContactAPI.Contact();

        updatedContact.id = contactForm.elements.namedItem("id").value;
        updatedContact.firstName = contactForm.elements.namedItem("firstName").value;
        updatedContact.lastName = contactForm.elements.namedItem("lastName").value;
        if(contactForm.elements.namedItem("emailAddress").value !== ""){
            updatedContact.emailAddress = contactForm.elements.namedItem("emailAddress").value;
        }else{
            updatedContact.emailAddress = "";
        }
        updatedContact.phoneNumber = contactForm.elements.namedItem("phoneNumber").value;

        if(contactForm.elements.namedItem("isFavourite").checked){
            updatedContact.isFavourite = true;
        }else{
            updatedContact.isFavourite = false;
        }

        if(updatedContact !== null){
            Utilities.debug?console.log(updatedContact):null;
            DataAPI.updateContact(updatedContact);
            return true;
        }else{
            DataAPI.transferFailed();
            return false;
        }
        ContactAPI.hideContactForm();
    }

};

/**
 *
 * @param {type} contactId
 * @returns {undefined}
 */
ContactAPI.updateContactCard = function(updatedContact){
    Utilities.debug?console.log("update Contact"):null;
    Utilities.debug?console.log(updatedContact):null;


    if(updatedContact !== undefined){
        var contactToUpdate = document.getElementById(updatedContact.id);
        Utilities.debug?console.log(contactToUpdate):null;
        var contactDetails = contactToUpdate.getElementsByClassName('contactDetails')[0];
        Utilities.debug?console.log(contactDetails):null;

        var nameContactRow = contactDetails.getElementsByClassName('contactRow')[0];
        Utilities.debug?console.log(nameContactRow):null;
        nameContactRow.innerHTML = updatedContact.lastName + ", " + updatedContact.firstName;

        var contactActionColLeft = contactDetails.getElementsByClassName('contactActionColLeft')[0];
        Utilities.debug?console.log(contactActionColLeft):null;
        var emailLink = contactActionColLeft.firstChild;

        if(updatedContact.emailAddress !== ""){
            var contactEmailLink = document.createElement("a");
            contactEmailLink.setAttribute("href","mailto:"+updatedContact.emailAddress);
        }
        var contactEmailImage = new Image();
        contactEmailImage.src = "images/email.svg";

        var contactEmailLinkImage = document.createElement("img");
        contactEmailLinkImage.src = contactEmailImage.src;
        if(updatedContact.emailAddress !== ""){
            contactEmailLinkImage.setAttribute("class","contactEmailLinkImage");
        }else{
            contactEmailLinkImage.setAttribute("class","contactNoEmailLinkImage");
        }

        if(updatedContact.emailAddress !== ""){
            contactEmailLink.appendChild(contactEmailLinkImage);
            contactActionColLeft.replaceChild(contactEmailLink,emailLink);
        }else{
            contactActionColLeft.replaceChild(contactEmailLinkImage,emailLink);
        }

        if(updatedContact.phoneNumber !== ""){

        }else{

        }
    }
};

/**
 * //not used yet... for contact sorting feature
 * @param {type} sortBy
 * @param {type} direction
 * @returns {undefined}
 */
ContactAPI.sortBy = function(sortBy,direction){
    Utilities.debug?console.log("sorting Contacts by firstName"):null;

    ContactAPI.contacts.sort();

    ContactAPI.contacts.reverse();

};

/**
 * //not used yet... for contact sorting feature
 * @param {type} sortBy
 * @param {type} direction
 * @returns {undefined}
 */
ContactAPI.getLocalContactById = function(contactId){
    Utilities.debug?console.log("sorting Contacts by firstName"):null;

    var contactToFind;
    if(contactId !== ""){

        for(var c = 0; c < ContactAPI.contacts.length; c++){
            var contact = ContactAPI.contacts[c];
            Utilities.debug?console.log(contact.lastName.search(new RegExp(search.value,"i"))):null;
            if(contact.id === contactId){
                contactToFind = contact;
                Utilities.debug?console.log(contactToFind):null;
                break;
            }
        }
    }
    return contactToFind;
};

ContactAPI.getContactCount = function(){
    Utilities.debug?console.log("getting count of contacts"):null;

    DataAPI.getContactCount();

};

ContactAPI.updateContacts = function(count){

    var contactCounter = document.getElementById("contactCount");

    contactCounter.innerHTML = count;

};
