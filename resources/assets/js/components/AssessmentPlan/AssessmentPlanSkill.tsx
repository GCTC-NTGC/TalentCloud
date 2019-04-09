import React from "react";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";
import { skillLevelDescription, skillLevelName } from "../localizedConstants";

interface AssessmentPlanSkillProps {
  name: string;
  description: string;
  skillTypeId: number;
  skillLevelId: number;
}

const AssessmentPlanSkill: React.FunctionComponent<
  AssessmentPlanSkillProps & InjectedIntlProps
> = ({
  name,
  description,
  skillTypeId,
  skillLevelId,
  intl
}: AssessmentPlanSkillProps & InjectedIntlProps): React.ReactElement => {
  const skillLevel = intl.formatMessage(
    skillLevelName(skillLevelId, skillTypeId)
  );
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
          <div data-c-grid="middle">
            <div data-c-grid-item="base(2of3) tl(4of5)">
              <div data-c-input="select">
                <label htmlFor="SEL1">Select an Assessment</label>
                <span>Required</span>
                <div>
                  <i className="fa fa-caret-down" />
                  <select id="SEL1">
                    <option selected>Narrative Review</option>
                    <option>Application screening question</option>
                    <option>Group test</option>
                    <option>Informal phone conversation</option>
                    <option>Interview</option>
                    <option>Online exam</option>
                    <option>On site exam</option>
                    <option>Portfolio review with candidate</option>
                    <option>Reference check</option>
                    <option>Serious games</option>
                    <option>Take home exam</option>
                  </select>
                </div>
                <span>This input has an error.</span>
              </div>
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
