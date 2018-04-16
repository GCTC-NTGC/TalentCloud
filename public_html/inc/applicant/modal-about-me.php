<div id="profileAboutMeEditOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="profileAboutMeEditTitle" aria-describedby="profileAboutMeFormDescription">

    <div id="profileAboutMeFormWrapperWindow" class="dialogue-modal dialogThreeQuarterWrapperWindow">

        <div id='profileAboutMeEditTitleWrapper' class="dialogTitle dialogue-modal__title-wrapper">
            <h3 id='profileAboutMeEditTitle' title="Edit your About Me info" class="dialogue-modal__title">Edit Your "About Me" Information</h3>
            <div class="hidden" id="profileAboutMeFormDescription">Edit Your "About Me" Information</div>
        </div>

        <div class="dialogWindowInterior">

            <div class="dialogue-modal__grid update-about__grid flex-grid middle">

                <form class="box full flex-grid update-about__form-grid" name="profileAboutMeForm" id="profileAboutMeForm" method="post" enctype="application/x-www-form-urlencoded">
                    <div class="box full">
                        <label for="profileEditAboutMe" class="form__label">
                            <span id="updateAboutTextareaLabelSpan">About Me:</span>
                        </label>
                        <div>
                            <textarea class="form__textarea" name="profileEditAboutMe" id="profileEditAboutMe" form="profileAboutMeForm"></textarea>
                        </div>
                    </div>
                    <div class="box full flex-grid update-about__button-grid">
                        <div class="box med-1of2"></div>
                        <div class="box med-1of2">
                            <input type="button" id="profileAboutMeEditCancel" value="Cancel" class="button--grey" onclick="JobSeekerAPI.hideJobSeekerProfileEditOverlays()"/>
                            <input type="button" id="profileAboutMeEditSave" value="Save" class="button--yellow" onclick="JobSeekerAPI.saveJobSeekerProfileChanges()"/>
                        </div>
                    </div>
                </form>

            </div>

        </div>

    </div>

</div>
