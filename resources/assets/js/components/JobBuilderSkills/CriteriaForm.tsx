import React, { useState } from "react";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Criteria, Skill } from "../../models/types";
import { validationMessages } from "../Form/Messages";
import TextAreaInput from "../Form/TextAreaInput";
import RadioGroup from "../Form/RadioGroup";
import { SkillLevelId } from "../../models/lookupConstants";
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
  // The criteria being edited, if we're not creating a new one.
  criteria?: Criteria;
  // The skill this criteria will evaluate
  skill: Skill;
}

const essentialSkillLevels = (
  skillTypeId: number,
): {
  [key: string]: {
    name: FormattedMessage.MessageDescriptor;
    context: FormattedMessage.MessageDescriptor;
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
  description: string;
  level: string;
}

export const CriteriaForm: React.FunctionComponent<
  CriteriaFormProps & InjectedIntlProps
> = ({ criteria, skill, intl }): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unknown intl.locale");
  }
  const [showSpecificity, setShowSpecificity] = useState(false);

  const initialValues: FormValues = {
    description: "",
    level: "basic",
  };
  // TODO: description is intended to be required, if its showing.
  // Need to figure out dynamic schema
  const skillSchema = Yup.object().shape({
    description: Yup.string(),
    level: Yup.string()
      .oneOf(
        [...Object.keys(essentialSkillLevels(skill.skill_type_id)), "asset"],
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={skillSchema}
      onSubmit={(values, { setSubmitting }): void => {
        // TODO: complete
        setSubmitting(false);
      }}
      render={({
        errors,
        touched,
        isSubmitting,
        values,
      }): React.ReactElement => (
        <>
          <Form id="jpbSkillsForm">
            <div
              data-c-background="c1(100)"
              data-c-border="bottom(thin, solid, black)"
              data-c-padding="normal"
            >
              {/* TODO: What's the deal with this tabIndex on a header here? */}
              <h5
                data-c-dialog-focus
                tabIndex={0}
                data-c-colour="white"
                data-c-font-size="h4"
                id="example-dialog-01-title"
              >
                Add a Skill to Task 01
              </h5>
            </div>
            <div data-c-border="bottom(thin, solid, black)">
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
                        name="description"
                        label="Skill Specificity"
                        placeholder="Add specificity to the definition of this skill that will only appear on my job poster but note that this will have be approved prior to posting..."
                        component={TextAreaInput}
                      />
                      <button
                        className="job-builder-add-skill-definition-trigger"
                        type="button"
                        onClick={(): void => setShowSpecificity(false)}
                      >
                        <span>
                          <i
                            className="fas fa-minus-circle"
                            data-c-colour="c1"
                          />
                          Remove additional specificity.
                        </span>
                      </button>
                    </>
                  ) : (
                    <button
                      className="job-builder-add-skill-definition-trigger"
                      type="button"
                      onClick={(): void => setShowSpecificity(!showSpecificity)}
                    >
                      <span>
                        <i className="fas fa-plus-circle" data-c-colour="c1" />
                        I'd like to add specificity to this definition. This
                        will only apply to my job poster.
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
            </div>
            <div data-c-padding="normal">
              <div data-c-grid="gutter middle">
                <div data-c-grid-item="base(1of2)">
                  <button
                    data-c-button="outline(c2)"
                    data-c-dialog-action="close"
                    data-c-dialog-id="example-dialog-01"
                    data-c-radius="rounded"
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
                    data-c-dialog-action="close"
                    data-c-dialog-id="example-dialog-01"
                    data-c-radius="rounded"
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
