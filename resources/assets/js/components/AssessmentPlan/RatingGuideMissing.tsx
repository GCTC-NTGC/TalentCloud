import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { Skill, Criteria } from "../../models/types";
import { CriteriaTypeId } from "../../models/lookupConstants";
import { RootState } from "../../store/store";
import {
  getCriteriaUnansweredForAssessmentType,
  getCriteriaToSkills,
} from "../../store/Job/jobSelectorComplex";
import { notEmpty } from "../../helpers/queries";

interface RatingGuideMissingProps {
  missingCriteria: Criteria[];
  criteriaToSkills: { [criteriaId: number]: Skill | null };
}

export const RatingGuideMissing: React.FunctionComponent<
  RatingGuideMissingProps & InjectedIntlProps
> = ({
  missingCriteria,
  criteriaToSkills,
  intl,
}): React.ReactElement | null => {
  const getSkillsForCriteria: (criteria: Criteria[]) => Skill[] = (
    criteria,
  ): Skill[] =>
    criteria
      .map(
        (criterion: Criteria): Skill | null => criteriaToSkills[criterion.id],
      )
      .filter(notEmpty);

  const missingEssentialCriteria = missingCriteria.filter(
    (criterion): boolean =>
      criterion.criteria_type_id === CriteriaTypeId.Essential,
  );
  const missingAssetCriteria = missingCriteria.filter(
    (criterion): boolean => criterion.criteria_type_id === CriteriaTypeId.Asset,
  );
  const missingEssentialSkills: Skill[] = getSkillsForCriteria(
    missingEssentialCriteria,
  );
  const missingAssetSkills: Skill[] = getSkillsForCriteria(
    missingAssetCriteria,
  );

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
  missingCriteria: Criteria[];
  criteriaToSkills: { [criteriaId: number]: Skill | null };
} => {
  return {
    missingCriteria: getCriteriaUnansweredForAssessmentType(state, ownProps),
    criteriaToSkills: getCriteriaToSkills(state),
  };
};

// @ts-ignore
const RatingGuideMissingContainer: React.FunctionComponent<
  RatingGuideMissingContainerProps
> = connect(mapStateToProps)(injectIntl(RatingGuideMissing));

export default RatingGuideMissingContainer;
