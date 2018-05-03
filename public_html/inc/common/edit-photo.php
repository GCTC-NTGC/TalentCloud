<div class="update-profile-photo__wrapper">

    <h4 class="update-profile-photo__title heading--04" id="updateProfilePhotoTitle">Change Display Picture</h4>

    <div class="update-profile-photo__draggable-area-wrapper">

        <div class="update-profile-photo__draggable-area-block">

            <img src="../images/icon_profile_male.svg" alt="Profile Photo Default Icon" class="update-profile-photo__draggable-area-icon">

            <span class="update-profile-photo__draggable-area-label heading--03" id="updateProfilePhotoDraggableAreaLabel">Drag New Photo</span>

            <span id="updateProfilePhotoDraggableAreaErrorSize" class="update-profile-photo__draggable-area-error--size heading--03">File Larger Than 5MB</span>

            <span id="updateProfilePhotoDraggableAreaErrorType" class="update-profile-photo__draggable-area-error--type heading--03" id="updateProfilePhotoDraggableAreaErrorType">Please Use .JPG, .JPEG, or .PNG.</span>

            <div class="update-profile-photo__draggable-area" id="updateProfilePhotoDraggableArea"></div>

            <div class="update-profile-photo__croppie-wrapper" id="updateProfilePhotoCroppieContainer"></div>

        </div>

    </div>

    <div class="update-profile__action-wrapper--default-state">

        <span class="update-profile__or-copy heading--05" id="updateProfileOrCopy">Or</span>

        <label class="update-profile__choose-photo-button-label button--yellow" id="updateProfileChoosePhotoButtonLabel" role="button" tabindex="0">
            <span id="updateProfileChoosePhotoButtonLabelSpan">Choose File...</span>
            <input id="updateProfileChoosePhotoButton" type="file" class="update-profile__choose-photo-button" name="User Profile Photo" accept="image/*" aria-hidden="true" tabindex="-1" />
        </label>

    </div>

    <div class="update-profile__action-wrapper--upload-state">

        <div class="flex-grid">

            <div class="box small-1of2">
                <label class="update-profile__choose-alt-photo-button-label button--yellow" role="button" tabindex="0">
                    <span id="updateProfileChooseAltPhotoButtonLabelSpan">Use Another File...</span>
                    <input id="updateProfileChooseAltPhotoButton" type="file" class="update-profile__choose-alt-photo-button" name="User Profile Photo" accept="image/*" aria-hidden="true" tabindex="-1" />
                </label>
            </div>

            <div class="box small-1of2">
                <button id="updateProfilePhotoCancelButton" class="update-profile__cancel-button button--grey">Remove Photo</button>
            </div>

        </div>

    </div>

</div>
