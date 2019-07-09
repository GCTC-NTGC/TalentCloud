/* eslint-disable jsx-a11y/label-has-associated-control, camelcase, @typescript-eslint/camelcase */
import React, { useState, useRef } from "react";
import { Form, Field, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  defineMessages,
} from "react-intl";
import TextArea from "../TextArea";
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

const formMessages = defineMessages({
  ourWorkEnv: {
    id: "jobBuilder.workEnv.ourWorkEnv",
    defaultMessage: "Our Work Environment",
    description: "Section 1 of Job Poster Builder Work Environment Step",
  },
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
      "Anything else you’d like to add about your work environment? Highlight features of the physical environment, technology and amenities specific to your team.",
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
  cultureSubtext1: {
    id: "jobBuilder.workEnv.cultureSubtext1",
    defaultMessage:
      "Now, let applicants know more about the personality of your team and the type of work that you usually do.",
    description: "Subtext 1 displayed of the our culture section.",
  },
  cultureSubtext2: {
    id: "jobBuilder.workEnv.cultureSubtext2",
    defaultMessage:
      "Based on your selections, we’ll create a short paragraph summarizing your work culture. You can edit this paragraph to customize it to your team.",
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
      "Does your team care a lot about something else? Proud of the team’s record of getting results? Strong commitment to mental wellness? Actively involved in advancing diversity and inclusion? LGBTQ+ champions? Here’s a chance to let applicants know about the culture of the team they’ll potentially be joining.",
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
  videoConfrencing: {
    id: "jobBuilder.workEnv.techonology.videoConfrencing",
    defaultMessage: "Video Conferencing (e.g. Skype, Zoom)",
    description: "Technology checkbox group 'video confrencing' option.",
  },
  collaboration: {
    id: "jobBuilder.workEnv.techonology.collaboration",
    defaultMessage: "Collaboration (e.g. Slack, Hangouts)",
    description: "Technology checkbox group 'collaboration' option.",
  },
  fileSharing: {
    id: "jobBuilder.workEnv.techonology.fileSharing",
    defaultMessage: "File Sharing (e.g. Google Drive, Dropbox)",
    description: "Technology checkbox group 'file sharing' option.",
  },
  taskManagement: {
    id: "jobBuilder.workEnv.techonology.taskManagement",
    defaultMessage: "Task Management (e.g. Trello, Asana)",
    description: "Technology checkbox group 'task management' option.",
  },
  versionControl: {
    id: "jobBuilder.workEnv.techonology.videoConfrencing",
    defaultMessage: "Version Control (e.g. Github, Gitlab)",
    description: "Technology checkbox group 'version control' option.",
  },
  accessToExternal: {
    id: "jobBuilder.workEnv.techonology.accessToExternal",
    defaultMessage: "Access to external, unfiltered Wi-Fi.",
    description: "Technology checkbox group 'access to external' option.",
  },
});

export const techOptions: string[] = [
  "videoConfrencing",
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
    description: "Ameneties checkbox group 'cafeteria' option.",
  },
  closeToTransit: {
    id: "jobBuilder.workEnv.amenities.closeToTransit",
    defaultMessage: "Close to Transit",
    description: "Ameneties checkbox group 'close to transit' option.",
  },
  resturants: {
    id: "jobBuilder.workEnv.amenities.resturants",
    defaultMessage: "Walking Distance to Restaurants/Malls",
    description: "Ameneties checkbox group 'resturants' option.",
  },
  downtown: {
    id: "jobBuilder.workEnv.amenities.downtown",
    defaultMessage: "Downtown",
    description: "Ameneties checkbox group 'downtown' option.",
  },
  fitnessCenter: {
    id: "jobBuilder.workEnv.amenities.fitnessCenter",
    defaultMessage: "Nearby Fitness Centre",
    description: "Ameneties checkbox group 'nearby fitness centre' option.",
  },
  parking: {
    id: "jobBuilder.workEnv.amenities.parking",
    defaultMessage: "Easy Access to Parking",
    description: "Ameneties checkbox group 'parking' option.",
  },
});

export const amenitiesOptions: string[] = [
  "cafeteria",
  "closeToTransit",
  "resturants",
  "downtown",
  "fitnessCenter",
  "parking",
];

