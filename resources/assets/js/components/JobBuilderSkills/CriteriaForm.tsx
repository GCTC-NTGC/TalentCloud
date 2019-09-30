import React, { useState } from "react";
import {
  WrappedComponentProps,
  injectIntl,
  MessageDescriptor,
} from "react-intl";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Criteria, Skill } from "../../models/types";
import { validationMessages } from "../Form/Messages";
import TextAreaInput from "../Form/TextAreaInput";
import RadioGroup from "../Form/RadioGroup";
import { SkillLevelId, CriteriaTypeId } from "../../models/lookupConstants";
import RadioInput from "../Form/RadioInput";
import {
  skillLevelName,
  assetSkillName,
  skillLevelDescription,
  assetSkillDescription,
} from "../../models/localizedConstants";
import ContextBlockItem from "../ContextBlock/ContextBlockItem";
import ContextBlock from "../ContextBlock/ContextBlock";

interface CriteriaFormProps {
  // The Job Poster this criteria will belong to.
  jobPosterId: number;
  // The criteria being edited, if we're not creating a new one.
  criteria?: Criteria;
  // The skill this criteria will evaluate.
  skill: Skill;
  handleSubmit: (criteria: Criteria) => void;
  handleCancel: () => void;
}

const essentialSkillLevels = (
  skillTypeId: number,
): {
  [key: string]: {
    name: MessageDescriptor;
    context: MessageDescriptor;
  };
} => ({
  basic: {
    name: skillLevelName(SkillLevelId.Basic, skillTypeId),
    context: skillLevelDescription(SkillLevelId.Basic, skillTypeId),
  },
  intermediate: {
    name: skillLevelName(SkillLevelId.Intermediate, skillTypeId),
    context: skillLevelDescription(SkillLevelId.Intermediate, skillTypeId),
  },
  advanced: {
    name: skillLevelName(SkillLevelId.Advanced, skillTypeId),
    context: skillLevelDescription(SkillLevelId.Advanced, skillTypeId),
  },
  expert: {
    name: skillLevelName(SkillLevelId.Expert, skillTypeId),
    context: skillLevelDescription(SkillLevelId.Expert, skillTypeId),
  },
});

interface FormValues {
  specificity: string;
  level: string;
}

export const essentialSkillIdToKey = (id: number): string => {
  switch (id) {
    case SkillLevelId.Basic:
      return "basic";
    case SkillLevelId.Intermediate:
      return "intermediate";
    case SkillLevelId.Advanced:
      return "advanced";
    case SkillLevelId.Expert:
      return "expert";
    default:
      return "";
  }
};

export const essentialKeyToId = (key: string): SkillLevelId => {
  switch (key) {
    case "basic":
      return SkillLevelId.Basic;
    case "intermediate":
      return SkillLevelId.Intermediate;
    case "advanced":
      return SkillLevelId.Advanced;
    case "expert":
      return SkillLevelId.Expert;
    default:
      return SkillLevelId.Basic;
  }
};

export const criteriaToValues = (
  criteria: Criteria,
  locale: "en" | "fr",
): FormValues => ({
  specificity: criteria[locale].specificity || "",
  level:
    criteria.criteria_type_id === CriteriaTypeId.Asset
      ? "asset"
      : essentialSkillIdToKey(criteria.skill_level_id),
});

/* eslint-disable @typescript-eslint/camelcase */
const updateCriteriaWithValues = (
  criteria: Criteria,
  skill: Skill,
  values: FormValues,
  locale: "en" | "fr",
): Criteria => {
  return {
    ...criteria,
    criteria_type_id:
      values.level === "asset"
        ? CriteriaTypeId.Asset
        : CriteriaTypeId.Essential,
    skill_level_id: essentialKeyToId(values.level),
    en: {
      description: skill.en.description,
      specificity: locale === "en" ? values.specificity : null,
    },
    fr: {
      description: skill.fr.description,
      specificity: locale === "fr" ? values.specificity : null,
    },
  };
};

const newCriteria = (jobPosterId: number, skillId: number): Criteria => ({
  id: 0,
  criteria_type_id: CriteriaTypeId.Essential,
  job_poster_id: jobPosterId,
  skill_id: skillId,
  skill_level_id: SkillLevelId.Basic,
  en: {
    description: null,
    specificity: null,
  },
  fr: {
    description: null,
    specificity: null,
  },
});
/* eslint-enable @typescript-eslint/camelcase */

export const CriteriaForm: React.FunctionComponent<
  CriteriaFormProps & WrappedComponentProps
