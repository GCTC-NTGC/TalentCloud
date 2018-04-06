<div id="profilePicUploadOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="profilePicUploadTitle" aria-describedby="profilePicUploadDescription">

    <div id="profileBasicInfoEditWrapperWindow" class="dialogue-modal dialogThreeQuarterWrapperWindow">
    
        <div class="flex-grid middle">

            <!-- Profile Upload Section (TAL-36) =================== -->

            <div class="box med-1of7"></div>

            <div class="box med-5of7">

                <?php include 'edit-photo.php';?>

            </div>

            <div class="box med-1of7"></div>

            <div class="box full update-profile-photo__admin-button-wrapper">
                <button class="button--grey" id="profileBasicInfoEditCancel" value="Cancel" class="button--grey" onclick="CreateEditProfileAPI.hideUploadProfilePic()">Cancel</button>
                <button class="button--yellow" id="profilePicUploadBtn">Save Photo</button>
            </div>

        </div>

    </div>

</div>