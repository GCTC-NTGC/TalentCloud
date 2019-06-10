import * as React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "../Forms/Input";
import TextArea from "../Forms/TextArea";
import CheckboxGroup from "../Forms/CheckboxGroup";
import RadioGroup from "../Forms/RadioGroup";
import RadioButton from "../Forms/RadioButton";
import ContextBlock from "../ContextBlock/ContextBlock";
import ContextBlockItem from "../ContextBlock/ContextBlockItem";

const physicalEnvOptions: any = [
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

const technologyOptions = [
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

const amenitiesOptions = [
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

// shape of values used in Form
interface FormValues {
  physicalEnv: string[];
  technology: string[];
  amenities: string[];
  envDescription: string;
  builder03Pace: string;
}

// The type of props FormikForm receives
interface FormProps {
  initPhysicalEnv?: string[];
  initTechnology?: string[];
  initAmeinties?: string[];
  initEnvDescription?: string;
  initBuilder03Pace?: string;
}

export const mapPropsToValues = ({
  initPhysicalEnv,
  initTechnology,
  initAmeinties,
  initEnvDescription,
  initBuilder03Pace,
}): FormValues => ({
  physicalEnv: initPhysicalEnv || [],
  technology: initTechnology || [],
  amenities: initAmeinties || [],
  envDescription: initEnvDescription || "",
  builder03Pace: initBuilder03Pace || "",
});

export const validationSchema = Yup.object().shape({
  physicalEnv: Yup.array().required("At least one checkbox is required"),
  technology: Yup.array().required("At least one checkbox is required"),
  amenities: Yup.array().required("At least one checkbox is required"),
  envDescription: Yup.string().required(
    "Please describe your workplace environment, or you're never getting to the next step",
  ),
  builder03Pace: Yup.mixed()
    .oneOf([
      "builder03PaceOption01",
      "builder03PaceOption02",
      "builder03PaceOption03",
      "builder03PaceOption04",
    ])
    .required("At least one checkbox is required"),
});

export const handleSubmit = (values): void => {
  // This is where are async api requests go, example below
  console.log(values);
};

const RadioInput = ({
  field: { name, value, onChange, onBlur },
  htmlId,
  label,
  ...props
}): React.ReactElement => (
  <label htmlFor={htmlId}>
    {console.log(value)}
    <input
      data-c-font-weight="800"
      id={htmlId}
      name={name}
      type="radio"
      checked={htmlId === value}
      value={htmlId}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
    <span>{label}</span>
  </label>
);

export const Step3InnerForm = ({
  values,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
}): React.ReactElement => {
  return (
    <>
      <Form id="form" data-c-margin="bottom(normal)">
        <CheckboxGroup
          id="physicalEnv"
          label="Our Physical Environment"
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
          More about your Environment
        </p>
        <p data-c-margin="bottom(normal)">This is optional.</p>
        <p data-c-margin="bottom(normal)">
          Anything else you’d like to add about your work environment? Highlight
          features of the physical environment, technology and amenities
          specific to your team.
        </p>
        <Field
          type="textarea"
          htmlId="enviroment_description"
          name="envDescription"
          label="More About Your Environment"
          component={TextArea}
          grid="base(1of2)"
          required
        />
        <div
          className="job-builder-culture-block"
          data-c-grid-item="base(1of1)"
        >
          <div data-c-grid="gutter">
            <RadioGroup
              htmlId="builder03Pace"
              label="Fast-paced vs. Steady:"
              required
              touched={touched.builder03Pace}
              error={errors.builder03Pace}
              grid="base(1of1) tl(1of3)"
            >
              <Field
                inputType="radio"
                name="builder03Pace"
                component={Input}
                htmlId="builder03PaceOption01"
                label="Very Fast-paced"
                contextId="Pace1"
                trigger
              />
              <Field
                inputType="radio"
                name="builder03Pace"
                component={Input}
                htmlId="builder03PaceOption02"
                label="Fast-paced"
                contextId="Pace2"
                trigger
              />
              <Field
                inputType="radio"
                name="builder03Pace"
                component={Input}
                htmlId="builder03PaceOption03"
                label="Steady"
                contextId="Pace3"
                trigger
              />
              <Field
                inputType="radio"
                name="builder03Pace"
                component={Input}
                htmlId="builder03PaceOption04"
                label="Very Steady"
                contextId="Pace4"
                trigger
              />
            </RadioGroup>
            <ContextBlock
              className="job-builder-context-block"
              grid="base(1of1) tl(2of3)"
            >
              <ContextBlockItem
                id="Pace1"
                title="Very Fast-paced"
                subtext="Our deadlines are tight, we balance several tasks at the same time, and our priorities are always changing. Our work should come with running shoes!"
                className="job-builder-context-item"
                active={values.builder03Pace === "builder03PaceOption01"}
              />
              <ContextBlockItem
                id="Pace2"
                title="Fast-paced"
                subtext="Our deadlines are usually close together, we balance some tasks at the same time, and our priorities change regularly. Our work keeps us on our toes!"
                className="job-builder-context-item"
                active={values.builder03Pace === "builder03PaceOption02"}
              />
              <ContextBlockItem
                id="Pace3"
                title="Steady"
                subtext="Our deadlines are regular and predictable, we balance a couple of tasks at a time, and our priorities change occasionally. We keep things on an even keel."
                className="job-builder-context-item"
                active={values.builder03Pace === "builder03PaceOption03"}
              />
              <ContextBlockItem
                id="Pace4"
                title="Very Steady"
                subtext="Our work is ongoing so there aren’t very many deadlines. We don’t usually have to balance tasks and our priorities change rarely. We thrive on routine."
                className="job-builder-context-item"
                active={values.builder03Pace === "builder03PaceOption04"}
              />
            </ContextBlock>
          </div>
        </div>

        <button type="submit">submit</button>
      </Form>
    </>
  );
};

export default withFormik<FormProps, FormValues>({
  displayName: "Step0Form",
  mapPropsToValues,
  validationSchema,
  handleSubmit,
})(Step3InnerForm);
