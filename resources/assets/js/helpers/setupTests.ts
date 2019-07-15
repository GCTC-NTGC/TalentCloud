/**
 * Setup to run before any tests that require react-intl
 * support, see https://testing-library.com/docs/example-react-intl#configuring-react-intl-polyfills
 */
import IntlPolyfill from "intl";
import "intl/locale-data/jsonp/en";
import "intl/locale-data/jsonp/fr";

const setupTests = (): void => {
  // https://formatjs.io/guides/runtime-environments/#server
  if (global.Intl) {
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  } else {
    global.Intl = IntlPolyfill;
  }
};

setupTests();
