const manageTranslations = require("react-intl-translations-manager").default;

// import manageTranslations from "react-intl-translations-manager";

manageTranslations({
  messagesDirectory: "./resources/assets/js/translations/extractedMessages",
  translationsDirectory: "./resources/assets/js/translations/locales/",
  languages: ["fr"], // English is default, only fr translations are needed
  singleMessagesFile: true,
  jsonOptions: { space: 2, trailingNewline: true },
});
