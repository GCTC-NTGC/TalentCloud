var links = document.querySelectorAll("div.box.lg-2of11.applicant-links > a:nth-child(1)");

function get_hrefs(links){
    links = Array.prototype.slice.call(links);
    return links.map(function(elem){
        return elem.getAttribute("href");
    });;
}
get_hrefs(links);

links.forEach(function(link){
    window.open(link);
    //get_pdfs(link);
});

function get_pdfs(){

    //window.location.href = link;

    document.getElementById("expand-all").click();

    var HTML_Width = $(".canvas_div_pdf").width();
    var HTML_Height = $(".canvas_div_pdf").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width+(top_left_margin*2);
    var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;

    html2canvas($(".canvas_div_pdf")[0],{allowTaint:true}).then(function(canvas) {

        canvas.getContext('2d');

        console.log(canvas.height+"  "+canvas.width);

        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);


        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }

        pdf.save(links[i] + ".pdf");
    });
};
