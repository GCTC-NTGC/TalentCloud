<!-- TAL-48 ================================================================ -->
<section class="hidden application-preview" id="applicationPreview">

    <div class="content-container">

        <input type='hidden' id='jobApplicationPreviewJobPosterId' />

        <div class="application-preview__profile-wrapper">

            <div class="application-preview__profile-image" id="applicationPreviewProfileImage" style="background-image: url('https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg');" title="My profile photo.">

            </div>

            <h3 class="application-preview__profile-name" id="applicationPreviewProfileName">My Profile Name</h3>

            <h4 class="application-preview__profile-tagline" id="applicationPreviewProfileTagline">My snazzy tagline.</h4>

        </div>

    </div>

    <div class="content-container">

        <div class="application-preview__question-wrapper" id="applicationPreviewQuestionWrapper">

            <?php /* Example Question ==============================
              =======
              <div class="application-preview__question-wrapper" id="applicationPreviewQuestionWrapper">
              >>>>>>> master

              <div class="application-preview__question">

              <h5 class="application-preview__question-title">
              Sample Question 01
              </h5>

              <div class="application-preview__question-answer">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus massa quam, at pharetra diam hendrerit non. Proin justo purus, posuere non nibh a, facilisis maximus nibh. Ut lectus turpis, placerat at hendrerit quis, aliquet sit amet ligula. Nunc suscipit luctus rutrum. Cras in placerat justo.</p>
              <p>Vivamus placerat sem lectus, ac dignissim nibh molestie ut. Aenean auctor turpis at erat auctor ultricies. Nam ornare eget mi nec ultrices. Duis sollicitudin iaculis nulla non vestibulum. Donec non sem tortor.</p>
              <p>Vestibulum consectetur egestas turpis, blandit finibus quam hendrerit eu. Aenean vulputate eros a justo blandit facilisis. Sed semper tortor tincidunt est imperdiet dictum.</p>
              </div>

              </div>

             */ ?>

        </div>
    </div>

    <?php include "partial-applicant-evidence-preview.php"; ?>

    <div class="content-container">
        
            <div class="application-preview__alert flex-grid middle">

                <div class="box lg-1of6">
                    <i class="application-preview__alert-icon fa fa-address-card"></i>
                </div>

                <div class="box lg-5of6">
                    <p id="applicationPreviewProfileAlert" class="application-preview__alert-copy">Remember that hiring managers can view your full profile when you submit an application. By filling out your profile you increase your chances of getting hired.</p>
                </div>

            </div>
        
            <div class="application-preview__alert flex-grid middle attestation">
                
                <!--<div class="box lg-4of6">
                    <p id="applicationPreviewProfileAttestation" class="application-preview__alert-copy">This is my attestation that everything I say is true.</p>
                </div>-->
                
                <div class="box lg-5of6">
                    <label for="attestation"  class="application-preview__alert-copy">This is my attestation that everything I say is true.</label>
                </div>
                <div class="box lg-1of6">
                    <input type="checkbox" id="attestation" name="attestation" value="attestation">
                </div>
                
            </div>

            <div class="application-preview__button-wrapper">
                <button id="applicationPreviewEditApplicationButton" class="button--grey" onclick="JobApplicationAPI.showCreateJobApplication(document.getElementById('jobApplicationJobPosterId').value)">Edit Application</button>
                <button id="applicationPreviewSubmitApplicationButton" class="button--yellow" onclick="JobApplicationAPI.submitJobApplication(document.getElementById('jobApplicationJobPosterId').value);">Submit</button>
                <p id="attestation-error">Please attest to the information you provided by checking the check box above.</p>
            </div>

        </div>

</section>	