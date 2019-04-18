import React, { useState, Dispatch } from "react";
import { injectIntl, InjectedIntlProps, defineMessages } from "react-intl";
import { connect } from "react-redux";
import {
  skillLevelDescription as SkillLevelDescriptionMessage,
  skillLevelName,
  assessmentType,
} from "../../models/localizedConstants";
import Select, { SelectOption } from "../Select";
import { AssessmentTypeId, enumToIds } from "../../models/lookupConstants";
import { Criteria, Assessment } from "../../models/types";
import { RootState } from "../../store/store";
import { getAssessmentsByCriterion } from "../../store/Assessment/assessmentSelector";
import { DispatchType } from "../../configureStore";
import { updateAssessment as updateAssessmentAction } from "../../store/Assessment/assessmentActions";

interface AssessmentPlanSkillProps {
  criterion: Criteria;
  assessments: Assessment[];
  createAssessment: () => void;
  updateAssessment: (newAssessment: Assessment) => void;
  removeAssessment: (assessmentId: number) => void;
}

const localizations = defineMessages({
  assessmentTypeNullSelection: {
    id: "assessmentPlan.assessmentTypeNull",
    defaultMessage: "l10n.missing Select an Assessment",
    description:
      "Default select element before an assessment type has been chosen",
  },
});

export const AssessmentPlanSkill: React.FunctionComponent<
  AssessmentPlanSkillProps & InjectedIntlProps
> = ({
  criterion,
  assessments,
  createAssessment,
  updateAssessment,
  removeAssessment,
  intl,
}: AssessmentPlanSkillProps & InjectedIntlProps): React.ReactElement => {
  const skillLevel = intl.formatMessage(
    skillLevelName(criterion.skill_level_id, criterion.skill.skill_type_id),
  );
  const skillLevelDescription = intl.formatMessage(
    SkillLevelDescriptionMessage(
      criterion.skill_level_id,
      criterion.skill.skill_type_id,
    ),
  );
  const skillDescription = criterion.description
    ? criterion.description
    : criterion.skill.description;
  const assessmentTypeOptions = enumToIds(AssessmentTypeId).map(
    (typeId): SelectOption<number> => {
      return {
        value: typeId,
        label: intl.formatMessage(assessmentType(typeId)),
      };
    },
  );
  const assessmentTypeNullSelection = intl.formatMessage(
    localizations.assessmentTypeNullSelection,
  );

  const selectedAssessmentTypes: number[] = assessments.map(
    (assessment): number => assessment.assessment_type_id,
  );

  const SelectBlock: React.FunctionComponent<{ assessment: Assessment }> = ({
    assessment,
  }): React.ReactElement => {
    const options = assessmentTypeOptions.filter(
      (option): boolean => {
        // Ensure we can't select an option already selected in a sibling selector
        return (
          option.value === assessment.assessment_type_id ||
          !selectedAssessmentTypes.includes(option.value)
        );
      },
    );
    return (
      <div data-c-grid="middle">
        <div data-c-grid-item="base(2of3) tl(4of5)">
          <Select
            htmlId={`assessmentSelect_${criterion.id}_${assessment.id}`}
            formName="assessmentTypeId"
            label="Select an Assessment"
            required
            options={options}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
              const selectedType = Number(event.target.value);
              updateAssessment({
                ...assessment,
                // eslint-disable-next-line @typescript-eslint/camelcase
                assessment_type_id: selectedType,
              });
            }}
            selected={assessment.assessment_type_id}
            nullSelection={assessmentTypeNullSelection}
          />
        </div>
        <div
          data-c-alignment="base(center)"
          data-c-grid-item="base(1of3) tl(1of5)"
        >
          <button
            className="button-trash"
            type="button"
            onClick={(): void => {
              removeAssessment(assessment.id);
            }}
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      data-c-border="top(thin, solid, black)"
      data-c-margin="top(normal) bottom(normal)"
    >
      <div data-c-grid="gutter top">
        <div data-c-grid-item="base(1of1)">
          <h5 data-c-font-size="h4" data-c-margin="top(normal)">
            {`${criterion.skill.name} - ${skillLevel}`}
          </h5>
        </div>
        <div data-c-grid-item="tl(2of7)">
          <span data-c-font-weight="bold" data-c-margin="bottom(half)">
            Description
          </span>
          <p data-c-font-size="small">{skillDescription}</p>
        </div>
        <div data-c-grid-item="tl(2of7)">
          <span data-c-font-weight="bold" data-c-margin="bottom(half)">
            Skill Level Selected
          </span>
          <p data-c-font-size="small">{skillLevelDescription}</p>
        </div>
        <div data-c-grid-item="tl(3of7)">
          <div data-c-grid>
            <div data-c-grid-item="base(1of2)">
              <span data-c-font-weight="bold" data-c-margin="bottom(half)">
                Assessment Types
              </span>
            </div>
            <div data-c-alignment="base(right)" data-c-grid-item="base(1of2)">
              <button
                className="button-link"
                type="button"
                onClick={(): void => createAssessment()}
              >
                Add an Assessment
              </button>
            </div>
          </div>
          {assessments.map(
            (assessment): React.ReactElement => (
              <SelectBlock
                assessment={assessment}
                key={`assessmentPlanSkillSelector${assessment.id}`}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

interface AssessmentPlanSkillContainerProps {
  criterion: Criteria;
}

const mapStateToProps = (
  state: RootState,
  ownProps: AssessmentPlanSkillContainerProps,
): { assessments: Assessment[] } => ({
  assessments: getAssessmentsByCriterion(state, ownProps.criterion.id),
});

const mapDispatchToProps = (dispatch: DispatchType): any => ({
  createAssessment: (): void => {}, // TODO: add create
  updateAssessment: (assessment: Assessment): void =>
    dispatch(updateAssessmentAction(assessment)),
  removeAssessment: (assessmentId: number): void => {}, // TODO: add delete
});

const AssessmentPlanSkillContainer: React.FunctionComponent<
  AssessmentPlanSkillContainerProps
> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(AssessmentPlanSkill));

export default AssessmentPlanSkillContainer;
