var CreateWorkEnvironment = {};

CreateWorkEnvironment.workplacePhotoUploaders = [];

CreateWorkEnvironment.photoNameToCaptionFormId = {'workplace_photo_1' : 'work_environment_photo_caption_1',
    'workplace_photo_2' : 'work_environment_photo_caption_2', 
    'workplace_photo_3' : 'work_environment_photo_caption_3'};

CreateWorkEnvironment.defaultWorkplacePhoto = '/images/user.png';

/**
 * 
 * @param {string} photo_name
 * @param {string} description
 * @return {CreateWorkEnvironment.WorkplacePhotoCaption}
 */
CreateWorkEnvironment.WorkplacePhotoCaption = function(photo_name, description) {
    this.photo_name = photo_name;
    this.description = description;
};

/**
 * 
 * @param {string} remote_allowed
 * @param {string} telework_allowed
 * @param {string} flexible_allowed
 * @param {CreateWorkEnvironment.WorkplacePhotoCaption[]} workplace_photo_captions
 * @return {CreateWorkEnvironment.WorkEnvironment}
 */
CreateWorkEnvironment.WorkEnvironment = function(remote_allowed, telework_allowed,
        flexible_allowed, workplace_photo_captions) {
    this.remote_allowed = remote_allowed;
    this.telework_allowed = telework_allowed;
    this.flexible_allowed = flexible_allowed;
    this.workplace_photo_captions = workplace_photo_captions;
};



CreateWorkEnvironment.parseWorkEnvironmentResponse = function(response) {
    var json = JSON.parse(response);
    var workEnvironment = new CreateWorkEnvironment.WorkEnvironment(
            json.remote_allowed,
            json.telework_allowed,
            json.flexible_allowed,
            []
    )
    json.workplace_photo_captions.foreach(function(caption) {
        var workplacePhotoCaption = new CreateWorkEnvironment.WorkplacePhotoCaption(
               caption.photo_name,
               caption.description
        );
        workEnvironment.workplace_photo_captions.push(workplacePhotoCaption);
    });
    return workEnvironment;
};

CreateWorkEnvironment.initializeWorkEnvironmentForm = function(managerProfileId) {
    //Fill previous form fields
    DataAPI.getWorkplaceEnvironment(managerProfileId, function(response) {
        var workEnv = CreateWorkEnvironment.parseWorkEnvironmentResponse(response);
        CreateWorkEnvironment.populateWorkEnvironmentForm(workEnv);
    })
    
    //Show preivious workplace photos
    CreateWorkEnvironment.refreshWorkplacePhoto(managerProfileId, 'workplace_photo_1', 'workplace_photo_preview_1');
    CreateWorkEnvironment.refreshWorkplacePhoto(managerProfileId, 'workplace_photo_2', 'workplace_photo_preview_2');
    CreateWorkEnvironment.refreshWorkplacePhoto(managerProfileId, 'workplace_photo_3', 'workplace_photo_preview_3');
    
    //Set up photo uploaders
    CreateWorkEnvironment.workplacePhotoUploaders = [];
    var uploader1 = CreateWorkEnvironment.makeWorkplacePhotoUploader(managerProfileId, 'workplace_photo_1',
        'workplace_photo_input_1','workplace_photo_dropzone_1','workplace_photo_preview_1');
    var uploader2 = CreateWorkEnvironment.makeWorkplacePhotoUploader(managerProfileId, 'workplace_photo_2',
        'workplace_photo_input_2','workplace_photo_dropzone_2','workplace_photo_preview_2');
    var uploader3 = CreateWorkEnvironment.makeWorkplacePhotoUploader(managerProfileId, 'workplace_photo_3',
        'workplace_photo_input_3','workplace_photo_dropzone_3','workplace_photo_preview_3');
    
    CreateWorkEnvironment.workplacePhotoUploaders.push(uploader1, uploader2, uploader3);
};

/**
 * 
 * @param {CreateWorkEnvironment.WorkEnvironment} workEnvironment
 * @return {undefined}
 */
