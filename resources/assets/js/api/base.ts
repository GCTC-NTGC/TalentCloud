import dayjs from "dayjs";
import rootAxios from "axios";
import { string } from "yup";

export interface ResponseData {
  [key: string]: string & ResponseData & [ResponseData];
}
export interface ApiResponse {
  data: ResponseData;
}

export const baseUrl = (): string => {
  return `/api`;
};

export const parseDateStrict = (date: string): Date => dayjs(date).toDate();

export const parseDate = (date: string | null): Date | null => {
  return date !== null ? parseDateStrict(date) : null;
};

export const addQueryParameters = (url: string, parameters: Map<string, string>): string => {
  const toKeyValuePairs = ([key, value]: string[]): string => encodeURI(key) + "=" + encodeURI(value);
  const parameterString = Array.from(parameters.entries()).map(toKeyValuePairs).join("&");
  return url + "?" + parameterString;
}

/**
 * Get the page's CSRF token, which laravel uses to validate requests.
 */
// TODO: is this the best way to get this?
const csrfElement = document.head.querySelector('meta[name="csrf-token"]');
const csrfToken: string =
  csrfElement && csrfElement.getAttribute("content")
    ? (csrfElement.getAttribute("content") as string)
    : "";
const axiosConfig = {
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "X-CSRF-TOKEN": csrfToken,
  },
};
export const axios = rootAxios.create(axiosConfig);

export default {
  baseUrl,
};
