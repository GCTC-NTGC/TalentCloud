/* eslint-disable @typescript-eslint/camelcase */
import moment from "moment";
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
          created_at: moment
            .utc("2019-05-06 14:47:29", "YYYY-M-D H:mm:ss")
            .toDate(),
          job_poster_id: 13,
          type: "UPDATE",
          criteria_id: 63,
          criteria_type_id: 1,
          skill_id: 77,
          skill_id_new: null,
          skill_level_id: 4,
          skill_level_id_new: 1,
          acknowledged: false,
        },
        2: {
          id: 2,
          created_at: moment
            .utc("2019-05-5 14:47:29", "YYYY-M-D H:mm:ss")
            .toDate(), // One day earlier
          job_poster_id: 13,
          type: "CREATE",
          criteria_id: 63,
          criteria_type_id: 1,
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
