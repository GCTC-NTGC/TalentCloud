import React from "react";
import {
  defineMessages,
  FormattedMessage,
  IntlShape,
  MessageDescriptor,
  useIntl,
} from "react-intl";
import { formMessages } from "./JobWorkEnvMessages";

export const physEnvMessages = defineMessages({
  openConcept: {
    id: "jobBuilder.workEnv.physEnv.openConcept",
    defaultMessage: "Open Concept",
    description: "Physical Environment checkbox group 'open concept' option.",
  },
  private: {
    id: "jobBuilder.workEnv.physEnv.private",
    defaultMessage: "Private",
    description: "Physical Environment checkbox group 'private' option.",
  },
  assignedSeating: {
    id: "jobBuilder.workEnv.physEnv.assignedSeating",
    defaultMessage: "Assigned Seating",
    description:
      "Physical Environment checkbox group 'assigned seating' option.",
  },
  windows: {
    id: "jobBuilder.workEnv.physEnv.windows",
    defaultMessage: "Lots of Windows",
    description: "Physical Environment checkbox group 'windows' option.",
  },
  naturalLight: {
    id: "jobBuilder.workEnv.physEnv.naturalLight",
    defaultMessage: "Natural Light",
    description: "Physical Environment checkbox group 'natural light' option.",
  },
  smudging: {
    id: "jobBuilder.workEnv.physEnv.smudging",
    defaultMessage: "Suitable for Smudging",
    description:
      "Physical Environment checkbox group 'suitable for smudging' option.",
  },
});

export const physEnvOptions: string[] = [
  "openConcept",
  "private",
  "assignedSeating",
  "windows",
  "naturalLight",
  "smudging",
];

export const techMessages = defineMessages({
  videoConferencing: {
    id: "jobBuilder.workEnv.technology.videoConferencing",
    defaultMessage: "Video Conferencing (e.g. Skype, Zoom)",
    description: "Technology checkbox group 'video conferencing' option.",
  },
  collaboration: {
    id: "jobBuilder.workEnv.technology.collaboration",
    defaultMessage: "Collaboration (e.g. Slack, Hangouts)",
    description: "Technology checkbox group 'collaboration' option.",
  },
  fileSharing: {
    id: "jobBuilder.workEnv.technology.fileSharing",
    defaultMessage: "File Sharing (e.g. Google Drive, Dropbox)",
    description: "Technology checkbox group 'file sharing' option.",
  },
  taskManagement: {
    id: "jobBuilder.workEnv.technology.taskManagement",
    defaultMessage: "Task Management (e.g. Trello, Asana)",
    description: "Technology checkbox group 'task management' option.",
  },
  versionControl: {
    id: "jobBuilder.workEnv.technology.versionControl",
    defaultMessage: "Version Control (e.g. Github, Gitlab)",
    description: "Technology checkbox group 'version control' option.",
  },
  accessToExternal: {
    id: "jobBuilder.workEnv.technology.accessToExternal",
    defaultMessage: "Access to external, unfiltered Wi-Fi.",
    description: "Technology checkbox group 'access to external' option.",
  },
});

export const techOptions: string[] = [
  "videoConferencing",
  "collaboration",
  "fileSharing",
  "taskManagement",
  "versionControl",
  "accessToExternal",
];

export const amenitiesMessages = defineMessages({
  cafeteria: {
    id: "jobBuilder.workEnv.amenities.cafeteria",
    defaultMessage: "Cafeteria On-site",
    description: "Amenities checkbox group 'cafeteria' option.",
  },
  closeToTransit: {
    id: "jobBuilder.workEnv.amenities.closeToTransit",
    defaultMessage: "Close to Transit",
    description: "Amenities checkbox group 'close to transit' option.",
  },
  restaurants: {
    id: "jobBuilder.workEnv.amenities.restaurants",
    defaultMessage: "Walking Distance to Restaurants/Malls",
    description: "Amenities checkbox group 'restaurants' option.",
  },
  downtown: {
    id: "jobBuilder.workEnv.amenities.downtown",
    defaultMessage: "Downtown",
    description: "Amenities checkbox group 'downtown' option.",
  },
  fitnessCenter: {
    id: "jobBuilder.workEnv.amenities.fitnessCenter",
    defaultMessage: "Nearby Fitness Centre",
    description: "Amenities checkbox group 'nearby fitness centre' option.",
  },
  parking: {
    id: "jobBuilder.workEnv.amenities.parking",
    defaultMessage: "Easy Access to Parking",
    description: "Amenities checkbox group 'parking' option.",
  },
});

