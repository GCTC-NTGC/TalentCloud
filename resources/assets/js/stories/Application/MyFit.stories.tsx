/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import MyFit from "../../components/Application/MyFit/MyFit";
import { fakeJobQuestions } from "../../fakeData/fakeJob";
import { JobApplicationAnswer } from "../../models/types";

const stories = storiesOf("Application|My Fit", module).addDecorator(withIntl);

const fakeJobApplicationAnswers: JobApplicationAnswer[] = [
  {
    id: 1,
    job_application_id: 1,
    job_poster_questions_id: 1,
    answer: {
      en: "",
      fr: "",
    },
  },
  {
    id: 2,
    job_application_id: 1,
    job_poster_questions_id: 2,
    answer: {
      en: "",
      fr: "",
    },
  },
  {
    id: 3,
    job_application_id: 1,
    job_poster_questions_id: 3,
    answer: {
      en: "",
      fr: "",
    },
  },
];

stories.add(
  "My Fit",
  (): React.ReactElement => (
    <MyFit
      jobQuestions={fakeJobQuestions()}
      appAnswers={fakeJobApplicationAnswers}
      handleSubmit={async (x) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        action("Confirmed")(x);
      }}
    />
  ),
);
