/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import { ResponseData, baseUrl, ApiResponse, parseDateStrict } from "./base";
import { AssessmentPlanNotification } from "../models/types";

export const parseAssessmentPlanNotification = (
  data: ResponseData,
): AssessmentPlanNotification => ({
  id: Number(data.id),
  job_poster_id: Number(data.job_poster_id),
  type: data.type,
  criteria_id: Number(data.criteria_id),
  criteria_type_id: Number(data.criteria_type_id),
  skill_id: Number(data.skill_id),
  skill_id_new: data.skill_id_new ? Number(data.skill_id_new) : null,
  skill_level_id: Number(data.skill_level_id),
  skill_level_id_new: data.skill_level_id_new
    ? Number(data.skill_level_id_new)
    : null,
  acknowledged: Boolean(data.acknowledged),
  created_at: parseDateStrict(data.created_at),
});

export const getAssessmentPlanNotificationsByJob = (
  jobId: number,
): Promise<AssessmentPlanNotification[]> => {
  return axios
    .get(`${baseUrl()}/assessment-plan-notifications?job_poster_id=${jobId}`)
    .then(
      (response: ApiResponse): AssessmentPlanNotification[] => {
        if (!Array.isArray(response.data)) {
          throw Error("Response must be an array.");
        }
        return response.data.map(parseAssessmentPlanNotification);
      },
    );
};

export const updateAssessmentPlanNotification = (
  notification: AssessmentPlanNotification,
): Promise<AssessmentPlanNotification> => {
  return axios
    .put(
      `${baseUrl()}/assessment-plan-notifications/${notification.id}`,
      notification,
    )
    .then(
      (response: ApiResponse): AssessmentPlanNotification =>
        parseAssessmentPlanNotification(
          response.data.assessment_plan_notification,
        ),
    );
};
