import React, { FunctionComponent } from "react";
import {
  FormattedMessage,
  useIntl,
  defineMessages,
  IntlShape,
} from "react-intl";
import * as Yup from "yup";
import { Field, FieldArray } from "formik";
import { jobShow } from "../../../helpers/routes";
import { getLocale, localizeFieldNonNull } from "../../../helpers/localize";
import CheckboxGroupField from "../../Form/CheckboxGroupField";
import { validationMessages } from "../../Form/Messages";
import { Skill } from "../../../models/types";
import TextAreaInput from "../../Form/TextAreaInput";
import CheckboxInput from "../../Form/CheckboxInput";
import { countNumberOfWords } from "../../WordCounter/helpers";

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
  justificationLabel: {
    id: "profile.experience.skillSubform.justificationLabel",
    defaultMessage: "Explanation",
    description: "Label for the 'How did you use this skill?' field.",
  },
  justificationPlaceholder: {
    id: "profile.experience.skillSubform.justificationPlaceholder",
    defaultMessage: "How did you use this skill...",
    description:
      "Placeholder text for the 'How did you use this skill?' field.",
  },
});

export interface SkillFormValues {
  requiredSkills: string[];
  optionalSkills: string[];
}

// export const validationShape = {
//   requiredSkills: Yup.array().of(Yup.string()),
//   optionalSkills: Yup.array().of(Yup.string()),
// };

const JUSTIFICATION_WORD_LIMIT = 100;

export const validationShape = (intl: IntlShape) => {
  const requiredMsg = intl.formatMessage(validationMessages.required);
  const overWordLimit = intl.formatMessage(validationMessages.overMaxWords, {
    numberOfWords: JUSTIFICATION_WORD_LIMIT,
  });
  return {
    skills: Yup.array().of(
      Yup.object().shape({
        selected: Yup.boolean(),
        justification: Yup.string().when("selected", {
          is: true,
          then: Yup.string()
            .test(
              "wordCount",
              overWordLimit,
              (value: string) =>
                countNumberOfWords(value) <= JUSTIFICATION_WORD_LIMIT,
            )
            .required(requiredMsg),
          otherwise: Yup.string().test(
            "wordCount",
            overWordLimit,
            (value: string) =>
              countNumberOfWords(value) <= JUSTIFICATION_WORD_LIMIT,
          ), // Enforce word limit even if justification isn't required.
        }),
      }),
    ),
  };
};

export interface ProfileSkillSubformProps {
  keyPrefix: string;
  skills: Skill[];
}

export const ProfileSkillSubform: FunctionComponent<ProfileSkillSubformProps> = ({
  keyPrefix,
  skills,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

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
            id="profile.experience.skillSubform.connectSubtitle"
            defaultMessage="Connect your Skills to this Experience"
            description="Subtitle of Connect-to-skills section."
          />
        </p>
        <p data-c-margin="bottom(1)">
          <FormattedMessage
            id="profile.experience.skillSubform.connectDescription"
            defaultMessage="Add any skills below that you learned or used in this experience. Hiring Managers see a lot of applicant profiles and you will need to set yourself apart if you want new job opportunities. You can do this by answering the following questions for each of the skills you add. This is the most important part of your profile if you're hoping a manager will find you."
            description="Explanation for Connect-to-skills section."
          />
        </p>
        <ul data-c-font-weight="bold" data-c-margin="bottom(1)">
          <li>
            <FormattedMessage
              id="profile.experience.skillSubform.question1"
              defaultMessage="What did you accomplish, create or deliver using this skill?"
              description="A question the user should answer when connecting a Skill to Experience."
            />
          </li>
          <li>
            <FormattedMessage
              id="profile.experience.skillSubform.question2"
              defaultMessage="What tasks or activities did you do that relate to this skill?"
              description="A question the user should answer when connecting a Skill to Experience."
            />
          </li>
          <li>
            <FormattedMessage
              id="profile.experience.skillSubform.question3"
              defaultMessage="Were there any special techniques or approaches that you used?"
              description="A question the user should answer when connecting a Skill to Experience."
            />
          </li>
          <li>
            <FormattedMessage
              id="profile.experience.skillSubform.question4"
              defaultMessage="How much responsibility did you have in this role?"
              description="A question the user should answer when connecting a Skill to Experience."
            />
          </li>
        </ul>
      </div>
      <div data-c-container="medium">
        <div data-c-grid="gutter(all, 1) middle">
          <FieldArray
            name="skills"
            render={(arrayHelpers) => (
              <div data-c-grid>
                {skills.map((skill) => (
                  <div key={skill.id} data-c-grid-item="tl(1of1)">
                    <div data-c-grid="gutter(all, 1)">
                      <Field
                        id={`${keyPrefix}-${skill.id}-selected`}
                        component={CheckboxInput}
                        name={`skills.${skill.id}.selected`}
                        grid="tl(1of4)"
                        label={localizeFieldNonNull(locale, skill, "name")}
                      />
                      <Field
                        id={`${keyPrefix}-${skill.id}-justification`}
                        type="text"
                        name={`skills.${skill.id}.justification`}
                        component={TextAreaInput}
                        required
                        grid="tl(3of4)"
                        label={intl.formatMessage(messages.justificationLabel)}
                        placeholder={intl.formatMessage(
                          messages.justificationPlaceholder,
                        )}
                        wordLimit={JUSTIFICATION_WORD_LIMIT}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
};

export interface ApplicationSkillSubformProps {
  keyPrefix: string;
  jobId: number;
  jobRequiredSkills: Skill[];
  jobOptionalSkills: Skill[];
}

export function ApplicationSkillSubform({
  keyPrefix,
  jobId,
  jobRequiredSkills,
  jobOptionalSkills,
}: ApplicationSkillSubformProps): React.ReactElement {
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
            <FieldArray
              name="skills"
              render={(arrayHelpers) => (
                <fieldset
                  data-c-input="checkbox(group)"
                  className="clone-checkbox-group"
                >
                  <legend>
                    {intl.formatMessage(messages.skillCheckboxGroupLabel)}
                  </legend>
                  <div data-c-grid>
                    {jobRequiredSkills.map((skill) => (
                      <div key={skill.id} data-c-grid-item="tl(1of1)">
                        <label>
                          <Field
                            id={`${keyPrefix}-${skill.id}-selected`}
                            type="checkbox"
                            name={`skills.${skill.id}.selected`}
                            label={localizeFieldNonNull(locale, skill, "name")}
                          />
                          <span>
                            {localizeFieldNonNull(locale, skill, "name")}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              )}
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
            <FieldArray
              name="skills"
              render={(arrayHelpers) => (
                <fieldset
                  data-c-input="checkbox(group)"
                  className="clone-checkbox-group"
                >
                  <legend>
                    {intl.formatMessage(messages.skillCheckboxGroupLabel)}
                  </legend>
                  <div data-c-grid>
                    {jobOptionalSkills.map((skill) => (
                      <div key={skill.id} data-c-grid-item="tl(1of1)">
                        <label>
                          <Field
                            id={`${keyPrefix}-${skill.id}-selected`}
                            type="checkbox"
                            name={`skills.${skill.id}.selected`}
                            label={localizeFieldNonNull(locale, skill, "name")}
                          />
                          <span>
                            {localizeFieldNonNull(locale, skill, "name")}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicationSkillSubform;
