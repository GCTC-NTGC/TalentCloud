import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import JobPreview from "../components/JobPreview";

const stories = storiesOf("JobPreview", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add(
  "Job builder preview",
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
    />
  ),
  { info: { inline: true } },
);
