var CreateWorkEnvironmentAPI = {};

CreateWorkEnvironmentAPI.workplacePhotoUploaders = [];

CreateWorkEnvironmentAPI.photoNameToCaptionFormId = {'workplace_photo_1': 'workplace_photo_caption_1',
    'workplace_photo_2': 'workplace_photo_caption_2',
    'workplace_photo_3': 'workplace_photo_caption_3'};

CreateWorkEnvironmentAPI.defaultWorkplacePhoto = '/images/user.png';

/**
 * 
 * @param {string} photo_name
 * @param {string} description
 * @return {CreateWorkEnvironment.WorkplacePhotoCaption}
 */
CreateWorkEnvironmentAPI.WorkplacePhotoCaption = function (photo_name, description) {
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
CreateWorkEnvironmentAPI.WorkEnvironment = function (remote_allowed, telework_allowed,
        flexible_allowed, workplace_photo_captions) {
    this.remote_allowed = remote_allowed;
    this.telework_allowed = telework_allowed;
    this.flexible_allowed = flexible_allowed;
    this.workplace_photo_captions = workplace_photo_captions;
};

CreateWorkEnvironmentAPI.localizeCreateWorkEnvironment = function () {
    if (siteContent) {
        try {
            document.getElementById('remoteWork_label').innerHTML = siteContent.remoteLocationAllowed;
            document.getElementById('remoteWork_option0_label').innerHTML = SliderAPI.getYesNoSliderLabel("option0");
            document.getElementById('remoteWork_option1_label').innerHTML = SliderAPI.getYesNoSliderLabel("option1");

            document.getElementById('telework_label').innerHTML = siteContent.teleworkAllowed;
            document.getElementById('telework_option0_label').innerHTML = SliderAPI.getFrequencySliderLabel("option0");
            document.getElementById('telework_option1_label').innerHTML = SliderAPI.getFrequencySliderLabel("option1");
            document.getElementById('telework_option2_label').innerHTML = SliderAPI.getFrequencySliderLabel("option2");
            document.getElementById('telework_option3_label').innerHTML = SliderAPI.getFrequencySliderLabel("option3");
            document.getElementById('telework_option4_label').innerHTML = SliderAPI.getFrequencySliderLabel("option4");

            document.getElementById('flexHours_label').innerHTML = siteContent.flexHoursAllowed;
            document.getElementById('flexHours_option0_label').innerHTML = SliderAPI.getFrequencySliderLabel("option0");
            document.getElementById('flexHours_option1_label').innerHTML = SliderAPI.getFrequencySliderLabel("option1");
            document.getElementById('flexHours_option2_label').innerHTML = SliderAPI.getFrequencySliderLabel("option2");
            document.getElementById('flexHours_option3_label').innerHTML = SliderAPI.getFrequencySliderLabel("option3");
            document.getElementById('flexHours_option4_label').innerHTML = SliderAPI.getFrequencySliderLabel("option4");

            document.getElementById('physicalEnvironment_title').innerHTML = siteContent.physicalEnvironment;
        } catch (e) {
            (console.error || console.log).call(console, e.stack || e);
        }
    }
};

CreateWorkEnvironmentAPI.parseWorkEnvironmentResponse = function (response) {
    var json = JSON.parse(response);
    var workEnvironment = new CreateWorkEnvironmentAPI.WorkEnvironment(
            json.basic_work_environment.remote_allowed,
            json.basic_work_environment.telework_allowed,
            json.basic_work_environment.flexible_allowed,
            []
            );
    var captions = json.workplace_photo_captions;
    for (var i = 0; i < captions.length; i++) {
        var caption = captions[i];
        var workplacePhotoCaption = new CreateWorkEnvironmentAPI.WorkplacePhotoCaption(
                caption.photo_name,
                caption.description
                );
        workEnvironment.workplace_photo_captions.push(workplacePhotoCaption);
    }
    return workEnvironment;
};

CreateWorkEnvironmentAPI.initializeWorkEnvironmentForm = function (managerProfileId) {
    //Fill previous form fields
    DataAPI.getWorkplaceEnvironment(managerProfileId, function (response) {
        var workEnv = CreateWorkEnvironmentAPI.parseWorkEnvironmentResponse(response);
        CreateWorkEnvironmentAPI.populateWorkEnvironmentForm(workEnv);
    })

    //Show preivious workplace photos
    CreateWorkEnvironmentAPI.refreshWorkplacePhoto(managerProfileId, 'workplace_photo_1', 'workEnvironment_photo_1');
    CreateWorkEnvironmentAPI.refreshWorkplacePhoto(managerProfileId, 'workplace_photo_2', 'workEnvironment_photo_2');
    CreateWorkEnvironmentAPI.refreshWorkplacePhoto(managerProfileId, 'workplace_photo_3', 'workEnvironment_photo_3');

    //Set up photo uploaders
    CreateWorkEnvironmentAPI.workplacePhotoUploaders = [];
    var uploader1 = CreateWorkEnvironmentAPI.makeWorkplacePhotoUploader(managerProfileId, 'workplace_photo_1',
            'workplace_photo_input_1', null, 'workEnvironment_photo_1');
    var uploader2 = CreateWorkEnvironmentAPI.makeWorkplacePhotoUploader(managerProfileId, 'workplace_photo_2',
            'workplace_photo_input_2', null, 'workEnvironment_photo_2');
    var uploader3 = CreateWorkEnvironmentAPI.makeWorkplacePhotoUploader(managerProfileId, 'workplace_photo_3',
            'workplace_photo_input_3', null, 'workEnvironment_photo_3');

    CreateWorkEnvironmentAPI.workplacePhotoUploaders.push(uploader1, uploader2, uploader3);
};

/**
 * 
 * @param {CreateWorkEnvironment.WorkEnvironment} workEnvironment
 * @return {undefined}
 */
CreateWorkEnvironmentAPI.populateWorkEnvironmentForm = function (workEnvironment) {




    SliderAPI.selectOptionByValue("createEditProfile_remoteWork", workEnvironment.remote_allowed, "remoteWork");
    SliderAPI.selectOptionByValue("createEditProfile_telework", workEnvironment.telework_allowed, "telework");
    SliderAPI.selectOptionByValue("createEditProfile_flexHours", workEnvironment.flexible_allowed, "flexHours");
    var captions = workEnvironment.workplace_photo_captions;
    for (var i = 0; i < captions.length; i++) {
        var caption = captions[i];
        var captionFormElementId = CreateWorkEnvironmentAPI.photoNameToCaptionFormId[caption.photo_name];
        if (captionFormElementId) {
            document.getElementById(captionFormElementId).value = caption.description;
        }
    }
};

CreateWorkEnvironmentAPI.refreshWorkplacePhoto = function (managerProfileId, photoName, previewImageElementId) {
    var xhr = new XMLHttpRequest();
    var photoUrl = DataAPI.baseURL + '/getWorkplacePhotoByManagerProfileAndName/' + managerProfileId + '/' + photoName;
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
    xhr.setRequestHeader("Accept", "image/*");
    xhr.addEventListener('load', function () {
        img = document.getElementById(previewImageElementId);
        if (xhr.status == 200 && xhr.responseURL) {
            img.src = xhr.responseURL;
        } else {
            img.src = CreateWorkEnvironmentAPI.defaultWorkplacePhoto;
        }
    });
    xhr.send();
};

CreateWorkEnvironmentAPI.saveWorkEnvironment = function (managerProfileId) {
    var defaultOption = "option0";
    var remoteAllowedSelected = document.querySelector('input[name="createEditProfile_remoteWork"]:checked');
    if (remoteAllowedSelected === null) {
        var remoteAllowed = defaultOption;
    } else {
        var remoteAllowed = remoteAllowedSelected.value;
    }

    var teleworkAllowedSelected = document.querySelector('input[name="createEditProfile_telework"]:checked');
    if (teleworkAllowedSelected === null) {
        var teleworkAllowed = defaultOption;
    } else {
        var teleworkAllowed = teleworkAllowedSelected.value;
    }

    var flexibleAllowedSelected = document.querySelector('input[name="createEditProfile_flexHours"]:checked');
    if (flexibleAllowedSelected === null) {
        var flexibleAllowed = defaultOption;
    } else {
        var flexibleAllowed = flexibleAllowedSelected.value;
    }

    var workEnvironment = new CreateWorkEnvironmentAPI.WorkEnvironment(remoteAllowed, teleworkAllowed, flexibleAllowed, []);

    for (var name in CreateWorkEnvironmentAPI.photoNameToCaptionFormId) {
        var descriptionFormId = CreateWorkEnvironmentAPI.photoNameToCaptionFormId[name];
        var description = document.getElementById(descriptionFormId).value;
        var photoCaption = new CreateWorkEnvironmentAPI.WorkplacePhotoCaption(name, description);
        workEnvironment.workplace_photo_captions.push(photoCaption);
    }

    DataAPI.submitWorkplaceEnvironment(managerProfileId, workEnvironment, function () {}); //TODO add response callback

    for (var i = 0; i < CreateWorkEnvironmentAPI.workplacePhotoUploaders.length; i++) {
        CreateWorkEnvironmentAPI.workplacePhotoUploaders[i].uploadPhoto();
    }
}

CreateWorkEnvironmentAPI.makeWorkplacePhotoUploader = function (managerProfileId, photoName, inputId, dropzoneId, previewId) {
    var photoInput = document.getElementById(inputId);
    if (dropzoneId) {
        var photoDropzone = document.getElementById(dropzoneId);
    } else {
        var photoDropzone = null;
    }
    var photoPreview = document.getElementById(previewId);
    var uploadUrl = DataAPI.baseURL + "/putWorkplacePhotoByManagerProfileAndName/" + managerProfileId + '/' + photoName;

    var uploader = new CreateWorkEnvironmentAPI.WorkplacePhotoUploader(
            photoInput, photoDropzone, photoPreview,
            uploadUrl,
            function (request) {
                //TODO: handle upload response

            });

    return uploader;
};

CreateWorkEnvironmentAPI.WorkplacePhotoUploader = function (
        inputField, dropZone, previewImgElement,
        uploadUrl,
        onUploadComplete) {

    this.inputField = inputField;
    this.dropZone = dropZone;
    this.previewImgElement = previewImgElement;
    this.uploadUrl = uploadUrl;
    this.onUploadComplete = onUploadComplete;

    this.photo = null;
    this.max_filesize = 2048576;
    this.defaultPhotoSrc = CreateWorkEnvironmentAPI.defaultWorkplacePhoto;

    var self = this;

    self.init = function () {
        self.inputField.onchange = self.addFiles;
        if (self.dropZone)
            self.initializeDropzone();
    };

    //clone dropZone to remove existing event listeners
    self.initializeDropzone = function () {
        var clone = self.dropZone.cloneNode();
        while (self.dropZone.firstChild) {
            clone.appendChild(self.dropZone.lastChild);
        }
        self.dropZone.parentNode.replaceChild(clone, self.dropZone);
        self.dropZone = clone;

        self.dropZone.addEventListener("dragenter", self.stopProp, false);
        self.dropZone.addEventListener("dragleave", self.dragExit, false);
        self.dropZone.addEventListener("dragover", self.dragOver, false);
        self.dropZone.addEventListener("drop", self.processDroppedFiles, false);
    };

    self.setFiles = function (files) {
        self.processNewFiles(files);
    };

    self.addFiles = function () {
        self.processNewFiles(this.files);
    };

    self.processDroppedFiles = function (ev) {
        self.stopProp(ev);
        var files = ev.dataTransfer.files;
        self.processNewFiles(files);
    };

    self.dragOver = function (ev) {
        self.stopProp(ev);
        self.dropZone.classList.remove("fileDropzoneNormal");
        self.dropZone.classList.add("fileDropzoneHighlight");
        //this.style["backgroundColor"] = "#F0FCF0";
        //this.style["borderColor"] = "#3DD13F";
        //this.style["color"] = "#3DD13F";
    };

    self.dragExit = function (ev) {
        self.stopProp(ev);
        self.dropZone.classList.remove("fileDropzoneHighlight");
        self.dropZone.classList.add("fileDropzoneNormal");
        //dropZone.style["backgroundColor"] = "#FEFEFE";
        //dropZone.style["borderColor"] = "#CCC";
        //dropZone.style["color"] = "#CCC";
    };

    self.stopProp = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
    };

    self.clearUpload = function () {
        //Clear upload 
        self.photo = null;

        //Clear preview
        self.previewImgElement.src = self.defaultPhotoSrc;

        //Clear input button value
        self.inputField.value = null;
    };

    self.processNewFiles = function (files) {
        var file = files[0];
        if (file.type.match('image.*')) {
            self.clearUpload();
            var fr = new FileReader();
            fr.file = file;
            fr.onloadend = function (ev) {

                if (ev.target.file.size < self.max_filesize) {
                    self.photo = ev.target.file;
                    self.previewImgElement.src = ev.target.result;
                } else {
                    //TODO: indicate overlarge file
                }
            };
            fr.readAsDataURL(fr.file);
        } else {
            //TODO: indicate imporper file type
        }
    };

    self.uploadPhoto = function () {
        if (self.photo) {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                // Check if the XMLHttpRequest object has a "withCredentials" property.
                // "withCredentials" only exists on XMLHTTPRequest2 objects.
                xhr.open("PUT", self.uploadUrl);

            } else if (typeof XDomainRequest != "undefined") {
                // Otherwise, check if XDomainRequest.
                // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                xhr = new XDomainRequest();
                xhr.open("PUT", self.uploadUrl);
            } else {
                // Otherwise, CORS is not supported by the browser.
                xhr = null;
                // TODO: indicate to user that browser is not supported
            }

            xhr.setRequestHeader("Content-type", self.photo.type);
            xhr.setRequestHeader("X-File-Name", self.photo.name);
            xhr.setRequestHeader("Accept", "application/json");
            if (UserAPI.hasSessionUser()) {
                var authToken = UserAPI.getAuthToken();
                xhr.setRequestHeader("Authorization", "Bearer " + authToken);
            }
            xhr.addEventListener("load", function (ev) {
                if (self.onUploadComplete) {
                    self.onUploadComplete(xhr);
                }
            }, false);

            xhr.send(self.photo);
        }
    };

    self.init(); //call init function at end of constructor
};


