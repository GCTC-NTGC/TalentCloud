<!-- BEGIN - About Me Edit Overlay-->
<div id="profileAboutMeEditOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="profileAboutMeEditTitle" aria-describedby="profileAboutMeFormDescription">
    <div id="profileAboutMeFormWrapperWindow" class="dialogue-modal dialogThreeQuarterWrapperWindow">
        <div id='profileAboutMeEditTitleWrapper' class="dialogTitle">
            <h3 id='profileAboutMeEditTitle' title="Edit your About Me info">Edit your About Me info</h3>
            <div class="hidden" id="profileAboutMeFormDescription">Edit your About Me info</div>
        </div>
        <div class="dialogWindowInterior">
            <form name="profileAboutMeForm" id="profileAboutMeForm" method="post" enctype="application/x-www-form-urlencoded">
                <div class="form-group">
                    <label for="profileEditAboutMe">
                        <span>About Me:</span>
                    </label>
                    <div>
                        <textarea class="form-control full-width" name="profileEditAboutMe" id="profileEditAboutMe" form="profileAboutMeForm"></textarea>
                    </div>
                </div>
                <div>
                    <input type="button" id="profileAboutMeEditSave" value="Save" class="btn btn-primary" onclick="JobSeekerAPI.saveJobSeekerProfileChanges()"/>
                    <input type="button" id="profileAboutMeEditCancel" value="Cancel" class="btn btn-default" onclick="JobSeekerAPI.hideJobSeekerProfileEditOverlays()"/>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- END - About Me Edit Overlay-->
