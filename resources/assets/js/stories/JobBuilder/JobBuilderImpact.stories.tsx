import React from "react";
import { IntlProvider } from "react-intl";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, select } from "@storybook/addon-knobs";
import IntlContainer from "../../IntlContainer";
import JobBuilderImpact from "../../components/JobBuilderImpact/JobBuilderImpact";
import ImpactForm from "../../components/JobBuilderImpact/ImpactForm";

const stories = storiesOf("Job Builder - Impact", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

const langOptions = {
  English: "en",
  French: "fr",
};

// const selectLang = ;

stories
  .add(
    "Job Builder Impact",
    (): React.ReactElement => (
      <IntlContainer
        locale={select("Language", langOptions, "en", "Lang-Group")}
      >
        <JobBuilderImpact />
      </IntlContainer>
    ),
    {
      info: { inline: true },
    },
  )
  .add(
    "Impact Form",
    (): React.ReactElement => (
      <IntlContainer
        locale={select("Language", langOptions, "en", "Lang-Group2")}
      >
        <ImpactForm />
      </IntlContainer>
    ),
    {
      info: { inline: true },
    },
  );
