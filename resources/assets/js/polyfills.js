import "core-js"; // adds almost all polyfills

// Polyfills for missing browser API's (IE11 and Safari)
// https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md#migrate-to-using-native-intl-apis
if (!Intl.PluralRules) {
  require("@formatjs/intl-pluralrules/polyfill");
  require("@formatjs/intl-pluralrules/dist/locale-data/en");
  require("@formatjs/intl-pluralrules/dist/locale-data/fr");
}

if (!Intl.RelativeTimeFormat) {
  require("@formatjs/intl-relativetimeformat/polyfill");
  require("@formatjs/intl-relativetimeformat/dist/locale-data/en");
  require("@formatjs/intl-relativetimeformat/dist/locale-data/fr");
}

// Add a global fetch implementation
require("isomorphic-fetch");
