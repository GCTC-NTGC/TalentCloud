/* eslint-disable jsx-a11y/label-has-associated-control, camelcase, @typescript-eslint/camelcase */
import React, { useState, useRef } from "react";
import { Form, Field, Formik, FormikTouched, FormikErrors } from "formik";
import * as Yup from "yup";
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  defineMessages,
} from "react-intl";
import CheckboxGroup from "../Form/CheckboxGroup";
import RadioGroup from "../Form/RadioGroup";
import ContextBlock from "../ContextBlock/ContextBlock";
import ContextBlockItem from "../ContextBlock/ContextBlockItem";
import CopyToClipboardButton from "./CopyToClipboardButton";
import WorkEnvModal from "./WorkEnvModal";
import RadioInput from "../Form/RadioInput";
import NumberInput from "../Form/NumberInput";
import CheckboxInput from "../Form/CheckboxInput";
import TextAreaInput from "../Form/TextAreaInput";
import { validationMessages } from "../Form/Messages";
import { Job } from "../../models/types";
import { emptyJob } from "../../models/jobUtil";
import {
  notEmpty,
  hasKey,
  mapToObjectTrans,
  identity,
} from "../../helpers/queries";

const formMessages = defineMessages({
  ourWorkEnvDesc: {
    id: "jobBuilder.workEnv.ourWorkEnvDesc",
    defaultMessage:
      "Share a little about your physical space, the technology used by your team, and the amenities close to your office. Check all that apply.",
    description:
      "Section 1 description of Job Poster Builder Work Environment Step",
  },
  teamSizeLabel: {
    id: "jobBuilder.workEnv.teamSizeLabel",
    defaultMessage: "Team Size",
    description: "The label displayed on the team size input.",
  },
  physicalEnvLabel: {
    id: "jobBuilder.workEnv.physicalEnvLabel",
    defaultMessage: "Our Physical Environment",
    description:
      "The label displayed on the physical environment checkbox group.",
  },
  technologyLabel: {
    id: "jobBuilder.workEnv.technologyLabel",
    defaultMessage: "Technology",
    description: "The label displayed on the technology checkbox group.",
  },
  amenitiesLabel: {
    id: "jobBuilder.workEnv.technologyLabel",
    defaultMessage: "Technology",
    description: "The label displayed on the technology checkbox group.",
  },
  moreOnWorkEnv: {
    id: "jobBuilder.workEnv.moreOnWorkEnv",
    defaultMessage: "More about your Environment",
    description: "The title for the more about your environment textbox.",
  },
  moreOnWorkEnvSubtext: {
    id: "jobBuilder.workEnv.moreOnWorkEnvSubtext",
    defaultMessage:
      "Anything else you'd like to add about your work environment? Highlight features of the physical environment, technology and amenities specific to your team.",
    description:
      "Subtext displayed for the more about your environment textbox.",
  },
  moreOnWorkEnvLabel: {
    id: "jobBuilder.workEnv.moreOnWorkEnvLabel",
    defaultMessage: "More About Your Environment",
    description:
      "The label displayed for the more about your environment textbox.",
  },
  moreOnWorkEnvPlaceholder: {
    id: "jobBuilder.workEnv.moreOnWorkEnvPlaceholder",
    defaultMessage: "Try for a casual, frank, friendly tone.",
    description:
      "The placeholder displayed for the more about your environment textbox.",
  },
  culture: {
    id: "jobBuilder.workEnv.culture",
    defaultMessage: "Our Culture",
    description: "Section 2 radio group title of our culture step.",
  },
  cultureSubtext2: {
    id: "jobBuilder.workEnv.cultureSubtext2",
    defaultMessage:
      "Based on your selections, we'll create a short paragraph summarizing your work culture. You can edit this paragraph to customize it to your team.",
    description: "Subtext 2 displayed of the our culture section.",
  },
  fastPacedSteadyLabel: {
    id: "jobBuilder.workEnv.fastPacedSteadyLabel",
    defaultMessage: "Fast-paced vs. Steady:",
    description: "The label for the fast-paced vs. steady radio group",
  },
  managementLabel: {
    id: "jobBuilder.workEnv.managementLabel",
    defaultMessage: "Horizontal vs. Vertical:",
    description: "The label for the management radio group",
  },
  experimentalLabel: {
    id: "jobBuilder.workEnv.experimentalLabel",
    defaultMessage: "Experimental vs. Ongoing Business:",
    description: "The label for the experimental radio group",
  },
  facingLabel: {
    id: "jobBuilder.workEnv.facingLabel",
    defaultMessage: "Citizen Facing vs. Back Office:",
    description: "The label for the facing radio group",
  },
  collaborativeLabel: {
    id: "jobBuilder.workEnv.collaborativeLabel",
    defaultMessage: "Collaborative vs. Independent:",
    description: 'The label for the "colaborative vs independent" radio group',
  },
  cultureSummary: {
    id: "jobBuilder.workEnv.cultureSummary",
    defaultMessage: "Culture Summary",
    description: "The header for the culture summary section.",
  },
  cultureSummarySubtext: {
    id: "jobBuilder.workEnv.cultureSummarySubtext",
    defaultMessage:
      "Here is the short paragraph summarizing your work culture which will appear on the job poster. Copy and paste it into the text box below if you want to customize it to the personality of your team and the way you work.",
    description: "The subtext for the culture summary section.",
  },
  customCultureSummaryLabel: {
    id: "jobBuilder.workEnv.customCultureSummaryLabel",
    defaultMessage: "Customize your culture summary:",
    description: "The label for the custom culture summary textbox.",
  },
  customCultureSummaryPlaceholder: {
    id: "jobBuilder.workEnv.customCultureSummaryPlaceholder",
    defaultMessage: "Paste here to edit the paragraph.",
    description: "The placeholder for the custom culture summary textbox.",
  },
  specialWorkCulture: {
    id: "jobBuilder.workEnv.specialWorkCulture",
    defaultMessage: "Anything Special About Your Work Culture?",
    description: "Title for subsection in our work culture.",
  },
  specialWorkCultureSubtext: {
    id: "jobBuilder.workEnv.specialWorkCultureSubtext",
    defaultMessage:
      "Does your team care a lot about something else? Proud of the team's record of getting results? Strong commitment to mental wellness? Actively involved in advancing diversity and inclusion? LGBTQ+ champions? Here's a chance to let applicants know about the culture of the team they'll potentially be joining.",
    description: "Subtext for subsection in our work culture.",
  },
  specialWorkCultureLabel: {
    id: "jobBuilder.workEnv.specialWorkCultureLabel",
    defaultMessage: "More About Your Work Culture",
    description: "The label for the 'more on work culture' textarea.",
  },
  textAreaPlaceholder1: {
    id: "jobBuilder.workEnv.textAreaPlaceholder1",
    defaultMessage: "Try for a casual, frank, friendly tone.",
    description: "Default placeholder for textarea element",
  },
  thisIsOptional: {
    id: "jobBuilder.workEnv.thisIsOptional",
    defaultMessage: "This is optional.",
    description: "Text indicator for optional sections within form.",
  },
});

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

