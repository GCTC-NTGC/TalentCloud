import React from "react";
import ReactDOM from "react-dom";
import {
  IntlProvider,
  addLocaleData,
  injectIntl,
  InjectedIntlProps,
  defineMessages
} from "react-intl";
import locale_en from "react-intl/locale-data/en";
import locale_fr from "react-intl/locale-data/fr";
import messages_en from "../../localizations/en.json";
import messages_fr from "../../localizations/fr.json";
import AssessmentPlan from "./AssessmentPlan";
import { Job } from "../types";

interface AssessmentPlanContainerProps {
  job: Job;
}

const AssessmentPlanContainer: React.FunctionComponent<
  AssessmentPlanContainerProps
> = ({ job }: AssessmentPlanContainerProps): React.ReactElement => {
  return <AssessmentPlan job={job} criteria={[]} />;
};

addLocaleData([...locale_en, ...locale_fr]);
const messages = {
  en: messages_en,
  fr: messages_fr
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
