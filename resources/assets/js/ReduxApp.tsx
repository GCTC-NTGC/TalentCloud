import React from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import localeEn from "react-intl/locale-data/en";
import localeFr from "react-intl/locale-data/fr";
import messagesEn from "./localizations/en.json";
import messagesFr from "./localizations/fr.json";
import AssessmentPlanContainer from "./components/AssessmentPlan/AssessmentPlanContainer";

interface AssessmentPlanParams {
  jobId: string;
}

const AssessmentPlan: React.FunctionComponent<
  RouteComponentProps<AssessmentPlanParams>
> = ({ match }): React.ReactElement => (
  <AssessmentPlanContainer jobId={Number(match.params.jobId)} />
);

const ManagerPortal: React.FunctionComponent<RouteComponentProps> = ({
  match,
}): React.ReactElement => {
  return (
    <>
      <Route
        exact
        path={`${match.path}/jobs/:jobId/assessment-plan`}
        component={AssessmentPlan}
      />
    </>
  );
};

interface IntlParams {
  locale: "en" | "fr";
}

const IntlContainer: React.FunctionComponent<
  RouteComponentProps<IntlParams>
> = ({ match }): React.ReactElement => {
  addLocaleData([...localeEn, ...localeFr]);
  const messages = {
    en: messagesEn,
    fr: messagesFr,
  };
  const { locale } = match.params;
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Route path={`${match.path}/manager`} component={ManagerPortal} />
    </IntlProvider>
  );
};

const ReduxApp = (): React.ReactElement => (
  <Router>
    <Route path="/:locale(en|fr)" component={IntlContainer} />
  </Router>
);

export default ReduxApp;
