/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var FileUploadAPI = {};

FileUploadAPI.version = "v1";
//UserAPI.baseURL = "https://localhost:8083/talentcloud/api/"+UserAPI.version+"";
FileUploadAPI.baseURL = "/tc/api/"+FileUploadAPI.version;

FileUploadAPI.defaultProfilePic = '/images/user.png';

FileUploadAPI.FileUploader = function(
        fileField, dropZone, fileList,
        clearBtn,
        uploadBtn,
        isSingleFile, 
        isProfilePic,
        makeUploadRequest, 
        onUploadComplete) {
        
    var fileQueue = new Array(),
        preview = null,
	max_filesize = 2048576;

    this.init = function () {
        fileField.onchange = this.addFiles;
        clearBtn.onclick = clearUploadQueue;
        uploadBtn.onclick = this.uploadQueue;
        dropZone.addEventListener("dragenter",  this.stopProp, false);
        dropZone.addEventListener("dragleave",  this.dragExit, false);
        dropZone.addEventListener("dragover",  this.dragOver, false);
        dropZone.addEventListener("drop",  this.showDroppedFiles, false);
    };

    this.addFiles = function () {
        addFileListItems(this.files);
    };

    this.showDroppedFiles = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        var files = ev.dataTransfer.files;
        addFileListItems(files);
    };
    
    this.dragOver = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        dropZone.classList.remove("fileDropzoneNormal");
        dropZone.classList.add("fileDropzoneHighlight");
        //this.style["backgroundColor"] = "#F0FCF0";
        //this.style["borderColor"] = "#3DD13F";
        //this.style["color"] = "#3DD13F";
    };

    this.dragExit = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
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

    this.uploadQueue = function () {
        while (fileQueue.length > 0) {
            var item = fileQueue.pop();
            var p = document.createElement("p");
            p.className = "fileUploadLoader";
            var pText = document.createTextNode("Uploading...");
            p.appendChild(pText);
            item.li.appendChild(p);
            var size = 0;
            if (item.croppie) {
                item.croppie.result({
                    type: 'blob',
                    size: 'viewport',
                    format: 'png',
                    quality: 1,
                    circle: 1
                }).then(function(blob) {
                    var size = blob.size;
                    if (size < max_filesize) {
                        uploadFile(item.file, item.li, item.croppie);
                    } else {
                        p.textContent = "File too large";
                        p.style["color"] = "red";
                    }
                });
            } else {
                size = item.file.size;
                if (size < max_filesize) {
                    uploadFile(item.file, item.li, item.croppie);
                } else {
                    p.textContent = "File too large";
                    p.style["color"] = "red";
                }
            }
        }
    };
    
    var clearUploadQueue = function () {
        while (fileList.childNodes.length > 0) {
            fileList.removeChild(
                fileList.childNodes[fileList.childNodes.length - 1]
            );
        }
    };

    var addFileListItems = function (files) {
        if (isSingleFile) {
            clearUploadQueue();
            var fr = new FileReader();
            fr.file = files[0];
            fr.onloadend = showFileInList;
            fr.readAsDataURL(files[0]);
        } else {
            for (var i = 0; i < files.length; i++) {
                var fr = new FileReader();
                fr.file = files[i];
                fr.onloadend = showFileInList;
                fr.readAsDataURL(files[i]);
            }
        }
    };

    var showFileInList = function (ev) {
        var file = ev.target.file;
        if (file) {
            var li = document.createElement("li");
            if (file.type.search(/image\/.*/) != -1) {
                var thumb = new Image();
                thumb.src = ev.target.result;
                li.appendChild(thumb);
                var croppie = null;
                if (isProfilePic) {
                    croppie = makeProfilePicCroppie(thumb, ev.target.result);
                } 
            }
            var h3 = document.createElement("h3");
            var h3Text = document.createTextNode(file.name);
            h3.appendChild(h3Text);
            li.appendChild(h3);
            var div = document.createElement("div");
            var otherFileType = file.type;
            
            /***detect file type here and handle accordinly***/
            if (file.type.search("application/vnd.openxmlformats-officedocument.presentationml.presentation") != -1){
            	otherFileType = "MS Power Point";
			}else if (file.type.search("application/vnd.openxmlformats-officedocument.wordprocessingml.document") != -1){
            	otherFileType = "MS Word";

            }else if (file.type.search("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") != -1){
            	otherFileType = "MS Excel";
            }else { 
                //otherFileType = "Unknown file type";
            }
            
            var divText = document.createTextNode(
                "File type: "
                + 
                otherFileType
                + " - " +
                Math.round(file.size / 1024) + "KB"
            );
            div.appendChild(divText);
            
            var divLoader = document.createElement("div");
            divLoader.className = "fileUploadLoadingIndicator";
            
            li.appendChild(div);
            li.appendChild(divLoader);
            fileList.appendChild(li);
            fileQueue.push({
                file : file,
                li : li,
                croppie : croppie
            });
        }
    };

    var makeProfilePicCroppie = function(img, imageSrc) {
        
        var croppie = new Croppie(img, {
            viewport: { width: 200, height: 200, type: 'circle'},
            boundary: { width: 200, height: 200 },
            showZoomer: true,
            enableZoom: true,
            enforceBoundary: true,
            mouseWheelZoombool: true
        });
        croppie.bind({
            url: imageSrc
        });
        //on button click
        croppie.result('canvas').then(function(canvas) {
            console.log("croppie pic bound");
        });
        return croppie;
    };
    
    var uploadFile = function (file, li, croppie) {
        if (li && file && makeUploadRequest) {
            var type = "";
            var name = "";
            var payload = null;
            if (croppie) {
                name = 'profile_pic.png';
                type = 'image/png';
            } else {
                type = file.type;
                name = file.name;
                payload = file;
            }
            
            var xhr = makeUploadRequest(type, name),
            upload = xhr.upload;
            upload.addEventListener("progress", function (ev) {
                if (ev.lengthComputable) {
                    var loader = li.getElementsByTagName("div")[0];
                    loader.style["width"] = (ev.loaded / ev.total) * 100 + "%";
                }
            }, false);
            upload.addEventListener("load", function (ev) {
                var ps = li.getElementsByTagName("p");
                var div = li.getElementsByTagName("div")[0];
                div.style["width"] = "100%";
                div.style["backgroundColor"] = "#0f0";
                for (var i = 0; i < ps.length; i++) {
                    if (ps[i].className == "fileUploadLoader") {
                        ps[i].textContent = "Upload complete";
                        ps[i].style["color"] = "#3DD13F";
                        break;
                    }
                }
                if (onUploadComplete) {
                    onUploadComplete(xhr);
                }
            }, false);
            upload.addEventListener("error", function (ev) {
                console.log(ev);
                //TODO
            }, false);
            upload.addEventListener("abort", function (ev) {
                console.log(ev);
                //TODO
            }, false);
            
            if (croppie) {
                croppie.result({
                    type: 'blob',
                    size: 'viewport',
                    format: 'png',
                    quality: 1,
                    circle: 1
                }).then(function(blob) {
                    payload = blob;
                    xhr.send(payload);
                });
            } else {
                xhr.send(payload);
            }
        }
    };
};

