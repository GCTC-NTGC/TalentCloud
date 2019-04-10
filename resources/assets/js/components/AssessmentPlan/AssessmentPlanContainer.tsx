import React from "react";
import ReactDOM from "react-dom";
import {
  IntlProvider,
  addLocaleData,
  injectIntl,
  InjectedIntlProps,
  defineMessages
} from "react-intl";
import localeEn from "react-intl/locale-data/en";
import localeFr from "react-intl/locale-data/fr";
import messagesEn from "../../localizations/en.json";
import messagesFr from "../../localizations/fr.json";
import AssessmentPlan from "./AssessmentPlan";
import { Job } from "../types";
import { assessmentType } from "../localizedConstants.js";

interface AssessmentPlanContainerProps {
  job: Job;
}

const AssessmentPlanContainer: React.FunctionComponent<
  AssessmentPlanContainerProps
> = ({ job }: AssessmentPlanContainerProps): React.ReactElement => {
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
        skill_type_id: 1
      }
    }
  ];
  const assessments = [
    {
      id: 1,
      criterion_id: 1,
      assessment_type_id: 2
    }
  ];

  return (
    <AssessmentPlan job={job} criteria={criteria} assessments={assessments} />
  );
};

addLocaleData([...localeEn, ...localeFr]);
const messages = {
  en: messagesEn,
  fr: messagesFr
};

if (document.getElementById("assessment-plan-container")) {
  const container = document.getElementById(
    "assessment-plan-container"
  ) as HTMLElement;
  if (
    container.hasAttribute("data-job") &&
    container.hasAttribute("data-locale")
  ) {
    const job = JSON.parse(container.getAttribute("data-job") as string);
    const language = container.getAttribute("data-locale") as string;
    ReactDOM.render(
      <IntlProvider locale={language} messages={messages[language]}>
        <AssessmentPlanContainer job={job} />
      </IntlProvider>,
      container
    );
  }
}

export default AssessmentPlanContainer;
