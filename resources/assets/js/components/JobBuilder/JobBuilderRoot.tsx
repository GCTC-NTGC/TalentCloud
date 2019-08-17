/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "universal-router";
import { useRouter } from "../../helpers/router";
import JobBuilderIntroPageContainer from "../JobBuilderIntro/JobBuilderIntro";
import RootContainer from "../RootContainer";
import JobDetailsPage from "../JobDetails/JobDetailsPage";

const routes: Routes<any, React.ReactElement> = [
  {
    path: "/:locale/manager/jobs",
    children: [
      {
        path: "/builder",
        action: () => <JobBuilderIntroPageContainer jobId={null} />,
      },
      {
        path: "/:id/builder/intro",
        action: ({ params }) => (
          <JobBuilderIntroPageContainer jobId={Number(params.id)} />
        ),
      },
      {
        path: "/:id/builder/details",
        action: ({ params }) => <JobDetailsPage jobId={Number(params.id)} />,
      },
    ],
  },
];

// {
//   "/builder": () => <JobBuilderIntroPageContainer jobId={null} />,
//   "/:id/builder/intro": ({ id }) => (
//     <JobBuilderIntroPageContainer jobId={Number(id)} />
//   ),
//   "/:id/builder/details": ({ id }) => <JobDetailsPage jobId={Number(id)} />,
//   "/:id/builder/environment": ({ id }) => (
//     <JobBuilderIntroPageContainer jobId={id} />
//   ),
//   "/:id/builder/impact": ({ id }) => (
//     <JobBuilderIntroPageContainer jobId={id} />
//   ),
//   "/:id/builder/tasks": ({ id }) => <JobBuilderIntroPageContainer jobId={id} />,
//   "/:id/builder/skills": ({ id }) => (
//     <JobBuilderIntroPageContainer jobId={id} />
//   ),
//   "/:id/builder/review": ({ id }) => (
//     <JobBuilderIntroPageContainer jobId={id} />
//   ),
// };

const JobBuilderRoot = (): React.ReactElement | null => {
  const match = useRouter(routes);
  return <RootContainer>{match}</RootContainer>;
};

if (document.getElementById("job-builder-root")) {
  const root = document.getElementById("job-builder-root");
  ReactDOM.render(<JobBuilderRoot />, root);
}
