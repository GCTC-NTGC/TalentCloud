import moment from "moment";

export interface ResponseData {
  [key: string]: string & ResponseData & [ResponseData];
}
export interface ApiResponse {
  data: ResponseData;
}

export const baseUrl = (): string => {
  return `/api`;
};

export const parseDateStrict = (date: string): Date => moment(date).toDate();

export const parseDate = (date: string | null): Date | null => {
  return date !== null ? parseDateStrict(date) : null;
};

export default {
  baseUrl,
};
