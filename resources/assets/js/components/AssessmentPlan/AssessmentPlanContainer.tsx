import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators } from "redux";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { RSAAction } from "redux-api-middleware";
import AssessmentPlan from "./AssessmentPlan";
import { Job, Criteria, AssessmentPlanNotification } from "../../models/types";
import { RootState } from "../../store/store";
import { getJob, getCriteriaByJob } from "../../store/Job/jobSelector";
import { fetchJob } from "../../store/Job/jobActions";
import { fetchAssessmentPlan } from "../../store/AssessmentPlan/assessmentPlanActions";
import { fetchSkills } from "../../store/Skill/skillActions";
import { getUnreadNotificationsByJob } from "../../store/AssessmentPlanNotification/assessmentPlanNotificationSelectors";
import { fetchAssessmentPlanNotifications } from "../../store/AssessmentPlanNotification/assessmentPlanNotificationActions";

interface AssessmentPlanContainerProps {
  jobId: number;
}

const mapStateToProps = (
  state: RootState,
  ownProps: AssessmentPlanContainerProps,
): {
  job: Job | null;
  criteria: Criteria[];
  notifications: AssessmentPlanNotification[];
} => ({
  job: getJob(state, ownProps.jobId),
  criteria: getCriteriaByJob(state, ownProps.jobId),
  notifications: getUnreadNotificationsByJob(state, ownProps.jobId),
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
  notifications: AssessmentPlanNotification[];
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
  notifications,
  dispatchFetchJob,
  dispatchFetchAssessmentPlan,
  dispatchFetchSkills,
  dispatchFetchNotifications,
}): React.ReactElement => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect((): void => {
    dispatchFetchJob();
  }, [jobId]);
  useEffect((): void => {
    dispatchFetchAssessmentPlan();
  }, [jobId]);
  useEffect((): void => {
    dispatchFetchSkills();
  }, []);
  useEffect((): void => {
    dispatchFetchNotifications();
  }, []);
  return (
    <AssessmentPlan
      job={job}
      criteria={criteria}
      notifications={notifications}
    />
  );
};
// @ts-ignore
const AssessmentPlanContainer: React.FunctionComponent<
  AssessmentPlanContainerProps
> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssessmentPlanFetchContainer);

export default AssessmentPlanContainer;
