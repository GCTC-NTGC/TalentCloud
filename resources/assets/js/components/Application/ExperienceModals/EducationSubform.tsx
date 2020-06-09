import React from "react";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import { Field } from "formik";
import * as Yup from "yup";
import CheckboxInput from "../../Form/CheckboxInput";

export interface EducationFormValues {
  useAsEducationRequirement: boolean;
}

export const validationShape = {
  useAsEducationRequirement: Yup.boolean(),
};

export interface EducationSubformProps {
  educationRequirement: {
    title: string;
    description: string;
  };
  equivalentRequirment: {
    title: string;
    description: string;
  };
}

const messages = defineMessages({
  educationJustificationLabel: {
    id: "experienceModal.educationSubform.educationJustificationLabel",
    defaultMessage:
      "Yes, this experience helps me meet the education requirements outlined below.",
    description:
      "Label for the checkbox that checks whether to use this experience to as education justification.",
  },
});

export function EducationSubform({
  educationRequirement,
  equivalentRequirment,
}: EducationSubformProps): React.ReactElement {
  const intl = useIntl();

  const checkboxKey = "useAsEducationRequirement";
  return (
    <>
      <div data-c-container="medium">
        <p
          data-c-margin="top(1) bottom(1)"
          data-c-font-size="h4"
          data-c-font-weight="bold"
          data-c-color="c3"
        >
          <FormattedMessage
            id="experienceModal.educationSubtitle"
            defaultMessage="Use This Experience as an Education Requirement"
            description="Subtitle for the use-as-Education-Requirement section."
          />
        </p>
        <p data-c-margin="bottom(1)">
          <FormattedMessage
            id="experienceModal.educationDescription"
            defaultMessage="You can select the option below if you feel that this experience helps you meet some or all of the specific education requirements for this job. We've included the requirements below to help refresh your memory."
            description="Explanation for the use-as-Education-Requirement section."
          />
        </p>
      </div>
      <div data-c-padding="bottom(1)">
        <div data-c-container="medium">
          <div data-c-grid="gutter(all, 1) middle">
            <div data-c-input="checkbox(group)" data-c-grid-item="base(1of1)">
              <Field
                key={checkboxKey}
                id={checkboxKey}
                name={checkboxKey}
                label={intl.formatMessage(messages.educationJustificationLabel)}
                component={CheckboxInput}
                grid="base(1of2"
              />
            </div>
          </div>
          <div
            data-c-background="gray(20)"
            data-c-radius="rounded"
            data-c-padding="all(1)"
            data-c-margin="bottom(1)"
          >
            <p data-c-font-weight="bold">{educationRequirement.title}</p>
            <p>{educationRequirement.description}</p>
            <p data-c-margin="tb(1)">
              <FormattedMessage
                id="experienceModal.educationSubform.or"
                defaultMessage="OR"
                description="Conjunction used to join alternative experience requirements (ie Experience OR Equivalent Experience)."
              />
            </p>
            <p data-c-font-weight="bold">{equivalentRequirment.title}</p>
            <p>{equivalentRequirment.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
