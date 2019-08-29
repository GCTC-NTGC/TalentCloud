/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
// run on Review Applicants page to export all applications to PDF
// add bookmark to Chrome with this as the URL:
const html2canvas = require("html2canvas");
const jsPDF = require("jspdf");

// javascript:function clickAllApplicants(){let t=document.querySelectorAll("div.box.lg-2of11.applicant-links > a:nth-child(1)");!function(t){(t=Array.prototype.slice.call(t)).map(function(t){return t.getAttribute("href")})}(t);for(var e=0;e<t.length;e++){var l=window.open(t[e],"_blank"),n=l.document.createElement("script");n.setAttribute("src",t[e].origin+"/js/getpdf.js"),l.document.body.appendChild(n)}}clickAllApplicants();

function replaceAll(subject, search, replacement) {
  return subject.split(search).join(replacement);
}

function downloadPdfs() {
  let applicantName = document.querySelector("div.applicant-information>span")
    .textContent;

  applicantName = replaceAll(applicantName, " ", "_");
  document.querySelector("#expand-all").click();

  const canvasDiv = document.querySelector("#canvas_div_pdf");
  const htmlWidth = canvasDiv.clientWidth;
  const htmlHeight = canvasDiv.clientHeight;
  const topLeftMargin = 15;
  const pdfWidth = htmlWidth + topLeftMargin * 2;
  const pdfHeight = pdfWidth * 1.2 + topLeftMargin * 2;
  const totalPages = Math.ceil(htmlHeight / pdfHeight) - 1;

  html2canvas(canvasDiv, { allowTaint: true }).then(function(canvas) {
    canvas.getContext("2d");
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF("p", "pt", [pdfWidth, pdfHeight + topLeftMargin * 2]);
    pdf.addImage(imgData, "JPG", 0, 0, htmlWidth, htmlHeight);
    for (let i = 1; i <= totalPages; i++) {
      pdf.addPage(pdfWidth, pdfHeight + topLeftMargin * 2);
      pdf.addImage(
        imgData,
        "JPG",
        0,
        -(pdfHeight * i + topLeftMargin * 2),
        htmlWidth,
        htmlHeight,
      );
    }

    pdf.save(applicantName + ".pdf");
    window.close();
  });
}

window.onload = downloadPdfs;
