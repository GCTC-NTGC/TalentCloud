import React, { ReactElement } from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { Skill, Criteria } from "../../models/types";
import {
  AssessmentTypeId,
  SkillTypeId,
  CriteriaTypeId,
} from "../../models/lookupConstants";
import { RootState } from "../../store/store";
import { getCriteriaUnansweredForAssessmentType } from "../../store/Job/jobSelector";
import { getSkillById } from "../../store/Skill/skillSelector";
import { connect } from "react-redux";

interface RatingGuideMissingProps {
  missingEssentialSkills: Skill[];
  missingAssetSkills: Skill[];
}

export const RatingGuideMissing: React.FunctionComponent<
  RatingGuideMissingProps & InjectedIntlProps
> = ({
  missingEssentialSkills,
  missingAssetSkills,
  intl,
}): React.ReactElement | null => {
  if (missingEssentialSkills.length === 0 && missingAssetSkills.length === 0) {
    return null;
  }
  const essentialSkillNames = missingEssentialSkills.map(
    (skill: Skill): string => skill[intl.locale].name,
  );
  const assetSkillNames = missingAssetSkills.map(
    (skill: Skill): string => skill[intl.locale].name,
  );

  return (
    <div data-c-alignment="center" data-c-margin="bottom(normal)">
      {missingEssentialSkills.length > 0 && (
        <span data-c-font-weight="bold">
          <FormattedMessage
            id="ratingGuideBuilder.essentialMissing"
            defaultMessage="{count} Essential Missing: "
            description="Label for list of missing essential skills."
            values={{ count: missingEssentialSkills.length }}
          />
          <span data-c-colour="stop">{essentialSkillNames.join(", ")}</span>
        </span>
      )}
      {missingEssentialSkills.length > 0 && missingAssetSkills.length > 0 && (
        <span>{"   "}</span>
      )}
      {missingAssetSkills.length > 0 && (
        <span data-c-font-weight="bold">
          <FormattedMessage
            id="ratingGuideBuilder.assetMissing"
            defaultMessage="{count} Asset Missing: "
            description="Label for list of missing asset skills."
            values={{ count: missingAssetSkills.length }}
          />
          <span data-c-colour="stop">{assetSkillNames.join(", ")}</span>
        </span>
      )}
    </div>
  );
};

interface RatingGuideMissingContainerProps {
  jobId: number;
  assessmentTypeId: number;
}

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideMissingContainerProps,
): {
  missingEssentialSkills: Skill[];
  missingAssetSkills: Skill[];
} => {
  const criteriaToSkills: (criteria: Criteria[]) => Skill[] = (
    criteria,
  ): Skill[] =>
    criteria
      .map(
        (criterion: Criteria): Skill | null =>
          getSkillById(state, criterion.skill_id),
      )
      .filter((skill): boolean => skill !== null) as Skill[];
  const missingCriteria = getCriteriaUnansweredForAssessmentType(
    state,
    ownProps,
  );
  const missingEssentialCriteria = missingCriteria.filter(
    (criterion): boolean =>
      criterion.criteria_type_id === CriteriaTypeId.Essential,
  );
  const missingAssetCriteria = missingCriteria.filter(
    (criterion): boolean => criterion.criteria_type_id === CriteriaTypeId.Asset,
  );
  const missingEssentialSkills: Skill[] = criteriaToSkills(
    missingEssentialCriteria,
  );
  const missingAssetSkills: Skill[] = criteriaToSkills(missingAssetCriteria);
  return {
    missingEssentialSkills,
    missingAssetSkills,
  };
};

// @ts-ignore
const RatingGuideMissingContainer: React.FunctionComponent<
  RatingGuideMissingContainerProps
> = connect(mapStateToProps)(injectIntl(RatingGuideMissing));

export default RatingGuideMissingContainer;
