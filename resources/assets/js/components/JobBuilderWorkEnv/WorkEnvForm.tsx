/* eslint-disable jsx-a11y/label-has-associated-control, camelcase, @typescript-eslint/camelcase */
import React, { useState } from "react";
import { withFormik, Form, Field, FormikProps } from "formik";
import * as Yup from "yup";
import {
  injectIntl,
  InjectedIntlProps,
  IntlProvider,
  FormattedMessage,
  defineMessages,
  addLocaleData,
} from "react-intl";
import locale_en from "react-intl/locale-data/en";
import locale_fr from "react-intl/locale-data/fr";
import Input from "../Forms/Input";
import TextArea from "../Forms/TextArea";
import CheckboxGroup from "../Forms/CheckboxGroup";
import RadioGroup from "../Forms/RadioGroup";
import ContextBlock from "../ContextBlock/ContextBlock";
import ContextBlockItem from "../ContextBlock/ContextBlockItem";
import CopyToClipboardButton from "./CopyToClipboardButton";
import WorkEnvModal from "./WorkEnvModal";

addLocaleData([...locale_en, ...locale_fr]);

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
  // Should we use textAreaPlaceholder1:{...} instead?
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

// Are the options being fetched from API?

export const physicalEnvOptions: any = [
  {
    label: "Open Concept",
    name: "open_concept",
  },
  {
    label: "Private",
    name: "private",
  },
  {
    label: "Assigned Seating",
    name: "assigned_seating",
  },
  {
    label: "Lots of Windoes",
    name: "lots_of_windows",
  },
  {
    label: "Natural Light",
    name: "natural_light",
  },
  {
    label: "Suitable for Smudging",
    name: "smudging",
  },
  {
    label: "None of the Above",
    name: "none_env",
  },
];

export const technologyOptions = [
  {
    label: "Video Conferencing (e.g. Skype, Zoom)",
    name: "video_confrencing",
  },
  {
    label: "Collaboration (e.g. Slack, Hangouts",
    name: "collaboration",
  },
  {
    label: "File Sharing (e.g. Google Drive, Dropbox)",
    name: "file_sharing",
  },
  {
    label: "Task Management (e.g. Trello, Asana)",
    name: "task_management",
  },
  {
    label: "Version Control (e.g. Github, Gitlab)",
    name: "version_control",
  },
  {
    label: "Access to external, unfiltered Wi-Fi.",
    name: "access_to_external",
  },
  {
    label: "None of the Above",
    name: "none_tech",
  },
];