const culturePaceMessages = defineMessages({
  pace01Title: {
    id: "jobBuilder.culturePace.01.title",
    defaultMessage: "Very Fast-paced",
  },
  pace01Description: {
    id: "jobBuilder.culturePace.01.description",
    defaultMessage:
      "Our deadlines are tight, we balance several tasks at the same time, and our priorities are always changing. Our work should come with running shoes!",
  },
  pace02Title: {
    id: "jobBuilder.culturePace.02.title",
    defaultMessage: "Fast-paced",
  },
  pace02Description: {
    id: "jobBuilder.culturePace.02.description",
    defaultMessage:
      "Our deadlines are usually close together, we balance some tasks at the same time, and our priorities change regularly. Our work keeps us on our toes!",
  },
  pace03Title: {
    id: "jobBuilder.culturePace.03.title",
    defaultMessage: "Steady",
  },
  pace03Description: {
    id: "jobBuilder.culturePace.03.description",
    defaultMessage:
      "Our deadlines are regular and predictable, we balance a couple of tasks at a time, and our priorities change occasionally. We keep things on an even keel.",
  },
  pace04Title: {
    id: "jobBuilder.culturePace.04.title",
    defaultMessage: "Very Steady",
  },
  pace04Description: {
    id: "jobBuilder.culturePace.04.description",
    defaultMessage:
      "Our work is ongoing so there aren't very many deadlines. We don't usually have to balance tasks and our priorities change rarely. We thrive on routine.",
  },
});

type CulturePaceId =
  | "culturePace01"
  | "culturePace02"
  | "culturePace03"
  | "culturePace04";
const culturePaceList: {
  id: CulturePaceId;
  title: FormattedMessage.MessageDescriptor;
  subtext: FormattedMessage.MessageDescriptor;
}[] = [
  {
    id: "culturePace01",
    title: culturePaceMessages.pace01Title,
    subtext: culturePaceMessages.pace01Description,
  },
  {
    id: "culturePace02",
    title: culturePaceMessages.pace02Title,
    subtext: culturePaceMessages.pace02Description,
  },
  {
    id: "culturePace03",
    title: culturePaceMessages.pace03Title,
    subtext: culturePaceMessages.pace03Description,
  },
  {
    id: "culturePace04",
    title: culturePaceMessages.pace04Title,
    subtext: culturePaceMessages.pace04Description,
  },
];

