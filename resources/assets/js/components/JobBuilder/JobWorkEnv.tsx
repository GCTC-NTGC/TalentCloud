import React from "react";
import {
  InjectedIntl,
  defineMessages,
  FormattedMessage,
  InjectedIntlProps,
  injectIntl,
} from "react-intl";

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
  messages: ReactIntl.Messages,
  intl: InjectedIntl,
): { name: string; label: string }[] => {
  return options.map((name: string): { name: string; label: string } => ({
    name,
    label: intl.formatMessage(messages[name]),
  }));
};

export const phyEnvDescriptions = (
  intl: InjectedIntl,
): { name: string; label: string }[] =>
  createOptions(physEnvOptions, physEnvMessages, intl);
export const techDescriptions = (
  intl: InjectedIntl,
): { name: string; label: string }[] =>
  createOptions(techOptions, techMessages, intl);
export const amenitiesDescriptions = (
  intl: InjectedIntl,
): { name: string; label: string }[] =>
  createOptions(amenitiesOptions, amenitiesMessages, intl);

interface JobWorkEnv {
  teamSize: number;
  selectedEnvOptions: string[];
}

export const JobWorkEnv: React.FunctionComponent<
  JobWorkEnv & InjectedIntlProps
> = ({ teamSize, selectedEnvOptions, intl }): React.ReactElement => {
  const phyEnvData: { name: string; label: string }[] = phyEnvDescriptions(
    intl,
  );
  const techData: { name: string; label: string }[] = techDescriptions(intl);
  const amenitiesData: {
    name: string;
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
          <FormattedMessage
            id="jobBuilder.workEnvModal.teamSize"
            defaultMessage="Team Size"
            description="Title for Team size section."
          />
        </span>
        <span data-c-margin="left(normal)">{teamSize}</span>
      </div>
      <div data-c-grid-item="base(1of1)">
        <p
          data-c-colour="c1"
          data-c-margin="top(half) bottom(half)"
          data-c-font-weight="bold"
        >
          <FormattedMessage
            id="jobBuilder.workEnvModal.physicalEnvLabel"
            defaultMessage="Our Physical Environment"
            description="The label displayed on the physical environment checkbox group."
          />
        </p>
        <div data-c-margin="left(quarter)">
          <div data-c-grid="gutter">
            {phyEnvData.map(
              ({ label, name }): React.ReactElement => {
                const checked: boolean = selectedEnvOptions.includes(name);
                return (
                  <div data-c-grid-item="tp(1of2)" key={name}>
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
          <FormattedMessage
            id="jobBuilder.workEnvModal.technologyLabel"
            defaultMessage="Technology"
            description="The label displayed on the technology checkbox group."
          />
        </p>
        <div data-c-margin="left(quarter)">
          <div data-c-grid="gutter">
            {techData.map(
              ({ label, name }): React.ReactElement => {
                const checked: boolean = selectedEnvOptions.includes(name);
                return (
                  <div data-c-grid-item="tp(1of2)" key={name}>
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
          <FormattedMessage
            id="jobBuilder.workEnvModal.amenitiesLabel"
            defaultMessage="Amenities"
            description="The label displayed on the amenities checkbox group."
          />
        </p>
        <div data-c-margin="left(quarter)">
          <div data-c-grid="gutter">
            {amenitiesData.map(
              ({ label, name }): React.ReactElement => {
                const checked: boolean = selectedEnvOptions.includes(name);
                return (
                  <div data-c-grid-item="tp(1of2)" key={name}>
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
    </div>
  );
};

export default injectIntl(JobWorkEnv);
