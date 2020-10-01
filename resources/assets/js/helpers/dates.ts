import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/fr";
import { Locales } from "./localize";

// dayjs() relativeTime API plugin configuration https://day.js.org/docs/en/display/from-now.
const relativeTimeConfig = {
  thresholds: [
    { l: "s", r: 1 },
    { l: "ss", r: 59, d: "second" },
    { l: "m", r: 1 },
    { l: "mm", r: 59, d: "minute" },
    { l: "h", r: 1 },
    { l: "hh", r: 23, d: "hour" },
    { l: "d", r: 1 },
    { l: "dd", r: 29, d: "day" },
    { l: "M", r: 1 },
    { l: "MM", r: 11, d: "month" },
    { l: "y" },
    { l: "yy", d: "year" },
  ],
  rounding: Math.floor,
};

dayjs.extend(LocalizedFormat);
dayjs.extend(relativeTime, relativeTimeConfig);
dayjs.extend(utc);

export const readableDateTime = (locale: Locales, date: Date): string => {
  return dayjs(date).locale(locale).format("LLLL");
};
export const readableDate = (locale: Locales, date: Date): string => {
  return dayjs(date).locale(locale).format("LL");
};

export const readableTimeFromNow = (locale: Locales, date: Date): string => {
  return dayjs(date).utc().locale(locale).fromNow();
};

export const toInputDateString = (date: Date): string => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const fromInputDateString = (dateStr: string): Date => {
  return dayjs(dateStr).toDate();
};
