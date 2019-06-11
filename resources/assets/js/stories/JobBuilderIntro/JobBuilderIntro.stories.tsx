import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, select } from "@storybook/addon-knobs";
import IntlContainer from "../../IntlContainer";
import JobBuilderIntro from "../../components/JobBuilderIntro/JobBuilderIntro";

const stories = storiesOf("Job Builder - Intro", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

const langOptions = {
  English: "en",
  French: "fr",
};

// const selectLang = ;

stories.add(
  "Job Builder Body",
  (): React.ReactElement => (
    <IntlContainer locale={select("Language", langOptions, "en", "Lang-Group")}>
      <JobBuilderIntro />
    </IntlContainer>
  ),
  {
    info: { inline: true },
  },
);
