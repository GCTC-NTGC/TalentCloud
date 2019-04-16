import React, { Dispatch } from "react";
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
import { getJob } from "../../store/Job/jobSelector";
import { fetchJob } from "../../store/Job/jobActions";

interface AssessmentPlanContainerProps {
  jobId: number;
}

// TODO: remove
const fakeData = (jobId: number): any => {
  const criteria = [
    {
      id: 1,
      criteria_type_id: 1,
      job_poster_id: jobId,
      skill_id: 1,
      skill_level_id: 1,
      description: "",
      skill: {
        id: 1,
        name: "HTML",
        description: "Working with html.",
        skill_type_id: 1,
      },
    },
    {
      id: 2,
      criteria_type_id: 1,
      job_poster_id: jobId,
      skill_id: 2,
      skill_level_id: 1,
      description: "",
      skill: {
        id: 2,
        name: "CSS",
        description: "Working with style sheets.",
        skill_type_id: 1,
      },
    },
  ];
  const assessments = [
    {
      id: 1,
      criterion_id: 1,
      assessment_type_id: 2,
    },
    {
      id: 1,
      criterion_id: 2,
      assessment_type_id: 2,
    },
  ];

  const questions = [
    {
      id: 1,
      job_poster_id: jobId,
      assessment_type_id: 2,
      question: "Prove however you want that you know this.",
    },
    {
      id: 2,
      job_poster_id: jobId,
      assessment_type_id: 2,
      question: "On second thought, show me your best work example.",
    },
  ];

  const answers = [
    {
      id: 1,
      rating_guide_question_id: 1,
      skill_id: 1,
      expected_answer: "My mastery is complete.",
    },
    {
      id: 2,
      rating_guide_question_id: 1,
      skill_id: 2,
      expected_answer: "My mastery is complete for this skill also.",
    },
  ];

  return { criteria, assessments, questions, answers };
};

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
  ...fakeData(ownProps.jobId),
  job: getJob(state, ownProps.jobId),
});

type DispatchType = Dispatch<AnyAction> & ThunkDispatch<any, any, AnyAction>;
const mapDispatchToProps = (
  dispatch: DispatchType,
  ownProps: AssessmentPlanContainerProps,
): any =>
  bindActionCreators(
    {
      fetchJob: (): ThunkAction<void, RootState, {}, AnyAction> =>
        fetchJob(ownProps.jobId),
    },
    dispatch,
  );

const AssessmentPlanContainer: React.FunctionComponent<
  AssessmentPlanContainerProps
> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssessmentPlan);

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
