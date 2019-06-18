import { configure } from "@storybook/react";
import { addLocaleData } from "react-intl";
import { setIntlConfig } from "storybook-addon-intl";
import localeEn from "react-intl/locale-data/en";
import localeFr from "react-intl/locale-data/fr";
import messagesFr from "../resources/assets/js/translations/locales/fr.json";

// automatically import all files ending in *.stories.tsx
const req = require.context(
  "../resources/assets/js/stories",
  true,
  /\.stories\.tsx$/
);

// Create a parent element for modals.
// Modals use the createPortal function, which needs a dom node passed in as a parent.
// That node needs to exist before the story file runs.
// See for explanation: https://github.com/storybookjs/storybook/issues/4604
// TODO: find better workaround
const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
modalRoot.setAttribute("data-clone", "");
document.body.append(modalRoot);

// Set up react-intl localization
// Load the locale data for all your defined locales
addLocaleData([...localeEn, ...localeFr]);
const messages = {
  en: null, // default
  fr: messagesFr,
};
const getMessages = (locale) => messages[locale];
// Set intl configuration
setIntlConfig({
    locales: ["en", "fr"],
    defaultLocale: "en",
    getMessages,
});


function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
