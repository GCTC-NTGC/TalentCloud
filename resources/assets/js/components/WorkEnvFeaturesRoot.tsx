import * as React from "react";
import ReactDOM from "react-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";
import JobWorkEnv from "./JobBuilder/JobWorkEnv";
import IntlContainer from "../IntlContainer";

interface WorkEnvOptions {
  [key: string]: boolean;
}

const extractSelectedEnvOptions = (workEnvOptions: WorkEnvOptions): string[] =>
  Object.entries(workEnvOptions)
    .filter(([key, value]): boolean => value) // Filter out options set to false
    .map(([key, value]): string => key); // Map to a list of the keys

if (document.getElementById("work-env-features-section")) {
  const container = document.getElementById("work-env-features-section");
  if (container != null) {
    const workEnvOptions = JSON.parse(container.dataset
      .workEnvOptions as string);
    const selectedEnvOptions = extractSelectedEnvOptions(workEnvOptions);
    const teamSize = JSON.parse(container.dataset.teamSize as string);
    const locale = document.documentElement.lang;
    ReactDOM.render(
      <IntlContainer locale={locale}>
        <JobWorkEnv
          teamSize={teamSize}
          selectedEnvOptions={selectedEnvOptions}
        />
      </IntlContainer>,
      container,
    );
  }
}
