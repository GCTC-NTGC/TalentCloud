import { axios } from "./api/base";

const Swal = require("sweetalert2");

const messagesEn = {
  "alert.text.deleted": "The draft has been successfully removed.",
  "alert.text.error": "Something went wrong, please try again later.",
  "alert.text.irreversible": "This action cannot be undone.",
  "alert.title.delete": "Delete this draft Job Poster?",
  "alert.title.deleted": "Deleted",
  "alert.title.error": "Error",
  "button.cancel": "Cancel",
  "button.delete": "Delete"
};

const messagesFr = {
  "alert.text.deleted": "Ébauche supprimé avec succès.",
  "alert.text.error": "Quelque chose c'est mal passé. S'il vous plait d'essayer de nouveau.",
  "alert.text.irreversible": "Cette action ne peut être annulée.",
  "alert.title.delete": "Supprimer cet ébauche?",
  "alert.title.deleted": "Supprimé",
  "alert.title.error": "Erreur",
  "button.cancel": "Annuler",
  "button.delete": "Supprimer",
}

const localizations = {
  en: messagesEn,
  fr: messagesFr,
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
        text: localize(locale, "alert.text.deleted"),
      },
    },
  };

  alertConfig = alertConfig[action];

  Swal.queue([
    {
      title: alertConfig.title,
      text: localize(locale, "alert.text.irreversible"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0A6CBC",
      cancelButtonColor: "#F94D4D",
      cancelButtonText: localize(locale, "button.cancel"),
      confirmButtonText: alertConfig.confirmButtonText,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return axios({
          method: action == "delete" ? action : "post",
          url: this.getAttribute("data-href"),
        })
          .then(response => {
            const jobId = this.getAttribute("data-jobid");
            const jobMarkup = indexWrapper.querySelector(
              `div[data-jobid="${jobId}"]`,
            );
            jobMarkup.outerHTML = response.data;
          })
          .then(() => {
            Swal.insertQueueStep({
              title: alertConfig.success.title,
              text: alertConfig.success.text,
              icon: "success",
            });
          })
          .catch(() => {
            Swal.insertQueueStep({
              title: localize(locale, "alert.title.error"),
              text: localize(locale, "alert.text.error"),
              icon: "error",
            });
          });
      },
    },
  ]);
}

const indexWrapper = document.querySelector(".manager-poster-index");
// Double check we're on the manager index page, grab all the
// 'Delete' buttons, and register the click event handler
// defined above.
if (typeof indexWrapper !== "undefined" && indexWrapper != null) {
  const deleteButtons = Array.from(
    indexWrapper.querySelectorAll('button[data-action="delete"]'),
  );
  deleteButtons.forEach(button =>
    button.addEventListener("click", handleClick),
  );
}
// End Manager Index ======================================
