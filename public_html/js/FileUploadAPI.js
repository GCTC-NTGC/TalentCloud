/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var FileUploadAPI = {};

FileUploadAPI.version = "v1";
//UserAPI.baseURL = "https://localhost:8083/talentcloud/api/"+UserAPI.version+"";
FileUploadAPI.baseURL = "/tc/api/"+FileUploadAPI.version;

var fileUploader = null;

function FileUploader(fileField, dropZone, fileList, isSingleFile, 
    makeUploadRequest, onUploadComplete) {
        
    var fileQueue = new Array(),
        preview = null,
	max_filesize = 2048576;

    this.init = function () {
        fileField.onchange = this.addFiles;
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
    
    this.clearUploadQueue = function () {
        while (fileList.childNodes.length > 0) {
            fileList.removeChild(
                fileList.childNodes[fileList.childNodes.length - 1]
            );
        }
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
            p.className = "loader";
            var pText = document.createTextNode("Uploading...");
            p.appendChild(pText);
            item.li.appendChild(p);
            if (item.file.size < max_filesize) {
                uploadFile(item.file, item.li);
            } else {
                p.textContent = "File too large";
                p.style["color"] = "red";
            }
        }
    };

    var addFileListItems = function (files) {
        if (isSingleFile) {
            fileUploader.clearUploadQueue();
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
                //thumb.addEventListener("mouseover", showImagePreview, false);
                //thumb.addEventListener("mouseout", removePreview, false);
                li.appendChild(thumb);
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
                otherFileType = "Unknown file type";
            }
            /*
            var divText = document.createTextNode(
                "File type: "
                + 
                otherFileType
                + " - " +
                Math.round(file.size / 1024) + "KB"
            );
            div.appendChild(divText);
            */
            var divLoader = document.createElement("div");
            divLoader.className = "loadingIndicator";
            
            li.appendChild(div);
            li.appendChild(divLoader);
            fileList.appendChild(li);
            fileQueue.push({
                file : file,
                li : li
            });
        }
    };

    /*
    var showImagePreview = function (ev) {
        var div = document.createElement("div");
        div.style["top"] = (ev.pageY + 10) + "px";
        div.style["left"] = (ev.pageX + 10) + "px";
        div.style["opacity"] = 0;
        div.className = "imagePreview";
        var img = new Image();
        img.src = ev.target.src;
        div.appendChild(img);
        document.body.appendChild(div);
        document.body.addEventListener("mousemove", movePreview, false);
        preview = div;
        fadePreviewIn();
    };

    var movePreview = function (ev) {
        if (preview) {
            preview.style["top"] = (ev.pageY + 10) + "px";
            preview.style["left"] = (ev.pageX + 10) + "px";
        }
    };

    var removePreview = function (ev) {
        document.body.removeEventListener("mousemove", movePreview, false);
        document.body.removeChild(preview);
    };
    
    var fadePreviewIn = function () {
        if (preview) {
            var opacity = preview.style["opacity"];
            for (var i = 10; i < 250; i = i+10) {
                (function () {
                    var level = i;
                    setTimeout(function () {
                        preview.style["opacity"] = opacity + level / 250;
                    }, level);
                })();
            }
        }
    };
    */
    var uploadFile = function (file, li) {
        if (li && file && makeUploadRequest) {
            var xhr = makeUploadRequest(file),
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
                    if (ps[i].className == "loader") {
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
            xhr.send(file);
        }
    };
}

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

FileUploadAPI.makeProfilePicUploadRequest = function(file){
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
    xhr.setRequestHeader("Content-type",file.type);
    xhr.setRequestHeader("X-File-Name", file.name);
    xhr.setRequestHeader("Accept","application/json");
    if (UserAPI.hasAuthToken()) {
        var authToken = UserAPI.getAuthTokenAsJSON()
        xhr.setRequestHeader("x-access-token", authToken.access_token);
    }
    return xhr;
};

FileUploadAPI.onProfilePicUploaded = function(xhr){
    //TODO
    console.log("Profile img uploaded: " + xhr.response);
};

FileUploadAPI.showProfilePicUpload = function() {
    var uploadWindow = document.getElementById('profilePicUploadWrapperWindow');
    uploadWindow.classList.remove("hidden");
    EventsAPI.setFormFocus("profilePicUploadField");
    
    var fileField = document.getElementById('profilePicUploadField');
    var fileDrop = document.getElementById('profilePicUploadDrop');
    var fileList = document.getElementById('profilePicUploadFiles');
    fileUploader = new FileUploader(
            fileField, fileDrop, fileList, 
            true, 
            FileUploadAPI.makeProfilePicUploadRequest, 
            FileUploadAPI.onProfilePicUploaded);
    fileUploader.init();
}

FileUploadAPI.hideProfilePicUpload = function() {
    var uploadWindow = document.getElementById('profilePicUploadWrapperWindow');
    uploadWindow.classList.add("hidden");
}