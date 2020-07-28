import React from "react";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import { Field, useFormikContext } from "formik";
import * as Yup from "yup";
import { jobShow } from "../../../helpers/routes";
import { getLocale } from "../../../helpers/localize";
import CheckboxGroup from "../../Form/CheckboxGroup";
import CheckboxInput from "../../Form/CheckboxInput";

const messages = defineMessages({
  linkToJobTitle: {
    id: "experienceModal.linkToJob.title",
    defaultMessage:
      "Open the job poster in a new tab or window to review the definition of skills.",
    description: "Title attribute for the link back to the job.",
  },
  skillCheckboxGroupLabel: {
    id: "experienceModal.skillCheckboxGroupLabel",
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
  jobId: number;
  jobRequiredSkills: string[];
  jobOptionalSkills: string[];
}

export function SkillSubform({
  jobId,
  jobRequiredSkills,
  jobOptionalSkills,
}: SkillSubformProps): React.ReactElement {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const formikContext = useFormikContext();
  const requiredMeta = formikContext.getFieldMeta<string[]>("requiredSkills");
  const optionalMeta = formikContext.getFieldMeta<string[]>("optionalSkills");

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
            id="experienceModal.connectSubtitle"
            defaultMessage="Connect This Experience to the Job"
            description="Subtitle of Connect-to-skills section."
          />
        </p>
        <p data-c-margin="bottom(1)">
          <FormattedMessage
            id="experienceModal.connectDescription"
            defaultMessage="Below you can select which of the job skills you used during this experience. Later on, you’ll be asked to provide a few sentences to help managers understand how you used this skill. You can <a>review the definitions</a> of the skills on the job poster."
            description="Explanation for Connect-to-skills section."
            values={{
              a: (...chunks): React.ReactElement => linkToJob(chunks),
            }}
          />
        </p>
        <p data-c-margin="bottom(1)">
          <FormattedMessage
            id="experienceModal.connectDescription.noSkillsOkay"
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
                id="experienceModal.requiredSkillsSubtitle"
                defaultMessage="Please indicate which of the following <a>required skills</a> (if any) you used in this experience."
                description="Title for the Required Skills checkbox."
                values={{
                  a: (...chunks): React.ReactElement => linkToJob(chunks),
                }}
              />
            </p>
          </div>
          <CheckboxGroup
            id="requiredSkills"
            label={intl.formatMessage(messages.skillCheckboxGroupLabel)}
            grid="base(1of1)"
            value={requiredMeta.value}
            error={requiredMeta.error}
            touched={requiredMeta.touched}
            onChange={formikContext.setFieldValue}
            onBlur={formikContext.setFieldTouched}
          >
            {jobRequiredSkills.map(
              (name): React.ReactElement => {
                return (
                  <Field
                    key={name}
                    id={name}
                    name={name}
                    label={name}
                    component={CheckboxInput}
                    grid="base(1of1)"
                  />
                );
              },
            )}
          </CheckboxGroup>

          <div data-c-grid-item="base(1of1)">
            <p data-c-font-weight="bold">
              <FormattedMessage
                id="experienceModal.optionalSkillsSubtitle"
                defaultMessage="Please indicate which of the following <a>optional skills</a> (if any) you used in this experience."
                description="Title for the Optional Skills checkbox."
                values={{
                  a: (...chunks): React.ReactElement => linkToJob(chunks),
                }}
              />
            </p>
          </div>
          <CheckboxGroup
            id="optionalSkills"
            label={intl.formatMessage(messages.skillCheckboxGroupLabel)}
            grid="base(1of1)"
            value={optionalMeta.value}
            error={optionalMeta.error}
            touched={optionalMeta.touched}
            onChange={formikContext.setFieldValue}
            onBlur={formikContext.setFieldTouched}
          >
            {jobOptionalSkills.map(
              (name): React.ReactElement => {
                return (
                  <Field
                    key={name}
                    id={name}
                    name={name}
                    label={name}
                    component={CheckboxInput}
                    grid="base(1of1)"
                  />
                );
              },
            )}
          </CheckboxGroup>
        </div>
      </div>
    </>
  );
}

export default SkillSubform;