const mgmtStyleMessages = defineMessages({
  style01Title: {
    id: "jobBuilder.mgmtStyle.01.title",
    defaultMessage: "Horizontal",
  },
  style01Description: {
    id: "jobBuilder.mgmtStyle.01.description",
    defaultMessage:
      "There’s no middle management here, so we make most big decisions ourselves and you can expect to interact regularly with our executives.",
  },
  style02Title: {
    id: "jobBuilder.mgmtStyle.02.title",
    defaultMessage: "Somewhat Horizontal",
  },
  style02Description: {
    id: "jobBuilder.mgmtStyle.02.description",
    defaultMessage:
      "We have some middle management here but make most day-to-day decisions ourselves. Don’t be surprised to interact fairly often with our executives.",
  },
  style03Title: {
    id: "jobBuilder.mgmtStyle.03.title",
    defaultMessage: "Somewhat Vertical",
  },
  style03Description: {
    id: "jobBuilder.mgmtStyle.03.description",
    defaultMessage:
      "Our team has a clearly defined role. We check in regularly with middle-management for approvals and updates on the strategic vision of our executives.",
  },
  style04Title: {
    id: "jobBuilder.mgmtStyle.04.title",
    defaultMessage: "Vertical",
  },
  style04Description: {
    id: "jobBuilder.mgmtStyle.04.description",
    defaultMessage:
      "Our team has a clearly defined role. We check in often with middle-management for approvals and updates on the strategic vision of our executives.",
  },
});

type MgmtStyleId =
  | "mgmtStyle01"
  | "mgmtStyle02"
  | "mgmtStyle03"
  | "mgmtStyle04";
const managementList: {
  id: MgmtStyleId;
  title: FormattedMessage.MessageDescriptor;
  subtext: FormattedMessage.MessageDescriptor;
}[] = [
  {
    id: "mgmtStyle01",
    title: mgmtStyleMessages.style01Title,
    subtext: mgmtStyleMessages.style01Description,
  },
  {
    id: "mgmtStyle02",
    title: mgmtStyleMessages.style02Title,
    subtext: mgmtStyleMessages.style02Description,
  },
  {
    id: "mgmtStyle03",
    title: mgmtStyleMessages.style03Title,
    subtext: mgmtStyleMessages.style03Description,
  },
  {
    id: "mgmtStyle04",
    title: mgmtStyleMessages.style04Title,
    subtext: mgmtStyleMessages.style04Description,
  },
];

const experimentalMessages = defineMessages({
  experimental01Title: {
    id: "jobBuilder.experimental.01.title",
    defaultMessage: "Experimental",
  },
  experimental01Description: {
    id: "jobBuilder.experimental.01.description",
    defaultMessage:
      "Our work is defined by trying out brand new ideas, methods, and activities to address persistent problems that traditional approaches have failed to solve.",
  },
  experimental02Title: {
    id: "jobBuilder.experimental.02.title",
    defaultMessage: "Somewhat Experimental",
  },
  experimental02Description: {
    id: "jobBuilder.experimental.02.description",
    defaultMessage:
      "We try out new and proven ideas, methods, and activities to improve how we do our work.",
  },
  experimental03Title: {
    id: "jobBuilder.experimental.03.title",
    defaultMessage: "Somewhat Predictable Work",
  },
  experimental03Description: {
    id: "jobBuilder.experimental.03.description",
    defaultMessage:
      "Our work includes some administrative tasks are repeated on a regular basis. The tools we use work well for us but we are open to improving our processes.",
  },
  experimental04Title: {
    id: "jobBuilder.experimental.04.title",
    defaultMessage: "Predictable Work",
  },
  experimental04Description: {
    id: "jobBuilder.experimental.04.description",
    defaultMessage:
      "Most of our work involves administrative tasks are repeated on a regular basis. Consistency is key here, so we follow a standard process with tried and true tools.",
  },
});
type ExperiementalId =
  | "experimental01"
  | "experimental02"
  | "experimental03"
  | "experimental04";
const experimentalList: {
  id: ExperiementalId;
  title: FormattedMessage.MessageDescriptor;
  subtext: FormattedMessage.MessageDescriptor;
}[] = [
  {
    id: "experimental01",
    title: experimentalMessages.experimental01Title,
    subtext: experimentalMessages.experimental01Description,
  },
  {
    id: "experimental02",
    title: experimentalMessages.experimental02Title,
    subtext: experimentalMessages.experimental02Description,
  },
  {
    id: "experimental03",
    title: experimentalMessages.experimental03Title,
    subtext: experimentalMessages.experimental03Description,
  },
  {
    id: "experimental04",
    title: experimentalMessages.experimental04Title,
    subtext: experimentalMessages.experimental04Description,
  },
];

