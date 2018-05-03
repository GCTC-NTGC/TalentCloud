<div id="profilePicUploadOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="profilePicUploadTitle" aria-describedby="profilePicUploadDescription">

    <div id="profileBasicInfoEditWrapperWindow" class="dialogue-modal dialogThreeQuarterWrapperWindow">

        <div class="dialogue-modal__title-wrapper">
            <h3 class="dialogue-modal__title" id="profileBasicInfoEditTitle">Edit Your Basic Info</h3>
        </div>
    
        <div class="flex-grid middle">

            <?php // Profile Upload Section (TAL-36) =================== ?>

            <div class="box med-1of7"></div>

            <div class="box med-5of7">

                <?php include '../inc/common/edit-photo.php';?>

            </div>

            <div class="box med-1of7"></div>

            <div class="box full update-profile-photo__admin-button-wrapper">
                <input type="button" class="button--grey" id="profileBasicInfoEditCancel" value="Cancel" class="button--grey" onclick="CreateEditProfileAPI.hideUploadProfilePic()"></button>
                <button class="button--yellow" id="profilePicUploadBtn">Save</button>
            </div>

        </div>

    </div>

</div>