/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import { ResponseData, baseUrl, ApiResponse, axiosConfig } from "./base";
import { Assessment } from "../models/types";

export const parseAssessment = (data: ResponseData): Assessment => ({
  id: Number(data.id),
  criterion_id: Number(data.criterion_id),
  assessment_type_id: Number(data.assessment_type_id),
});

export const updateAssessment = (
  assessment: Assessment,
): Promise<Assessment> => {
  return axios
    .put(`${baseUrl()}/assessments/${assessment.id}`, assessment, axiosConfig)
    .then(
      (response: ApiResponse): Assessment =>
        parseAssessment(response.data.assessment),
    );
};

export const createAssessment = (
  assessment: Assessment,
): Promise<Assessment> => {
  return axios
    .post(`${baseUrl()}/assessments`, assessment, axiosConfig)
    .then(
      (response: ApiResponse): Assessment =>
        parseAssessment(response.data.assessment),
    );
};

export const deleteAssessment = async (id: number): Promise<void> => {
  await axios.delete(`${baseUrl()}/assessments/${id}`, axiosConfig);
};
