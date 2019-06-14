import React from "react";
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
      <IntlContainer locale={select("Language", langOptions, "en")}>
        <JobBuilderImpact
          department={select("Department", deptOptions, "treasuryBoard")}
        />
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
