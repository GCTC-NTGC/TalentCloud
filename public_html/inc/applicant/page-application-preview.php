<!-- TAL-48 ================================================================ -->
<section class="hidden application-preview" id="applicationPreview">

	<div class="pageBanner">

        <h2 class="section--title" id="applicationPreviewHeaderTitle">Application Preview</h2>

        <!-- Restructured during TAL-103 -->
        <div class="application-header__position-wrapper">

            <div class="content-container">

                <span id="applicationPreviewHeaderCopy" class="application-header__position-copy">for the position of:</span>
                
                <h3 id="applicationPreviewHeaderPosition" class="application-header__position">Job title</h3>

            </div>

        </div>

        <input type='hidden' id='' />
        <input type='hidden' id='' />
        <input type='hidden' id='' />

    </div>

	<div class="content-container">

		<div class="application-preview__profile-wrapper">

			<div class="application-preview__profile-image" style="background-image: url('https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg');" title="My profile photo.">

			</div>

			<h3 class="application-preview__profile-name">My Profile Name</h3>

			<h4 class="application-preview__profile-tagline">My snazzy tagline.</h4>

		</div>

	</div>

	<?php include "partial-applicant-evidence-preview.php"; ?>

	<div class="content-container">

		<div class="application-preview__question-wrapper">

			<h5 class="application-preview__question-title">
				Sample Question 01
			</h5>

			<div class="application-preview__question-answer">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus massa quam, at pharetra diam hendrerit non. Proin justo purus, posuere non nibh a, facilisis maximus nibh. Ut lectus turpis, placerat at hendrerit quis, aliquet sit amet ligula. Nunc suscipit luctus rutrum. Cras in placerat justo.</p>
				<p>Vivamus placerat sem lectus, ac dignissim nibh molestie ut. Aenean auctor turpis at erat auctor ultricies. Nam ornare eget mi nec ultrices. Duis sollicitudin iaculis nulla non vestibulum. Donec non sem tortor.</p>
				<p>Vestibulum consectetur egestas turpis, blandit finibus quam hendrerit eu. Aenean vulputate eros a justo blandit facilisis. Sed semper tortor tincidunt est imperdiet dictum.</p>
			</div>

			<h5 class="application-preview__question-title">
				Sample Question 02
			</h5>

			<div class="application-preview__question-answer">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus massa quam, at pharetra diam hendrerit non. Proin justo purus, posuere non nibh a, facilisis maximus nibh. Ut lectus turpis, placerat at hendrerit quis, aliquet sit amet ligula. Nunc suscipit luctus rutrum. Cras in placerat justo.</p>
				<p>Vivamus placerat sem lectus, ac dignissim nibh molestie ut. Aenean auctor turpis at erat auctor ultricies. Nam ornare eget mi nec ultrices. Duis sollicitudin iaculis nulla non vestibulum. Donec non sem tortor.</p>
				<p>Vestibulum consectetur egestas turpis, blandit finibus quam hendrerit eu. Aenean vulputate eros a justo blandit facilisis. Sed semper tortor tincidunt est imperdiet dictum.</p>
			</div>

			<h5 class="application-preview__question-title">
				Sample Question 03
			</h5>

			<div class="application-preview__question-answer">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus massa quam, at pharetra diam hendrerit non. Proin justo purus, posuere non nibh a, facilisis maximus nibh. Ut lectus turpis, placerat at hendrerit quis, aliquet sit amet ligula. Nunc suscipit luctus rutrum. Cras in placerat justo.</p>
				<p>Vivamus placerat sem lectus, ac dignissim nibh molestie ut. Aenean auctor turpis at erat auctor ultricies. Nam ornare eget mi nec ultrices. Duis sollicitudin iaculis nulla non vestibulum. Donec non sem tortor.</p>
				<p>Vestibulum consectetur egestas turpis, blandit finibus quam hendrerit eu. Aenean vulputate eros a justo blandit facilisis. Sed semper tortor tincidunt est imperdiet dictum.</p>
			</div>

		</div>

		<div class="application-preview__alert flex-grid middle">

			<div class="box lg-1of6">
				<i class="application-preview__alert-icon fa fa-address-card"></i>
			</div>

			<div class="box lg-5of6">
				<p class="application-preview__alert-copy">Remember that hiring managers can view your full profile when you submit an application. By filling out your profile you increase your chances of getting hired.</p>
			</div>

		</div>

		<div class="application-preview__button-wrapper">
			<button class="button--grey">Edit Application</button>
			<button class="button--yellow" onclick="JobApplicationAPI.saveJobApplication();">Submit</button>
		</div>

	</div>
 
</section>	