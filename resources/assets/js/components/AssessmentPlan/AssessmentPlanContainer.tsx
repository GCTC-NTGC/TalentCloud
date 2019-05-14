import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators } from "redux";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import AssessmentPlan from "./AssessmentPlan";
import {
  Job,
  Criteria,
  Assessment,
  RatingGuideQuestion,
  RatingGuideAnswer,
  AssessmentPlanNotification,
} from "../../models/types";
import { RootState } from "../../store/store";
import { getJob, getCriteriaByJob } from "../../store/Job/jobSelector";
import { fetchJob, JobAction } from "../../store/Job/jobActions";
import { getAssessmentsByJob } from "../../store/Assessment/assessmentSelector";
import { getRatingGuideQuestionsByJob } from "../../store/RatingGuideQuestion/ratingGuideQuestionSelectors";
import { getRatingGuideAnswersByJob } from "../../store/RatingGuideAnswer/ratingGuideAnswerSelectors";
import { fetchAssessmentPlan } from "../../store/AssessmentPlan/assessmentPlanActions";
import { fetchSkills } from "../../store/Skill/skillActions";
import { getUnreadNotificationsByJob } from "../../store/AssessmentPlanNotification/assessmentPlanNotificationSelectors";
import { fetchAssessmentPlanNotifications } from "../../store/AssessmentPlanNotification/assessmentPlanNotificationActions";
import { RSAAction } from "redux-api-middleware";

interface AssessmentPlanContainerProps {
  jobId: number;
}

const mapStateToProps = (
  state: RootState,
  ownProps: AssessmentPlanContainerProps,
): {
  job: Job | null;
  criteria: Criteria[];
  assessments: Assessment[];
  notifications: AssessmentPlanNotification[];
  questions: RatingGuideQuestion[];
  answers: RatingGuideAnswer[];
} => ({
  job: getJob(state, ownProps.jobId),
  criteria: getCriteriaByJob(state, ownProps.jobId),
  assessments: getAssessmentsByJob(state, ownProps.jobId),
  notifications: getUnreadNotificationsByJob(state, ownProps.jobId),
  questions: getRatingGuideQuestionsByJob(state, ownProps.jobId),
  answers: getRatingGuideAnswersByJob(state, ownProps.jobId),
});

type DispatchType = Dispatch<AnyAction> & ThunkDispatch<any, any, AnyAction>;
const mapDispatchToProps = (
  dispatch: DispatchType,
  ownProps: AssessmentPlanContainerProps,
): {
  dispatchFetchJob: () => void;
  dispatchFetchAssessmentPlan: () => void;
  dispatchFetchSkills: () => void;
  dispatchFetchNotifications: () => void;
} =>
  bindActionCreators(
    {
      dispatchFetchJob: (): RSAAction<any, any, any> =>
        fetchJob(ownProps.jobId),
      dispatchFetchAssessmentPlan: (): ThunkAction<
        void,
        RootState,
        {},
        AnyAction
      > => fetchAssessmentPlan(ownProps.jobId),
      dispatchFetchSkills: (): ThunkAction<void, RootState, {}, AnyAction> =>
        fetchSkills(),
      dispatchFetchNotifications: (): ThunkAction<
        void,
        RootState,
        {},
        AnyAction
      > => fetchAssessmentPlanNotifications(ownProps.jobId),
    },
    dispatch,
  );

interface AssessmentPlanFetchContainerProps {
  jobId: number;
  job: Job | null;
  criteria: Criteria[];
  assessments: Assessment[];
  notifications: AssessmentPlanNotification[];
  questions: RatingGuideQuestion[];
  answers: RatingGuideAnswer[];
  dispatchFetchJob: () => void;
  dispatchFetchAssessmentPlan: () => void;
  dispatchFetchSkills: () => void;
  dispatchFetchNotifications: () => void;
}

const AssessmentPlanFetchContainer: React.FunctionComponent<
  AssessmentPlanFetchContainerProps
> = ({
  jobId,
  job,
  criteria,
  assessments,
  notifications,
  questions,
  answers,
  dispatchFetchJob,
  dispatchFetchAssessmentPlan,
  dispatchFetchSkills,
  dispatchFetchNotifications,
}): React.ReactElement => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect((): void => dispatchFetchJob(), [jobId]);
  useEffect((): void => dispatchFetchAssessmentPlan(), [jobId]);
  useEffect((): void => dispatchFetchSkills(), []);
  useEffect((): void => dispatchFetchNotifications(), []);
  return (
    <AssessmentPlan
      job={job}
      criteria={criteria}
      assessments={assessments}
      notifications={notifications}
      questions={questions}
      answers={answers}
    />
  );
};

const AssessmentPlanContainer: React.FunctionComponent<
  AssessmentPlanContainerProps
> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssessmentPlanFetchContainer);

export default AssessmentPlanContainer;
