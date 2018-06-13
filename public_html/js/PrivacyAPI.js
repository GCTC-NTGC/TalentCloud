var PrivacyAPI = {};

PrivacyAPI.showPrivacy = function(anchor) {
    
    var stateInfo = {pageInfo: 'privacy', pageTitle: 'Talent Cloud: Privacy Policy'};
    document.title = stateInfo.pageTitle;

    TalentCloudAPI.hideAllContent();
    
    var privacySection = document.getElementById('privacySection');
    privacySection.classList.remove('hidden');

    var locale = TalentCloudAPI.getLanguageFromCookie();

    // New Subpage Hero Scripts

    Utilities.getHeroElements();

    var privacyHeroTitle = document.getElementById("privacyHeroTitle");
    privacyHeroTitle.classList.remove("hidden");
    privacyHeroTitle.setAttribute("aria-hidden", "false");

    // Google Analytics

    ga('set', 'page', '/privacy');
    ga('send', 'pageview');

    if (anchor == null) {
        history.pushState(stateInfo, stateInfo.pageInfo, '#privacy');
        window.scrollTo(0, 0);
    }

};