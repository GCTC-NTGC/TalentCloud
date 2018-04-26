<div id="profileEditAnswerOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="profileEditAnswerTitle" aria-describedby="profileEditAnswerFormDescription">

    <div id="profileEditAnswerFormWrapperWindow" class="dialogue-modal dialogThreeQuarterWrapperWindow">

        <div id='profileEditAnswerTitleWrapper' class="dialogTitle dialogue-modal__title-wrapper">
            <h3 id='profileEditAnswerTitle' title="Edit your Profile Info" class="dialogue-modal__title">Edit Your "About Me" Information</h3>
            <div class="hidden" id="profileEditAnswerFormDescription">Edit Your "About Me" Information</div>
        </div>

        <div class="dialogWindowInterior">

            <div class="dialogue-modal__grid update-about__grid flex-grid middle">

                <form class="box full flex-grid update-about__form-grid" name="profileEditAnswerForm" id="profileEditAnswerForm" method="post" enctype="application/x-www-form-urlencoded">
                    <input type="hidden" id="profile-edit-answer__question-id" value="0">
                    <div class="box full">
                        <label for="profileEditAnswer" class="form__label">
                            <span id="profileEditAnswerLabel"></span>
                        </label>
                        <div>
                            <textarea class="form__textarea" name="profileEditAnswer" id="profileEditAnswer" form="profileEditAnswerForm"></textarea>
                        </div>
                    </div>
                    <div class="box full flex-grid update-about__button-grid">
                        <div class="box med-1of2"></div>
                        <div class="box med-1of2">
                            <input type="button" id="profileEditAnswerCancel" value="Cancel" class="button--grey" onclick="JobSeekerAPI.hideJobSeekerProfileEditAnswerModal()"/>
                            <input type="button" id="profileEditAnswerSave" value="Save" class="button--yellow" onclick="JobSeekerAPI.saveJobSeekerProfileAnswer()"/>
                        </div>
                    </div>
                </form>

            </div>

        </div>

    </div>

</div>
