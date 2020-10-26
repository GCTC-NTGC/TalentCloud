import React from "react";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import * as Yup from "yup";
import { jobShow } from "../../../helpers/routes";
import { getLocale } from "../../../helpers/localize";
import CheckboxGroupField from "../../Form/CheckboxGroupField";

const messages = defineMessages({
  linkToJobTitle: {
    id: "application.experienceModal.skillSubform.linkToJob.title",
    defaultMessage:
      "Open the job poster in a new tab or window to review the definition of skills.",
    description: "Title attribute for the link back to the job.",
  },
  skillCheckboxGroupLabel: {
    id: "application.experienceModal.skillSubform.skillCheckboxGroupLabel",
    defaultMessage: "Select all that apply:",
    description: "Label for the Skills checkbox groups.",
  },
});

export interface SkillFormValues {
  requiredSkills: string[];
  optionalSkills: string[];
}

export const validationShape = {
  requiredSkills: Yup.array().of(Yup.string()),
  optionalSkills: Yup.array().of(Yup.string()),
};

export interface SkillSubformProps {
  keyPrefix: string;
  jobId: number;
  jobRequiredSkills: string[];
  jobOptionalSkills: string[];
}

export function SkillSubform({
  keyPrefix,
  jobId,
  jobRequiredSkills,
  jobOptionalSkills,
}: SkillSubformProps): React.ReactElement {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const linkToJob = (text): React.ReactElement => (
    <a
      href={jobShow(locale, jobId)}
      title={intl.formatMessage(messages.linkToJobTitle)}
      target="_blank"
      rel="noreferrer"
    >
      {text}
    </a>
  );

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
            id="application.experienceModal.skillSubform.connectSubtitle"
            defaultMessage="Connect This Experience to the Job"
            description="Subtitle of Connect-to-skills section."
          />
        </p>
        <p data-c-margin="bottom(1)">
          <FormattedMessage
            id="application.experienceModal.skillSubform.connectDescription"
            defaultMessage="Below you can select which of the job skills you used during this experience. Later on, you’ll be asked to provide a few sentences to help managers understand how you used this skill. You can <a>review the definitions</a> of the skills on the job poster."
            description="Explanation for Connect-to-skills section."
            values={{
              a: (...chunks): React.ReactElement => linkToJob(chunks),
            }}
          />
        </p>
        <p data-c-margin="bottom(1)">
          <FormattedMessage
            id="application.experienceModal.skillSubform.connectDescription.noSkillsOkay"
            defaultMessage="If none of the skills apply to this experience, feel free to save it without any skills selected."
            description="Explanation that you can save an experience without connecting it to skills yet."
          />
        </p>
      </div>
      <div data-c-container="medium">
        <div data-c-grid="gutter(all, 1) middle">
          <div data-c-grid-item="base(1of1)">
            <p data-c-font-weight="bold">
              <FormattedMessage
                id="application.experienceModal.skillSubform.requiredSkillsSubtitle"
                defaultMessage="Please indicate which of the following <a>required skills</a> (if any) you used in this experience."
                description="Title for the Required Skills checkbox."
                values={{
                  a: (...chunks): React.ReactElement => linkToJob(chunks),
                }}
              />
            </p>
          </div>
          <div data-c-grid-item="base(1of1)">
            <CheckboxGroupField
              id={keyPrefix}
              groupLabel={intl.formatMessage(messages.skillCheckboxGroupLabel)}
              grid="base(1of1)"
              name="requiredSkills"
              allBoxes={jobRequiredSkills.map((skill) => ({
                value: skill,
                label: skill,
              }))}
            />
          </div>

          <div data-c-grid-item="base(1of1)">
            <p data-c-font-weight="bold">
              <FormattedMessage
                id="application.experienceModal.skillSubform.optionalSkillsSubtitle"
                defaultMessage="Please indicate which of the following <a>optional skills</a> (if any) you used in this experience."
                description="Title for the Optional Skills checkbox."
                values={{
                  a: (...chunks): React.ReactElement => linkToJob(chunks),
                }}
              />
            </p>
          </div>
          <div data-c-grid-item="base(1of1)">
            <CheckboxGroupField
              id={keyPrefix}
              groupLabel={intl.formatMessage(messages.skillCheckboxGroupLabel)}
              grid="base(1of1)"
              name="optionalSkills"
              allBoxes={jobOptionalSkills.map((skill) => ({
                value: skill,
                label: skill,
              }))}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SkillSubform;
