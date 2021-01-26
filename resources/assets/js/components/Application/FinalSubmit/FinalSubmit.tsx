import * as React from "react";
import { FormattedMessage, defineMessages, useIntl } from "react-intl";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import TextInput from "../../Form/TextInput";
import DateInput from "../../Form/DateInput";
import { validationMessages } from "../../Form/Messages";
import { ApplicationNormalized } from "../../../models/types";
import { navigationMessages } from "../applicationMessages";

const messages = defineMessages({
  submissionDateLabel: {
    id: "application.finalSubmit.submissionDateLabel",
    defaultMessage: "Today's Date",
    description: "Label for the submission date input field.",
  },
  submissionDatePlaceholder: {
    id: "application.finalSubmit.submissionDatePlaceholder",
    defaultMessage: "yyyy-mm-dd",
    description: "Placeholder for the submission signature input field.",
  },
  submissionSignatureLabel: {
    id: "application.finalSubmit.submissionSignatureLabel",
    defaultMessage: "Sign (Type) Your Full Name",
    description: "Label for the submission signature input field.",
  },
  submissionSignaturePlaceholder: {
    id: "application.finalSubmit.submissionSignaturePlaceholder",
    defaultMessage: "e.g. First Last",
    description: "Placeholder for the submission signature input field.",
  },
});

const confirmationCriteria = defineMessages({
  firstBullet: {
    id: "application.finalSubmit.confirmCriteria.firstBullet",
    defaultMessage: "I've reviewed everything written in my application.",
    description: "Bullet point about the criteria before final submission.",
  },
  secondBullet: {
    id: "application.finalSubmit.confirmCriteria.secondBullet",
    defaultMessage: "I promise that the information I've provided is true.",
    description: "Bullet point about the criteria before final submission.",
  },
});

interface FinalSubmitProps {
  application: ApplicationNormalized;
  applicationIsValid: boolean;
  submitApplication: (application: ApplicationNormalized) => Promise<void>;
  handleQuit: () => void;
  handleReturn: () => void;
}

interface FinalSubmitFormValues {
  submissionDate: string;
  submissionSignature: string;
}

const FinalSubmit: React.FunctionComponent<FinalSubmitProps> = ({
  application,
  applicationIsValid,
  submitApplication,
  handleQuit,
  handleReturn,
}) => {
  const intl = useIntl();

  const formValuesToData = (
    formValues: FinalSubmitFormValues,
    initialApplication: ApplicationNormalized,
  ): ApplicationNormalized => ({
    ...initialApplication,
    submission_signature: formValues.submissionSignature,
    submission_date: formValues.submissionDate,
  });

  const initialValues: FinalSubmitFormValues = {
    submissionDate: "",
    submissionSignature: "",
  };

  const validationSchema = Yup.object().shape({
    submissionDate: Yup.date().required(
      intl.formatMessage(validationMessages.required),
    ),
    submissionSignature: Yup.string().required(
      intl.formatMessage(validationMessages.required),
    ),
  });

  return (
    <div data-c-container="medium">
      <h2 data-c-heading="h2" data-c-margin="top(2) bottom(1)">
        <FormattedMessage
          id="application.finalSubmit.heading"
          defaultMessage="Final Submission"
          description="Heading text on the final submit step of the Application Timeline."
        />
      </h2>
      <p data-c-margin="bottom(1)" data-c-font-weight="bold">
        <FormattedMessage
          id="application.finalSubmit.confirmCriteriaHeading"
          defaultMessage="You've made it!"
          description="Heading text before confirmation criteria list."
        />
      </p>
      <p data-c-margin="bottom(1)">
        <FormattedMessage
          id="application.finalSubmit.confirmCriteria.firstSentence"
          defaultMessage="I understand that I am a part of a community of people who trust each other and by signing my name below, I am confirming that:"
          description="Sentence before confirmation criteria list."
        />
      </p>
      <ul data-c-margin="bottom(2)">
        {Object.keys(confirmationCriteria).map((key) => (
          <li key={key}>{intl.formatMessage(confirmationCriteria[key])}</li>
        ))}
      </ul>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }): Promise<void> => {
          await submitApplication(
            formValuesToData(values, application),
          ).finally(() => {
            setSubmitting(false);
          });
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }): React.ReactElement => (
          <Form>
            <div data-c-grid="gutter(all, 1)">
              <FastField
                id="submissionSignature"
                name="submissionSignature"
                component={TextInput}
                required
                grid="tl(2of3)"
                label={intl.formatMessage(messages.submissionSignatureLabel)}
                placeholder={intl.formatMessage(
                  messages.submissionSignaturePlaceholder,
                )}
                font="serif"
              />
              <FastField
                id="submissionDate"
                name="submissionDate"
                component={DateInput}
                required
                grid="tl(1of3)"
                label={intl.formatMessage(messages.submissionDateLabel)}
                placeholder={intl.formatMessage(
                  messages.submissionSignaturePlaceholder,
                )}
              />
            </div>
            <div data-c-container="medium" data-c-padding="tb(2)">
              <hr data-c-hr="thin(c1)" data-c-margin="bottom(2)" />
              <div data-c-grid="gutter">
                <div
                  data-c-alignment="base(centre) tp(left)"
                  data-c-grid-item="tp(1of2)"
                >
                  <button
                    data-c-button="outline(c2)"
                    data-c-radius="rounded"
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleReturn}
                  >
                    {intl.formatMessage(navigationMessages.return)}
                  </button>
                </div>
                <div
                  data-c-alignment="base(centre) tp(right)"
                  data-c-grid-item="tp(1of2)"
                >
                  <button
                    data-c-button="outline(c2)"
                    data-c-radius="rounded"
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleQuit}
                  >
                    {intl.formatMessage(navigationMessages.quit)}
                  </button>
                  <button
                    data-c-button="solid(c1)"
                    data-c-radius="rounded"
                    data-c-margin="left(1)"
                    type="submit"
                    disabled={isSubmitting || !applicationIsValid}
                  >
                    <FormattedMessage
                      id="application.submitApplicationButtonLabel"
                      defaultMessage="Submit Application"
                      description="The text displayed on the submit button for the Job Details form."
                    />
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FinalSubmit;