const culturePaceList = [
  {
    id: "culturePace01",
    title: "Very Fast-paced",
    subtext:
      "Our deadlines are tight, we balance several tasks at the same time, and our priorities are always changing. Our work should come with running shoes!",
  },
  {
    id: "culturePace02",
    title: "Fast-paced",
    subtext:
      "Our deadlines are usually close together, we balance some tasks at the same time, and our priorities change regularly. Our work keeps us on our toes!",
  },
  {
    id: "culturePace03",
    title: "Steady",
    subtext:
      "Our deadlines are regular and predictable, we balance a couple of tasks at a time, and our priorities change occasionally. We keep things on an even keel.",
  },
  {
    id: "culturePace04",
    title: "Very Steady",
    subtext:
      "Our work is ongoing so there aren’t very many deadlines. We don’t usually have to balance tasks and our priorities change rarely. We thrive on routine.",
  },
];

const managementList = [
  {
    id: "management01",
    title: "Very Horizontal",
    subtext:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, veniam.",
  },
  {
    id: "management02",
    title: "Horizontal",
    subtext:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, delectus?",
  },
  {
    id: "management03",
    title: "Vertical",
    subtext:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio eius voluptates officia, ipsum adipisci nesciunt!",
  },
  {
    id: "management04",
    title: "Very Vertical",
    subtext:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quibusdam error suscipit.",
  },
];

const experimentalList = [
  {
    id: "experimental01",
    title: "Highly Experimental",
    subtext:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, veniam.",
  },
  {
    id: "experimental02",
    title: "Experimental",
    subtext:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, delectus?",
  },
  {
    id: "experimental03",
    title: "Ongoing Business",
    subtext:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio eius voluptates officia, ipsum adipisci nesciunt!",
  },
  {
    id: "experimental04",
    title: "Mostly Ongoing Business",
    subtext:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quibusdam error suscipit.",
  },
];

// shape of values used in Form
export interface FormValues {
  teamSize?: number;
  physicalEnv: string[];
  technology: string[];
  amenities: string[];
  envDescription?: string;
  culturePace?: string;
  management?: string;
  experimental?: string;
  cultureSummary?: string;
  moreCultureSummary?: string;
}

interface WorkEnvFormProps {
  handleSubmit: (values: FormikValues) => void;
  handleModalCancel: () => void;
  handleModalConfirm: () => void;
}

