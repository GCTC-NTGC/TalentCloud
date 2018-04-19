<!-- BEGIN - Edit Admin Profile Section -->
<section id="createEditProfileSection" class="pageContent hidden">

    <div class="pageBanner">
        <div class="profileBannerFiller"></div>
    </div>

    <div class="pageBody">

        <div class="block-container">

            <div id="createEditProfilePicWrapper" class="profileBasicInfoTopBar flexContainerVerticallyCentered">
                <div class="flexLeftOfCenter"></div>
                <img id="myProfilePic" class="profilePicLarge" src="../images/user.png" alt="Profile Pic"/>
                <div class="flexRightOfCenter">
                    <a href="javascript:void(0)" id="editMyProfilePic" onclick="CreateEditProfileAPI.showUploadProfilePic()">
                        <img id="editMyProfilePicImg" src="../images/edit_profile_pic.svg" alt="Edit Basic Info" class="editImage"/>
                    </a>
                </div>
            </div>

            <div class="wb-frmvld wb-init">

                <div class="tabbedForm">

                    <div class="section">

                        <!-- Where the old steps resided -->
                        <form method="post" name="CreateEditProfileForm" id="CreateEditProfileForm">

                            <input type="hidden" id="UserId"/>

                            <input type="hidden" id="ManagerProfileId"/>

                            <input type="hidden" id="ManagerProfileDetailsId"/>

                            <div id="profileCommon">

                                <div style="text-align: center;width:100%;">
                                    <div style="width:500px;margin:1em auto;text-align: center;">
                                        <span id="createEditProfile_name_preview" class="profileName">name</span>
                                    </div>
                                </div>

                                <div style="text-align: center;width:100%;">
                                    <div style="width:500px;margin:1em auto;text-align: center;">
                                        <span id="createEditProfile_position_preview" class="managerProfileTitle">position</span>
                                    </div>
                                </div>

                                <div style="text-align: center;width:100%;">
                                    <div style="width:500px;margin:1em auto;text-align: center;">
                                        <span id="createEditProfile_department_preview" class="managerProfileDepartment">department</span>
                                    </div>
                                </div>

                            </div>

                            <?php
                                include "page-profile-about-me.php";
                                include "page-profile-leadership-style.php";
                                include "page-profile-work-environment.php";
                                include "page-profile-team-culture.php";
                                include "page-profile-other.php";
                            ?>
                        
                        </form>

                    </div>

                </div>

            </div>

        </div>

    </div>

</section>
<!-- END - Edit Admin Profile Section -->