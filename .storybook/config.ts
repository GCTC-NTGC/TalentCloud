import React from "react";
import { addParameters, configure, addDecorator } from "@storybook/react";
import { themes } from "@storybook/theming";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { setIntlConfig } from "storybook-addon-intl";
import messagesFr from "../resources/assets/js/translations/locales/fr.json";

addDecorator(withInfo({
  inline: true,
  header: false,
  source: false, // Source isn't displaying well with clone.
}));
addDecorator(withKnobs);

// Option defaults.
addParameters({
  options: {
    theme: themes.light,
  },
});

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
if (document.querySelector("#modal-root") === null) {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  modalRoot.setAttribute("data-clone", "");
  document.body.append(modalRoot);
}

// Set up react-intl localization
// Load the locale data for all your defined locales
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
    textComponent: React.Fragment,
});


function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
