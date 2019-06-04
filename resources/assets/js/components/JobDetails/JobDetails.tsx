/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Modal from "../Modal";

const JobSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required."),
  termLength: Yup.number()
    .min(1, "Too Short!")
    .max(36, "Too Long!")
    .required("This field is required."),
  classification: Yup.mixed()
    .oneOf(
      ["AS", "BI", "CO", "CR", "CS", "EC", "EX", "FO", "IS", "PC", "PE", "PM"],
      "Please select from the available options",
    )
    .required("This field is required."),
  level: Yup.number()
    .min(1, "Levels begin at one")
    .max(9, "There are only nine levels")
    .required("This field is required."),
  securityLevel: Yup.number()
    .min(1, "")
    .max(3, "")
    .required("This field is required."),
  language: Yup.number()
    .min(1, "")
    .max(5, "")
    .required("This field is required."),
  city: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("This field is required."),
  province: Yup.mixed()
    .oneOf(
      [
        "AB",
        "BC",
        "MB",
        "NB",
        "NL",
        "NS",
        "NT",
        "NU",
        "ON",
        "PE",
        "QC",
        "SK",
        "YT",
      ],
      "Please select from the available options",
    )
    .required("This field is required."),
  remoteWork: Yup.mixed()
    .oneOf(
      ["remoteWorkWorld", "remoteWorkCanada", "remoteWorkNone"],
      "Please select from the available options",
    )
    .required("This field is required."),
  telework: Yup.mixed()
    .oneOf(
      [
        "teleworkAlways",
        "teleworkFrequently",
        "teleworkOccasionally",
        "teleworkSometimes",
        "teleworkNever",
      ],
      "Please select from the available options",
    )
    .required("This field is required."),
  flexHours: Yup.mixed()
    .oneOf(
      [
        "flexHoursAlways",
        "flexHoursFrequently",
        "flexHoursOccasionally",
        "flexHoursSometimes",
        "flexHoursNever",
      ],
      "Please select from the available options",
    )
    .required("This field is required."),
});

const TextInput = ({
  field: { name, value, onChange, onBlur },
  form: { errors },
  id,
  label,
  grid,
  type,
  placeholder,
  required,
  minLength,
  maxLength,
  ...props
}): React.ReactElement => (
  <div
    data-c-grid-item={grid}
    data-c-input={type}
    data-c-required={required}
    data-c-invalid={errors[name] ? true : null}
  >
    <label htmlFor={id}>{label}</label>
    <span>Required</span>
    <div>
      <input
        data-c-font-weight="800"
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        onBlur={onBlur}
        {...props}
      />
    </div>
    <span>{errors[name]}</span>
  </div>
);

const RadioInput = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  ...props
}): React.ReactElement => (
  <label htmlFor={id}>
    <input
      data-c-font-weight="800"
      id={id}
      name={name}
      type="radio"
      checked={id === value}
      value={id}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
    <span>{label}</span>
  </label>
);

const RadioGroup = ({
  id,
  label,
  required,
  grid,
  info,
  children,
  value, // eslint-disable-line
  error,
  touched,
}): React.ReactElement => {
  const hasError = !!error && touched;
  return (
    <div
      data-c-grid-item={grid}
      data-c-input="radio"
      data-c-required={required}
      data-c-invalid={hasError ? true : null}
    >
      {info}
      <label htmlFor={id}>{label}</label>
      <span>Required</span>
      <div id={id} role="radiogroup">
        {children}
      </div>
      <span>{error}</span>
    </div>
  );
};

const SelectInput = ({
  field: { name, value, onChange, onBlur },
  form: { errors },
  id,
  label,
  grid,
  required,
  options,
  nullSelection,
  ...props
}): React.ReactElement => (
  <div
    data-c-grid-item={grid}
    data-c-input="select"
    data-c-required={required}
    data-c-invalid={errors[name] ? true : null}
  >
    <label htmlFor={id}>{label}</label>
    <span>Required</span>
    <div>
      <i className="fa fa-caret-down" />
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      >
        <option value="">{nullSelection}</option>
        {options.map(
          (option): React.ReactElement => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ),
        )}
      </select>
    </div>
    <span>{errors[name]}</span>
  </div>
);

