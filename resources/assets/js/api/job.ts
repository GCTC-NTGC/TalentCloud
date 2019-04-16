import axios from "axios";
import { Job, JobTranslation } from "../models/types";
import { baseUrl } from "./base";

export interface JobResponse {
  data: any;
}
const parseJobTranslation = (data: any): JobTranslation => ({
  city: data.city,
  title: data.title,
  impact: data.impact,
  branch: data.branch,
  division: data.division,
  education: data.education,
});

const parseResponse = ({ data }: JobResponse): Job => {
  return {
    id: Number(data.id),
    title: data.title,
    classification: data.classification,
    close_date_time: new Date(data.close_date_time),
    en: parseJobTranslation(data.en),
    fr: parseJobTranslation(data.fr),
  };
};

export const getJob = (id: number): Promise<Job> => {
  return axios
    .get(`${baseUrl()}/jobs/${id}`)
    .then((jobResponse: JobResponse): Job => parseResponse(jobResponse));
};

export default { getJob };