const facingMessages = defineMessages({
  facing01Title: {
    id: "jobBuilder.facing.01.title",
    defaultMessage: "Citizen Facing",
  },
  facing01Description: {
    id: "jobBuilder.facing.01.description",
    defaultMessage:
      "We are the face of the service we deliver and spend most of our time engaging directly with the public.",
  },
  facing02Title: {
    id: "jobBuilder.facing.02.title",
    defaultMessage: "Mostly Citizen Facing",
  },
  facing02Description: {
    id: "jobBuilder.facing.02.description",
    defaultMessage:
      "We spend a lot of our time engaging directly with the public, but there is also behind the scenes work to support others.",
  },
  facing03Title: {
    id: "jobBuilder.facing.03.title",
    defaultMessage: "Mostly Back Office",
  },
  facing03Description: {
    id: "jobBuilder.facing.03.description",
    defaultMessage:
      "We usually work behind the scenes doing important work that makes service delivery possible.",
  },
  facing04Title: {
    id: "jobBuilder.facing.04.title",
    defaultMessage: "Back Office",
  },
  facing04Description: {
    id: "jobBuilder.facing.04.description",
    defaultMessage:
      "We work behind the scenes doing important work that makes service delivery possible. We thrive on supporting others.",
  },
});
type FacingId = "facing01" | "facing02" | "facing03" | "facing04";
const facingList: {
  id: FacingId;
  title: FormattedMessage.MessageDescriptor;
  subtext: FormattedMessage.MessageDescriptor;
}[] = [
  {
    id: "facing01",
    title: facingMessages.facing01Title,
    subtext: facingMessages.facing01Description,
  },
  {
    id: "facing02",
    title: facingMessages.facing02Title,
    subtext: facingMessages.facing02Description,
  },
  {
    id: "facing03",
    title: facingMessages.facing03Title,
    subtext: facingMessages.facing03Description,
  },
  {
    id: "facing04",
    title: facingMessages.facing04Title,
    subtext: facingMessages.facing04Description,
  },
];

const collaborativenessMessages = defineMessages({
  collaborativeness01Title: {
    id: "jobBuilder.collaborativeness.01.title",
    defaultMessage: "Collaborative",
  },
  collaborativeness01Description: {
    id: "jobBuilder.collaborativeness.01.description",
    defaultMessage:
      "Our team has diverse backgrounds, viewpoints, and skills and we play to each others strengths. We collectively own the team’s goals and are always looking for ways to pitch in.",
  },
  collaborativeness02Title: {
    id: "jobBuilder.collaborativeness.02.title",
    defaultMessage: "Somewhat Collaborative",
  },
  collaborativeness02Description: {
    id: "jobBuilder.collaborativeness.02.description",
    defaultMessage:
      "Our team has a diverse set of skills and we recognize each others strengths. We work together often and are quick to pitch in when someone asks for help.",
  },
  collaborativeness03Title: {
    id: "jobBuilder.collaborativeness.03.title",
    defaultMessage: "Somewhat Independent",
  },
  collaborativeness03Description: {
    id: "jobBuilder.collaborativeness.03.description",
    defaultMessage:
      "Members of our team own their piece of the puzzle and have some freedom to choose how they get their work done.",
  },
  collaborativeness04Title: {
    id: "jobBuilder.collaborativeness.04.title",
    defaultMessage: "Independent",
  },
  collaborativeness04Description: {
    id: "jobBuilder.collaborativeness.04.description",
    defaultMessage:
      "Members of our team own their piece of the puzzle. It doesn’t really matter how we get our work done as long as it’s high quality.",
  },
});
type CollaborativenessId =
  | "collaborativeness01"
  | "collaborativeness02"
  | "collaborativeness03"
  | "collaborativeness04";
const collaborativenessList: {
  id: CollaborativenessId;
  title: FormattedMessage.MessageDescriptor;
  subtext: FormattedMessage.MessageDescriptor;
}[] = [
  {
    id: "collaborativeness01",
    title: collaborativenessMessages.collaborativeness01Title,
    subtext: collaborativenessMessages.collaborativeness01Description,
  },
  {
    id: "collaborativeness02",
    title: collaborativenessMessages.collaborativeness02Title,
    subtext: collaborativenessMessages.collaborativeness02Description,
  },
  {
    id: "collaborativeness03",
    title: collaborativenessMessages.collaborativeness03Title,
    subtext: collaborativenessMessages.collaborativeness03Description,
  },
  {
    id: "collaborativeness04",
    title: collaborativenessMessages.collaborativeness04Title,
    subtext: collaborativenessMessages.collaborativeness04Description,
  },
];

// shape of values used in Form
export interface FormValues {
  teamSize?: number;
  physicalEnv: string[];
  technology: string[];
  amenities: string[];
  envDescription: string;
  culturePace?: CulturePaceId;
  management?: MgmtStyleId;
  experimental?: ExperiementalId;
  facing?: FacingId;
  collaborativeness?: CollaborativenessId;
  cultureSummary: string;
  moreCultureSummary: string;
}

function convertSliderIdFromJob<T>(
  key: string,
  formSliderArray: { id: T }[],
  jobSliderId: number | null,
): { [key: string]: T } | {} {
  return jobSliderId && jobSliderId > 0 && jobSliderId <= formSliderArray.length
    ? {
        [key]: formSliderArray[jobSliderId - 1].id,
      }
    : {};
}