const JobDetails = (): React.ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <div data-c-container="form" data-c-padding="top(triple) bottom(triple)">
        <h3
          data-c-font-size="h3"
          data-c-font-weight="bold"
          data-c-margin="bottom(double)"
        >
          Job Information
        </h3>
        <Formik
          initialValues={{
            title: "",
            termLength: "",
            classification: "",
            level: "",
            securityLevel: "",
            language: "",
            city: "",
            province: "",
            remoteWork: "remoteWorkCanada",
            telework: "teleworkFrequently",
            flexHours: "flexHoursFrequently",
          }}
          validationSchema={JobSchema}
          onSubmit={(values, actions): void => {
            // The following only triggers after validations pass
            setIsModalVisible(true);
            console.table(values);
            actions.setSubmitting(false); // Required by Formik to finish the submission cycle
          }}
          render={({
            errors,
            touched,
            status,
            isSubmitting,
            values,
          }): React.ReactElement => (
            <>
              <Form id="job-information" data-c-grid="gutter">
                <Field
                  type="text"
                  name="title"
                  component={TextInput}
                  required
                  grid="tl(1of2)"
                  id="builder02JobTitle"
                  label="What is the job title?"
                  placeholder="e.g. Product Designer"
                />
                <Field
                  type="number"
                  name="termLength"
                  component={TextInput}
                  placeholder="e.g. 3"
                  required
                  grid="tl(1of2)"
                  id="builder02TermLength"
                  label="How long is the term (in months)?"
                />
                <Field
                  name="classification"
                  id="builder02Classification"
                  label="What is the classification?"
                  grid="tl(1of2)"
                  component={SelectInput}
                  required
                  nullSelection="Select a classification..."
                  options={[
                    { value: "AS", label: "AS - Administrative Services" },
                    { value: "BI", label: "BI - Biological Sciences" },
                    { value: "CO", label: "CO - Commerce" },
                    { value: "CR", label: "CR - Clerical and Regulatory" },
                    { value: "CS", label: "CS - Computer Systems" },
                    {
                      value: "EC",
                      label: "EC - Economics and Social Science Services",
                    },
                    { value: "EX", label: "EX - Executive" },
                    { value: "FO", label: "FO - Forestry" },
                    { value: "IS", label: "IS - Information Services" },
                    { value: "PC", label: "PC - Physical Sciences" },
                    { value: "PE", label: "PE - Personnel Administration" },
                    { value: "PM", label: "PM - Programme Administration" },
                  ]}
                />
                <Field
                  name="level"
                  id="builder02Level"
                  component={SelectInput}
                  required
                  label="What is the level?"
                  grid="tl(1of2)"
                  nullSelection="Select a level..."
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                    { value: "5", label: "5" },
                    { value: "6", label: "6" },
                    { value: "7", label: "7" },
                    { value: "8", label: "8" },
                    { value: "9", label: "9" },
                  ]}
                />
                <Field
                  name="securityLevel"
                  id="builder02SecurityLevel"
                  component={SelectInput}
                  required
                  grid="tl(1of2)"
                  label="What is the security level?"
                  nullSelection="Select a security level..."
                  options={[
                    { value: "1", label: "Reliability" },
                    { value: "2", label: "Secret" },
                    { value: "3", label: "Top Secret" },
                  ]}
                />
                <Field
                  name="language"
                  id="builder02Language"
                  component={SelectInput}
                  required
                  grid="tl(1of2)"
                  label="What is the language profile?"
                  nullSelection="Select a language profile..."
                  options={[
                    { value: "1", label: "English - Essential" },
                    { value: "2", label: "French - Essential" },
                    { value: "3", label: "Bilingual - Advanced (CBC)" },
                    { value: "4", label: "Bilingual - Intermediate (BBB)" },
                    { value: "5", label: "English or French" },
                  ]}
                />
                <Field
                  name="city"
                  type="text"
                  component={TextInput}
                  required
                  grid="tl(1of2)"
                  id="builder02City"
                  label="What city is the team located in?"
                  placeholder="e.g. Ottawa"
                />
                <Field
                  name="province"
                  id="builder02Province"
                  component={SelectInput}
                  required
                  grid="tl(1of2)"
                  label="What province is the team located in?"
                  nullSelection="Select a province..."
                  options={[
                    { value: "AB", label: "Alberta" },
                    { value: "BC", label: "British Columbia" },
                    { value: "MB", label: "Manitoba" },
                    { value: "NB", label: "New Brunswick" },
                    { value: "NL", label: "Newfoundland and Labrador" },
                    { value: "NS", label: "Nova Scotia" },
                    { value: "NT", label: "Northwest Territories" },
                    { value: "NU", label: "Nunavut" },
                    { value: "ON", label: "Ontario" },
                    { value: "PE", label: "Prince Edward Island" },
                    { value: "QC", label: "Quebec" },
                    { value: "SK", label: "Saskatchewan" },
                    { value: "YT", label: "Yukon" },
                  ]}
                />
                <RadioGroup
                  id="remoteWork"
                  label="Select a remote work option:"
                  required
                  grid="base(1of1)"
                  error={errors.remoteWork}
                  touched={touched.remoteWork}
                  info={
                    <>
                      <p
                        data-c-margin="bottom(normal)"
                        data-c-font-weight="bold"
                      >
                        Is remote work allowed?
                      </p>
                      <p data-c-margin="bottom(normal)">
                        Want the best talent in Canada? You increase your
                        chances when you allow those in other parts of Canada to
                        apply. Regional diversity also adds perspective to your
                        team culture. Make sure to discuss this in advance with
                        your HR Advisor.
                      </p>
                    </>
                  }
                  value={values.remoteWork}
                >
                  <Field
                    name="remoteWork"
                    component={RadioInput}
                    id="remoteWorkWorld"
                    label="Yes, I’m willing to supervise employees anywhere in the world."
                  />
                  <Field
                    name="remoteWork"
                    component={RadioInput}
                    id="remoteWorkCanada"
                    label="Yes, I’m willing to supervise employees in any province or
              territory in Canada."
                  />
                  <Field
                    name="remoteWork"
                    component={RadioInput}
                    id="remoteWorkNone"
                    label="No, I require the employee in this position to be in the same
              geographic location as the office."
                  />
                </RadioGroup>
                <RadioGroup
                  id="telework"
                  label="Select a telework option:"
                  required
                  grid="base(1of1)"
                  info={
                    <>
                      <p
                        data-c-margin="bottom(normal)"
                        data-c-font-weight="bold"
                      >
                        How often is telework allowed?
                      </p>
                      <p data-c-margin="bottom(normal)">
                        Demonstrate that you trust your employees and you have a
                        positive workplace culture. Allow telework as an option.
                      </p>
                    </>
                  }
                  error={errors.telework}
                  touched={touched.telework}
                  value={values.telework}
                >
                  <Field
                    id="teleworkAlways"
                    name="telework"
                    component={RadioInput}
                    label="Almost Always"
                  />
                  <Field
                    id="teleworkFrequently"
                    name="telework"
                    component={RadioInput}
                    label="Frequently"
                  />
                  <Field
                    id="teleworkSometimes"
                    name="telework"
                    component={RadioInput}
                    label="Sometimes"
                  />
                  <Field
                    id="teleworkOccasionally"
                    name="telework"
                    component={RadioInput}
                    label="Occasionally"
                  />
                  <Field
                    id="teleworkNever"
                    name="telework"
                    component={RadioInput}
                    label="Almost Never"
                  />
                </RadioGroup>
                <RadioGroup
                  id="flexHours"
                  required
                  grid="base(1of1)"
                  info={
                    <>
                      <p
                        data-c-margin="bottom(normal)"
                        data-c-font-weight="bold"
                      >
                        How often are flexible hours allowed?
                      </p>
                      <p data-c-margin="bottom(normal)">
                        Want to support a more gender inclusive workplace?
                        Studies show allowing flex hours is a great way to
                        improve opportunities for women and parents.
                      </p>
                    </>
                  }
                  label="Select a flexible hours option:"
                  error={errors.flexHours}
                  touched={touched.flexHours}
                  value={values.flexHours}
                >
                  <Field
                    id="flexHoursAlways"
                    name="flexHours"
                    component={RadioInput}
                    label="Almost Always"
                  />
                  <Field
                    id="flexHoursFrequently"
                    name="flexHours"
                    component={RadioInput}
                    label="Frequently"
                  />
                  <Field
                    id="flexHoursSometimes"
                    name="flexHours"
                    component={RadioInput}
                    label="Sometimes"
                  />
                  <Field
                    id="flexHoursOccasionally"
                    name="flexHours"
                    component={RadioInput}
                    label="Occasionally"
                  />
                  <Field
                    id="flexHoursNever"
                    name="flexHours"
                    component={RadioInput}
                    label="Almost Never"
                  />
                </RadioGroup>
                {status && status.msg && <div>{status.msg}</div>}
                <div data-c-alignment="centre" data-c-grid-item="base(1of1)">
                  <button
                    data-c-button="solid(c1)"
                    data-c-dialog-action="open"
                    data-c-dialog-id="job-details-preview"
                    data-c-radius="rounded"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Next
                  </button>
                </div>
              </Form>
              <Modal
                id="job-details-preview"
                visible={isModalVisible}
                onModalConfirm={() => {
                  console.log("Confirmed");
                  setIsModalVisible(false);
                }}
                onModalCancel={() => {
                  console.log("Cancelled");
                  setIsModalVisible(false);
                }}
              >
                <Modal.Header>
                  <div
                    data-c-background="c1(100)"
                    data-c-border="bottom(thin, solid, black)"
                    data-c-padding="normal"
                  >
                    <h5
                      data-c-colour="white"
                      data-c-font-size="h4"
                      id="job-details-preview-title"
                    >
                      You&apos;re off to a great start!
                    </h5>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <div
                    data-c-border="bottom(thin, solid, black)"
                    data-c-padding="normal"
                    id="job-details-preview"
                  >
                    Here&apos;s a preview of the Job Information you just
                    entered. Feel free to go back and edit things or move to the
                    next step if you&apos;re happy with it.
                  </div>
                  <div
                    data-c-background="grey(20)"
                    data-c-border="bottom(thin, solid, black)"
                    data-c-padding="normal"
                  >
                    <div
                      className="manager-job-card"
                      data-c-background="white(100)"
                      data-c-padding="normal"
                      data-c-radius="rounded"
                    >
                      <h3
                        data-c-font-size="h3"
                        data-c-font-weight="bold"
                        data-c-margin="bottom(half)"
                      >
                        {values.title}
                      </h3>
                      <p data-c-font-size="h4" data-c-margin="bottom(normal)">
                        Department
                      </p>
                      <p data-c-margin="bottom(half)">
                        <i
                          data-c-colour="c1"
                          className="fas fa-map-marker-alt"
                          title="Location Icon."
                        >
                          &nbsp;&nbsp;
                        </i>
                        {values.city}, {values.province}
                      </p>
                      {values.remoteWork !== "none" && (
                        <p>
                          <i
                            data-c-colour="c1"
                            className="fas fa-home"
                            title="Remote Work Icon."
                          >
                            &nbsp;&nbsp;
                          </i>
                          Remote Work Allowed
                        </p>
                      )}
                      <h4
                        data-c-font-size="h4"
                        data-c-font-weight="bold"
                        data-c-margin="top(double) bottom(normal)"
                      >
                        Basic Information
                      </h4>
                      <div data-c-grid="gutter">
                        <div data-c-grid-item="tp(1of2)">
                          <span
                            data-c-colour="c1"
                            data-c-margin="bottom(quarter)"
                          >
                            Average Annual Salary
                          </span>
                          <span>Talent Cloud will add this.</span>
                        </div>
                        <div data-c-grid-item="tp(1of2)">
                          <span
                            data-c-colour="c1"
                            data-c-margin="bottom(quarter)"
                          >
                            Language Profile
                          </span>
                          <span>{values.language}</span>
                        </div>
                        <div data-c-grid-item="tp(1of2)">
                          <span
                            data-c-colour="c1"
                            data-c-margin="bottom(quarter)"
                          >
                            Duration
                          </span>
                          <span>{values.termLength} Months</span>
                        </div>
                        <div data-c-grid-item="tp(1of2)">
                          <span
                            data-c-colour="c1"
                            data-c-margin="bottom(quarter)"
                          >
                            Security Clearance
                          </span>
                          <span>{values.securityLevel}</span>
                        </div>
                        <div data-c-grid-item="tp(1of2)">
                          <span
                            data-c-colour="c1"
                            data-c-margin="bottom(quarter)"
                          >
                            Target Start Date
                          </span>
                          <span>This comes later.</span>
                        </div>
                        <div data-c-grid-item="tp(1of2)">
                          <span
                            data-c-colour="c1"
                            data-c-margin="bottom(quarter)"
                          >
                            Government Classification
                          </span>
                          <span>
                            {values.classification}-{values.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Modal.FooterCancelBtn>Go Back</Modal.FooterCancelBtn>
                  <Modal.FooterConfirmBtn>Next Step</Modal.FooterConfirmBtn>
                </Modal.Footer>
              </Modal>
            </>
          )}
        />
      </div>
      <div data-c-dialog-overlay={isModalVisible ? "active" : ""} />
    </>
  );
};

export default JobDetails;

if (document.getElementById("job-details")) {
  const rootEl = document.getElementById("job-details");
  ReactDOM.render(<JobDetails />, rootEl);
}
