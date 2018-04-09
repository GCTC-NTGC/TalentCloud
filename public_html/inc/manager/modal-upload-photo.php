<!-- BEGIN - Profile Photo Modal -->
<div id="profilePicUploadOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="profilePicUploadTitle" aria-describedby="profilePicUploadDescription">
    <div id="profileBasicInfoEditWrapperWindow" class="dialogue-modal dialogThreeQuarterWrapperWindow">
        <div id="profilePicUploadTitleWrapper" class="dialogTitle">
            <strong id="profilePicUploadTitle" title="Upload a new profile image">Upload a new profile image</strong>
            <div class="hidden" id="profilePicUploadDescription">Upload a new profile image</div>
        </div>
        <div class="fileUpload">
            <div class="leftPane">
                <div>
                    <label for="profilePicUploadField">Profile picture</label>
                    <input type="file" id="profilePicUploadField" class="fileInput" name="Profile Pic" accept="image/*" />
                </div>
                <div id="profilePicUploadDrop" class="fileDropZone fileDropZoneNormal">
                    <p>Drop file here</p>
                </div>
            </div>
            <div class="rightPane">
                <div id="fileUploadPreviewPanel" class="uploadFileThumbnail" style="min-height:130px;">
                    <img id="fileUploadPreviewImg" src="/images/user.png"/>
                </div>
                <div id="fileUploadButtons">
                    <a id="profilePicCancelBtn" href="javascript:void(0)" class="btn btn-default" onclick="CreateEditProfileAPI.hideUploadProfilePic()">Cancel</a>
                    <a id="profilePicUploadBtn" class="btn btn-primary" href="#" title="Upload all files in list">Save</a>
                </div>
            </div>
        </div>
    </div>
</div>
