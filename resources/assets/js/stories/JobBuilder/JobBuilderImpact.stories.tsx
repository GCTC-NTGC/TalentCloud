import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { withKnobs, select } from "@storybook/addon-knobs";
import JobBuilderImpact from "../../components/JobBuilderImpact/JobBuilderImpact";
import ImpactForm from "../../components/JobBuilderImpact/ImpactForm";

const stories = storiesOf("Job Builder - Impact", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withIntl);

const deptOptions = {
  "Treasury Board": "treasuryBoard",
  "Natural Resources": "naturalResources",
  Transport: "transport",
  "Environment and Climate Change": "environmentAndClimateChange",
  "Employment and Social Development": "employmentAndSocialDevelopment",
  "Global Affairs": "globalAffairs",
  "Boarder Service Agency": "boarderServicesAgency",
  "Innovation and Science": "innovationScience",
  "Public Service Procurement": "publicServiceAndProcurement",
  "Department National Defence": "departmentNationalDefence",
  "Shared Services Canada": "sharedServicesCanada",
  "Health Canada": "healthCanada",
};

// const selectLang = ;

stories
  .add(
    "Job Builder Impact",
    (): React.ReactElement => (
      <JobBuilderImpact
        department={select("Department", deptOptions, "treasuryBoard")}
        job={null}
      />
    ),
    {
      info: { inline: true },
    },
  )
  .add(
    "Impact Form",
    (): React.ReactElement => (
      <ImpactForm job={null} handleSubmit={action("Submit")} />
    ),
    {
      info: { inline: true },
    },
  );
