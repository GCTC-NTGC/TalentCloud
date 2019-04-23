import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators } from "redux";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import AssessmentPlan from "./AssessmentPlan";
import {
  Job,
  Criteria,
  Assessment,
  RatingsGuideQuestion,
  RatingsGuideAnswer,
} from "../../models/types";
import { RootState } from "../../store/store";
import { getJob, getCriteriaByJob } from "../../store/Job/jobSelector";
import { fetchJob } from "../../store/Job/jobActions";
import { getAssessmentsByJob } from "../../store/Assessment/assessmentSelector";
import { getRatingsGuideQuestionsByJob } from "../../store/RatingGuideQuestion/ratingGuideQuestionSelectors";
import { getRatingsGuideAnswersByJob } from "../../store/RatingGuideAnswer/ratingGuideAnswerSelectors";
import { fetchAssessmentPlan } from "../../store/AssessmentPlan/assessmentPlanActions";

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
  questions: RatingsGuideQuestion[];
  answers: RatingsGuideAnswer[];
} => ({
  job: getJob(state, ownProps.jobId),
  criteria: getCriteriaByJob(state, ownProps.jobId),
  assessments: getAssessmentsByJob(state, ownProps.jobId),
  questions: getRatingsGuideQuestionsByJob(state, ownProps.jobId),
  answers: getRatingsGuideAnswersByJob(state, ownProps.jobId),
});

type DispatchType = Dispatch<AnyAction> & ThunkDispatch<any, any, AnyAction>;
const mapDispatchToProps = (
  dispatch: DispatchType,
  ownProps: AssessmentPlanContainerProps,
): any =>
  bindActionCreators(
    {
      dispatchFetchJob: (): ThunkAction<void, RootState, {}, AnyAction> =>
        fetchJob(ownProps.jobId),
      dispatchFetchAssessmentPlan: (): ThunkAction<
        void,
        RootState,
        {},
        AnyAction
      > => fetchAssessmentPlan(ownProps.jobId),
    },
    dispatch,
  );

interface AssessmentPlanFetchContainerProps {
  jobId: number;
  job: Job | null;
  criteria: Criteria[];
  assessments: Assessment[];
  questions: RatingsGuideQuestion[];
  answers: RatingsGuideAnswer[];
  dispatchFetchJob: () => void;
  dispatchFetchAssessmentPlan: () => void;
}

const AssessmentPlanFetchContainer: React.FunctionComponent<
  AssessmentPlanFetchContainerProps
> = ({
  jobId,
  job,
  criteria,
  assessments,
  questions,
  answers,
  dispatchFetchJob,
  dispatchFetchAssessmentPlan,
}): React.ReactElement => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect((): void => dispatchFetchJob(), [jobId]);
  useEffect((): void => dispatchFetchAssessmentPlan(), [jobId]);
  return (
    <AssessmentPlan
      job={job}
      criteria={criteria}
      assessments={assessments}
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
