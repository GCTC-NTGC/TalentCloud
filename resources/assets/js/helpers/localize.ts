import { localizedField } from "../models/app";

export type Locales = "en" | "fr";
type LocalizedFields<T> = {
  [K in keyof T]: T[K] extends localizedField ? K : never;
}[keyof T];

export function localizeField<T>(
  locale: Locales,
  model: T,
  field: LocalizedFields<T>,
) {
  return model[field][locale];
}

export function getLocale(locale: string): Locales {
  if (locale === "en" || locale === "fr") {
    return locale;
  }
  console.log("Warning: unknown locale. Defaulting to en.");
  return "en";
}
