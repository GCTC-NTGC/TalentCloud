$(document).ready(function() {

    var links = document.querySelectorAll("div.box.lg-2of11.applicant-links > a:nth-child(1)");

    function get_hrefs(links){
        links = Array.prototype.slice.call(links);
        return links.map(function(elem){
            return elem.getAttribute("href");
        });;
    }

    get_hrefs(links);

    for (var i = 0; i < links.length; i++) {
        var newWindow = window.open(links[i], '_blank');
        var jsCode = newWindow.document.createElement('script');
        jsCode.setAttribute('src', 'https://talent.test/getpdf.js');
        newWindow.document.body.appendChild(jsCode);
    };
});