CreateWorkEnvironment.populateWorkEnvironmentForm = function(workEnvironment) {
    
    SliderAPI.selectOptionByValue("work_environment_remote_allowed_groupname", workEnvironment.remote_allowed, "work_environment_remote");
    SliderAPI.selectOptionByValue("work_environment_telework_allowed_groupname", workEnvironment.telework_allowed, "work_environment_telework_allowed");
    SliderAPI.selectOptionByValue("work_environment_flexible_allowed_groupname", workEnvironment.flexible_allowed_allowed, "work_environment_flexible_allowed");
    
    workEnvironment.workplace_photo_captions.foreach(function(caption){
        var captionFormElementId = CreateWorkEnvironment.photoNameToCaptionFormId[caption.photo_name];
        if (captionFormElementId) {
            document.getElementById(captionFormElementId).value = caption.description;
        } 
    });
};

CreateWorkEnvironment.refreshWorkplacePhoto = function(managerProfileId, photoName, previewImageElementId) {
    var xhr = new XMLHttpRequest();
    var photoUrl = DataAPI.baseURL+'/putWorkplacePhotoByManagerProfileAndName/'+ managerProfileId + '/' + photoName;
    if ("withCredentials" in xhr) {
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open("GET", photoUrl);

    } else if (typeof XDomainRequest != "undefined") {
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open("GET", photoUrl);
    } else {
      // Otherwise, CORS is not supported by the browser.
      xhr = null;
      // TODO: indicate to user that browser is not supported
    } 
    xhr.setRequestHeader("Accept","image/*"); 
    xhr.addEventListener('load', function() {
        img = document.getElementById(previewImageElementId);
        if (xhr.status == 200 && xhr.responseURL) {
            img.src = xhr.responseURL;
        } else {
            img.src = CreateWorkEnvironment.defaultWorkplacePhoto;
        }
    });
    xhr.send();
};

CreateWorkEnvironment.saveWorkEnvironment = function(managerProfileId) {
    var remoteAllowed = document.querySelector('input[name="work_environment_remote_allowed_groupname"]:checked').value;
    var teleworkAllowed = document.querySelector('input[name="work_environment_telework_allowed_groupname"]:checked').value;
    var flexibleAllowed = document.querySelector('input[name="work_environment_flexible_allowed_groupname"]:checked').value;
    
    var workEnvironment = new CreateWorkEnvironment.WorkEnvironment(remoteAllowed, teleworkAllowed, flexibleAllowed, []);
    
    for (var name in CreateWorkEnvironment.photoNameToCaptionFormId) {
        var descriptionFormId = CreateWorkEnvironment.photoNameToCaptionFormId[name];
        var description = document.getElementById(descriptionFormId).value;
        var photoCaption = new CreateWorkEnvironment.WorkplacePhotoCaption(name, description);
        workEnvironment.workplace_photo_captions.push(photoCaption);
    }
    
    DataAPI.submitWorkplaceEnvironment(managerProfileId, workEnvironment, function(){}); //TODO add response callback
    
    CreateWorkEnvironment.workplacePhotoUploaders.foreach(uploader => uploader.uploadPhoto());    
}

CreateWorkEnvironment.makeWorkplacePhotoUploader = function(managerProfileId, photoName, inputId, dropzoneId, previewId) {
    var photoInput = document.getElementById(inputId);
    var photoDropzone = document.getElementById(dropzoneId);
    var photoPreview = document.getElementById(previewId);
    var uploadUrl = DataAPI.baseURL+"/putWorkplacePhotoByManagerProfileAndName/"+managerProfileId + '/' + photoName;
    
    var uploader = new CreateWorkEnvironment.WorkplacePhotoUploader(
            photoInput, photoDropzone, photoPreview,
            uploadUrl, 
            function(request) {
                //TODO: handle upload response
                
            });
    
    return uploader;
};

