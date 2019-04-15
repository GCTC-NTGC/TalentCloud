import React, { useState } from "react";
import { injectIntl, InjectedIntlProps, defineMessages } from "react-intl";
import {
  skillLevelDescription as SkillLevelDescriptionMessage,
  skillLevelName,
  assessmentType,
} from "../../models/localizedConstants";
import Select from "../Select";
import { AssessmentTypeId, enumToIds } from "../../models/lookupConstants";
import { Criteria } from "../../models/types";

interface AssessmentPlanSkillProps {
  criterion: Criteria;
  assessmentTypeIds: number[];
  addAssessmentType: (assessmentTypeId: number) => void;
  removeAssessmentType: (assessmentTypeId: number) => void;
}

const localizations = defineMessages({
  assessmentTypeNullSelection: {
    id: "assessmentPlan.assessmentTypeNull",
    defaultMessage: "l10n.missing Select an Assessment",
    description:
      "Default select element before an assessment type has been chosen",
  },
});

const AssessmentPlanSkill: React.FunctionComponent<
  AssessmentPlanSkillProps & InjectedIntlProps
> = ({
  criterion,
  assessmentTypeIds,
  addAssessmentType,
  removeAssessmentType,
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
  const assessmentTypeOptions = enumToIds(AssessmentTypeId).map(typeId => {
    return {
      value: typeId,
      label: intl.formatMessage(assessmentType(typeId)),
    };
  });
  const assessmentTypeNullSelection = intl.formatMessage(
    localizations.assessmentTypeNullSelection,
  );

  // a count of the number of new default selectors that have been added
  const [newSelectorsCount, setNewSelectorsCount] = useState(0);

  const selectBlock = (
    selectedId: number | undefined,
    key: number | string,
  ): React.ReactElement => {
    const options = assessmentTypeOptions.filter(option => {
      // Ensure we can't select an option already selected in a sibling selector
      return (
        option.value === selectedId || !assessmentTypeIds.includes(option.value)
      );
    });
    const deleteSelect = (): void => {
      if (selectedId) {
        removeAssessmentType(selectedId);
      } else {
        setNewSelectorsCount(newSelectorsCount - 1);
      }
    };

    return (
      <div data-c-grid="middle" key={key}>
        <div data-c-grid-item="base(2of3) tl(4of5)">
          <Select
            htmlId={`assessmentSelect_${criterion.id}_${selectedId}`}
            formName="assessmentTypeId"
            label="Select an Assessment"
            required
            options={options}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              if (selectedId) {
                removeAssessmentType(selectedId);
              }
              addAssessmentType(Number(event.target.value));
            }}
            selected={selectedId}
            nullSelection={assessmentTypeNullSelection}
          />
        </div>
        <div
          data-c-alignment="base(center)"
          data-c-grid-item="base(1of3) tl(1of5)"
        >
          <button className="button-trash" type="button" onClick={deleteSelect}>
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    );
  };

  const newSelectorsBlock = (count: number): React.ReactElement => {
    const selectors: React.ReactElement[] = [];
    for (let i = 0; i < count; i += 1) {
      selectors.push(selectBlock(undefined, `newSelector${i}`));
    }
    return <React.Fragment>{selectors}</React.Fragment>;
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
                onClick={() => setNewSelectorsCount(newSelectorsCount + 1)}
              >
                Add an Assessment
              </button>
            </div>
          </div>
          {assessmentTypeIds.map(assessmentTypeId =>
            selectBlock(assessmentTypeId, `selector${assessmentTypeId}`),
          )}
          {newSelectorsBlock(newSelectorsCount)}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(AssessmentPlanSkill);