> = ({
  jobPosterId,
  criteria,
  skill,
  handleSubmit,
  handleCancel,
  intl,
}): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unknown intl.locale");
  }
  const stringNotEmpty = (value: string | null): boolean =>
    value !== null && (value as string).length !== 0;
  const [showSpecificity, setShowSpecificity] = useState(
    criteria !== undefined && stringNotEmpty(criteria[locale].specificity),
  );

  const initialValues: FormValues =
    criteria !== undefined
      ? criteriaToValues(criteria, locale)
      : {
          specificity: "",
          level: "",
        };
  const skillSchema = Yup.object().shape({
    specificity: Yup.string(),
    level: Yup.string()
      .oneOf(
        [...Object.keys(essentialSkillLevels(skill.skill_type_id)), "asset"],
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={skillSchema}
      onSubmit={(values, { setSubmitting }): void => {
        const oldCriteria =
          criteria !== undefined
            ? criteria
            : newCriteria(jobPosterId, skill.id);
        const updatedCriteria = updateCriteriaWithValues(
          oldCriteria,
          skill,
          values,
          locale,
        );
        handleSubmit(updatedCriteria);
        setSubmitting(false);
      }}
      render={({
        errors,
        touched,
        isSubmitting,
        values,
        setFieldValue,
      }): React.ReactElement => (
        <>
          <Form id="jpbSkillsForm">
            {/* Skill Definition */}
            <div data-c-padding="all(normal)" data-c-background="grey(10)">
              <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
                Skill Definition
              </p>
              <div>
                <p data-c-margin="bottom(normal)">{skill[locale].name}</p>
                <p data-c-margin="bottom(normal)">
                  {skill[locale].description}
                </p>
                {showSpecificity ? (
                  <>
                    <Field
                      id="skillSpecificity"
                      type="textarea"
                      name="specificity"
                      label="Skill Specificity"
                      placeholder="Add specificity to the definition of this skill that will only appear on my job poster but note that this will have be approved prior to posting..."
                      component={TextAreaInput}
                    />
                    <button
                      className="job-builder-add-skill-definition-trigger"
                      type="button"
                      onClick={(): void => {
                        // Clear the field before hiding it
                        setFieldValue("specificity", "");
                        setShowSpecificity(false);
                      }}
                    >
                      <span>
                        <i className="fas fa-minus-circle" data-c-colour="c1" />
                        Remove additional specificity.
                      </span>
                    </button>
                  </>
                ) : (
                  <button
                    className="job-builder-add-skill-definition-trigger"
                    type="button"
                    onClick={(): void => setShowSpecificity(true)}
                  >
                    <span>
                      <i className="fas fa-plus-circle" data-c-colour="c1" />
                      I'd like to add specificity to this definition. This will
                      only apply to my job poster.
                    </span>
                  </button>
                )}
              </div>
            </div>
            {/* Skill Level */}
            <div data-c-padding="all(normal)">
              <div className="job-builder-culture-block">
                <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
                  Choose a Skill Level
                </p>
                <div data-c-grid="gutter">
                  <RadioGroup
                    id="skillLevelSelection"
                    label="Select a skill level:"
                    required
                    touched={touched.level}
                    error={errors.level}
                    value={values.level}
                    grid="base(1of1) tl(1of3)"
                  >
                    {Object.entries(
                      essentialSkillLevels(skill.skill_type_id),
                    ).map(
                      ([key, { name }]): React.ReactElement => {
                        return (
                          <Field
                            key={key}
                            id={key}
                            name="level"
                            component={RadioInput}
                            label={intl.formatMessage(name)}
                            value={key}
                            trigger
                          />
                        );
                      },
                    )}
                    <div
                      className="job-builder-skill-level-or-block"
                      data-c-alignment="base(centre)"
                    >
                      {/** This empty div is required for CSS magic */}
                      <div />
                      <span>or</span>
                    </div>
                    <Field
                      key="asset"
                      id="asset"
                      name="level"
                      component={RadioInput}
                      label={intl.formatMessage(assetSkillName())}
                      value="asset"
                      trigger
                    />
                  </RadioGroup>
                  <ContextBlock
                    className="job-builder-context-block"
                    grid="base(1of1) tl(2of3)"
                  >
                    {Object.entries(
                      essentialSkillLevels(skill.skill_type_id),
                    ).map(
                      ([key, { name, context }]): React.ReactElement => {
                        return (
                          <ContextBlockItem
                            key={key}
                            contextId={key}
                            title={intl.formatMessage(name)}
                            subtext={intl.formatMessage(context)}
                            className="job-builder-context-item"
                            active={values.level === key}
                          />
                        );
                      },
                    )}
                    <ContextBlockItem
                      key="asset"
                      contextId="asset"
                      title={intl.formatMessage(assetSkillName())}
                      subtext={intl.formatMessage(assetSkillDescription())}
                      className="job-builder-context-item"
                      active={values.level === "asset"}
                    />
                  </ContextBlock>
                </div>
              </div>
            </div>
            <div data-c-padding="normal">
              <div data-c-grid="gutter middle">
                <div data-c-grid-item="base(1of2)">
                  <button
                    data-c-button="outline(c2)"
                    data-c-radius="rounded"
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
                <div
                  data-c-alignment="base(right)"
                  data-c-grid-item="base(1of2)"
                >
                  <button
                    data-c-button="solid(c2)"
                    data-c-radius="rounded"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Add Skill
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </>
      )}
    />
  );
};

export default injectIntl(CriteriaForm);
