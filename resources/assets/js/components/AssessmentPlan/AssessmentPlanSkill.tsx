import React, { useEffect } from "react";
import {
  injectIntl,
  InjectedIntlProps,
  defineMessages,
  FormattedMessage,
} from "react-intl";
import { connect } from "react-redux";
import {
  skillLevelDescription as SkillLevelDescriptionMessage,
  skillLevelName,
  assessmentType,
} from "../../models/localizedConstants";
import Select, { SelectOption } from "../Select";
import { AssessmentTypeId, enumToIds } from "../../models/lookupConstants";
import { Criteria, Assessment, TempAssessment } from "../../models/types";
import { RootState } from "../../store/store";
import {
  getAssessmentsByCriterion,
  assessmentsAreUpdatingByCriteria,
  assessmentsAreEditedByCriteria,
  getTempAssessmentsByCriterion,
  tempAssessmentsAreSavingByCriterion,
} from "../../store/Assessment/assessmentSelector";
import { DispatchType } from "../../configureStore";
import {
  updateAssessment as updateAssessmentAction,
  editAssessment as editAssessmentAction,
  editTempAssessment as editTempAssessmentAction,
  deleteTempAssessment as deleteTempAssessmentAction,
  createTempAssessment,
  storeNewAssessment,
  deleteAssessment,
} from "../../store/Assessment/assessmentActions";

interface AssessmentPlanSkillProps {
  criterion: Criteria;
  assessments: Assessment[];
  assessmentsEdited: { [id: number]: boolean };
  assessmentsUpdating: { [id: number]: boolean };
  tempAssessments: TempAssessment[];
  tempAssessmentsSaving: { [id: number]: boolean };
  createAssessment: () => void;
  editAssessment: (newAssessment: Assessment) => void;
  updateAssessment: (newAssessment: Assessment) => void;
  removeAssessment: (assessmentId: number) => void;
  editTempAssessment: (newAssessment: TempAssessment) => void;
  saveTempAssessment: (assessment: Assessment) => void;
  removeTempAssessment: (id: number) => void;
}

const localizations = defineMessages({
  selectAssessmentNull: {
    id: "assessmentPlan.selectAssessment.null",
    defaultMessage: "Select an Assessment",
    description:
      "Default select element before an assessment type has been chosen",
  },
  selectAssessmentLabel: {
    id: "assessmentPlan.selectAssessment.label",
    defaultMessage: "Select an Assessment",
    description: "Label for Assessment Type select element.",
  },
});

export const AssessmentPlanSkill: React.FunctionComponent<
  AssessmentPlanSkillProps & InjectedIntlProps
