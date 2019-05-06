import React from "react";
import { IntlProvider, addLocaleData } from "react-intl";
import localeEn from "react-intl/locale-data/en";
import localeFr from "react-intl/locale-data/fr";
import messagesFr from "./translations/locales/fr.json";

addLocaleData([...localeEn, ...localeFr]);

const messages = {
  en: null, // default
  fr: messagesFr,
};

interface IntlContainerProps {
  locale: "en" | "fr";
}

const IntlContainer: React.FunctionComponent<IntlContainerProps> = ({
  locale,
  children,
}): React.ReactElement => (
  <IntlProvider
    textComponent={React.Fragment}
    locale={locale}
    messages={messages[locale]}
  >
    {children}
  </IntlProvider>
);

export default IntlContainer;