const WorkEnvForm = ({
  handleSubmit,
  handleModalCancel,
  intl,
}: WorkEnvFormProps & InjectedIntlProps): React.ReactElement => {
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
    physicalEnv: Yup.array().required(
      intl.formatMessage(validationMessages.checkboxRequired),
    ),
    technology: Yup.array().required(
      intl.formatMessage(validationMessages.checkboxRequired),
    ),
    amenities: Yup.array().required(
      intl.formatMessage(validationMessages.checkboxRequired),
    ),
    envDescription: Yup.string(),
    culturePace: Yup.mixed()
      .oneOf([
        "culturePace01",
        "culturePace02",
        "culturePace03",
        "culturePace04",
      ])
      .required(intl.formatMessage(validationMessages.checkboxRequired)),
    management: Yup.mixed()
      .oneOf(["management01", "management02", "management03", "management04"])
      .required(intl.formatMessage(validationMessages.checkboxRequired)),
    experimental: Yup.mixed()
      .oneOf([
        "experimental01",
        "experimental02",
        "experimental03",
        "experimental04",
      ])
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

    let cultureSummary = "";
    if (pace) {
      cultureSummary += pace.subtext;
    }

    if (management) {
      cultureSummary += ` ${management.subtext}`;
    }

    if (experimental) {
      cultureSummary += ` ${experimental.subtext}`;
    }

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
          defaultMessage="Applicants care a lot about the team they’ll be working with and the physical workspace as well. Sharing information about these things help applicants determine if they’ll be a good fit, and can reduce the number of “wishful thinking” applications that slow down the screening process."
          description="Description of job poster builder work environment step."
        />
      </p>
      <div data-c-grid-item="base(1of1)">
        <h4 data-c-font-size="h4" data-c-margin="top(triple) bottom(normal)">
          <FormattedMessage
            id="jobBuilder.workEnv.ourWorkEnv"
            defaultMessage="Our Work Environment"
            description="Section 1 of job poster builder work environment step."
          />
        </h4>
        <p data-c-margin="bottom(normal)">
          <FormattedMessage
            id="jobBuilder.workEnv.ourWorkEnvSubtext"
            defaultMessage="Share a little about your physical space, the technology used by your team, and the amenities close to your office. Check all that apply."
            description="Section 1 subtext of job poster builder work environment step."
          />
        </p>
      </div>

      <Formik
        initialValues={{
          teamSize: undefined,
          physicalEnv: [],
          technology: [],
          amenities: [],
          envDescription: "",
          culturePace: "",
          management: "",
          experimental: "",
          cultureSummary: "",
          moreCultureSummary: "",
        }}
        validationSchema={workEnvSchema}
        // TODO: setErrors
        onSubmit={(values, { setSubmitting }): void => {
          setIsModalVisible(true);
          // If custom summary textbox is length is zero, set cultureSummary to generated text
          const cultureSummary =
            values.cultureSummary.length === 0
              ? buildCultureSummary(values)
              : values.cultureSummary;
          const formValues = { ...values, cultureSummary };

          handleSubmit(formValues);
          setSubmitting(false);
        }}
        render={({
          errors,
          touched,
          isSubmitting,
          values,
          setFieldValue,
          setFieldTouched,
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
                required
              >
                {phyEnvData &&
                  phyEnvData.map(
                    ({ name, label }): React.ReactElement => {
                      return (
                        <Field
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
                required
              >
                {techData &&
                  techData.map(
                    ({ name, label }): React.ReactElement => {
                      return (
                        <Field
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
                required
              >
                {amenitiesData &&
                  amenitiesData.map(
                    ({ name, label }): React.ReactElement => {
                      return (
                        <Field
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
                <FormattedMessage
                  id="jobBuilder.workEnv.moreOnWorkEnv"
                  defaultMessage="More about your Environment"
                  description="The title for the more about your environment textbox."
                />
              </p>
              <p data-c-margin="bottom(normal)">
                <FormattedMessage
                  id="jobBuilder.workEnv.thisIsOptional"
                  defaultMessage="This is optional."
                  description="Text indicator for optional sections within form."
                />
              </p>
              <p data-c-margin="bottom(normal)">
                <FormattedMessage
                  id="jobBuilder.workEnv.moreOnWorkEnvSubtext"
                  defaultMessage="Anything else you’d like to add about your work environment? Highlight features of the physical environment, technology and amenities specific to your team."
                  description="Subtext displayed for the more about your environment textbox."
                />
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
                  <FormattedMessage
                    id="jobBuilder.workEnv.culture"
                    defaultMessage="Our Culture"
                    description="Section 2 radio group title of our culture step."
                  />
                </h4>
                <p data-c-margin="bottom(normal)">
                  <FormattedMessage
                    id="jobBuilder.workEnv.cultureSubtext1"
                    defaultMessage="Now let applicants know more about the personality of your team and the type of work that you usually do."
                    description="Subtext 1 displayed of the our culture section."
                  />
                </p>
                <p data-c-margin="bottom(normal)">
                  <FormattedMessage
                    id="jobBuilder.workEnv.cultureSubtext2"
                    defaultMessage="Based on your selections, we’ll create a short paragraph summarizing your work culture. You can edit this paragraph to customize it to your team."
                    description="Subtext 2 displayed of the our culture section."
                  />
                </p>
              </div>
              <div
                className="job-builder-culture-block"
                data-c-grid-item="base(1of1)"
              >
                <div data-c-grid="gutter">
                  <RadioGroup
                    id="culturePace"
                    label={intl.formatMessage(
                      formMessages.fastPacedSteadyLabel,
                    )}
                    required
                    touched={touched.culturePace}
                    error={errors.culturePace}
                    value={values.culturePace}
                    grid="base(1of1) tl(1of3)"
                  >
                    {culturePaceList.map(
                      ({ id, title }): React.ReactElement => {
                        return (
                          <Field
                            name="culturePace"
                            component={RadioInput}
                            id={id}
                            label={title}
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
                    {culturePaceList.map(
                      ({ id, title, subtext }): React.ReactElement => {
                        return (
                          <ContextBlockItem
                            contextId={id}
                            title={title}
                            subtext={subtext}
                            className="job-builder-context-item"
                            active={values.culturePace === id}
                          />
                        );
                      },
                    )}
                  </ContextBlock>
                </div>
              </div>
              <div
                className="job-builder-culture-block"
                data-c-grid-item="base(1of1)"
              >
                <div data-c-grid="gutter">
                  <RadioGroup
                    id="management"
                    label={intl.formatMessage(formMessages.managementLabel)}
                    required
                    touched={touched.management}
                    error={errors.management}
                    value={values.management}
                    grid="base(1of1) tl(1of3)"
                  >
                    {managementList.map(
                      ({ id, title }): React.ReactElement => {
                        return (
                          <Field
                            name="management"
                            component={RadioInput}
                            id={id}
                            label={title}
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
                    {managementList.map(
                      ({ id, title, subtext }): React.ReactElement => {
                        return (
                          <ContextBlockItem
                            contextId={id}
                            title={title}
                            subtext={subtext}
                            className="job-builder-context-item"
                            active={values.management === id}
                          />
                        );
                      },
                    )}
                  </ContextBlock>
                </div>
              </div>
              <div
                className="job-builder-culture-block"
                data-c-grid-item="base(1of1)"
              >
                <div data-c-grid="gutter">
                  <RadioGroup
                    id="experimental"
                    label={intl.formatMessage(formMessages.managementLabel)}
                    required
                    touched={touched.experimental}
                    error={errors.experimental}
                    value={values.experimental}
                    grid="base(1of1) tl(1of3)"
                  >
                    {experimentalList.map(
                      ({ id, title }): React.ReactElement => {
                        return (
                          <Field
                            name="experimental"
                            component={RadioInput}
                            id={id}
                            label={title}
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
                    {experimentalList.map(
                      ({ id, title, subtext }): React.ReactElement => {
                        return (
                          <ContextBlockItem
                            contextId={id}
                            title={title}
                            subtext={subtext}
                            className="job-builder-context-item"
                            active={values.experimental === id}
                          />
                        );
                      },
                    )}
                  </ContextBlock>
                </div>
              </div>
              <div data-c-grid-item="base(1of1)">
                <p
                  data-c-margin="bottom(normal) top(normal)"
                  data-c-font-weight="bold"
                >
                  <FormattedMessage
                    id="jobBuilder.workEnv.cultureSummary"
                    defaultMessage="Culture Summary"
                    description="The header for the culture summary section."
                  />
                </p>
                <p data-c-margin="bottom(normal)">
                  <FormattedMessage
                    id="jobBuilder.workEnv.cultureSummarySubtext"
                    defaultMessage="Here is the short paragraph summarizing your work culture which will appear on the job poster. Copy and paste it into the text box below if you want to customize it to the personality of your team and the way you work."
                    description="The subtext for the culture summary section."
                  />
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
                component={TextArea}
                grid="base(1of1)"
              />
              <p data-c-margin="bottom(normal)" data-c-font-weight="bold">
                <FormattedMessage
                  id="jobBuilder.workEnv.specialWorkCulture"
                  defaultMessage="Anything Special About Your Work Culture?"
                  description="Title for subsection in our work culture."
                />
              </p>
              <p data-c-margin="bottom(normal)">
                <FormattedMessage
                  id="jobBuilder.workEnv.thisIsOptional"
                  defaultMessage="This is optional."
                  description="Text indicator for optional sections within form."
                />
              </p>
              <p data-c-margin="bottom(normal)">
                <FormattedMessage
                  id="jobBuilder.workEnv.specialWorkCultureSubtext"
                  defaultMessage="Does your team care a lot about something else? Proud of the team’s record of getting results? Strong commitment to mental wellness? Actively involved in advancing diversity and inclusion? LGBTQ+ champions? Here’s a chance to let applicants know about the culture of the team they’ll potentially be joining."
                  description="Subtext for subsection in our work culture."
                />
              </p>
              <Field
                type="textarea"
                id="more_culture_summary"
                name="moreCultureSummary"
                label={intl.formatMessage(formMessages.specialWorkCultureLabel)}
                placeholder={intl.formatMessage(
                  formMessages.textAreaPlaceholder1,
                )}
                component={TextArea}
                grid="base(1of1)"
              />
              <div data-c-alignment="centre" data-c-grid-item="base(1of1)">
                {/* <!-- Modal trigger, same as last step. --> */}
                <button
                  form="form"
                  type="submit"
                  disabled={isSubmitting}
                  data-c-button="solid(c1)"
                  data-c-dialog-action="open"
                  data-c-dialog-id="example-dialog-01"
                  data-c-radius="rounded"
                >
                  <FormattedMessage
                    id="jobBuilder.workEnv.submitButtonLabel"
                    defaultMessage="Preview Work Environment"
                    description="Label for work environment submit button."
                  />
                </button>
              </div>
            </Form>
            {isModalVisible && (
              <WorkEnvModal
                modalConfirm={(): void => {
                  setIsModalVisible(false);
                  handleSubmit(values);
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
            )}
          </>
        )}
      />
    </div>
  );
};

const WorkEnvFormContainer = injectIntl(WorkEnvForm);
export default WorkEnvFormContainer;
