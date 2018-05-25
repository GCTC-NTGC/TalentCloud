<section class="applicant-profile hidden" id="profileSection">

    <div class="applicant-profile__heading">

        <div class="content-container">

            <div class="applicant-profile__heading-photo-wrapper">
                <div class="applicant-profile__photo" id="myProfilePic"></div>
            </div>

            <h3 class="applicant-profile__name" id="updateProfileApplicantProfileFormNameLabelSpan"></h3>

            <p class="applicant-profile__tagline" id="updateProfileApplicantProfileFormTaglineLabelSpan">Default tag line!</p>

            <ul class="applicant-profile__social-wrapper" id="profileSocialMediaLinks">
                <li class="hidden" id="profileTwitterLinkWrapper">
                    <input type="hidden" id="profileTwitterUsername" value=""/>
                    <a href="#" id="profileTwitterLink" target="_blank" title="Twitter Logo">
                        <span class="hidden">Your Twitter profile</span>
                        <i class="fa fa-twitter"></i>
                    </a>
                </li>
                <li class="hidden" id="profileLinkedinLinkWrapper">
                    <input type="hidden" id="profileLinkedInUsername" value=""/>
                    <a href="#" id="profileLinkedinLink" target="_blank" title="Linkedin Logo">
                        <span class="hidden">Your LinkedIn profile</span>
                        <i class="fa fa-linkedin"></i>
                    </a>
                </li>
            </ul>

            <div id="profileBasicInfoEditWrapper" class="applicant-profile__heading-edit-wrapper">
                <a href="javascript:void(0)" class="profileBasicInfoEdit" onclick="JobSeekerAPI.showJobSeekerProfileBasicInfoEdit()" title="Edit my profile.">
                    <span class="hidden">Edit your profile</span>
                    <i class="fa fa-pencil-square"></i>
                </a>
            </div>

            <input type="hidden" id="profileId"/>
            <input type="hidden" id="profileLastUpdated"/>

        </div>

    </div>

    <div class="applicant-profile__content">

        <div class="content-container">

            <div class="applicant-profile__question-wrapper" id="profileQuestionsWrapper">
                <?php /* Questions & Answers go here */ ?>
            </div>

        </div>

    </div>

</section>
