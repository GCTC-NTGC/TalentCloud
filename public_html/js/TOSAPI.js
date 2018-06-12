var TOSAPI = {};

TOSAPI.showTOS = function(anchor) {
    
    var stateInfo = {pageInfo: 'tos', pageTitle: 'Talent Cloud: Terms and Conditions'};
    document.title = stateInfo.pageTitle;

    TalentCloudAPI.hideAllContent();
    
    var faqSection = document.getElementById('tosSection');
    faqSection.classList.remove('hidden');

    var locale = TalentCloudAPI.getLanguageFromCookie();

    // New Subpage Hero Scripts

    Utilities.getHeroElements();

    var faqHeroTitle = document.getElementById("tosHeroTitle");
    faqHeroTitle.classList.remove("hidden");
    faqHeroTitle.setAttribute("aria-hidden", "false");

    // Google Analytics

    ga('set', 'page', '/tos');
    ga('send', 'pageview');

    // alert(anchor);

    if (anchor == null) {
        history.pushState(stateInfo, stateInfo.pageInfo, '#TOS');
        window.scrollTo(0, 0);
    }
    else if (anchor === "tosSection1") {
        history.pushState(stateInfo, stateInfo.pageInfo, '#TOS/tosSection1');
        setTimeout(function() {
            document.getElementById("tosSection1").scrollIntoView(true);
        }, 800);
    }
    else if (anchor === "tosSection2") {
        history.pushState(stateInfo, stateInfo.pageInfo, '#TOS/tosSection2');
        setTimeout(function() {
            document.getElementById("tosSection2").scrollIntoView(true);
        }, 800);
    }
    else if (anchor === "tosSection3") {
        history.pushState(stateInfo, stateInfo.pageInfo, '#TOS/tosSection3');
        setTimeout(function() {
            document.getElementById("tosSection3").scrollIntoView(true);
        }, 800);
    }
    else if (anchor === "tosSection4") {
        history.pushState(stateInfo, stateInfo.pageInfo, '#TOS/tosSection4');
        setTimeout(function() {
            document.getElementById("tosSection4").scrollIntoView(true);
        }, 800);
    }
    else if (anchor === "tosSection5") {
        history.pushState(stateInfo, stateInfo.pageInfo, '#TOS/tosSection5');
        setTimeout(function() {
            document.getElementById("tosSection5").scrollIntoView(true);
        }, 800);
    }
    else if (anchor === "tosSection6") {
        history.pushState(stateInfo, stateInfo.pageInfo, '#TOS/tosSection6');
        setTimeout(function() {
            document.getElementById("tosSection1").scrollIntoView(true);
        }, 800);
    }

};