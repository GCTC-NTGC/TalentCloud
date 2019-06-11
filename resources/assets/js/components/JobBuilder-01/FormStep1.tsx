import * as React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "../Forms/Input";
import Select from "../Forms/Select";

// shape of values used in Form
interface FormValues {
  jobTitleEN: string;
  jobTitleFR: string;
  department: string;
  divisionEN: string;
  divisionFR: string;
}

// The type of props FormikForm receives
interface FormProps {
  initJobTitleEN?: string;
  initJobTitleFR?: string;
  initDepartment?: string;
  initDivisionEN?: string;
  initDivisionFR?: string;
}

export const mapPropsToValues = ({
  initJobTitleEN,
  initJobTitleFR,
  initDivisionEN,
  initDivisionFR,
  initDepartment,
}): FormValues => ({
  jobTitleEN: initJobTitleEN || "",
  jobTitleFR: initJobTitleFR || "",
  divisionEN: initDivisionEN || "",
  divisionFR: initDivisionFR || "",
  department: initDepartment || "",
});

export const validationSchema = Yup.object().shape({
  jobTitleEN: Yup.string().required("This field is required"),
  jobTitleFR: Yup.string().required("This field is required"),
  divisionEN: Yup.string().required("This field is required"),
  divisionFR: Yup.string().required("This field is required"),
  department: Yup.mixed()
    .oneOf(["TBS", "ESDC", "ECCC"], "WTF")
    .required("Please select from the available options"),
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

export const InnerFormStep1 = ({
  isSubmitting,
  values,
}): React.ReactElement => {
  return (
    <>
      <Form id="form" data-c-margin="bottom(normal)">
        <div data-c-grid="gutter">
          <Field
            type="text"
            htmlId="builder01ManagerJobTitleEN"
            name="jobTitleEN"
            label="My Job Title (English)"
            placeholder="e.g. Design Manager"
            required
            grid="tl(1of2)"
            component={Input}
          />
          <Field
            type="text"
            htmlId="builder01ManagerJobTitleFR"
            name="jobTitleFR"
            label="My Job Title (Français)"
            placeholder="e.g. Gestionnaire de la conception"
            required
            grid="tl(1of2)"
            component={Input}
          />
          <Field
            name="department"
            id="builder01ManagerDepartment"
            label="My Department"
            grid="base(1of1)"
            component={Select}
            required
            selected={values.department}
            nullSelection="Select a department..."
            options={[
              { value: "TBS", label: "Treasury Board of Canada Secretariat" },
              {
                value: "ESDC",
                label: "Employment and Social Development Canada",
              },
              { value: "ECCC", label: "Environment and Climate Change Canada" },
            ]}
          />
          <Field
            type="text"
            htmlId="builder01ManagerDivisionEN"
            name="divisionEN"
            label="My Division (English)"
            placeholder="e.g. Digital Change"
            required
            grid="tl(1of2)"
            component={Input}
          />
          <Field
            type="text"
            htmlId="builder01ManagerDivisionFR"
            name="divisionFR"
            label="My Division (Français)"
            placeholder="e.g. Changement numérique"
            required
            grid="tl(1of2)"
            component={Input}
          />
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
  displayName: "Step0Form",
  mapPropsToValues,
  validationSchema,
  handleSubmit,
})(InnerFormStep1);
