window.onload = function () {

    focus();

    $(document).ready(function() {

        var name = $(".application-preview__status")[0].innerText;

        String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.split(search).join(replacement);
        };

        name = name.replaceAll(' ', '_');

        $("#expand-all").click();

        var HTML_Width = $("#canvas_div_pdf").width();
        var HTML_Height = $("#canvas_div_pdf").height();
        top_left_margin = 15;
        var PDF_Width = HTML_Width + (top_left_margin * 2);
        var PDF_Height = (PDF_Width * 1.2) + (top_left_margin * 2);
        canvas_image_width = HTML_Width;
        canvas_image_height = HTML_Height;
        var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;

        html2canvas($("#canvas_div_pdf")[0],{allowTaint:true}).then(function(canvas) {

            canvas.getContext('2d');

            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height+top_left_margin*2]);

            pdf.addImage(imgData, 'JPG', 0, 0, canvas_image_width, canvas_image_height);

            for (var i = 1; i <= totalPDFPages; i++) {
                pdf.addPage(PDF_Width, PDF_Height+top_left_margin*2);
                pdf.addImage(imgData, 'JPG', 0, -(PDF_Height*i+top_left_margin*2), canvas_image_width, canvas_image_height);
            }

            pdf.save(name + ".pdf");
        });
    });
}
