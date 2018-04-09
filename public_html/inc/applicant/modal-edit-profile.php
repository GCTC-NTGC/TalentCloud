<!-- BEGIN - Profile Basic Info Edit Overlay-->
<div id="profileBasicInfoEditOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="profileBasicInfoEditTitle" aria-describedby="profileBasicInfoFormDescription">

    <div id="profileBasicInfoEditWrapperWindow" class="dialogue-modal dialogThreeQuarterWrapperWindow">

        <div id="profileBasicInfoFormWrapper">

            <div id='profileBasicInfoEditTitleWrapper' class="dialogTitle">
                <strong id='profileBasicInfoEditTitle' title="Edit your basic info">Edit your basic info</strong>
                <div class="hidden" id="profileBasicInfoFormDescription">Edit your basic info</div>
            </div>

            <div class="dialogWindowInterior">

                <!-- Modal Flex Grid ======================================= -->

                <div class="flex-grid middle">

                    <!-- Profile Upload Section (TAL-36) =================== -->

                    <div class="box lg-1of2">

                        <div class="update-profile-photo__wrapper">

                            <h4 class="update-profile-photo__title heading--04" id="changeDisplayPic">Change Display Picture</h4>

                            <div class="update-profile-photo__draggable-area-wrapper">

                                <div class="update-profile-photo__draggable-area-block">

                                    <img src="images/icon_profile_male.svg" alt="Profile Photo Default Icon" class="update-profile-photo__draggable-area-icon">

                                    <span class="update-profile-photo__draggable-area-label heading--03">Drag New Photo</span>

                                    <span class="update-profile-photo__draggable-area-error--size heading--03">File Larger Than 2MB</span>

                                    <span class="update-profile-photo__draggable-area-error--type heading--03">Please Use .JPG, .JPEG, or .PNG.</span>

                                    <div class="update-profile-photo__draggable-area" id="updateProfilePhotoDraggableArea"></div>

                                    <div class="update-profile-photo__croppie-wrapper" id="updateProfilePhotoCroppieContainer"></div>

                                </div>

                            </div>

                            <div class="update-profile__action-wrapper--default-state">

                                <span class="update-profile__or-copy heading--05">Or</span>

                                <label class="update-profile__choose-photo-button-label button--yellow" id="updateProfileChoosePhotoButtonLabel" role="button" tabindex="0">
                                    Choose File...
                                    <input id="updateProfileChoosePhotoButton" name="User Pr" type="file" class="update-profile__choose-photo-button" name="User Profile Photo" accept="image/*" />
                                </label>

                            </div>

                            <div class="update-profile__action-wrapper--upload-state">

                                <div class="flex-grid">

                                    <div class="box small-1of2">
                                        <label class="update-profile__choose-alt-photo-button-label button--yellow" role="button" tabindex="0">
                                            Choose Another File...
                                            <input id="updateProfileChooseAltPhotoButton" type="file" class="update-profile__choose-alt-photo-button" name="User Profile Photo" accept="image/*" />
                                        </label>
                                    </div>

                                    <div class="box small-1of2">
                                        <button id="updateProfilePhotoCancelButton" class="update-profile__cancel-button button--grey">Remove Photo</button>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <!-- Profile Information Form ========================== -->

                    <div class="box lg-1of2">

                        <form name="profileBasicInfoForm" id="profileBasicInfoForm" method="post" enctype="application/x-www-form-urlencoded">

                            <div class="form-group leftPane">
                                <label for="profileEditFirstName">
                                    <span>First Name:</span>
                                    <strong id="profileEditFirstNameError" class="error hidden">
                                        <span id="profileEditFirstNameErrorMsg" class="label label-danger"></span>
                                    </strong>
                                </label>
                                <div>
                                    <input class="form-control full-width" type="text" name="profileEditFirstName" id="profileEditFirstName" required=""/>
                                </div>
                            </div>

                            <div class="form-group rightPane">
                                <label for="profileEditLastName">
                                    <span>Last Name:</span>
                                    <strong id="profileEditLastNameError" class="error hidden">
                                        <span id="profileEditLastNameErrorMsg" class="label label-danger"></span>
                                    </strong>
                                </label>
                                <div>
                                    <input class="form-control full-width" type="text" name="profileEditLastName" id="profileEditLastName" required=""/>
                                </div>
                            </div>

                            <div class="form-group clear">
                                <label for="profileEditTagline">
                                    <span>Tagline:</span>
                                </label>
                                <div>
                                    <input class="form-control full-width" type="text" name="profileEditTagline" id="profileEditTagline"/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="profileEditTwitter">
                                    <img src="images/twitter.png" alt="Twitter logo" class="form-icon"/>
                                    <span>Twitter Handle:</span>
                                    <strong id="profileEditTwitterError" class="error hidden">
                                        <span id="profileEditTwitterErrorMsg" class="label label-danger"></span>
                                    </strong>
                                </label>
                                <div>
                                    <input class="form-control full-width" type="text" name="profileEditTwitter" id="profileEditTwitter" placeholder="@Username"/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="profileEditLinkedin">
                                    <img src="images/linkedin.png" alt="LinkedIn logo" class="form-icon"/>
                                    <span>LinkedIn Profile Address:</span>
                                    <strong id="profileEditLinkedinError" class="error hidden">
                                        <span id="profileEditLinkedinErrorMsg" class="label label-danger"></span>
                                    </strong>
                                </label>
                                <div>
                                    <span class="form-control" style="padding:7px 0 7px 14px;float:left;color:#999;vertical-align: middle;" onclick="document.getElementById('profileEditLinkedin').focus()">https://www.linkedin.com/in/</span>
                                    <span style="float:left;"><input class="form-control full-width" type="text" name="profileEditLinkedin" id="profileEditLinkedin" placeholder="exampleuser"/></span>
                                </div>
                            </div>

                            <div>
                                <input type="button" id="profileBasicInfoEditCancel" value="Cancel" class="btn btn-default" onclick="JobSeekerAPI.hideJobSeekerProfileEditOverlays()"/>
                                <input type="button" id="profileBasicInfoEditSave" value="Save" class="btn btn-primary" onclick="JobSeekerAPI.saveJobSeekerProfileChanges()"/>
                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>
