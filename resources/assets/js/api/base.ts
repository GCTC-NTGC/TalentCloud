import moment = require("moment");

export interface ResponseData {
  [key: string]: string & ResponseData & [ResponseData];
}
export interface ApiResponse {
  data: ResponseData;
}

export const baseUrl = (): string => {
  return `/api`;
};

export const parseDate = (date: string): Date =>
  moment.utc(date, "YYYY-M-D H:mm:ss").toDate();

export default {
  baseUrl,
};