const jobToValues = (
  {
    team_size,
    fast_vs_steady,
    horizontal_vs_vertical,
    experimental_vs_ongoing,
    citizen_facing_vs_back_office,
    collaborative_vs_independent,
    work_env_features,
    ...job
  }: Job,
  locale: "en" | "fr",
): FormValues => {
  const isTrueInEnvFeatures = (option): boolean =>
    work_env_features !== null &&
    hasKey(work_env_features, option) &&
    work_env_features[option];

  return {
    ...(team_size && { teamSize: team_size }),
    physicalEnv: physEnvOptions.filter(isTrueInEnvFeatures),
    technology: techOptions.filter(isTrueInEnvFeatures),
    amenities: amenitiesOptions.filter(isTrueInEnvFeatures),
    ...convertSliderIdFromJob("culturePace", culturePaceList, fast_vs_steady),
    ...convertSliderIdFromJob(
      "management",
      managementList,
      horizontal_vs_vertical,
    ),
    ...convertSliderIdFromJob(
      "experimental",
      experimentalList,
      experimental_vs_ongoing,
    ),
    ...convertSliderIdFromJob(
      "facing",
      facingList,
      citizen_facing_vs_back_office,
    ),
    ...convertSliderIdFromJob(
      "collaborativeness",
      collaborativenessList,
      citizen_facing_vs_back_office,
    ),
    envDescription: job[locale].work_env_description || "",
    cultureSummary: job[locale].culture_summary || "",
    moreCultureSummary: job[locale].culture_special || "",
  };
};

function convertSliderIdToJob(
  formSliderArray: { id: string }[],
  id: string | undefined,
): number | null {
  if (id === undefined) {
    return null;
  }
  return formSliderArray.map((item): string => item.id).indexOf(id) + 1;
}

const updateJobWithValues = (
  job: Job,
  locale: "en" | "fr",
  {
    teamSize,
    physicalEnv,
    technology,
    amenities,
    envDescription,
    culturePace,
    management,
    experimental,
    facing,
    collaborativeness,
    cultureSummary,
    moreCultureSummary,
  }: FormValues,
): Job => {
  const physFeatures = mapToObjectTrans(
    physEnvOptions,
    identity,
    (option): boolean => physicalEnv.includes(option),
  );
  const techFeatures = mapToObjectTrans(
    techOptions,
    identity,
    (option): boolean => technology.includes(option),
  );
  const amenityFeatures = mapToObjectTrans(
    amenitiesOptions,
    identity,
    (option): boolean => amenities.includes(option),
  );
  const workEnvFeatures = {
    ...physFeatures,
    ...techFeatures,
    ...amenityFeatures,
  };
  return {
    ...job,
    team_size: teamSize || null,
    fast_vs_steady: convertSliderIdToJob(culturePaceList, culturePace),
    horizontal_vs_vertical: convertSliderIdToJob(managementList, management),
    experimental_vs_ongoing: convertSliderIdToJob(
      experimentalList,
      experimental,
    ),
    citizen_facing_vs_back_office: convertSliderIdToJob(facingList, facing),
    collaborative_vs_independent: convertSliderIdToJob(
      collaborativenessList,
      collaborativeness,
    ),
    work_env_features: workEnvFeatures,
    [locale]: {
      ...job[locale],
      work_env_description: envDescription || null,
      culture_summary: cultureSummary || null,
      culture_special: moreCultureSummary || null,
    },
  };
};

const renderRadioWithContext = (
  intl: ReactIntl.InjectedIntl,
  touched: FormikTouched<FormValues>,
  errors: FormikErrors<FormValues>,
  values: FormValues,
  fieldName: string,
  label: string,
  sliderList: {
    id: string;
    title: FormattedMessage.MessageDescriptor;
    subtext: FormattedMessage.MessageDescriptor;
  }[],
): React.ReactElement => {
  return (
    <div className="job-builder-culture-block" data-c-grid-item="base(1of1)">
      <div data-c-grid="gutter">
        <RadioGroup
          id={fieldName}
          label={label}
          required
          touched={touched[fieldName]}
          error={errors[fieldName]}
          value={values[fieldName]}
          grid="base(1of1) tl(1of3)"
        >
          {sliderList.map(
            ({ id, title }): React.ReactElement => {
              return (
                <Field
                  key={id}
                  name={fieldName}
                  component={RadioInput}
                  id={id}
                  label={intl.formatMessage(title)}
                  value={id}
                  trigger
                />
              );
            },
          )}
        </RadioGroup>
        <ContextBlock
          className="job-builder-context-block"
          grid="base(1of1) tl(2of3)"
        >
          {sliderList.map(
            ({ id, title, subtext }): React.ReactElement => {
              return (
                <ContextBlockItem
                  key={id}
                  contextId={id}
                  title={intl.formatMessage(title)}
                  subtext={intl.formatMessage(subtext)}
                  className="job-builder-context-item"
                  active={values[fieldName] === id}
                />
              );
            },
          )}
        </ContextBlock>
      </div>
    </div>
  );
};

