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

                        <?php include 'inc/common/edit-photo.php';?>

                    </div>

                    <!-- Profile Information Form ========================== -->

                    <div class="box lg-1of2">

                        <form name="profileBasicInfoForm" id="profileBasicInfoForm" method="post" enctype="application/x-www-form-urlencoded" class="update-profile__applicant-profile-form flex-grid top">

                            <div class="box med-1of2">
                                <label for="profileEditFirstName" class="form__label">
                                    <span id="updateProfileApplicantProfileFormFirstNameLabelSpan">First Name:</span>
                                    <strong id="profileEditFirstNameError" class="error hidden">
                                        <span id="profileEditFirstNameErrorMsg" class="label label-danger"></span>
                                    </strong>
                                </label>
                                <div>
                                    <input class="form__input--text" type="text" name="profileEditFirstName" id="profileEditFirstName" required=""/>
                                </div>
                            </div>

                            <div class="box med-1of2">
                                <label for="profileEditLastName" class="form__label">
                                    <span id="updateProfileApplicantProfileFormLastNameLabelSpan">Last Name:</span>
                                    <strong id="profileEditLastNameError" class="error hidden">
                                        <span id="profileEditLastNameErrorMsg" class="label label-danger"></span>
                                    </strong>
                                </label>
                                <div>
                                    <input class="form__input--text" type="text" name="profileEditLastName" id="profileEditLastName" required=""/>
                                </div>
                            </div>

                            <div class="box full">
                                <label for="profileEditTagline" class="form__label">
                                    <span id="updateProfileApplicantProfileFormTaglineLabelSpan">Tagline:</span>
                                </label>
                                <div>
                                    <input class="form__input--text" type="text" name="profileEditTagline" id="profileEditTagline"/>
                                </div>
                            </div>

                            <div class="box full">
                                <label for="profileEditTwitter" class="form__label">
                                    <img src="images/twitter.png" alt="Twitter logo" class="form-icon"/>
                                    <span id="updateProfileApplicantProfileFormTwitterLabelSpan">Twitter Handle:</span>
                                    <strong id="profileEditTwitterError" class="error hidden">
                                        <span id="profileEditTwitterErrorMsg" class="label label-danger"></span>
                                    </strong>
                                </label>
                                <div>
                                    <input class="form__input--text" type="text" name="profileEditTwitter" id="profileEditTwitter" placeholder="@Username"/>
                                </div>
                            </div>

                            <div class="box full">
                                <label for="profileEditLinkedin" class="form__label">
                                    <img src="images/linkedin.png" alt="LinkedIn logo" class="form-icon"/>
                                    <span id="updateProfileApplicantProfileFormLinkedinLabelSpan">LinkedIn Profile Address:</span>
                                    <strong id="profileEditLinkedinError" class="error hidden">
                                        <span id="profileEditLinkedinErrorMsg" class="label label-danger"></span>
                                    </strong>
                                </label>
                                <div class="flex-grid top">
                                    <span class="update-profile__linkedin-label box med-2of3" onclick="document.getElementById('profileEditLinkedin').focus()">https://www.linkedin.com/in/</span>
                                    <input class="form__input--text box med-1of3" type="text" name="profileEditLinkedin" id="profileEditLinkedin" placeholder="example"/>
                                </div>
                            </div>

                            <div class="box med-1of2">
                                <input type="button" id="profileBasicInfoEditCancel" value="Cancel" class="button--grey" onclick="JobSeekerAPI.hideJobSeekerProfileEditOverlays()"/>
                            </div>

                            <div class="box med-1of2">
                                <input type="button" id="profileBasicInfoEditSave" value="Save" class="button--yellow" onclick="JobSeekerAPI.saveJobSeekerProfileChanges()" tabindex="0"/>
                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>