FileUploadAPI.clearUploadQueue = function() {
    if (fileUploader) {
        fileUploader.clearUploadQueue();
    }
};

FileUploadAPI.uploadQueue = function() {
    if (fileUploader) {
        fileUploader.uploadQueue();
    }
}

FileUploadAPI.makeProfilePicUploadRequest = function(fileType, fileName){
    var upload_url = FileUploadAPI.baseURL+"/profilePic/"+UserAPI.getSessionUserAsJSON()['user_id'];
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open("PUT", upload_url);

    } else if (typeof XDomainRequest != "undefined") {
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open("PUT", upload_url);
    } else {
      // Otherwise, CORS is not supported by the browser.
      xhr = null;
      // TODO: indicate to user that browser is not supported
    }
    
    xhr.open('PUT',upload_url);
    xhr.setRequestHeader("Content-type",fileType);
    xhr.setRequestHeader("X-File-Name", fileName);
    xhr.setRequestHeader("Accept","application/json");
    if (UserAPI.hasAuthToken()) {
        var authToken = UserAPI.getAuthTokenAsJSON()
        xhr.setRequestHeader("x-access-token", authToken.access_token);
    }
    return xhr;
};

FileUploadAPI.onProfilePicUploaded = function(xhr){
    FileUploadAPI.refreshUserProfilePic();
};

FileUploadAPI.refreshProfilePic = function(user_id, img_element_array) {
    var xhr = new XMLHttpRequest();
    var pic_url = FileUploadAPI.baseURL+'/profilePic/'+user_id;
    if ("withCredentials" in xhr) {
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open("GET", pic_url);

    } else if (typeof XDomainRequest != "undefined") {
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open("GET", pic_url);
    } else {
      // Otherwise, CORS is not supported by the browser.
      xhr = null;
      // TODO: indicate to user that browser is not supported
    } 
    xhr.open('GET', pic_url);
    xhr.setRequestHeader("Accept","image/*"); 
    xhr.addEventListener('load', function() {
        if (xhr.status == 200) {
            for (var i=0; i<img_element_array.length;i++) {
                img_element_array[i].src = xhr.responseURL;
            }
        } else {
            for (var i=0; i<img_element_array.length;i++) {
                img_element_array[i].src = FileUploadAPI.defaultProfilePic;
            }
        }
    });
    xhr.send();
};

FileUploadAPI.refreshUserProfilePic = function() {
    if (UserAPI.hasSessionUser()) {
        var user_id = UserAPI.getSessionUserAsJSON()["user_id"];
        FileUploadAPI.refreshProfilePic(user_id, [document.getElementById("myProfilePic")]);
    }
};

FileUploadAPI.showProfilePicUpload = function() {
    var uploadWindow = document.getElementById('profilePicUploadWrapperWindow');
    uploadWindow.classList.remove("hidden");
    EventsAPI.setFormFocus("profilePicUploadField");
    
    var fileField = document.getElementById('profilePicUploadField');
    var fileDrop = document.getElementById('profilePicUploadDrop');
    var fileList = document.getElementById('profilePicUploadPreview');
    var clearBtn = document.getElementById('profilePicUploadClear');
    var uploadBtn = document.getElementById('profilePicUploadBtn');
    fileUploader = new FileUploader(
            fileField, fileDrop, fileList, 
            clearBtn,
            uploadBtn,
            true, 
            FileUploadAPI.makeProfilePicUploadRequest, 
            FileUploadAPI.onProfilePicUploaded);
    fileUploader.init();
}

FileUploadAPI.hideProfilePicUpload = function() {
    var uploadWindow = document.getElementById('profilePicUploadWrapperWindow');
    uploadWindow.classList.add("hidden");
}