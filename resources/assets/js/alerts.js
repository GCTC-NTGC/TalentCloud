import messagesEn from "./localizations/en.json";
import messagesFr from "./localizations/fr.json";

const Swal = require("sweetalert2");

const localizations = {
  en: messagesEn,
  fr: messagesFr
};

function localize(locale, key) {
  return localizations[locale][key]
    ? localizations[locale][key]
    : "l10n.missing";
}

// Manager Index ==========================================
function handleClick(e) {
  e.preventDefault();
  const action = this.getAttribute("data-action");
  const locale = this.getAttribute("data-locale");

  let alertConfig = {
    delete: {
      title: localize(locale, "alert.title.delete"),
      confirmButtonText: localize(locale, "button.delete"),
      success: {
        title: localize(locale, "alert.title.deleted"),
        text: localize(locale, "alert.text.deleted")
      }
    },
    review: {
      title: localize(locale, "alert.title.review"),
      confirmButtonText: localize(locale, "button.sendToTalentCloud"),
      success: {
        title: localize(locale, "alert.title.sent"),
        text: localize(locale, "alert.text.sent")
      }
    }
  };

  alertConfig = alertConfig[action];

  Swal.queue([
    {
      title: alertConfig.title,
      text: localize(locale, "alert.text.irreversible"),
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0A6CBC",
      cancelButtonColor: "#F94D4D",
      cancelButtonText: localize(locale, "button.cancel"),
      confirmButtonText: alertConfig.confirmButtonText,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return axios({
          method: action == "delete" ? action : "post",
          url: this.getAttribute("href")
        })
          .then(response => {
            const jobId = this.getAttribute("data-jobid");
            const jobMarkup = indexWrapper.querySelector(
              `div[data-jobid="${jobId}"]`
            );
            jobMarkup.outerHTML = response.data;
          })
          .then(() => {
            Swal.insertQueueStep({
              title: alertConfig.success.title,
              text: alertConfig.success.text,
              type: "success"
            });
          })
          .catch(() => {
            Swal.insertQueueStep({
              title: localize(locale, "alert.title.error"),
              text: localize(locale, "alert.text.error"),
              type: "error"
            });
          });
      }
    }
  ]);
}

const indexWrapper = document.querySelector(".manager-poster-index");
// Double check we're on the manager index page, grab all the
// 'Send for Review' and 'Delete' buttons, and register the click event handler
// defined above.
if (typeof indexWrapper !== "undefined" && indexWrapper != null) {
  const reviewButtons = Array.from(
    indexWrapper.querySelectorAll('a[data-action="review"]')
  );
  reviewButtons.forEach(button =>
    button.addEventListener("click", handleClick)
  );

  const deleteButtons = Array.from(
    indexWrapper.querySelectorAll('button[data-action="delete"]')
  );
  deleteButtons.forEach(button =>
    button.addEventListener("click", handleClick)
  );
}
// End Manager Index ======================================
