var FAQAPI = {};

FAQAPI.showFAQ = function(anchor) {
    
    var stateInfo = {pageInfo: 'faq', pageTitle: 'Talent Cloud: FAQ'};
    document.title = stateInfo.pageTitle;

    TalentCloudAPI.hideAllContent();
    
    var faqSection = document.getElementById('faqSection');
    faqSection.classList.remove('hidden');

    var locale = TalentCloudAPI.getLanguageFromCookie();

    // New Subpage Hero Scripts

    Utilities.getHeroElements();

    var faqHeroTitle = document.getElementById("faqHeroTitle");
    faqHeroTitle.classList.remove("hidden");
    faqHeroTitle.setAttribute("aria-hidden", "false");

    // Google Analytics

    ga('set', 'page', '/faqs');
    ga('send', 'pageview');

    // alert(anchor);

    if (anchor == null) {
        history.pushState(stateInfo, stateInfo.pageInfo, '#FAQ');
        window.scrollTo(0, 0);
    }
    else if (anchor === "credentialingSkillLevel") {
        history.pushState(stateInfo, stateInfo.pageInfo, '#FAQ/credentialingSkillLevel');
        setTimeout(function() {
            document.getElementById("credentialingSkillLevel").scrollIntoView(true);
        }, 800);
    }
    else if (anchor === "credentialingReferences") {
        history.pushState(stateInfo, stateInfo.pageInfo, '#FAQ/credentialingReferences');
        // document.getElementById("credentialingReferences").scrollIntoView(true);
        setTimeout(function() {
            document.getElementById("credentialingReferences").scrollIntoView(true);
        }, 800);
    }
    else if (anchor === "credentialingEvidence") {
        history.pushState(stateInfo, stateInfo.pageInfo, '#FAQ/credentialingEvidence');
        // document.getElementById("credentialingEvidence").scrollIntoView(true);
        setTimeout(function() {
            document.getElementById("credentialingEvidence").scrollIntoView(true);
        }, 800);
    }

};