CreateWorkEnvironment.WorkplacePhotoUploader = function(
        inputField, dropZone, previewImgElement,
        uploadUrl,
        onUploadComplete) {
        
    this.uploadUrl = uploadUrl;
    this.onUploadComplete = onUploadComplete;
        
    var uploadPhoto = null;
    var max_filesize = 2048576;
    var defaultPhotoSrc = CreateWorkEnvironment.defaultWorkplacePhoto;
    
    this.init = function() {
        inputField.onchange = this.addFiles;
        this.initializeDropzone();
    };
    
    //clone dropZone to remove existing event listeners
    this.initializeDropzone = function(){
        var clone = dropZone.cloneNode();
        while (dropZone.firstChild) {
          clone.appendChild(dropZone.lastChild);
        }
        dropZone.parentNode.replaceChild(clone, dropZone);
        dropZone = clone;

        dropZone.addEventListener("dragenter",  this.stopProp, false);
        dropZone.addEventListener("dragleave",  this.dragExit, false);
        dropZone.addEventListener("dragover",  this.dragOver, false);
        dropZone.addEventListener("drop",  this.showDroppedFiles, false);
    };
    
    this.setFiles = function(files) {
        processNewFiles(files);
    };

    this.addFiles = function () {
        processNewFiles(this.files);
    };

    this.showDroppedFiles = function (ev) {
        this.stopProp(ev);
        var files = ev.dataTransfer.files;
        processNewFiles(files);
    };
    
    this.dragOver = function (ev) {
       this.stopProp(ev);
        dropZone.classList.remove("fileDropzoneNormal");
        dropZone.classList.add("fileDropzoneHighlight");
        //this.style["backgroundColor"] = "#F0FCF0";
        //this.style["borderColor"] = "#3DD13F";
        //this.style["color"] = "#3DD13F";
    };

    this.dragExit = function (ev) {
        this.stopProp(ev);
        dropZone.classList.remove("fileDropzoneHighlight");
        dropZone.classList.add("fileDropzoneNormal");
        //dropZone.style["backgroundColor"] = "#FEFEFE";
        //dropZone.style["borderColor"] = "#CCC";
        //dropZone.style["color"] = "#CCC";
    };

    this.stopProp = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
    };

    clearUpload = function () {
        //Clear upload 
        this.photo = null;
        
        //Clear preview
        previewImgElement.src = defaultPhotoSrc;
        
        //Clear input button value
        this.inputField.value = null;
    };

    processNewFiles = function (files) {
        var file = files[0];
        if (file.type.match('image.*')) {        
            this.clearUpload();
            var fr = new FileReader();
            fr.file = file;
            fr.onloadend = function(ev) {
                
                if (ev.target.file.size < max_filesize) {   
                    uploadPhoto = ev.target.file;
                    previewImgElement.src = ev.target.result;
                } else {
                    //TODO: indicate overlarge file
                }
            };
            fr.readAsDataURL(fr.file);
        } else {
            //TODO: indicate imporper file type
        }
    };
    
    this.uploadPhoto = function(){
        if (uploadPhoto) {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
              // Check if the XMLHttpRequest object has a "withCredentials" property.
              // "withCredentials" only exists on XMLHTTPRequest2 objects.
              xhr.open("PUT", uploadUrl);

            } else if (typeof XDomainRequest != "undefined") {
              // Otherwise, check if XDomainRequest.
              // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
              xhr = new XDomainRequest();
              xhr.open("PUT", uploadUrl);
            } else {
              // Otherwise, CORS is not supported by the browser.
              xhr = null;
              // TODO: indicate to user that browser is not supported
            }

            xhr.setRequestHeader("Content-type",uploadPhoto.type);
            xhr.setRequestHeader("X-File-Name", uploadPhoto.name);
            xhr.setRequestHeader("Accept","application/json");
            if (UserAPI.hasAuthToken()) {
                var authToken = UserAPI.getAuthTokenAsJSON()
                xhr.setRequestHeader("x-access-token", authToken.access_token);
            }
            xhr.addEventListener("load", function (ev) {
                if (onUploadComplete) {
                    onUploadComplete(xhr);
                }
            }, false);
            
            xhr.send(uploadPhoto);
        }
    };
    
    this.init(); //call init function at end of constructor
};


