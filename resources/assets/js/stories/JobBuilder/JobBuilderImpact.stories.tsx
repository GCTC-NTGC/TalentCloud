import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import JobBuilderImpact from "../../components/JobBuilderImpact/JobBuilderImpact";
import ImpactForm from "../../components/JobBuilderImpact/ImpactForm";

const stories = storiesOf("Job Builder - Impact", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories
  .add("Job Builder Impact", (): React.ReactElement => <JobBuilderImpact />, {
    info: { inline: true },
  })
  .add("Impact Form", (): React.ReactElement => <ImpactForm />, {
    info: { inline: true },
  });
