<!-- BEGIN - Applicant Profile Section -->
<section class="pageContent hidden" id="profileSection">
    <div class="pageBanner">
        <div class="profileBannerFiller"></div>
    </div>
    <div class="pageBody">
        <div class="container">
            <div id="profileBasicInfo" class="profileBasicInfo centered">
                <div id="profileBasicInfoTopBar" class="profileBasicInfoTopBar flexContainerVerticallyCentered">
                    <div class="flexLeftOfCenter">
                        <ul id="profileSocialMediaLinks" class="profileSocialMediaLinks">
                            <li id="profileTwitterLinkWrapper" class="hidden">
                                <input type="hidden" id="profileTwitterUsername" value=""/>
                                <a href="#" id="profileTwitterLink" target="_blank"><img src="/images/Twitter_icon_white.svg" class="socialMediaLink" alt="Twitter logo"/></a>
                            </li>
                            <li id="profileLinkedinLinkWrapper" class="hidden">
                                <input type="hidden" id="profileLinkedInUsername" value=""/>
                                <a href="#" id="profileLinkedinLink" target="_blank"><img src="/images/Linkedin_icon_white.svg" class="socialMediaLink" alt="LinkedIn logo"/></a>
                            </li>
                        </ul>
                    </div>
                    <img id="myProfilePic" class="profilePicLarge" src="images/user.png" alt="Profile Pic"/>
                    <div class="flexRightOfCenter">
                        <a href="javascript:void(0)" class="profileBasicInfoEdit" onclick="JobSeekerAPI.showJobSeekerProfileBasicInfoEdit()">
                            <img src="/images/edit_profile_pic.svg" alt="Edit Basic Info" class="editImage"/>
                        </a>
                    </div>
                </div>
                <div id="profileNameWrapper">
                    <div class="profileName">
                        <span id="updateProfileApplicantProfileFormNameLabelSpan"></span>
                    </div>
                </div>
                <div class="profileTagLineContainer">
                    <p id="updateProfileApplicantProfileFormTaglineLabelSpan">Default tag line!</p>
                    <p>
                    <!--p>
                        <strong>Available: </strong><span id="profileStartDate"></span>
                        <br>
                        <strong>Status: </strong><span id="profileStatus"></span>
                    </p-->
                    </p>
                </div>
                <input type="hidden" id="profileId"/>
                <input type="hidden" id="profileLastUpdated"/>
            </div>
            <div id="profileQuestionsWrapper"></div>
        </div>
    </div>
</section>
<!-- END - Applicant Profile Section -->
