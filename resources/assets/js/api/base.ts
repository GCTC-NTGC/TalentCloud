import dayjs from "dayjs";
import rootAxios from "axios";

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
