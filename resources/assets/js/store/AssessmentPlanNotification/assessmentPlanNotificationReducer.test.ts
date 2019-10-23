/* eslint-disable @typescript-eslint/camelcase */
import dayjs from "dayjs";
import { AssessmentPlanNotification } from "../../models/types";
import { sortNotifications } from "./assessmentPlanNotificationReducer";

describe("Assessment Plan Notification Reducer tests", (): void => {
  describe("Sort Notifications", (): void => {
    test("Notifications should be sorted by create date", (): void => {
      const notificationsById: {
        [id: number]: AssessmentPlanNotification;
      } = {
        1: {
          id: 1,
          created_at: dayjs("2019-05-06T14:47:29+00:00").toDate(),
          job_poster_id: 13,
          type: "UPDATE",
          criteria_id: 63,
          criteria_type_id: 1,
          criteria_type_id_new: null,
          skill_id: 77,
          skill_id_new: null,
          skill_level_id: 4,
          skill_level_id_new: 1,
          acknowledged: false,
        },
        2: {
          id: 2,
          created_at: dayjs("2019-05-05T14:47:29+00:00").toDate(), // One day earlier
          job_poster_id: 13,
          type: "CREATE",
          criteria_id: 63,
          criteria_type_id: 1,
          criteria_type_id_new: null,
          skill_id: 77,
          skill_id_new: null,
          skill_level_id: 4,
          skill_level_id_new: 1,
          acknowledged: false,
        },
      };
      expect(sortNotifications(notificationsById)).toEqual([2, 1]);
    });
  });
});
