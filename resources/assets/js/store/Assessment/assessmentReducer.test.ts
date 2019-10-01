/* eslint-disable @typescript-eslint/camelcase */
import { Assessment } from "../../models/types";
import assessmentReducer, {
  initState as initAssessment,
  AssessmentState,
} from "./assessmentReducer";
import {
  updateAssessmentSucceeded,
  updateAssessmentStarted,
} from "./assessmentActions";

describe("Assessment Reducer tests", (): void => {
  describe("Update Assessment", () => {
    const fakeAssessment = (id: number): Assessment => ({
      id,
      criterion_id: id,
      assessment_type_id: 1,
    });
    test("A job should be still be updating if 2 updates have started and one has finished", () => {
      const state: AssessmentState = {
        ...initAssessment(),
        assessments: {
          1: fakeAssessment(1),
        },
      };
      const state2 = assessmentReducer(
        state,
        updateAssessmentStarted(fakeAssessment(1)),
      );
      const state3 = assessmentReducer(
        state2,
        updateAssessmentStarted(fakeAssessment(1)),
      );
      const state4 = assessmentReducer(
        state3,
        updateAssessmentSucceeded(fakeAssessment(1)),
      );
      expect(state4.assessmentUpdates[1]).toBeGreaterThan(0);
    });
  });
});
