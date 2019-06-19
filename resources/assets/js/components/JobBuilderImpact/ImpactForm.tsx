import * as React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  defineMessages,
} from "react-intl";
import TextArea from "../Forms/TextArea";

const messages = defineMessages({
  hireLabel: {
    id: "jobBuilder.impact.hireLabel",
    defaultMessage: "Hire Impact Statement",
    description: "Label for hire impact statement text area",
  },
  teamLabel: {
    id: "jobBuilder.impact.teamLabel",
    defaultMessage: "Team Impact Statement",
    description: "Label for team impact statement text area",
  },
  hirePlaceholder: {
    id: "jobBuilder.impact.hirePlaceholder",
    defaultMessage: "Remember, don't use Government speak...",
    description: "",
  },
  teamPlaceholder: {
    id: "jobBuilder.impact.teamPlaceholder",
    defaultMessage: "Try for a casual, frank, friendly tone...",
    description: "",
  },
});

// shape of values used in Form
interface FormValues {
  teamImpact: string;
  hireImpact: string;
}

interface InnerFormProps {
  isSubmitting: boolean;
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
};

export const ImpactFormInner: React.FunctionComponent<
  InnerFormProps & InjectedIntlProps
> = ({ intl }): React.ReactElement => {
  const validationSchema = Yup.object().shape({
    teamImpact: Yup.string().required("This field is required"),
    hireImpact: Yup.string().required("This field is required"),
  });
  return (
    <Form id="form" data-c-grid="gutter">
      <div data-c-grid-item="base(1of1)" data-c-input="textarea">
        <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
          <FormattedMessage
            id="jobBuilder.impact.teamHeader"
            defaultMessage="How our team makes an impact:"
            description="Header of Job Poster Builder Team Impact Section"
          />
        </p>
        <p data-c-margin="bottom(normal)">
          <FormattedMessage
            id="jobBuilder.impact.teamBody"
            defaultMessage="Describe the value your team/service/initiative brings to Canadians.
              It doesn’t matter if your work is direct to citizens or back office,
              innovative or maintenance, top priority or ongoing. Describe how it
              contributes to making Canada better the way you would to someone who
              knows nothing about your work."
            description="Body of Job Poster Builder Team Impact Section"
          />
        </p>
        <span>
          <FormattedMessage
            id="formField.required"
            defaultMessage="Required"
            description="Flag text for empty required field"
          />
        </span>
        <div>
          <Field
            id="TeamImpact"
            placeholder={intl.formatMessage(messages.teamPlaceholder)}
            label={intl.formatMessage(messages.teamLabel)}
            required
            component={TextArea}
          />
        </div>
        <span>
          <FormattedMessage
            id="formField.error"
            defaultMessage="This input has an error."
            description="Flag text for validation error"
          />
        </span>
      </div>
      <div data-c-grid-item="base(1of1)" data-c-input="textarea">
        <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
          <FormattedMessage
            id="jobBuilder.impact.hireHeader"
            defaultMessage="How the new hire makes an impact:"
            description="Header of Job Poster Builder Hire Impact Section"
          />
        </p>
        <p data-c-margin="bottom(normal)">
          <FormattedMessage
            id="jobBuilder.impact.hireBody"
            defaultMessage="Describe how the new hire will contribute in this role. Focus on the
              value they’ll bring, not on specific tasks (you’ll provide these
              later on). For example “In this role, you’ll contribute to…” or, “As
              a member of this team, you’ll be responsible for helping us…”"
            description="Body of Job Poster Builder Hire Impact Section"
          />
        </p>

        <span>
          <FormattedMessage
            id="formField.required"
            defaultMessage="Required"
            description="Flag text for empty required field"
          />
        </span>
        <div>
          <Field
            id="HireImpact"
            label={intl.formatMessage(messages.hireLabel)}
            placeholder={intl.formatMessage(messages.hirePlaceholder)}
            required
            component={TextArea}
          />
        </div>
        <span>
          <FormattedMessage
            id="formField.error"
            defaultMessage="This input has an error."
            description="Flag text for validation error"
          />
        </span>
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
          <FormattedMessage
            id="button.next"
            defaultMessage="Next"
            description="Button text Next"
          />
        </button>
      </div>
    </Form>
  );
};

const impactFormik = withFormik<FormProps, FormValues>({
  displayName: "ImpactForm",
  mapPropsToValues,
  validationSchema,
  handleSubmit,
  // @ts-ignore
})(ImpactFormInner);

// @ts-ignore
export default injectIntl(impactFormik);
