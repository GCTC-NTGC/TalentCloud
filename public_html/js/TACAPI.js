var TACAPI = {};

TACAPI.showTAC = function(anchor) {
    
    var stateInfo = {pageInfo: 'tac', pageTitle: 'Talent Cloud: Terms and Conditions'};
    document.title = stateInfo.pageTitle;

    TalentCloudAPI.hideAllContent();
    
    var tacSection = document.getElementById('tacSection');
    tacSection.classList.remove('hidden');

    var locale = TalentCloudAPI.getLanguageFromCookie();

    // New Subpage Hero Scripts

    Utilities.getHeroElements();

    var tacHeroTitle = document.getElementById("tacHeroTitle");
    tacHeroTitle.classList.remove("hidden");
    tacHeroTitle.setAttribute("aria-hidden", "false");

    // Google Analytics

    ga('set', 'page', '/tac');
    ga('send', 'pageview');

    // alert(anchor);

    if (anchor == null) {
        history.pushState(stateInfo, stateInfo.pageInfo, '#TAC');
        window.scrollTo(0, 0);
    }
    else if (anchor === "tacSection1") {
        history.pushState(stateInfo, stateInfo.pageInfo, '#TAC/tacSection1');
        setTimeout(function() {
            document.getElementById("tacSection1").scrollIntoView(true);
        }, 800);
    }
    else if (anchor === "tacSection2") {
        history.pushState(stateInfo, stateInfo.pageInfo, '#TAC/tacSection2');
        setTimeout(function() {
            document.getElementById("tacSection2").scrollIntoView(true);
        }, 800);
    }
    else if (anchor === "tacSection3") {
        history.pushState(stateInfo, stateInfo.pageInfo, '#TAC/tacSection3');
        setTimeout(function() {
            document.getElementById("tacSection3").scrollIntoView(true);
        }, 800);
    }
    else if (anchor === "tacSection4") {
        history.pushState(stateInfo, stateInfo.pageInfo, '#TAC/tacSection4');
        setTimeout(function() {
            document.getElementById("tacSection4").scrollIntoView(true);
        }, 800);
    }
    else if (anchor === "tacSection5") {
        history.pushState(stateInfo, stateInfo.pageInfo, '#TAC/tacSection5');
        setTimeout(function() {
            document.getElementById("tacSection5").scrollIntoView(true);
        }, 800);
    }
    else if (anchor === "tacSection6") {
        history.pushState(stateInfo, stateInfo.pageInfo, '#TAC/tacSection6');
        setTimeout(function() {
            document.getElementById("tacSection1").scrollIntoView(true);
        }, 800);
    }

};