export const amenitiesOptions: string[] = [
  "cafeteria",
  "closeToTransit",
  "restaurants",
  "downtown",
  "fitnessCenter",
  "parking",
];

// This function takes the possible values and the localized messages objects and returns an array.
// The array contains the name and localized label.
const createOptions = (
  options: string[],
  messages: Record<string, MessageDescriptor>,
  intl: IntlShape,
): { value: string; label: string }[] => {
  return options.map((value: string): { value: string; label: string } => ({
    value,
    label: intl.formatMessage(messages[value]),
  }));
};

export const phyEnvDescriptions = (
  intl: IntlShape,
): { value: string; label: string }[] =>
  createOptions(physEnvOptions, physEnvMessages, intl);
export const techDescriptions = (
  intl: IntlShape,
): { value: string; label: string }[] =>
  createOptions(techOptions, techMessages, intl);
export const amenitiesDescriptions = (
  intl: IntlShape,
): { value: string; label: string }[] =>
  createOptions(amenitiesOptions, amenitiesMessages, intl);

interface WorkEnvSection {
  teamSize: number;
  selectedEnvOptions: string[];
  envDescription: string;
}

const WorkEnvSection: React.FunctionComponent<WorkEnvSection> = ({
  teamSize,
  selectedEnvOptions,
  envDescription,
}): React.ReactElement => {
  const intl = useIntl();
  const phyEnvData: { value: string; label: string }[] = phyEnvDescriptions(
    intl,
  );
  const techData: { value: string; label: string }[] = techDescriptions(intl);
  const amenitiesData: {
    value: string;
    label: string;
  }[] = amenitiesDescriptions(intl);

  return (
    <div data-c-grid="gutter">
      <div data-c-grid-item="base(1of1)">
        <span
          data-c-colour="c1"
          data-c-margin="top(half) bottom(half)"
          data-c-font-weight="bold"
        >
          <FormattedMessage {...formMessages.teamSizeLabel} />
        </span>
        <span data-c-margin="left(normal)">{teamSize}</span>
      </div>
      <div data-c-grid-item="base(1of1)">
        <p
          data-c-colour="c1"
          data-c-margin="top(half) bottom(half)"
          data-c-font-weight="bold"
        >
          <FormattedMessage {...formMessages.physicalEnvLabel} />
        </p>
        <div data-c-margin="left(quarter)">
          <div data-c-grid="gutter">
            {phyEnvData.map(
              ({ label, value }): React.ReactElement => {
                const checked: boolean = selectedEnvOptions.includes(value);
                return (
                  <div data-c-grid-item="tp(1of2)" key={value}>
                    <div
                      className={`job-builder-check ${
                        checked ? "checked" : ""
                      }`}
                    >
                      <i className="fa fa-check" />
                    </div>
                    <span>{label}</span>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
      <div data-c-grid-item="base(1of1)">
        <p
          data-c-colour="c1"
          data-c-padding="top(half) bottom(half)"
          data-c-font-weight="bold"
        >
          <FormattedMessage {...formMessages.technologyLabel} />
        </p>
        <div data-c-margin="left(quarter)">
          <div data-c-grid="gutter">
            {techData.map(
              ({ label, value }): React.ReactElement => {
                const checked: boolean = selectedEnvOptions.includes(value);
                return (
                  <div data-c-grid-item="tp(1of2)" key={value}>
                    <div
                      className={`job-builder-check ${
                        checked ? "checked" : ""
                      }`}
                    >
                      <i className="fa fa-check" />
                    </div>
                    <span>{label}</span>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
      <div data-c-grid-item="base(1of1)">
        <p
          data-c-colour="c1"
          data-c-margin="top(half) bottom(half)"
          data-c-font-weight="bold"
        >
          <FormattedMessage {...formMessages.amenitiesLabel} />
        </p>
        <div data-c-margin="left(quarter)">
          <div data-c-grid="gutter">
            {amenitiesData.map(
              ({ label, value }): React.ReactElement => {
                const checked: boolean = selectedEnvOptions.includes(value);
                return (
                  <div data-c-grid-item="tp(1of2)" key={value}>
                    <div
                      className={`job-builder-check ${
                        checked ? "checked" : ""
                      }`}
                    >
                      <i className="fa fa-check" />
                    </div>
                    <span>{label}</span>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
      <div data-c-grid-item="base(1of1)">
        <p
          data-c-margin="bottom(normal) top(half)"
          data-c-colour="c1"
          data-c-font-weight="bold"
        >
          <FormattedMessage {...formMessages.moreOnWorkEnv} />
        </p>
        <p>{envDescription}</p>
      </div>
    </div>
  );
};

export default WorkEnvSection;
