var ProfilePicAPI = {};

ProfilePicAPI.version = "v1";
ProfilePicAPI.baseURL = "/tc/api/"+ProfilePicAPI.version;

ProfilePicAPI.loadingTextClass = 'fileUploadLoadingText';
ProfilePicAPI.loadingBarClass = 'fileUploadLoadingBar';
ProfilePicAPI.defaultProfilePic = '/images/user.png';

ProfilePicAPI.Uploader = function(
        fileInputButtons,
        dropZone,
        croppieContainer,
        clearButton,
        saveButton,
        userId,
        onUploadComplete
        ) {

    this.fileInputButtons = fileInputButtons;
    this.dropZone = dropZone;
    this.croppieContainer = croppieContainer;
    this.clearButton = clearButton;
    this.saveButton = saveButton;
    this.userId = userId;
    this.onUploadComplete = onUploadComplete;

    this.photo = null;
    this.croppie = null;
    this.max_filesize = 5242880;
    this.defaultPhotoSrc = ProfilePicAPI.defaultProfilePic;
    this.uploadUrl = ProfilePicAPI.baseURL + "/profilePic/" + this.userId;

    var self = this;

    self.init = function() {
        for (var i=0; i<fileInputButtons.length; i++) {
            fileInputButtons[i].onchange = self.addFiles;
        }
        if (self.saveButton) {
            self.saveButton.onclick = self.uploadPhoto;
        }
        if (self.clearButton) {
            self.clearButton.onclick = self.clearUpload;
        }
        if (self.dropZone) {
            self.initializeDropzone();
        }
    };

     self.initializeDropzone = function(){
        //clone dropZone to remove existing event listeners
        var clone = self.dropZone.cloneNode();
        while (self.dropZone.firstChild) {
          clone.appendChild(self.dropZone.lastChild);
        }
        self.dropZone.parentNode.replaceChild(clone, self.dropZone);
        self.dropZone = clone;

        self.dropZone.addEventListener("dragenter",  self.stopProp, false);
        self.dropZone.addEventListener("dragleave",  self.dragExit, false);
        self.dropZone.addEventListener("dragover",  self.dragOver, false);
        self.dropZone.addEventListener("drop",  self.processDroppedFiles, false);
    };

    /**
     * Use this function to set files programmatically
     *
     * @param {type} files
     * @return {undefined}
     */
    self.setFiles = function(files) {
        self.processNewFiles(files);
    };

    self.addFiles = function () {
        self.processNewFiles(this.files);
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

    self.processDroppedFiles = function (ev) {
        self.stopProp(ev);
        var files = ev.dataTransfer.files;
        self.processNewFiles(files);
    };

    var actionWrapperDefault = document.querySelector(".update-profile__action-wrapper--default-state");
    var actionWrapperUpload = document.querySelector(".update-profile__action-wrapper--upload-state");
    var draggableArea = document.querySelector(".update-profile-photo__draggable-area-wrapper");

    self.clearUpload = function () {
        //Clear upload
        self.photo = null;

        //Clear preview
        self.croppieContainer.innerHTML = "";
        self.croppieContainer.classList.remove("croppie-container");

        //Clear input button value
        for (var i=0; i<self.fileInputButtons.length; i++) {
            self.fileInputButtons[i].value = null;
        }

        // UI Changes
        actionWrapperDefault.classList.remove("hidden");
        actionWrapperUpload.classList.remove("active");
        draggableArea.classList.remove("active");
        draggableArea.classList.remove("error");
        draggableArea.classList.remove("error--size");
        draggableArea.classList.remove("error--type");

    };

    self.processNewFiles = function (files) {
        if (files === null || files.length === 0) {
            //Do nothing if new files is empty
            return;
        }
        var file = files[0];
        if (file.type.match('image.*')) {
            self.clearUpload();
            var fr = new FileReader();
            fr.file = file;
            fr.onloadend = function(ev) {
                if (ev.target.file.size < self.max_filesize) {
                    self.photo = ev.target.file;
                    self.croppie = self.makeProfilePicCroppie(self.croppieContainer, ev.target.result);
                    // UI Changes
                    actionWrapperDefault.classList.add("hidden");
                    actionWrapperUpload.classList.add("active");
                    draggableArea.classList.add("active");
                    draggableArea.classList.remove("error");
                } else {
                    // Indicates file is too large.
                    draggableArea.classList.remove("active");
                    draggableArea.classList.add("error--size");
                }
            };
            fr.readAsDataURL(fr.file);
        } else {
            // Indicates file is wrong type.
            draggableArea.classList.remove("active");
            draggableArea.classList.add("error--type");
        }
    };

    self.makeProfilePicCroppie = function(imageElement, imageSrc) {

        var croppie = new Croppie(imageElement, {
            viewport: { width: 200, height: 200, type: 'circle'},
            boundary: { width: 200, height: 200 },
            showZoomer: true,
            enableZoom: true,
            enforceBoundary: true,
            mouseWheelZoombool: true
        });
        croppie.bind({
            url: imageSrc
        }).then(function() {
            var crImage = croppie.elements.img;
            crImage.setAttribute("alt", "Preview Profile Photo");
            croppie.setZoom(0.15);
        });
        return croppie;
    };

    self.uploadPhoto = function() {
        if (self.photo && self.croppie) {
            self.croppie.result({
                    type: 'blob',
                    size: 'viewport',
                    format: 'png',
                    quality: 1,
                    circle: false
                }).then(function(blob) {
                    var payload = blob;                    
                    var headers = {"Content-type": self.photo.type,
                        "X-File-Name": self.photo.name,
                        "Accept":"application/json"};
                    DataAPI.sendRequest(self.uploadUrl, 'PUT', headers, payload, function(request){
                        if (self.onUploadComplete) {
                            self.onUploadComplete(request);
                        }
                    });
                });
        }
    }

    self.init();
};

ProfilePicAPI.refreshUserProfilePic = function(imageElement) {
    if (UserAPI.hasSessionUser()) {
        var userId = UserAPI.getSessionUserAsJSON().user_id;
        ProfilePicAPI.refreshProfilePic(userId, imageElement);
    }
};

ProfilePicAPI.refreshProfilePic = function(userId, imageElement) {
    ProfilePicAPI.refreshMultipleProfilePics(userId, [imageElement]);
};

ProfilePicAPI.refreshProfilePicBackground = function(userId, imageElement) {
    ProfilePicAPI.refreshMultipleProfilePicsBackground(userId, [imageElement]);
};

ProfilePicAPI.refreshMultipleProfilePics = function(userId, imageElements) {
    var pic_url = ProfilePicAPI.baseURL+'/profilePic/'+userId;
    DataAPI.sendRequest(pic_url, 'GET', {"Accept":"image/*"}, null, function(request){
        if(request.readyState === 4){
            if (request.status === 200) {
                for (var i=0; i<imageElements.length;i++) {
                    imageElements[i].src = request.responseURL;
                }
            } else {
                for (var i=0; i<imageElements.length;i++) {
                    imageElements[i].src = ProfilePicAPI.defaultProfilePic;
                }
            }
        }
    });
};

ProfilePicAPI.refreshMultipleProfilePicsBackground = function(userId, imageElements) {
    var pic_url = ProfilePicAPI.baseURL+'/profilePic/'+userId;
    DataAPI.sendRequest(pic_url, 'GET', {"Accept":"image/*"}, null, function(request){
        if (request.status == 200) {
            for (var i=0; i<imageElements.length;i++) {
                imageElements[i].style.backgroundImage = "url("+ProfilePicAPI.defaultProfilePic+")";
                imageElements[i].style.backgroundImage = "url("+request.responseURL+")";
            }
        } else {
            for (var i=0; i<imageElements.length;i++) {
                imageElements[i].style.backgroundImage = "url("+ProfilePicAPI.defaultProfilePic+")";
            }
        }
    });
};
