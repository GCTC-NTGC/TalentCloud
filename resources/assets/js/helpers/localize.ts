export type Locales = "en" | "fr";
type LocalizeableModel<T> = Record<Locales, T>;
type StringFields<T> = {
  [K in keyof T]: T[K] extends string | null ? K : never;
}[keyof T];

export function localizeField<T>(
  locale: Locales,
  model: LocalizeableModel<T>,
  field: StringFields<T>,
) {
  return model[locale][field];
}
