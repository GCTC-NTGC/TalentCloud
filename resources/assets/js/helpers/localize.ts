import { localizedField, localizedFieldNonNull } from "../models/app";

export type Locales = "en" | "fr";
type TranslatableKeysNonNull<T> = {
  [K in keyof T]: T[K] extends localizedFieldNonNull ? K : never;
}[keyof T];
type TranslatableKeys<T> = {
  [K in keyof T]: T[K] extends localizedField ? K : never;
}[keyof T];

export function localizeField<T>(
  locale: Locales,
  model: T,
  field: TranslatableKeys<T>,
): string | null {
  if (model[field] !== null) {
    return model[field][locale];
  }
  return null;
}
export function localizeFieldNonNull<T>(
  locale: Locales,
  model: T,
  field: TranslatableKeysNonNull<T>,
): string {
  // Even though we assume field is non-null... check anyway to avoid crashes.
  const value = model[field] ? model[field][locale] : null;
  if (value) {
    return value;
  }
  return locale === "en" ? "TRANSLATION MISSING" : "TRADUCTION MANQUANTE";
}

export function getLocale(locale: string): Locales {
  if (locale === "en" || locale === "fr") {
    return locale;
  }
  console.log("Warning: unknown locale. Defaulting to en.");
  return "en";
}

export function matchValueToModel<T>(
  locale: Locales,
  field: TranslatableKeys<T>,
  value: string,
  possibilities: T[],
): T | null {
  const matching = possibilities.filter(
    (model) => localizeField(locale, model, field) === value,
  );
  return matching.length > 0 ? matching[0] : null;
}

export function matchStringsCaseDiacriticInsensitive(
  needle: string,
  haystack: string[],
): string[] {
  return haystack.filter((name) => {
    return (
      name
        .normalize("NFD") // Normalizing to NFD Unicode normal form decomposes combined graphemes into the combination of simple ones.
        .replace(/[\u0300-\u036f]/g, "") // Using a regex character class to match the U+0300 → U+036F range, it is now trivial to globally get rid of the diacritics, which the Unicode standard conveniently groups as the Combining Diacritical Marks Unicode block.
        .search(new RegExp(needle, "i")) !== -1 ||
      name.search(new RegExp(needle, "i")) !== -1
    );
  });
}
