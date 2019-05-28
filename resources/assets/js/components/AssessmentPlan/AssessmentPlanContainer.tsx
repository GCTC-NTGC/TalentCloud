import React, { useEffect } from "react";
import { connect } from "react-redux";
import AssessmentPlan from "./AssessmentPlan";
import {
  Job,
  Assessment,
  AssessmentPlanNotification,
} from "../../models/types";
import { RootState } from "../../store/store";
import { getJob } from "../../store/Job/jobSelector";
import { fetchJob } from "../../store/Job/jobActions";
import { getAssessmentsByJob } from "../../store/Assessment/assessmentSelector";
import { fetchAssessmentPlan } from "../../store/AssessmentPlan/assessmentPlanActions";
import { fetchSkills } from "../../store/Skill/skillActions";
import { getUnreadNotificationsByJob } from "../../store/AssessmentPlanNotification/assessmentPlanNotificationSelectors";
import { fetchAssessmentPlanNotifications } from "../../store/AssessmentPlanNotification/assessmentPlanNotificationActions";
import { DispatchType } from "../../configureStore";

interface AssessmentPlanContainerProps {
  jobId: number;
}

const mapStateToProps = (
  state: RootState,
  ownProps: AssessmentPlanContainerProps,
): {
  job: Job | null;
  assessments: Assessment[];
  notifications: AssessmentPlanNotification[];
} => ({
  job: getJob(state, ownProps.jobId),
  assessments: getAssessmentsByJob(state, ownProps.jobId),
  notifications: getUnreadNotificationsByJob(state, ownProps.jobId),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
  ownProps: AssessmentPlanContainerProps,
): {
  dispatchFetchJob: () => void;
  dispatchFetchAssessmentPlan: () => void;
  dispatchFetchSkills: () => void;
  dispatchFetchNotifications: () => void;
} => ({
  dispatchFetchJob: (): void => {
    dispatch(fetchJob(ownProps.jobId));
  },
  dispatchFetchAssessmentPlan: (): void =>
    dispatch(fetchAssessmentPlan(ownProps.jobId)),
  dispatchFetchSkills: (): void => dispatch(fetchSkills()),
  dispatchFetchNotifications: (): void =>
    dispatch(fetchAssessmentPlanNotifications(ownProps.jobId)),
});

interface AssessmentPlanFetchContainerProps {
  jobId: number;
  job: Job | null;
  assessments: Assessment[];
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
  assessments,
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
      assessments={assessments}
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
