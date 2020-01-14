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
import errorReducer, {
  ErrorState,
  initState as initErrors,
} from "./Error/errorReducer";
import { JobAction } from "./Job/jobActions";
import { AssessmentAction } from "./Assessment/assessmentActions";
import { RatingGuideQuestionAction } from "./RatingGuideQuestion/ratingGuideQuestionActions";
import { RatingGuideAnswerAction } from "./RatingGuideAnswer/ratingGuideAnswerActions";
import { SkillAction } from "./Skill/skillActions";
import { AssessmentPlanNotificationAction } from "./AssessmentPlanNotification/assessmentPlanNotificationActions";
import { AppErrorAction } from "./Error/errorActions";
import { DeptAction } from "./Department/deptActions";
import deptReducer, {
  DeptState,
  initDeptState,
} from "./Department/deptReducer";
import { ManagerAction } from "./Manager/managerActions";
import { UserAction } from "./User/userActions";
import {
  ManagerState,
  initManagerState,
  managerReducer,
} from "./Manager/managerReducer";
import { UserState, initUserState, userReducer } from "./User/userReducer";

export type AppAction =
  | JobAction
  | AssessmentAction
  | RatingGuideQuestionAction
  | RatingGuideAnswerAction
  | SkillAction
  | AssessmentPlanNotificationAction
  | AppErrorAction
  | DeptAction
  | ManagerAction
  | UserAction;

export interface RootState {
  jobs: JobState;
  assessment: AssessmentState;
  ratingGuideQuestion: RatingGuideQuestionState;
  ratingGuideAnswer: RatingGuideAnswerState;
  skill: SkillState;
  assessmentPlanNotification: AssessmentPlanNotificationState;
  error: ErrorState;
  department: DeptState;
  manager: ManagerState;
  user: UserState;
}

export const initState = (): RootState => ({
  jobs: initJobs(),
  assessment: initAssessment(),
  ratingGuideQuestion: initRatingGuideQuestion(),
  ratingGuideAnswer: initRatingGuideAnswer(),
  skill: initSkill(),
  assessmentPlanNotification: initAssessmentPlanNotification(),
  error: initErrors(),
  department: initDeptState(),
  manager: initManagerState(),
  user: initUserState(),
});

export const rootReducer = (): Reducer<RootState> =>
  combineReducers({
    jobs: jobsReducer,
    assessment: assessmentReducer,
    ratingGuideQuestion: ratingGuideQuestionReducer,
    ratingGuideAnswer: ratingGuideAnswerReducer,
    skill: skillReducer,
    assessmentPlanNotification: assessmentPlanNotificationReducer,
    error: errorReducer,
    department: deptReducer,
    manager: managerReducer,
    user: userReducer,
  });

export default rootReducer;
