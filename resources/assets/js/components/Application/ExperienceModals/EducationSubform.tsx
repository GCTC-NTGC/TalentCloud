import React from "react";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import { FastField } from "formik";
import * as Yup from "yup";
import CheckboxInput from "../../Form/CheckboxInput";
import textToParagraphs from "../../../helpers/textToParagraphs";
import { educationMessages } from "../../JobBuilder/Details/JobDetailsMessages";
import { hasKey } from "../../../helpers/queries";

export interface EducationFormValues {
  useAsEducationRequirement: boolean;
}

export const validationShape = {
  useAsEducationRequirement: Yup.boolean(),
};

export interface EducationSubformProps {
  keyPrefix: string;
  jobClassification: string;
  jobEducationRequirements: string | null;
}

const messages = defineMessages({
  educationJustificationLabel: {
    id:
      "application.experienceModal.educationSubform.educationJustificationLabel",
    defaultMessage:
      "Yes, this experience helps me meet the education requirements outlined below.",
    description:
      "Label for the checkbox that checks whether to use this experience to as education justification.",
  },
});

export function EducationSubform({
  keyPrefix,
  jobClassification,
  jobEducationRequirements,
}: EducationSubformProps): React.ReactElement {
  const intl = useIntl();

  const jobEducationReq = jobEducationRequirements;
  const defaultEducationReq = hasKey(educationMessages, jobClassification)
    ? intl.formatMessage(educationMessages[jobClassification])
    : "CLASSIFICATION MISSING";
  // If the job is using the default education requirements (for its classification) then we
  //  can predictably style it, by setting the right lines to bold. Otherwise, all we can do is
  //  split it into paragraphs.
  const educationRequirements =
    jobEducationReq === null || jobEducationReq === defaultEducationReq
      ? textToParagraphs(
          defaultEducationReq,
          {},
          {
            0: { "data-c-font-weight": "bold" },
            5: { "data-c-font-weight": "bold" },
          },
        )
      : textToParagraphs(jobEducationReq);

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
            id="application.experienceModal.educationSubtitle"
            defaultMessage="Use This Experience as an Education Requirement"
            description="Subtitle for the use-as-Education-Requirement section."
          />
        </p>
        <p data-c-margin="bottom(1)">
          <FormattedMessage
            id="application.experienceModal.educationDescription"
            defaultMessage="You can select the option below if you feel that this experience helps you meet some or all of the specific education requirements for this job. We've included the requirements below to help refresh your memory."
            description="Explanation for the use-as-Education-Requirement section."
          />
        </p>
      </div>
      <div data-c-padding="bottom(1)">
        <div data-c-container="medium">
          <div data-c-grid="gutter(all, 1) middle">
            <div data-c-grid-item="base(1of1)">
              <FastField
                key={checkboxKey}
                id={`${keyPrefix}-${checkboxKey}`}
                name={checkboxKey}
                label={intl.formatMessage(messages.educationJustificationLabel)}
                component={CheckboxInput}
                checkboxBorder
              />
            </div>
          </div>
          <div
            data-c-background="gray(20)"
            data-c-radius="rounded"
            data-c-padding="all(1)"
            data-c-margin="bottom(1)"
          >
            {educationRequirements}
          </div>
        </div>
      </div>
    </>
  );
}
