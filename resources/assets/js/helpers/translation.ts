import { hasKey } from "./queries";
import { AppLocale } from "../models/types";

/**
 * Get the field value of a model, with the correct localization.
 * If the specified locale or field does not exist, or is null, returns fallback instead.
 * Fallback defaults to empty string.
 * @param model
 * @param locale
 * @param field
 * @param fallback
 */
export const getTranslatedField = <T>(
  model: Record<AppLocale, T>,
  locale: string,
  field: Extract<keyof T, string>,
  fallback: string = "",
): string => {
  return hasKey(model, locale) &&
    hasKey(model[locale], field) &&
    model[locale][field]
    ? String(model[locale][field])
    : fallback;
};

export default { getTranslatedField };
