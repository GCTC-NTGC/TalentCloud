import React from "react";
import {
  WrappedComponentProps,
  injectIntl,
  FormattedMessage,
} from "react-intl";
import { Criteria, Skill } from "../../models/types";
import { getSkillLevelName } from "../../models/jobUtil";
import { CriteriaTypeId } from "../../models/lookupConstants";

interface CriterionProps {
  criterion: Criteria;
  skill: Skill;
}

export const Criterion: React.FunctionComponent<
  CriterionProps & WrappedComponentProps
> = ({ criterion, skill, intl }): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unknown intl.locale");
  }
  return (
    <div
      key={skill.id}
      className="criterion-item"
      data-c-margin="top(normal) bottom(double)"
    >
      <p data-c-font-weight="bold" data-c-margin="bottom(half)">
        {skill[locale].name}
      </p>
      {criterion.criteria_type_id === CriteriaTypeId.Essential && (
        <p data-c-margin="bottom(half)">
          <FormattedMessage
            id="jobBuilder.criterion.requiredSkill"
            defaultMessage="Required Level: "
            description="Label preceding skill level requirements."
          />
          {intl.formatMessage(getSkillLevelName(criterion, skill))}
        </p>
      )}
      <p>{criterion[locale].description}</p>
      {criterion[locale].specificity && <p>{criterion[locale].specificity}</p>}
    </div>
  );
};

export default injectIntl(Criterion);
