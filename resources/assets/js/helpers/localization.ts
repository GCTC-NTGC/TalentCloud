export const localize = (
  field: { en: string; fr: string },
  locale: "en" | "fr",
): string => field[locale];

export default localize;
