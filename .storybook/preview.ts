import React from "react";
import { setIntlConfig } from "storybook-addon-intl";
import messagesFr from "../resources/assets/js/translations/locales/fr.json";

// Create a parent element for modals.
// Modals use the createPortal function, which needs a dom node passed in as a parent.
// That node needs to exist before the story file runs.
// See for explanation: https://github.com/storybookjs/storybook/issues/4604
// TODO: find better workaround
if (document.querySelector("#modal-root") === null) {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  modalRoot.setAttribute("data-clone", "");
  document.body.appendChild(modalRoot);
}

// Set up react-intl localization
// Load the locale data for all your defined locales
const messages = {
  en: null, // default
  fr: messagesFr,
};
const getMessages = locale => messages[locale];
// Set intl configuration
setIntlConfig({
  locales: ["en", "fr"],
  defaultLocale: "en",
  getMessages,
  textComponent: React.Fragment,
});
