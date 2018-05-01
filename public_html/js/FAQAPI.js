var FAQAPI = {};

FAQAPI.showFAQ = function() {
    
    var stateInfo = {pageInfo: 'faq', pageTitle: 'Talent Cloud: FAQ'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#FAQ');

    TalentCloudAPI.hideAllContent();
    window.scrollTo(0, 0);
    
    var browseJobsSection = document.getElementById('faqSection');
    browseJobsSection.classList.remove('hidden');

    var locale = TalentCloudAPI.getLanguageFromCookie();

};