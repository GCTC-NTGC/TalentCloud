import React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean, number } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import JobCard from "../components/JobCard";
import { jobPosterStatuses } from "../components/HRPortal/fixtures";

const stories = storiesOf("Components/Job Card", module).addDecorator(withIntl);

stories
  .add(
    "Draft",
    (): React.ReactElement => {
      const applicants = number("Number of Applicants", 5);
      return (
        <div data-c-container="large" data-c-padding="tb(triple)">
          <JobCard
            id={1}
            activity={{
              count: number("Activity Count", 3),
              new: {
                url: text("Activity Link", "https://google.ca"),
                text: text("Activity Text", "New Activity"),
                title: "Click here to see new activity on this posting.",
              },
            }}
            applicants={{
              url: applicants > 0 ? "https://google.ca" : "",
              text: `${applicants} Applicants`,
              title: "",
            }}
            classification={text("Classification", "CS01")}
            draft={{
              url: text("Draft Link", "https://google.ca"),
              text: text("Draft Text", "View Draft"),
              title: "View this draft Job Poster.",
            }}
            managerTime={number("Time with Manager", 8)}
            owned={boolean("Owned", true)}
            preview={{
              url: text("Preview Link", "https://google.ca"),
              text: text("Preview Text", "Preview Poster"),
              title: "Preview what this Job Poster will look like.",
            }}
            screeningPlan={{
              url: text("Screening Plan Link", "https://google.ca"),
              text: text("Screening Plan Text", "View Screening Plan"),
              title: "View the screening plan for this Job Poster.",
            }}
            status={jobPosterStatuses.Draft}
            summary={{
              url: text("Summary Link", "https://google.ca"),
              text: text("Summary Text", "Visit Job Summary"),
              title: "View the Job Summary for this Job Poster.",
            }}
            title={text("Job Title", "Front-end Developer")}
            userTime={number("Time with User", 2)}
          />
        </div>
      );
    },
  )
  .add(
    "Live",
    (): React.ReactElement => {
      const applicants = number("Number of Applicants", 5);
      return (
        <div data-c-container="large" data-c-padding="tb(triple)">
          <JobCard
            id={2}
            activity={{
              count: number("Activity Count", 0),
              new: {
                url: text("Activity Link", "https://google.ca"),
                text: text("Activity Text", "New Activity"),
                title: "Click here to see new activity on this posting.",
              },
            }}
            applicants={{
              url: applicants > 0 ? "https://google.ca" : "",
              text: `${applicants} Applicants`,
              title: "",
            }}
            classification={text("Classification", "CS01")}
            draft={{
              url: "",
              text: text("Draft Text", "View Draft"),
              title: "View this draft Job Poster.",
            }}
            managerTime={number("Time with Manager", 8)}
            owned={boolean("Owned", false)}
            preview={{
              url: text("Preview Link", "https://google.ca"),
              text: text("Preview Text", "View Poster"),
              title: "View the published Job Poster.",
            }}
            screeningPlan={{
              url: text("Screening Plan Link", "https://google.ca"),
              text: text("Screening Plan Text", "View Screening Plan"),
              title: "View the screening plan for this Job Poster.",
            }}
            status={jobPosterStatuses.Live}
            summary={{
              url: text("Summary Link", "https://google.ca"),
              text: text("Summary Text", "Visit Job Summary"),
              title: "View the Job Summary for this Job Poster.",
            }}
            title={text("Job Title", "Front-end Developer")}
            userTime={number("Time with User", 2)}
          />
        </div>
      );
    },
  );
