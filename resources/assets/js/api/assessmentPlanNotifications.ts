/* eslint-disable @typescript-eslint/camelcase */
import { baseUrl, ApiResponse, parseDateStrict, axios } from "./base";
import { AssessmentPlanNotification } from "../models/types";

export const parseAssessmentPlanNotification = (
  data: any,
): AssessmentPlanNotification => ({
  ...data,
  created_at: parseDateStrict(data.created_at),
});

export const getAssessmentPlanNotificationsByJob = (
  jobId: number,
): Promise<AssessmentPlanNotification[]> => {
  return axios
    .get(`${baseUrl()}/assessment-plan-notifications?job_poster_id=${jobId}`)
    .then((response: ApiResponse): AssessmentPlanNotification[] => {
      if (!Array.isArray(response.data)) {
        throw Error("Response must be an array.");
      }
      return response.data.map(parseAssessmentPlanNotification);
    });
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
