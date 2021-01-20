import React, { FunctionComponent } from "react";
import {
  FormattedMessage,
  useIntl,
  defineMessages,
  IntlShape,
} from "react-intl";
import * as Yup from "yup";
import { Field, FieldArray } from "formik";
import { getLocale, localizeFieldNonNull } from "../../../helpers/localize";
import { validationMessages } from "../../Form/Messages";
import { Experience, Skill } from "../../../models/types";
import TextAreaInput from "../../Form/TextAreaInput";
import CheckboxInput from "../../Form/CheckboxInput";
import { countNumberOfWords } from "../../WordCounter/helpers";
import { ExperienceSubmitData } from "./ProfileExperienceCommon";
import {
  deleteProperty,
  getId,
  mapToObjectTrans,
  objectMap,
} from "../../../helpers/queries";

const messages = defineMessages({
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
    .filter(([skillId, values]) => values.selected)
    .map(([skillId, values]) => {
      return {
        skillId: Number(skillId),
        justification: values.justification,
      };
    });
};

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
