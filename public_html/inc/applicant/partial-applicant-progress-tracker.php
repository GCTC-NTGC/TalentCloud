<section class="application-progress">

    <div class="application-progress__container">

        <div class="flex-grid">

            <?php // DEV-NOTE: application-progress__item classes can be paired with an inactive class to make them grey when their respective content is not in use. See below for an example. ?>

            <div class="box med-1of4 application-progress__item inactive" data-application-section="my-information">
                <div class="application-progress__background-wrapper">
                    <div class="application-progress__icon-wrapper">
                        <span class="application-progress__icon">1</span>
                    </div>
                    <h3 class="application-progress__label" id="applicationProgressMyInformation">My Information</h3>
                </div>
            </div>

            <div class="box med-1of4 application-progress__item" data-application-section="essential-criteria">
                <div class="application-progress__background-wrapper">
                    <div class="application-progress__icon-wrapper">
                        <span class="application-progress__icon">2</span>
                    </div>
                    <h3 class="application-progress__label" id="applicationProgressEssentialCriteria">Essential Criteria</h3>
                </div>
            </div>

            <div class="box med-1of4 application-progress__item inactive" data-application-section="asset-criteria">
                <div class="application-progress__background-wrapper">
                    <div class="application-progress__icon-wrapper">
                        <span class="application-progress__icon">3</span>
                    </div>
                    <h3 class="application-progress__label" id="applicationProgressNonEssentialCriteria">Non-essential Criteria</h3>
                </div>
            </div>

            <div class="box med-1of4 application-progress__item inactive" data-application-section="preview">
                <div class="application-progress__background-wrapper">
                    <div class="application-progress__icon-wrapper">
                        <span class="application-progress__icon">4</span>
                    </div>
                    <h3 class="application-progress__label" id="applicationProgressReviewMyApplication">Review My Application</h3>
                </div>
            </div>

        </div>

    </div>

</section>
