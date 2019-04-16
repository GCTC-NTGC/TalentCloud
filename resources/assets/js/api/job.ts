import axios from "axios";
import { Job } from "../models/types";
import { baseUrl } from "./base";

export interface JobResponse {
  data: Job;
}

export const getJob = (id: number): Promise<JobResponse> => {
  return axios.get<Job>(`${baseUrl()}/jobs/${id}`);
};

export default { getJob };
