import React from "react";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";
import {
  skillLevelDescription,
  skillLevelName,
  assessmentType
} from "../localizedConstants";
import Select from "../Select";
import { AssessmentTypeId, enumToIds } from "../lookupConstants";

interface AssessmentPlanSkillProps {
  id: number;
  name: string;
  description: string;
  skillTypeId: number;
  skillLevelId: number;
  assessmentTypeIds: number[];
  addAssessmentType: (assessmentTypeId: number) => void;
  removeAssessmentType: (assessmentTypeId: number) => void;
}

const AssessmentPlanSkill: React.FunctionComponent<
  AssessmentPlanSkillProps & InjectedIntlProps
> = ({
  id,
  name,
  description,
  skillTypeId,
  skillLevelId,
  assessmentTypeIds,
  addAssessmentType,
  removeAssessmentType,
  intl
}: AssessmentPlanSkillProps & InjectedIntlProps): React.ReactElement => {
  const skillLevel = intl.formatMessage(
    skillLevelName(skillLevelId, skillTypeId)
  );
  const assessmentTypeOptions = enumToIds(AssessmentTypeId).map(typeId => {
    return {
      value: typeId,
      label: intl.formatMessage(assessmentType(typeId))
    };
  });
  return (
    <div
      data-c-border="top(thin, solid, black)"
      data-c-margin="top(normal) bottom(normal)"
    >
      <div data-c-grid="gutter top">
        <div data-c-grid-item="base(1of1)">
          <h5 data-c-font-size="h4" data-c-margin="top(normal)">
            {`${name} - ${skillLevel}`}
          </h5>
        </div>
        <div data-c-grid-item="tl(2of7)">
          <span data-c-font-weight="bold" data-c-margin="bottom(half)">
            Description
          </span>
          <p data-c-font-size="small">{description}</p>
        </div>
        <div data-c-grid-item="tl(2of7)">
          <span data-c-font-weight="bold" data-c-margin="bottom(half)">
            Skill Level Selected
          </span>
          <p data-c-font-size="small">
            {intl.formatMessage(
              skillLevelDescription(skillLevelId, skillTypeId)
            )}
          </p>
        </div>
        <div data-c-grid-item="tl(3of7)">
          <div data-c-grid>
            <div data-c-grid-item="base(1of2)">
              <span data-c-font-weight="bold" data-c-margin="bottom(half)">
                Assessment Types
              </span>
            </div>
            <div data-c-alignment="base(right)" data-c-grid-item="base(1of2)">
              <button className="button-link" type="button">
                Add an Assessment
              </button>
            </div>
          </div>
          {assessmentTypeIds.map(assessmentTypeId => (
            <div data-c-grid="middle">
              <div data-c-grid-item="base(2of3) tl(4of5)">
                {`Assessment Type: ${assessmentTypeId}`}
              </div>
              <div
                data-c-alignment="base(center)"
                data-c-grid-item="base(1of3) tl(1of5)"
              >
                <button
                  className="button-trash"
                  type="button"
                  onClick={() => removeAssessmentType(assessmentTypeId)}
                >
                  <i className="fa fa-trash" />
                </button>
              </div>
            </div>
          ))}

          <div data-c-grid="middle">
            <div data-c-grid-item="base(2of3) tl(4of5)">
              <Select
                htmlId={`assessmentSelect_${id}`}
                formName="assessmentTypeId"
                label="Select an Assessment"
                required={false}
                options={assessmentTypeOptions}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  addAssessmentType(Number(event.target.value));
                }}
                selected={undefined}
                nullSelection={undefined}
              />
            </div>
            <div
              data-c-alignment="base(center)"
              data-c-grid-item="base(1of3) tl(1of5)"
            >
              <button className="button-trash" type="button">
                <i className="fa fa-trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(AssessmentPlanSkill);
