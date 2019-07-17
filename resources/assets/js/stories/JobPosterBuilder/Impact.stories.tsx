/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { select, text } from "@storybook/addon-knobs";
import JobBuilderImpact from "../../components/JobBuilderImpact/JobBuilderImpact";
import JobImpactPreview from "../../components/JobBuilderImpact/JobImpactPreview";
import fakeDepartments from "../../fakeData/fakeDepartments";
import fakeJob from "../../fakeData/fakeJob";

const stories = storiesOf("Job Poster Builder|Impact", module).addDecorator(
  withIntl,
);

const handleSubmit = async (): Promise<boolean> => {
  action("Submitted")();
  return true;
};

const deptOptions = {
  "Treasury Board": 1,
  "Natural Resources": 2,
};

stories
  .add(
    "New Job",
    (): React.ReactElement => (
      <JobBuilderImpact
        departments={fakeDepartments()}
        job={null}
        handleSubmit={handleSubmit}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
      />
    ),
  )
  .add(
    "Existing Job",
    (): React.ReactElement => (
      <JobBuilderImpact
        departments={fakeDepartments()}
        job={{
          ...fakeJob(),
          department_id: select("Department", deptOptions, 1),
        }}
        handleSubmit={handleSubmit}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
      />
    ),
  )
  .add(
    "Departments Loading",
    (): React.ReactElement => (
      <JobBuilderImpact
        departments={[]}
        job={fakeJob()}
        handleSubmit={handleSubmit}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
      />
    ),
  )
  .add(
    "Unknown Department",
    (): React.ReactElement => (
      <JobBuilderImpact
        departments={fakeDepartments()}
        job={{
          ...fakeJob(),
          department_id: 100,
        }}
        handleSubmit={handleSubmit}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
      />
    ),
  )
  .add(
    "Preview",
    (): React.ReactElement => (
      <JobImpactPreview
        deptImpact={text(
          "Department Impact",
          "The Navigable Waters Act Renewal team is responsible for the implementation of the electronic system related to the Canadian Navigable Waters Act (CNWA). This work will help the Government of Canada to modernize environment and regulatory processes and introduce new processes that properly serve the public.",
        )}
        teamImpact={text(
          "Team Impact",
          "Canada’s large network of navigable waters must remain open for Canadians to use. Protecting the public right of navigation is an important element of the new environmental and regulatory system in which good projects go ahead sustainably, with certainty and timely decisions, creating shared value and benefit for Canadians. The Navigable Waters Act Renewal (NWAR) team will play a key part in helping achieve this goal.",
        )}
        hireImpact={text(
          "Hire Impact",
          "As a member of a dynamic SCRUM team you’ll be responsible for implementing a new online public registry so Canadians can access information on proposed projects in their communities. You’ll also participate in the implementation of an internal system to manage the proposed work and will collaborate with other agencies involved in the CNWA.",
        )}
      />
    ),
  );
