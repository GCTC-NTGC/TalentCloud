import React, { Dispatch, useEffect } from "react";
import ReactDOM from "react-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import localeEn from "react-intl/locale-data/en";
import localeFr from "react-intl/locale-data/fr";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators } from "redux";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import messagesEn from "../../localizations/en.json";
import messagesFr from "../../localizations/fr.json";
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
import {
  getAssessmentsByJob,
  getRatingsGuideQuestionsByJob,
  getRatingsGuideAnswersByJob,
} from "../../store/Assessment/assessmentSelector";
import { fetchAssessmentPlan } from "../../store/Assessment/assessmentActions";

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

addLocaleData([...localeEn, ...localeFr]);
const messages = {
  en: messagesEn,
  fr: messagesFr,
};

if (document.getElementById("assessment-plan-container")) {
  const container = document.getElementById(
    "assessment-plan-container",
  ) as HTMLElement;
  if (
    container.hasAttribute("data-job") &&
    container.hasAttribute("data-locale")
  ) {
    const job = JSON.parse(container.getAttribute("data-job") as string);
    const language = container.getAttribute("data-locale") as string;
    ReactDOM.render(
      <IntlProvider locale={language} messages={messages[language]}>
        <AssessmentPlanContainer jobId={job.id} />
      </IntlProvider>,
      container,
    );
  }
}

export default AssessmentPlanContainer;
