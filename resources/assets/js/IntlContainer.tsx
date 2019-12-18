import React from "react";
import { IntlProvider } from "react-intl";
import messagesFr from "./translations/locales/fr.json";

const messages = {
  en: {}, // default
  fr: messagesFr,
};

interface IntlContainerProps {
  locale: "en"|"fr";
}

const IntlContainer: React.FunctionComponent<IntlContainerProps> = ({
  locale,
  children,
}): React.ReactElement => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    {children}
  </IntlProvider>
);

export default IntlContainer;
