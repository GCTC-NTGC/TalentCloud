import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import "dayjs/locale/fr";
import { Locales } from "./localize";

dayjs.extend(LocalizedFormat)

export const readableDateTime = (locale: Locales, date: Date): string => {
  return dayjs(date).locale(locale).format("LLLL");
}
