import * as React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import TextArea from "../Forms/TextArea";

// shape of values used in Form
interface FormValues {
  teamImpact: string;
  hireImpact: string;
}

// The type of props FormikForm receives
interface FormProps {
  initTeamImpact?: string;
  initHireImpact?: string;
}

export const mapPropsToValues = ({
  initTeamImpact,
  initHireImpact,
}): FormValues => ({
  teamImpact: initTeamImpact || "",
  hireImpact: initHireImpact || "",
});

export const validationSchema = Yup.object().shape({
  teamImpact: Yup.string().required("This field is required"),
  hireImpact: Yup.string().required("This field is required"),
});

export const handleSubmit = (
  values,
  { resetForm, setErrors, setSubmitting },
): void => {
  // This is where are async api requests go, example below
  setTimeout((): void => {
    if (values.jobTitleEN === "Web developer") {
      // if job already exists in server, set custom error
      setErrors({ jobTitleEN: "That job already exists" });
    } else {
      // else reset the form for another use, or move to next page
      resetForm();
    }
    // set submitting false
    setSubmitting(false);
  }, 2000);
  console.log(values);
};

export const ImpactFormInner = ({ isSubmitting }): React.ReactElement => {
  return (
    <>
      <Form id="form" data-c-grid="gutter">
        <div data-c-grid-item="base(1of1)" data-c-input="textarea">
          <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
            How our team makes an impact:
          </p>
          <p data-c-margin="bottom(normal)">
            Describe the value your team/service/initiative brings to Canadians.
            It doesn’t matter if your work is direct to citizens or back office,
            innovative or maintenance, top priority or ongoing. Describe how it
            contributes to making Canada better the way you would to someone who
            knows nothing about your work.
          </p>
          <label htmlFor="builder04TeamImpact">Team Impact Statement</label>
          <span>Required</span>
          <div>
            <Field
              id="builder04TeamImpact"
              placeholder="Try for a casual, frank, friendly tone..."
              required
              component={TextArea}
            />
          </div>
          <span>This input has an error.</span>
        </div>
        <div data-c-grid-item="base(1of1)" data-c-input="textarea">
          <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
            How the new hire makes an impact:
          </p>
          <p data-c-margin="bottom(normal)">
            Describe how the new hire will contribute in this role. Focus on the
            value they’ll bring, not on specific tasks (you’ll provide these
            later on). For example “In this role, you’ll contribute to…” or, “As
            a member of this team, you’ll be responsible for helping us…”
          </p>
          <label htmlFor="builder04HireImpact">Team Impact Statement</label>
          <span>Required</span>
          <div>
            <Field
              id="builder04HireImpact"
              placeholder="Remember, don't use Government speak..."
              required
              component={TextArea}
            />
          </div>
          <span>This input has an error.</span>
        </div>
        <div data-c-alignment="centre" data-c-grid-item="base(1of1)">
          {/* <!-- Modal trigger, same as last step. --> */}
          <button
            data-c-button="solid(c1)"
            data-c-dialog-action="open"
            data-c-dialog-id="example-dialog-01"
            data-c-radius="rounded"
            type="button"
          >
            Next
          </button>
        </div>
      </Form>
      <p data-c-margin="bottom(normal)">
        <strong>Note:</strong> Changing your information on this form will also
        change these fields in your Profile.
      </p>
      <p data-c-margin="bottom(double)">
        Complete the job poster in the language of your choice. We will handle
        translation.
      </p>
      {/* This button continues the user in English. */}
      <button
        form="form"
        data-c-button="solid(c1)"
        data-c-radius="rounded"
        type="submit"
        disabled={isSubmitting}
      >
        Continue in English
      </button>
      {/* This button switches the user to French and continues the process in French.  */}
      <button
        form="form"
        data-c-button="solid(c1)"
        data-c-radius="rounded"
        type="submit"
        disabled={isSubmitting}
      >
        Continuer en Français
      </button>
    </>
  );
};

export default withFormik<FormProps, FormValues>({
  displayName: "ImpactForm",
  mapPropsToValues,
  validationSchema,
  handleSubmit,
})(ImpactFormInner);
