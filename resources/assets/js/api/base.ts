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

export const parseDate = (date: string): Date => moment(date).toDate();

export default {
  baseUrl,
};
