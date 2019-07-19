import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { text, boolean, number } from "@storybook/addon-knobs";
import JobPreview from "../../components/JobPreview";

const stories = storiesOf("Job Poster Builder|Preview", module).addDecorator(
  withIntl,
);

stories.add(
  "Sample",
  (): React.ReactElement => (
    <JobPreview
      title={text("Job Title", "Software Developer")}
      department={text("Hiring Department", "Computer Systems")}
      city={text("City", "Ottawa")}
      province={text("Province", "Ontario")}
      remoteWork={boolean("Remote Position", false)}
      language={text("Language", "English Essential")}
      termLength={number("Term in months", 6)}
      securityLevel={text("Security Level", "Reliability")}
      classification={text("Classification Code", "CS")}
      level={text("Position Level", "03")}
      flexHours={text("Sometimes")}
      education={text(
        "Education",
        "2 years post-secondary, or equivalent experience \n\n2 years post-secondary education: Successful completion of two years of post-secondary education in computer science, information technology, information management or another specialty relevant to this position; or",
      )}
    />
  ),
);
