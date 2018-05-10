<section class="browse-jobs hidden" id="browseJobsSection">

    <?php /* <div class="browse-jobs__filter-wrapper">

    </div> */ ?>

    <div class="browse-jobs__null-state" id="noJobs">

        <div class="content-container">
            <span id="browseJobsNullStateCopy">Sorry, there aren't any jobs posted at the moment.</span>
        </div>

    </div>

    <div class="hidden" id="loadingJobs">
        <img class="center-block" src="/images/working.gif" alt="Loading jobs"/>
    </div>

    <div class="browse-jobs__list-wrapper hidden" id="jobList">

        <?php /* Example Job Card */ ?>

        <div class="flex-grid" id="browseJobsList">

            <a class="job-card box med-1of2 lg-1of3" id="" href="">

                <div class="job-card__wrapper">

                    <div class="job-card__title-wrapper">
                        <h3 class="job-card__title">Web Developer</h3>
                        <span class="job-card__department">Treasury Board of Canada Secretariat</span>
                    </div>

                    <div class="job-card__content-wrapper flex-grid">
                        <div class="box small-1of2">
                            <span>Location</span>
                            <p>
                                <span>Ottawa</span>, 
                                <span>Ontario</span>
                            </p>
                        </div>
                        <div class="box small-1of2">
                            <span>Salary</span>
                            <p>$100,000 - $120,000</p>
                        </div>
                        <div class="box small-1of2">
                            <span>Duration</span>
                            <p>12 months</p>
                        </div>
                        <div class="box small-1of2">
                            <span>Remote Work</span>
                            <p>Allowed</p>
                        </div>
                    </div>

                    <div class="job-card__footer-wrapper flex-grid">
                        <div class="box med-1of2">
                            <span>12 Days Remaining</span>
                        </div>
                        <div class="box med-1of2">
                            <span>2 Applications Received</span>
                        </div>
                    </div>

                    <button class="job-card__view-button">View Job</button>

                </div>

            </a>

        </div>

    </div>

    <div id="jobPosterApplication" class="hidden"></div>

    <div class="jobCount hidden">
        <span id="contactCount">0</span> jobs
    </div>

</section>