interface WorkEnvFormProps {
  // Optional Job to prepopulate form values from.
  job: Job | null;
  // Submit function that runs after successful validation.
  // It must return the submitted job, if successful.
  handleSubmit: (values: Job) => Promise<Job>;
  // The function to run when user clicks Prev Page
  handleReturn: () => void;
  // Function to run when modal cancel is clicked.
  handleModalCancel: () => void;
  // Function to run when modal confirm is clicked.
  handleModalConfirm: () => void;
}

const WorkEnvForm = ({
  job,
  handleSubmit,
  handleReturn,
  handleModalCancel,
  handleModalConfirm,
  intl,
}: WorkEnvFormProps & InjectedIntlProps): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw Error("Unexpected intl.locale"); // TODO: Deal with this more elegantly.
  }

  const [returnOnSubmit, setReturnOnSubmit] = useState(false);

  const initialValues: FormValues = job
    ? jobToValues(job, locale)
    : {
        physicalEnv: [],
        technology: [],
        amenities: [],
        envDescription: "",
        cultureSummary: "",
        moreCultureSummary: "",
      };

  // This function takes the possible values and the localized messages objects and returns an array. The array contains the name and localized label.
  const createOptions = (
    options: string[],
    messages: ReactIntl.Messages,
  ): { name: string; label: string }[] => {
    return options.map((name: string): { name: string; label: string } => ({
      name,
      label: intl.formatMessage(messages[name]),
    }));
  };
  const phyEnvData: { name: string; label: string }[] = createOptions(
    physEnvOptions,
    physEnvMessages,
  );
  const techData: { name: string; label: string }[] = createOptions(
    techOptions,
    techMessages,
  );
  const amenitiesData: { name: string; label: string }[] = createOptions(
    amenitiesOptions,
    amenitiesMessages,
  );

  const cultureSummaryRef = React.createRef<HTMLParagraphElement>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalParentRef = useRef<HTMLDivElement>(null);
  const workEnvSchema = Yup.object().shape({
    teamSize: Yup.number()
      .min(1, intl.formatMessage(validationMessages.required))
      .required(intl.formatMessage(validationMessages.required)),
    physicalEnv: Yup.array(),
    technology: Yup.array(),
    amenities: Yup.array(),
    envDescription: Yup.string(),
    culturePace: Yup.string()
      .oneOf(culturePaceList.map((item): string => item.id))
      .required(intl.formatMessage(validationMessages.checkboxRequired)),
    management: Yup.string()
      .oneOf(managementList.map((item): string => item.id))
      .required(intl.formatMessage(validationMessages.checkboxRequired)),
    experimental: Yup.string()
      .oneOf(experimentalList.map((item): string => item.id))
      .required(intl.formatMessage(validationMessages.checkboxRequired)),
    facing: Yup.string()
      .oneOf(facingList.map((item): string => item.id))
      .required(intl.formatMessage(validationMessages.checkboxRequired)),
    collaborativeness: Yup.string()
      .oneOf(collaborativenessList.map((item): string => item.id))
      .required(intl.formatMessage(validationMessages.checkboxRequired)),
  });

  /** Compiles and returns all the active radio buttons corresponding context box values within the culture section  */
  const buildCultureSummary = (values): string => {
    const pace = culturePaceList.find(
      ({ id }): boolean => id === values.culturePace,
    );
    const management = managementList.find(
      ({ id }): boolean => id === values.management,
    );
    const experimental = experimentalList.find(
      ({ id }): boolean => id === values.experimental,
    );
    const facing = facingList.find(({ id }): boolean => id === values.facing);
    const collaborativeness = collaborativenessList.find(
      ({ id }): boolean => id === values.collaborativeness,
    );

    const cultureSummary: string = [
      pace,
      management,
      experimental,
      facing,
      collaborativeness,
    ]
      .filter(notEmpty)
      .map((item): string => intl.formatMessage(item.subtext))
      .join(" ");
    return cultureSummary;
  };

  return (
    <div
      data-c-container="form"
      data-c-padding="top(triple) bottom(triple)"
      ref={modalParentRef}
    >
      <h3
        data-c-font-size="h3"
        data-c-font-weight="bold"
        data-c-margin="bottom(double)"
      >
        <FormattedMessage
          id="jobBuilder.workEnv.title"
          defaultMessage="Work Environment"
          description="Header of job poster builder work environment step."
        />
      </h3>
      <p>
        <FormattedMessage
          id="jobBuilder.workEnv.stepDescription"
          defaultMessage={`Applicants care a lot about the team they'll be working with and the physical workspace as well. Sharing information about these things help applicants determine if they'll be a good fit, and can reduce the number of "wishful thinking" applications that slow down the screening process.`}
          description="Description of job poster builder work environment step."
        />
      </p>
      <div data-c-grid-item="base(1of1)">
        <h4 data-c-font-size="h4" data-c-margin="top(triple) bottom(normal)">
          <FormattedMessage
            id="jobBuilder.workEnv.ourWorkEnv"
            defaultMessage="Our Work Environment"
            description="Section 1 of Job Poster Builder Work Environment Step"
          />
        </h4>
        <p data-c-margin="bottom(normal)">
          <FormattedMessage {...formMessages.ourWorkEnvDesc} />
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={workEnvSchema}
        onSubmit={(values, { setSubmitting }): void => {
          // If custom summary textbox is length is zero, set cultureSummary to generated text
          const cultureSummary =
            values.cultureSummary.length === 0
              ? buildCultureSummary(values)
              : values.cultureSummary;
          const formValues: FormValues = { ...values, cultureSummary };
          const oldJob = job || emptyJob();
          const updatedJob = updateJobWithValues(oldJob, locale, formValues);
          handleSubmit(updatedJob)
            .then((job): void => {
              if (returnOnSubmit) {
                handleReturn();
              } else {
                setIsModalVisible(true);
              }
            })
            .finally((): void => {
              setSubmitting(false);
              setReturnOnSubmit(false);
            });
        }}
        render={({
          errors,
          touched,
          isSubmitting,
          values,
          setFieldValue,
          setFieldTouched,
          submitForm,
        }): React.ReactElement => (
          <>
            <Form id="form" data-c-margin="bottom(normal)">
              <Field
                name="teamSize"
                component={NumberInput}
                required
                grid="tl(1of2)"
                id="teamSize"
                label={intl.formatMessage(formMessages.teamSizeLabel)}
                placeholder="e.g. 10"
              />
              <CheckboxGroup
                id="physicalEnv"
                label={intl.formatMessage(formMessages.physicalEnvLabel)}
                grid="base(1of1)"
                value={values.physicalEnv}
                error={errors.physicalEnv}
                touched={touched.physicalEnv}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              >
                {phyEnvData &&
                  phyEnvData.map(
                    ({ name, label }): React.ReactElement => {
                      return (
                        <Field
                          key={name}
                          id={name}
                          name={name}
                          label={label}
                          component={CheckboxInput}
                          grid="base(1of2)"
                        />
                      );
                    },
                  )}
              </CheckboxGroup>
              <CheckboxGroup
                id="technology"
                label="Technology"
                grid="base(1of1)"
                value={values.technology}
                error={errors.technology}
                touched={touched.technology}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              >
                {techData &&
                  techData.map(
                    ({ name, label }): React.ReactElement => {
                      return (
                        <Field
                          key={name}
                          id={name}
                          name={name}
                          label={label}
                          component={CheckboxInput}
                          grid="base(1of2)"
                        />
                      );
                    },
                  )}
              </CheckboxGroup>
              <CheckboxGroup
                id="amenities"
                label="Amenities"
                grid="base(1of1)"
                value={values.amenities}
                error={errors.amenities}
                touched={touched.amenities}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              >
                {amenitiesData &&
                  amenitiesData.map(
                    ({ name, label }): React.ReactElement => {
                      return (
                        <Field
                          key={name}
                          id={name}
                          name={name}
                          label={label}
                          component={CheckboxInput}
                          grid="base(1of2)"
                        />
                      );
                    },
                  )}
              </CheckboxGroup>
              <p
                data-c-margin="bottom(normal) top(normal)"
                data-c-font-weight="bold"
              >
                <FormattedMessage {...formMessages.moreOnWorkEnv} />
              </p>
              <p data-c-margin="bottom(normal)">
                <FormattedMessage {...formMessages.thisIsOptional} />
              </p>
              <p data-c-margin="bottom(normal)">
                <FormattedMessage {...formMessages.moreOnWorkEnvSubtext} />
              </p>
              <Field
                type="textarea"
                id="environment_description"
                name="envDescription"
                label={intl.formatMessage(formMessages.moreOnWorkEnvLabel)}
                placeholder={intl.formatMessage(
                  formMessages.moreOnWorkEnvPlaceholder,
                )}
                component={TextAreaInput}
                grid="base(1of2)"
              />
              <div data-c-grid-item="base(1of1)">
                <h4
                  data-c-font-size="h4"
                  data-c-margin="top(double) bottom(normal)"
                >
                  <FormattedMessage {...formMessages.culture} />
                </h4>
                <p data-c-margin="bottom(normal)">
                  <FormattedMessage
                    id="jobBuilder.workEnv.cultureSubtext1"
                    defaultMessage="Now let applicants know more about the personality of your team and the type of work that you usually do."
                    description="Subtext 1 displayed of the our culture section."
                  />
                </p>
                <p data-c-margin="bottom(normal)">
                  <FormattedMessage {...formMessages.cultureSubtext2} />
                </p>
              </div>
              {renderRadioWithContext(
                intl,
                touched,
                errors,
                values,
                "culturePace",
                intl.formatMessage(formMessages.fastPacedSteadyLabel),
                culturePaceList,
              )}
              {renderRadioWithContext(
                intl,
                touched,
                errors,
                values,
                "management",
                intl.formatMessage(formMessages.managementLabel),
                managementList,
              )}
              {renderRadioWithContext(
                intl,
                touched,
                errors,
                values,
                "experimental",
                intl.formatMessage(formMessages.experimentalLabel),
                experimentalList,
              )}
              {renderRadioWithContext(
                intl,
                touched,
                errors,
                values,
                "facing",
                intl.formatMessage(formMessages.facingLabel),
                facingList,
              )}
              {renderRadioWithContext(
                intl,
                touched,
                errors,
                values,
                "collaborativeness",
                intl.formatMessage(formMessages.collaborativeLabel),
                collaborativenessList,
              )}
              <div data-c-grid-item="base(1of1)">
                <p
                  data-c-margin="bottom(normal) top(normal)"
                  data-c-font-weight="bold"
                >
                  <FormattedMessage {...formMessages.cultureSummary} />
                </p>
                <p data-c-margin="bottom(normal)">
                  <FormattedMessage {...formMessages.cultureSummarySubtext} />
                </p>
                <ContextBlockItem
                  subtext={buildCultureSummary(values)}
                  reference={cultureSummaryRef}
                />
                <div
                  data-c-alignment="base(centre) tl(right)"
                  data-c-margin="top(normal)"
                >
                  <CopyToClipboardButton reference={cultureSummaryRef} />
                </div>
              </div>
              <Field
                type="textarea"
                id="custom_culture_summary"
                name="cultureSummary"
                label={intl.formatMessage(
                  formMessages.customCultureSummaryLabel,
                )}
                placeholder={intl.formatMessage(
                  formMessages.customCultureSummaryPlaceholder,
                )}
                component={TextAreaInput}
                grid="base(1of1)"
              />
              <p data-c-margin="bottom(normal)" data-c-font-weight="bold">
                <FormattedMessage {...formMessages.specialWorkCulture} />
              </p>
              <p data-c-margin="bottom(normal)">
                <FormattedMessage {...formMessages.thisIsOptional} />
              </p>
              <p data-c-margin="bottom(normal)">
                <FormattedMessage {...formMessages.specialWorkCultureSubtext} />
              </p>
              <Field
                type="textarea"
                id="more_culture_summary"
                name="moreCultureSummary"
                label={intl.formatMessage(formMessages.specialWorkCultureLabel)}
                placeholder={intl.formatMessage(
                  formMessages.textAreaPlaceholder1,
                )}
                component={TextAreaInput}
                grid="base(1of1)"
              />
              <div data-c-grid="gutter" data-c-grid-item="base(1of1)">
                <div data-c-grid-item="base(1of1)">
                  <hr data-c-margin="top(normal) bottom(normal)" />
                </div>
                <div
                  data-c-alignment="base(centre) tp(left)"
                  data-c-grid-item="tp(1of2)"
                >
                  <button
                    data-c-button="outline(c2)"
                    data-c-radius="rounded"
                    type="button"
                    disabled={isSubmitting}
                    onClick={(): void => {
                      /** TODO:
                       * This is a race condition, since the setState hook call is asynchronous.
                       * I have to find a way to handle 2 submit buttons in formik without a race condition somewhere :(
                       * For now, the setState always happens faster than the validation check, so it works.
                       * See https://github.com/jaredpalmer/formik/issues/214
                       * -- Tristan
                       */
                      setReturnOnSubmit(true);
                      submitForm();
                    }}
                  >
                    <FormattedMessage
                      id="jobBuilder.workEnv.saveAndReturnButtonLabel"
                      defaultMessage="Save & Return to Job Details"
                      description="Label for Save & Return button on Work Environment form."
                    />
                  </button>
                </div>
                <div
                  data-c-alignment="base(centre) tp(right)"
                  data-c-grid-item="tp(1of2)"
                >
                  <button
                    data-c-button="solid(c1)"
                    data-c-radius="rounded"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <FormattedMessage
                      id="jobBuilder.workEnv.submitButtonLabel"
                      defaultMessage="Save & Preview"
                      description="Label for work environment submit button."
                    />
                  </button>
                </div>
              </div>
            </Form>
            <WorkEnvModal
              modalConfirm={(): void => {
                setIsModalVisible(false);
                handleModalConfirm();
              }}
              modalCancel={(): void => {
                setIsModalVisible(false);
                handleModalCancel();
              }}
              isVisible={isModalVisible}
              parentElement={modalParentRef.current}
              values={values}
              cultureSummary={
                values.cultureSummary || buildCultureSummary(values)
              }
              physEnvData={phyEnvData}
              techData={techData}
              amenitiesData={amenitiesData}
            />
          </>
        )}
      />
    </div>
  );
};

const WorkEnvFormContainer = injectIntl(WorkEnvForm);
export default WorkEnvFormContainer;
