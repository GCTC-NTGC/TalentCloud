import * as React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  defineMessages,
} from "react-intl";
import TextArea from "../Forms/TextArea";
import { Job } from "../../models/types";
import { validationMessages } from "../Form/Messages";

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
interface ImpactFormValues {
  teamImpact: string;
  hireImpact: string;
}

interface ImpactFormProps {
  job: Job | null;
  handleSubmit: (job: Job) => void;
}

const ImpactForm: React.FunctionComponent<
  ImpactFormProps & InjectedIntlProps
> = ({ intl, job, handleSubmit }): React.ReactElement => {
  const initialValues: ImpactFormValues = {
    teamImpact:
      job && job[intl.locale].team_impact ? job[intl.locale].team_impact : "",
    hireImpact:
      job && job[intl.locale].hire_impact ? job[intl.locale].hire_impact : "",
  };
  const validationSchema = Yup.object().shape({
    teamImpact: Yup.string().required(
      intl.formatMessage(validationMessages.required),
    ),
    hireImpact: Yup.string().required(
      intl.formatMessage(validationMessages.required),
    ),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions): void => {
        // The following only triggers after validations pass
        // handleSubmit(values);
        actions.setSubmitting(false); // Required by Formik to finish the submission cycle
      }}
      render={({ isSubmitting }): React.ReactElement => (
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
                name="teamImpact"
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
                name="hireImpact"
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
              disabled={isSubmitting}
              form="form"
              type="submit"
            >
              <FormattedMessage
                id="button.next"
                defaultMessage="Next"
                description="Button text Next"
              />
            </button>
          </div>
        </Form>
      )}
    />
  );
};

export default injectIntl(ImpactForm);
