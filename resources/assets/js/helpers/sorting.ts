import { localizedField, localizedFieldNonNull } from "../models/app";
import { Locales, localizeFieldNonNull, localizeField } from "./localize";

/**
 * Wrapper function to be passed to Array.sort() for objects with
 * a "name" property of type localizedField or localizedFieldNonNull,
 * sorting alphabetically.
 *
 * @param locale
 */
// eslint-disable-next-line import/prefer-default-export
export function sortByLocalizedName(locale: Locales) {
  return (
    first: { name: localizedField | localizedFieldNonNull },
    second: { name: localizedField | localizedFieldNonNull },
  ): number => {
    let firstName: string | null | undefined;
    let secondName: string | null | undefined;

    if (first.name.en !== null && first.name.fr !== null) {
      firstName = localizeFieldNonNull(
        locale,
        first as { name: localizedFieldNonNull },
        "name",
      ).toLocaleUpperCase();
    } else {
      firstName = localizeField(locale, first, "name")?.toLocaleUpperCase();
    }

    if (second.name.en !== null && second.name.fr !== null) {
      secondName = localizeFieldNonNull(
        locale,
        second as { name: localizedFieldNonNull },
        "name",
      ).toLocaleUpperCase();
    } else {
      secondName = localizeField(locale, second, "name")?.toLocaleUpperCase();
    }

    if (
      firstName !== null &&
      firstName !== undefined &&
      secondName !== null &&
      secondName !== undefined
    ) {
      if (firstName < secondName) {
        return -1;
      }

      if (firstName > secondName) {
        return 1;
      }
    }

    return 0;
  };
}
