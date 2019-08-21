import * as React from "react";
import ReactDOM from "react-dom";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { JobWorkEnv } from "./JobBuilder/JobWorkEnv";
import IntlContainer from "../IntlContainer";

const extractSelectedEnvOptions = (workEnvOptions): string[] => {
  let selectedEnvOptions: string[] = [];
  Object.entries(workEnvOptions).filter(([key, value]): void => {
    if (value) {
      selectedEnvOptions = [key, ...selectedEnvOptions];
    }
  });

  return selectedEnvOptions;
};

interface WorkEnvRoot {
  teamSize: number;
  selectedEnvOptions: string[];
}

const WorkEnvFeaturesRoot: React.FunctionComponent<
  WorkEnvRoot & InjectedIntlProps
> = ({ intl, teamSize, selectedEnvOptions }): React.ReactElement => {
  return (
    <JobWorkEnv
      intl={intl}
      teamSize={teamSize}
      selectedEnvOptions={selectedEnvOptions}
    />
  );
};

if (document.getElementById("work-env-features-section")) {
  const container = document.getElementById("work-env-features-section");
  if (container != null) {
    const workEnvOptions = JSON.parse(container.dataset
      .workEnvOptions as string);
    const selectedEnvOptions = extractSelectedEnvOptions(workEnvOptions);
    const teamSize = JSON.parse(container.dataset.teamSize as string);
    const locale = document.documentElement.lang;
    const WorkEnvFeaturesRootIntl = injectIntl(WorkEnvFeaturesRoot);
    ReactDOM.render(
      <IntlContainer locale={locale}>
        <WorkEnvFeaturesRootIntl
          teamSize={teamSize}
          selectedEnvOptions={selectedEnvOptions}
        />
      </IntlContainer>,
      container,
    );
  }
}

export default injectIntl(WorkEnvFeaturesRoot);
