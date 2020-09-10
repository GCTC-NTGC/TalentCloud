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
import hrAdvisorReducer, {
  HrAdvisorState,
  initState as initHrAdvisorState,
} from "./HrAdvisor/hrAdvisorReducer";
import { JobPosterStatusAction } from "./JobPosterStatus/jobStatusActions";
import jobStatusReducer, {
  JobStatusState,
  initJobStatusState,
} from "./JobPosterStatus/jobStatusReducer";
import applicationReducer, {
  ApplicationState,
  initApplicationState,
} from "./Application/applicationReducer";
import experienceReducer, {
  initExperienceState,
  ExperienceState,
} from "./Experience/experienceReducer";
import awardRecipientTypeReducer, {
  initAwardRecipientTypeState,
  AwardRecipientTypeState,
} from "./AwardRecipientType/awardRecipientTypeReducer";
import awardRecognitionTypeReducer, {
  AwardRecognitionTypeState,
  initAwardRecognitionTypeState,
} from "./AwardRecognitionType/awardRecognitionTypeReducer";
import educationStatusReducer, {
  EducationStatusState,
  initEducationStatusState,
} from "./EducationStatus/educationStatusReducer";
import educationTypeReducer, {
  EducationTypeState,
  initEducationTypeState,
} from "./EducationType/educationTypeReducer";

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
  | UserAction
  | JobPosterStatusAction;

export interface RootState {
  jobs: JobState;
  assessment: AssessmentState;
  awardRecipientType: AwardRecipientTypeState;
  awardRecognitionType: AwardRecognitionTypeState;
  ratingGuideQuestion: RatingGuideQuestionState;
  ratingGuideAnswer: RatingGuideAnswerState;
  skill: SkillState;
  assessmentPlanNotification: AssessmentPlanNotificationState;
  educationStatus: EducationStatusState;
  educationType: EducationTypeState;
  error: ErrorState;
  department: DeptState;
  manager: ManagerState;
  users: UserState;
  hrAdvisor: HrAdvisorState;
  jobStatuses: JobStatusState;
  applications: ApplicationState;
  experience: ExperienceState;
}

export const initState = (): RootState => ({
  jobs: initJobs(),
  assessment: initAssessment(),
  awardRecipientType: initAwardRecipientTypeState(),
  awardRecognitionType: initAwardRecognitionTypeState(),
  ratingGuideQuestion: initRatingGuideQuestion(),
  ratingGuideAnswer: initRatingGuideAnswer(),
  skill: initSkill(),
  assessmentPlanNotification: initAssessmentPlanNotification(),
  educationStatus: initEducationStatusState(),
  educationType: initEducationTypeState(),
  error: initErrors(),
  department: initDeptState(),
  manager: initManagerState(),
  users: initUserState(),
  hrAdvisor: initHrAdvisorState(),
  jobStatuses: initJobStatusState(),
  applications: initApplicationState(),
  experience: initExperienceState(),
});

export const rootReducer = (): Reducer<RootState> =>
  combineReducers({
    jobs: jobsReducer,
    assessment: assessmentReducer,
    awardRecipientType: awardRecipientTypeReducer,
    awardRecognitionType: awardRecognitionTypeReducer,
    ratingGuideQuestion: ratingGuideQuestionReducer,
    ratingGuideAnswer: ratingGuideAnswerReducer,
    skill: skillReducer,
    assessmentPlanNotification: assessmentPlanNotificationReducer,
    educationStatus: educationStatusReducer,
    educationType: educationTypeReducer,
    error: errorReducer,
    department: deptReducer,
    manager: managerReducer,
    users: userReducer,
    hrAdvisor: hrAdvisorReducer,
    jobStatuses: jobStatusReducer,
    applications: applicationReducer,
    experience: experienceReducer,
  });

export default rootReducer;
