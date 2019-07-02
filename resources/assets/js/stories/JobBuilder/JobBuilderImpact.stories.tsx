import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { withKnobs, select } from "@storybook/addon-knobs";
import JobBuilderImpact from "../../components/JobBuilderImpact/JobBuilderImpact";
import ImpactForm from "../../components/JobBuilderImpact/ImpactForm";
import JobImpactPreview from "../../components/JobBuilderImpact/JobImpactPreview";

const stories = storiesOf("Job Builder - Impact", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withIntl);

const modalRoot = document.querySelector("#modal-root");

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

stories
  .add(
    "Job Builder Impact",
    (): React.ReactElement => (
      <JobBuilderImpact
        department={select("Department", deptOptions, "treasuryBoard")}
        job={null}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
        modalParent={modalRoot || document.body}
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
  )
  .add(
    "Impact Preview",
    (): React.ReactElement => (
      <JobImpactPreview deptImpact="" teamImpact="" hireImpact="" />
    ),
    {
      info: { inline: true },
    },
  );
