import React from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import AssessmentPlanContainer from "./components/AssessmentPlan/AssessmentPlanContainer";
import IntlContainer from "./IntlContainer";
import JobDetailsContainer from "./components/JobDetails/JobDetails";

interface AssessmentPlanParams {
  jobId: string;
}

const AssessmentPlan: React.FunctionComponent<
  RouteComponentProps<AssessmentPlanParams>
> = ({ match }): React.ReactElement => (
  <AssessmentPlanContainer jobId={Number(match.params.jobId)} />
);

const JobDetailsRoute: React.FunctionComponent<
  RouteComponentProps<{ jobId: string }>
> = ({ match }): React.ReactElement => (
  <JobDetailsContainer jobId={Number(match.params.jobId)} />
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
      <Route
        exact
        path={`${match.path}/jobs/builder/details`}
        component={JobDetailsContainer}
      />
      <Route
        exact
        path={`${match.path}/jobs/:jobId/builder/details`}
        component={JobDetailsRoute}
      />
    </>
  );
};

interface IntlParams {
  locale: "en" | "fr";
}

const IntlRouteContainer: React.FunctionComponent<
  RouteComponentProps<IntlParams>
> = ({ match }): React.ReactElement => {
  const { locale } = match.params;
  return (
    <IntlContainer locale={locale}>
      <Route path={`${match.path}/manager`} component={ManagerPortal} />
    </IntlContainer>
  );
};

const ReduxApp = (): React.ReactElement => (
  <Router>
    <Route path="/:locale(en|fr)" component={IntlRouteContainer} />
  </Router>
);

export default ReduxApp;
