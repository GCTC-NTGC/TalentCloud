import { combineReducers, Reducer } from "redux";
import { jobsReducer, JobState, initState as initJobs } from "./Job/jobReducer";
import assessmentReducer, {
  AssessmentState,
  initState as initAssessment,
} from "./Assessment/assessmentReducer";
import ratingGuideAnswerReducer, {
  RatingGuideAnswerState,
  initState as initRatingGuideAnswer,
} from "./RatingGuideAnswer/ratingGuideAnswerReducer";
import ratingGuideQuestionReducer, {
  RatingGuideQuestionState,
  initState as initRatingGuideQuestion,
} from "./RatingGuideQuestion/ratingGuideQuestionReducer";
import skillReducer, {
  SkillState,
  initState as initSkill,
} from "./Skill/skillReducer";
import assessmentPlanNotificationReducer, {
  AssessmentPlanNotificationState,
  initState as initAssessmentPlanNotification,
} from "./AssessmentPlanNotification/assessmentPlanNotificationReducer";

export interface RootState {
  jobs: JobState;
  assessment: AssessmentState;
  ratingGuideQuestion: RatingGuideQuestionState;
  ratingGuideAnswer: RatingGuideAnswerState;
  skill: SkillState;
  assessmentPlanNotification: AssessmentPlanNotificationState;
}

export const initState = (): RootState => ({
  jobs: initJobs(),
  assessment: initAssessment(),
  ratingGuideQuestion: initRatingGuideQuestion(),
  ratingGuideAnswer: initRatingGuideAnswer(),
  skill: initSkill(),
  assessmentPlanNotification: initAssessmentPlanNotification(),
});

export const rootReducer = (): Reducer<RootState> =>
  combineReducers({
    jobs: jobsReducer,
    assessment: assessmentReducer,
    ratingGuideQuestion: ratingGuideQuestionReducer,
    ratingGuideAnswer: ratingGuideAnswerReducer,
    skill: skillReducer,
    assessmentPlanNotification: assessmentPlanNotificationReducer,
  });

export default rootReducer;
