/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import { useRoutes } from "hookrouter";
import ReactDOM from "react-dom";
import JobBuilderIntroPageContainer from "../JobBuilderIntro/JobBuilderIntro";
import RootContainer from "../RootContainer";
import JobDetailsPage from "../JobDetails/JobDetailsPage";

const routes = {
  "/builder": () => <JobBuilderIntroPageContainer jobId={null} />,
  "/:id/builder/intro": ({ id }) => (
    <JobBuilderIntroPageContainer jobId={Number(id)} />
  ),
  "/:id/builder/details": ({ id }) => <JobDetailsPage jobId={Number(id)} />,
  "/:id/builder/environment": ({ id }) => (
    <JobBuilderIntroPageContainer jobId={id} />
  ),
  "/:id/builder/impact": ({ id }) => (
    <JobBuilderIntroPageContainer jobId={id} />
  ),
  "/:id/builder/tasks": ({ id }) => <JobBuilderIntroPageContainer jobId={id} />,
  "/:id/builder/skills": ({ id }) => (
    <JobBuilderIntroPageContainer jobId={id} />
  ),
  "/:id/builder/review": ({ id }) => (
    <JobBuilderIntroPageContainer jobId={id} />
  ),
};

const JobBuilderRoot = (): React.ReactElement | null => {
  const match = useRoutes(routes);
  return match;
};

const baseRoutes = {
  "/:locale/manager/jobs*": (): React.ReactElement => <JobBuilderRoot />,
};

const AppRoot = (): React.ReactElement | null => {
  const match = useRoutes(baseRoutes);
  return <RootContainer>{match}</RootContainer>;
};

if (document.getElementById("job-builder-root")) {
  const root = document.getElementById("job-builder-root");
  ReactDOM.render(<AppRoot />, root);
}
