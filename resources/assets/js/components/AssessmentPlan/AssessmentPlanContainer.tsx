import React from "react";
import ReactDOM from "react-dom";
import {
  IntlProvider,
  addLocaleData,
  injectIntl,
  InjectedIntlProps,
  defineMessages,
} from "react-intl";
import localeEn from "react-intl/locale-data/en";
import localeFr from "react-intl/locale-data/fr";
import messagesEn from "../../localizations/en.json";
import messagesFr from "../../localizations/fr.json";
import AssessmentPlan from "./AssessmentPlan";
import { Job } from "../types";
import { assessmentType } from "../localizedConstants.js";

interface AssessmentPlanContainerProps {
  jobId: number;
}

const AssessmentPlanContainer: React.FunctionComponent<
  AssessmentPlanContainerProps
> = ({ jobId }: AssessmentPlanContainerProps): React.ReactElement => {
  const job: Job = {
    id: jobId,
    title: "Fake Job Title",
    classification: "CS-02",
    close_date_time: new Date(),
  };

  const criteria = [
    {
      id: 1,
      criteria_type_id: 1,
      job_poster_id: 1,
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
      job_poster_id: 1,
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
      job_poster_id: 1,
      assessment_type_id: 2,
      question: "Prove however you want that you know this.",
    },
    {
      id: 2,
      job_poster_id: 1,
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
