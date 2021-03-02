import React, { useState } from "react";
import {
  MessageDescriptor,
  FormattedMessage,
  defineMessages,
  useIntl,
} from "react-intl";
import * as Yup from "yup";
import { Formik, Form, Field, FastField } from "formik";
import { Criteria, Skill } from "../../../models/types";
import { validationMessages } from "../../Form/Messages";
import TextAreaInput from "../../Form/TextAreaInput";
import RadioGroup from "../../Form/RadioGroup";
import { SkillLevelId, CriteriaTypeId } from "../../../models/lookupConstants";
import RadioInput from "../../Form/RadioInput";
import {
  skillLevelName,
  assetSkillName,
  skillLevelDescription,
  assetSkillDescription,
} from "../../../models/localizedConstants";
import ContextBlockItem from "../../ContextBlock/ContextBlockItem";
import ContextBlock from "../../ContextBlock/ContextBlock";
import { localizeField, getLocale } from "../../../helpers/localize";

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

const criteriaFormMessages = defineMessages({
  skillSpecificityLabel: {
    id: "criteriaForm.skillSpecificityLabel",
    defaultMessage: "Additional skill details",
    description: "Label for the skill specificity textarea.",
  },
  skillSpecificityPlaceholder: {
    id: "criteriaForm.skillSpecificityPlaceholder",
    defaultMessage:
      "Add context or specifics to the definition of this skill that will only appear on your job poster. This will be reviewed by your human resources advisor.",
    description: "Placeholder for the skill specificity textarea.",
  },
  skillLevelSelectionLabel: {
    id: "criteriaForm.skillLevelSelectionLabel",
    defaultMessage: "Select a skill level:",
    description: "Placeholder for the skill specificity textarea.",
  },
});

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
  specificity: localizeField(locale, criteria, "specificity") || "",
  level:
    criteria.criteria_type_id === CriteriaTypeId.Asset
      ? "asset"
      : essentialSkillIdToKey(criteria.skill_level_id),
});

const updateCriteriaWithValues = (
  locale: "en" | "fr",
  criteria: Criteria,
  skill: Skill,
  values: FormValues,
): Criteria => {
  return {
    ...criteria,
    criteria_type_id:
      values.level === "asset"
        ? CriteriaTypeId.Asset
        : CriteriaTypeId.Essential,
    skill_level_id: essentialKeyToId(values.level),
    description: {
      en: skill.description.en,
      fr: skill.description.fr,
    },
    specificity: {
      ...criteria.specificity,
      [locale]: values.specificity,
    },
  };
};

const newCriteria = (jobPosterId: number, skillId: number): Criteria => ({
  id: 0,
  criteria_type_id: CriteriaTypeId.Essential,
  job_poster_id: jobPosterId,
  skill_id: skillId,
  skill_level_id: SkillLevelId.Basic,
  description: {
    en: null,
    fr: null,
  },
  specificity: {
    en: null,
    fr: null,
  },
});

export const CriteriaForm: React.FunctionComponent<CriteriaFormProps> = ({
  jobPosterId,
  criteria,
  skill,
  handleSubmit,
  handleCancel,
}): React.ReactElement => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const stringNotEmpty = (value: string | null): boolean =>
    value !== null && (value as string).length !== 0;
  const [showSpecificity, setShowSpecificity] = useState(
    criteria !== undefined &&
      stringNotEmpty(localizeField(locale, criteria, "specificity")),
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
          locale,
          oldCriteria,
          skill,
          values,
        );
        handleSubmit(updatedCriteria);
        setSubmitting(false);
      }}
    >
      {({
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
                <FormattedMessage
                  id="jobBuilder.criteriaForm.skillDefinition"
                  defaultMessage="Skill Definition"
                  description="Label for Skill Definition heading on Add Skill modal."
                />
              </p>
              <div>
                <p data-c-margin="bottom(normal)">
                  {localizeField(locale, skill, "name")}
                </p>
                <p data-c-margin="bottom(normal)">
                  {localizeField(locale, skill, "description")}
                </p>
                {showSpecificity ? (
                  <>
                    <FastField
                      id="skillSpecificity"
                      type="textarea"
                      name="specificity"
                      label={intl.formatMessage(
                        criteriaFormMessages.skillSpecificityLabel,
                      )}
                      placeholder={intl.formatMessage(
                        criteriaFormMessages.skillSpecificityPlaceholder,
                      )}
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
                        <FormattedMessage
                          id="jobBuilder.criteriaForm.removeSpecificity"
                          defaultMessage="Remove additional specificity."
                          description="Label for 'Remove additional specificity' button on Add Skill modal."
                        />
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
                      <FormattedMessage
                        id="jobBuilder.criteriaForm.addSpecificity"
                        defaultMessage="I would like to add details to this definition that are specific to this position."
                        description="Label for 'Add additional specificity' button on Add Skill modal."
                      />
                    </span>
                  </button>
                )}
              </div>
            </div>
            {/* Skill Level */}
            <div
              className="job-builder-culture-block"
              data-c-grid-item="base(1of1)"
              data-c-padding="all(normal)"
            >
              <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
                <FormattedMessage
                  id="jobBuilder.criteriaForm.chooseSkillLevel"
                  defaultMessage="Choose a Skill Level"
                  description="Label for 'Choose a Skill Level' radio group heading on Add Skill modal."
                />
              </p>
              <div data-c-grid="gutter">
                <RadioGroup
                  id="skillLevelSelection"
                  label={intl.formatMessage(
                    criteriaFormMessages.skillLevelSelectionLabel,
                  )}
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
                        <FastField
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
                    <span>
                      <FormattedMessage
                        id="jobBuilder.criteriaForm.or"
                        defaultMessage="or"
                        description="Label for 'or' between essential/asset levels on Add Skill modal."
                      />
                    </span>
                  </div>
                  <FastField
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
                    <FormattedMessage
                      id="jobBuilder.criteriaForm.button.cancel"
                      defaultMessage="Cancel"
                      description="Label for Cancel button on Add Skill modal."
                    />
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
                    <FormattedMessage
                      id="jobBuilder.criteriaForm.button.add"
                      defaultMessage="Add Skill"
                      description="Label for Add Skill button on Add Skill modal."
                    />
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default CriteriaForm;