> = ({
  criterion,
  assessments,
  assessmentsEdited,
  assessmentsUpdating,
  tempAssessments,
  tempAssessmentsSaving,
  createAssessment,
  editAssessment,
  updateAssessment,
  removeAssessment,
  editTempAssessment,
  saveTempAssessment,
  removeTempAssessment,
  intl,
}: AssessmentPlanSkillProps & InjectedIntlProps): React.ReactElement => {
  useEffect(
    (): void => {
      assessments.forEach(
        (assessment): void => {
          // If assessment has been edited, and is not currently being updated, start an update.
          if (
            assessmentsEdited[assessment.id] &&
            !assessmentsUpdating[assessment.id]
          ) {
            updateAssessment(assessment);
          }
        },
        [assessments, assessmentsEdited, assessmentsUpdating],
      );
    },
  );
  useEffect((): void => {
    tempAssessments.forEach(
      (temp): void => {
        // If any temp assessments exist, we want to save them as soon as they're valid
        if (
          !tempAssessmentsSaving[temp.id] &&
          temp.assessment_type_id !== null
        ) {
          saveTempAssessment(temp as Assessment);
        }
      },
    );
  }, [tempAssessments, tempAssessmentsSaving]);

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
  const selectAssessmentNull = intl.formatMessage(
    localizations.selectAssessmentNull,
  );
  const selectAssessmentLabel = intl.formatMessage(
    localizations.selectAssessmentLabel,
  );

  const selectedAssessmentTypes: number[] = [
    ...assessments.map((assessment): number => assessment.assessment_type_id),
    ...tempAssessments
      .filter((temp): boolean => temp.assessment_type_id !== null)
      .map((temp): number => temp.assessment_type_id as number),
  ];
  const SelectBlock: React.FunctionComponent<{
    assessment: Assessment | TempAssessment;
    isUpdating: boolean;
    onChange: (newAssessment: Assessment | TempAssessment) => void;
    onDelete: (id: number) => void;
  }> = ({ assessment, isUpdating, onChange, onDelete }): React.ReactElement => {
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
            label={selectAssessmentLabel}
            required
            options={options}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
              const selectedType = Number(event.target.value);
              onChange({
                ...assessment,
                // eslint-disable-next-line @typescript-eslint/camelcase
                assessment_type_id: selectedType,
              });
            }}
            selected={assessment.assessment_type_id}
            nullSelection={selectAssessmentNull}
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
              onDelete(assessment.id);
            }}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <i className="fa fa-spinner fa-spin" />
            ) : (
              <i className="fa fa-trash" />
            )}
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
            <FormattedMessage
              id="assessmentPlan.criteriaTitle"
              defaultMessage="{skillName} - {skillLevel}"
              description="Title of a skill section in the Assessment Plan Builder."
              values={{
                skillName: criterion.skill[intl.locale].name,
                skillLevel,
              }}
            />
          </h5>
        </div>
        <div data-c-grid-item="tl(2of7)">
          <span data-c-font-weight="bold" data-c-margin="bottom(half)">
            <FormattedMessage
              id="assessmentPlan.skillDescriptionLabel"
              defaultMessage="Description"
              description="Label for the text that describes a skill criterion."
            />
          </span>
          <p data-c-font-size="small">{skillDescription}</p>
        </div>
        <div data-c-grid-item="tl(2of7)">
          <span data-c-font-weight="bold" data-c-margin="bottom(half)">
            <FormattedMessage
              id="assessmentPlan.skillLevelDescriptionLabel"
              defaultMessage="Skill Level Selected"
              description="Label for the text that describes a Skill Level."
            />
          </span>
          <p data-c-font-size="small">{skillLevelDescription}</p>
        </div>
        <div data-c-grid-item="tl(3of7)">
          <div data-c-grid>
            <div data-c-grid-item="base(1of2)">
              <span data-c-font-weight="bold" data-c-margin="bottom(half)">
                <FormattedMessage
                  id="assessmentPlan.assessmentTypesLabel"
                  defaultMessage="Assessment Types"
                  description="Label for section where you choose assessment types for a criterion."
                />
              </span>
            </div>
            <div data-c-alignment="base(right)" data-c-grid-item="base(1of2)">
              <button
                className="button-link"
                type="button"
                onClick={(): void => createAssessment()}
              >
                <FormattedMessage
                  id="assessmentPlan.addAssessmentButton"
                  defaultMessage="Add an Assessment"
                  description="Text for the button that adds a new assessment for a criterion."
                />
              </button>
            </div>
          </div>
          {assessments.map(
            (assessment): React.ReactElement => (
              <SelectBlock
                key={`assessmentPlanSkillSelectorAssessment${assessment.id}`}
                assessment={assessment}
                isUpdating={assessmentsUpdating[assessment.id]}
                onChange={editAssessment}
                onDelete={removeAssessment}
              />
            ),
          )}
          {tempAssessments.map(
            (tempAssessment): React.ReactElement => (
              <SelectBlock
                key={`assessmentPlanSkillSelectorTempAssessment${
                  tempAssessment.id
                }`}
                assessment={tempAssessment}
                isUpdating={tempAssessmentsSaving[tempAssessment.id]}
                onChange={editTempAssessment}
                onDelete={removeTempAssessment}
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
): {
  assessments: Assessment[];
  assessmentsEdited: { [id: number]: boolean };
  assessmentsUpdating: { [id: number]: boolean };
  tempAssessments: TempAssessment[];
  tempAssessmentsSaving: { [id: number]: boolean };
} => ({
  assessments: getAssessmentsByCriterion(state, ownProps.criterion.id),
  assessmentsEdited: assessmentsAreEditedByCriteria(
    state,
    ownProps.criterion.id,
  ),
  assessmentsUpdating: assessmentsAreUpdatingByCriteria(
    state,
    ownProps.criterion.id,
  ),
  tempAssessments: getTempAssessmentsByCriterion(state, ownProps.criterion.id),
  tempAssessmentsSaving: tempAssessmentsAreSavingByCriterion(
    state,
    ownProps.criterion.id,
  ),
});

const mapDispatchToProps = (dispatch: DispatchType, ownProps): any => ({
  createAssessment: (): void => {
    dispatch(createTempAssessment(ownProps.criterion.id, null));
  },
  editAssessment: (assessment: Assessment): void => {
    dispatch(editAssessmentAction(assessment));
  },
  updateAssessment: (assessment: Assessment): void =>
    dispatch(updateAssessmentAction(assessment)),
  removeAssessment: (assessmentId: number): void => {
    dispatch(deleteAssessment(assessmentId));
  },
  editTempAssessment: (assessment: TempAssessment): void => {
    dispatch(editTempAssessmentAction(assessment));
  },
  removeTempAssessment: (id: number): void => {
    dispatch(deleteTempAssessmentAction(id));
  },
  saveTempAssessment: (assessment: Assessment): void => {
    dispatch(storeNewAssessment(assessment));
  },
});
// @ts-ignore
const AssessmentPlanSkillContainer: React.FunctionComponent<
  AssessmentPlanSkillContainerProps
> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(AssessmentPlanSkill));

export default AssessmentPlanSkillContainer;