export const amenitiesOptions = [
  {
    label: "Cafeteria On-site",
    name: "cafeteria_on_site",
  },
  {
    label: "Close to Transit",
    name: "close_to_transit",
  },
  {
    label: "Walking Distance to Restaurants/Malls",
    name: "walking_distances_resturants",
  },
  {
    label: "Downtown",
    name: "downtown",
  },
  {
    label: "Nearby Fitness Centre",
    name: "nearly_fitness_center",
  },
  {
    label: "Easy Access to Parking",
    name: "easy_access_to_parking",
  },
  {
    label: "None of the Above",
    name: "none_amen",
  },
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

/** Compiles and returns all the active radio buttons corresponding context box values within the culture section  */
const buildCultureSummary = (values): string => {
  const pace = culturePaceList.find(({ id }) => id === values.culturePace);
  const management = managementList.find(({ id }) => id === values.management);

  let summary = "";
  if (pace) {
    summary += pace.subtext;
  }

  if (management) {
    summary += ` ${management.subtext}`;
  }
  return summary;
};

const copyTest = React.createRef<HTMLParagraphElement>();

// shape of values used in Form
export interface FormValues {
  physicalEnv: string[];
  technology: string[];
  amenities: string[];
  envDescription?: string;
  culturePace?: string;
  management?: string;
  customCultureSummary?: string;
  moreCultureSummary?: string;
}

// The type of props FormikForm receives
export interface FormProps {
  initPhysicalEnv?: string[];
  initTechnology?: string[];
  initAmeinties?: string[];
  initEnvDescription?: string;
  initCulturePace?: string;
  initManagement?: string;
  initCustumCultureSummary?: string;
  initMoreCultureSummary?: string;
}

export const mapPropsToValues = ({
  initPhysicalEnv,
  initTechnology,
  initAmeinties,
  initEnvDescription,
  initCulturePace,
  initManagement,
  initCustumCultureSummary,
  initMoreCultureSummary,
}): FormValues => ({
  physicalEnv: initPhysicalEnv || [],
  technology: initTechnology || [],
  amenities: initAmeinties || [],
  envDescription: initEnvDescription || "",
  culturePace: initCulturePace || "",
  management: initManagement || "",
  customCultureSummary: initCustumCultureSummary || "",
  moreCultureSummary: initMoreCultureSummary || "",
});

export const validationSchema = (intl): InjectedIntlProps => {
  return Yup.object().shape({
    physicalEnv: Yup.array().required(
      intl.formatMessage(formMessages.physicalEnvLabel),
    ),
    technology: Yup.array().required("At least one checkbox is required"),
    amenities: Yup.array().required("At least one checkbox is required"),
    envDescription: Yup.string().required(
      "Please describe your workplace environment, or you're never getting to the next step",
    ),
    culturePace: Yup.mixed()
      .oneOf([
        "culturePace01",
        "culturePace02",
        "culturePace03",
        "culturePace04",
      ])
      .required("At least one checkbox is required"),
  });
};

export const handleSubmit = (values, actions): void => {
  // This is where are async api requests go, example below
  // The following only triggers after validations pass
  console.log(values);
  actions.setSubmitting(false); // Required by Formik to finish the submission cycle
};

export const Step3InnerForm = ({
  values,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
  isSubmitting,
  intl,
}: FormikProps<FormValues> & InjectedIntlProps): React.ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalParent = document.querySelector("#modal-root");
  return (
    <>
      <Form id="form" data-c-margin="bottom(normal)">
        <Field
          type="number"
          name="title"
          component={Input}
          required
          grid="tl(1of2)"
          id="teamSize"
          label="Team Size"
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
          {physicalEnvOptions &&
            physicalEnvOptions.map(
              ({ name, label }): React.ReactElement => {
                return (
                  <Field
                    type="checkbox"
                    htmlId={name}
                    // htmlId={`physEnv${index}`}
                    name={name}
                    label={label}
                    component={Input}
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
          {technologyOptions &&
            technologyOptions.map(
              ({ name, label }): React.ReactElement => {
                return (
                  <Field
                    type="checkbox"
                    htmlId={name}
                    name={name}
                    label={label}
                    component={Input}
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
          {amenitiesOptions &&
            amenitiesOptions.map(
              ({ name, label }): React.ReactElement => {
                return (
                  <Field
                    type="checkbox"
                    htmlId={name}
                    name={name}
                    label={label}
                    component={Input}
                    grid="base(1of2)"
                  />
                );
              },
            )}
        </CheckboxGroup>
        <p data-c-margin="bottom(normal) top(normal)" data-c-font-weight="bold">
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
          htmlId="enviroment_description"
          name="envDescription"
          label={intl.formatMessage(formMessages.moreOnWorkEnvLabel)}
          placeholder={intl.formatMessage(
            formMessages.moreOnWorkEnvPlaceholder,
          )}
          component={TextArea}
          grid="base(1of2)"
          required
        />
        <div data-c-grid-item="base(1of1)">
          <h4 data-c-font-size="h4" data-c-margin="top(double) bottom(normal)">
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
              htmlId="culturePace"
              label={intl.formatMessage(formMessages.fastPacedSteadyLabel)}
              required
              touched={touched.culturePace}
              error={errors.culturePace}
              grid="base(1of1) tl(1of3)"
            >
              {culturePaceList.map(
                ({ id, title }): React.ReactElement => {
                  return (
                    <Field
                      inputType="radio"
                      name="culturePace"
                      component={Input}
                      htmlId={id}
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
              htmlId="management"
              label={intl.formatMessage(formMessages.managementLabel)}
              required
              touched={touched.management}
              error={errors.management}
              grid="base(1of1) tl(1of3)"
            >
              {managementList.map(
                ({ id, title }): React.ReactElement => {
                  return (
                    <Field
                      inputType="radio"
                      name="management"
                      component={Input}
                      htmlId={id}
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
        <div data-c-grid-item="base(1of1)">
          <p data-c-margin="bottom(normal)" data-c-font-weight="bold">
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
            reference={copyTest}
          />
          <div
            data-c-alignment="base(centre) tl(right)"
            data-c-margin="top(normal)"
          >
            <CopyToClipboardButton reference={copyTest} />
          </div>
        </div>
        <Field
          type="textarea"
          htmlId="custom_culture_summary"
          name="customCultureSummary"
          label={intl.formatMessage(formMessages.customCultureSummaryLabel)}
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
          htmlId="more_culture_summary"
          name="moreCultureSummary"
          label={intl.formatMessage(formMessages.specialWorkCultureLabel)}
          placeholder={intl.formatMessage(formMessages.textAreaPlaceholder1)}
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
            onClick={(): void => {
              setIsModalVisible(true);
            }}
          >
            <FormattedMessage
              id="jobBuilder.workEnv.submitButtonLabel"
              defaultMessage="Next"
              description="Label for work environment submit button."
            />
          </button>
        </div>
      </Form>
      <WorkEnvModal
        isVisible={isModalVisible}
        parentElement={modalParent}
        values={values}
      />
    </>
  );
};

export default withFormik<FormProps, FormValues>({
  displayName: "WorkEnvForm",
  mapPropsToValues,
  validationSchema,
  handleSubmit,
})(injectIntl(Step3InnerForm));
