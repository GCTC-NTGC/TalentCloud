import React, { FunctionComponent } from "react";
import {
  FormattedMessage,
  useIntl,
  defineMessages,
  IntlShape,
} from "react-intl";
import * as Yup from "yup";
import { FastField, Field, useFormikContext } from "formik";
import { getLocale, localizeFieldNonNull } from "../../../helpers/localize";
import { validationMessages } from "../../Form/Messages";
import { Experience, Skill } from "../../../models/types";
import TextAreaInput from "../../Form/TextAreaInput";
import { countNumberOfWords } from "../../WordCounter/helpers";
import { ExperienceSubmitData } from "./ProfileExperienceCommon";
import { getId, mapToObjectTrans } from "../../../helpers/queries";

const messages = defineMessages({
  justificationLabel: {
    id: "profile.experience.skillSubform.justificationLabel",
    defaultMessage: "Describe how you used this skill:",
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
  skills: {
    [key: number]: {
      selected: boolean;
      justification: string;
    };
  };
}

export const dataToFormSkills = (
  data: ExperienceSubmitData<Experience>,
  allSkills: Skill[],
): SkillFormValues => {
  const skillToData = (skill: Skill) => {
    const savedSkillData = data.savedSkills.find((x) => x.skillId === skill.id);
    return savedSkillData
      ? { selected: true, justification: savedSkillData.justification }
      : { selected: false, justification: "" };
  };
  return { skills: mapToObjectTrans(allSkills, getId, skillToData) };
};

export const formSkillsToData = (
  formValues: SkillFormValues,
): ExperienceSubmitData<Experience>["savedSkills"] => {
  return Object.entries(formValues.skills)
    .filter(([, values]) => values.selected)
    .map(([skillId, values]) => {
      return {
        skillId: Number(skillId),
        justification: values.justification,
      };
    });
};

const JUSTIFICATION_WORD_LIMIT = 100;

const singleSkillValidationShape = (intl: IntlShape) => {
  const requiredMsg = intl.formatMessage(validationMessages.required);
  const overWordLimit = intl.formatMessage(validationMessages.overMaxWords, {
    numberOfWords: JUSTIFICATION_WORD_LIMIT,
  });
  return Yup.object().shape({
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
  });
};

export const validationShape = (intl: IntlShape, skillIds: number[]) => {
  const skillValidation = singleSkillValidationShape(intl);
  return {
    skills: Yup.object().shape(
      skillIds.reduce((validationObj, skillId) => {
        validationObj[skillId] = skillValidation;
        return validationObj;
      }, {}),
    ),
  };
};

const SkillFormCell: FunctionComponent<{
  skill: Skill;
  keyPrefix: string;
}> = ({ skill, keyPrefix }) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const { values } = useFormikContext<SkillFormValues>();
  const isSelected = !!values.skills[skill.id]?.selected;
  // We don't use the CheckboxInput component here because we need more custom styling,
  // mostly because this is ~sort~ of a checkbox group, but its not just checkboxes.
  return (
    <div key={skill.id}>
      <div>
        <div>
          <label>
            <FastField
              id={`${keyPrefix}-${skill.id}-selected`}
              type="checkbox"
              name={`skills.${skill.id}.selected`}
            />
            <span data-c-padding="left(.5)">
              {localizeFieldNonNull(locale, skill, "name")}
            </span>
          </label>
        </div>
        <div data-c-visibility={!isSelected ? "hidden" : ""}>
          <Field
            id={`${keyPrefix}-${skill.id}-justification`}
            type="text"
            name={`skills.${skill.id}.justification`}
            component={TextAreaInput}
            required={isSelected}
            label={intl.formatMessage(messages.justificationLabel)}
            placeholder={intl.formatMessage(messages.justificationPlaceholder)}
            wordLimit={JUSTIFICATION_WORD_LIMIT}
          />
        </div>
      </div>
    </div>
  );
};

export interface ProfileSkillSubformProps {
  keyPrefix: string;
  skills: Skill[];
}

export const ProfileSkillSubform: FunctionComponent<ProfileSkillSubformProps> = ({
  keyPrefix,
  skills,
}) => {
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
      <div data-c-container="medium" data-c-padding="bottom(1)">
        <fieldset style={{ border: "none" }}>
          <legend data-c-font="sans">
            <FormattedMessage
              id="profile.experience.skillSubform.fieldsetLegend"
              defaultMessage="Select all that apply:"
              description="The label at the top of the group of skill checkboxes"
            />
          </legend>
          <div
            data-c-border="all(thin, solid, black)"
            data-c-radius="rounded"
            data-c-padding="all(1)"
          >
            {skills.map((skill) => (
              <SkillFormCell
                key={skill.id}
                skill={skill}
                keyPrefix={keyPrefix}
              />
            ))}
          </div>
        </fieldset>
      </div>
    </>
  );
};
