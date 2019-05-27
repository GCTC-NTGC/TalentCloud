import React from "react";
import { Criteria, Skill } from "../../models/types";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import {
  assessmentType,
  assessmentTypeDescription,
  narrativeReviewStandardQuestion,
  skillLevelName,
  narrativeReviewStandardAnswer,
} from "../../models/localizedConstants";
import { AssessmentTypeId } from "../../models/lookupConstants";
import { RootState } from "../../store/store";
import { getCriteriaByJobAndAssessmentType } from "../../store/Job/jobSelector";
import { getCriteriaToSkills } from "../../store/Skill/skillSelector";
import { getId } from "../../helpers/queries";
import { connect } from "react-redux";

interface RatingGuideNarrativeAssessmentProps {
  /** The id of the job Job Poster this is part of */
  jobId: number | null;
  /** Display index of this ratings guide assessment compared to others on the page */
  assessmentIndex: number;
  assessedCriteria: Criteria[];
  /** A map of criteria to their associated skills */
  criteriaToSkill: { [criteriaId: number]: Skill };
}

export const RatingGuideNarrativeAssessment: React.FunctionComponent<
  RatingGuideNarrativeAssessmentProps & InjectedIntlProps
> = ({
  jobId,
  assessmentIndex,
  assessedCriteria,
  criteriaToSkill,
  intl,
}): React.ReactElement | null => {
  if (jobId === null) {
    return null;
  }
  return (
    <div>
      <h4
        data-c-font-size="h4"
        data-c-colour="c5"
        data-c-font-weight="bold"
        data-c-margin="top(double) bottom(normal)"
      >
        {/** TODO: This FormattedMessage is identical to one in RatingGuideAssessment.
                    This special Narrative Review section should be refactored to there. */}
        <FormattedMessage
          id="ratingGuideBuilder.narrativeSectionTitle"
          defaultMessage="Assessment {index}: {assessmentType}"
          description="Subtitle for the special Narrative Assessment section in the Rating Guide Builder."
          values={{
            index: assessmentIndex,
            assessmentType: intl.formatMessage(
              assessmentType(AssessmentTypeId.NarrativeAssessment),
            ),
          }}
        />
      </h4>
      <p>
        {intl.formatMessage(
          assessmentTypeDescription(AssessmentTypeId.NarrativeAssessment),
        )}
      </p>

      <div
        data-c-background="black(10)"
        data-c-border="all(thin, solid, black)"
        data-c-margin="top(normal) bottom(normal)"
        data-c-padding="bottom(normal)"
      >
        <div
          data-c-background="black(10)"
          data-c-border="bottom(thin, solid, black)"
          data-c-padding="top(normal) bottom(normal)"
        >
          <div data-c-grid="gutter middle">
            <div
              data-c-alignment="center"
              data-c-grid-item="base(1of1) tp(1of8)"
            >
              <strong>{assessmentIndex}.</strong>
            </div>
            <div data-c-grid-item="base(1of1) tp(7of8)">
              <p data-c-font-weight="800">
                {intl.formatMessage(narrativeReviewStandardQuestion())}
              </p>
            </div>
          </div>
        </div>
        {assessedCriteria.map(
          (criterion: Criteria, index: number): React.ReactElement => {
            const skillLevel = intl.formatMessage(
              skillLevelName(
                criterion.skill_level_id,
                criteriaToSkill[criterion.id].skill_type_id,
              ),
            );
            return (
              <div
                key={`narrative-review-criteria-${criterion.criteria_type_id}`}
                data-c-padding="top(normal) bottom(normal)"
              >
                <div data-c-grid="gutter middle">
                  <div data-c-grid-item="base(1of1) tp(1of8)" />
                  {criterion && skillLevel.length > 0 && (
                    <div data-c-grid-item="base(1of1) tp(2of8)">
                      <FormattedMessage
                        id="ratingGuideBuilder.criteriaName"
                        defaultMessage="{skillName} - {skillLevel}"
                        description="How each criteria is listed in Rating Guide Builder."
                        values={{
                          skillName:
                            criteriaToSkill[criterion.id][intl.locale].name,
                          skillLevel,
                        }}
                      />
                    </div>
                  )}
                  <div data-c-grid-item="base(1of1) tp(5of8)">
                    {intl.formatMessage(narrativeReviewStandardAnswer())}
                  </div>
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

interface RatingGuideNarrativeAssessmentContainerProps {
  jobId: number | null;
  assessmentIndex: number;
}

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideNarrativeAssessmentContainerProps,
): {
  assessedCriteria: Criteria[];
  criteriaToSkill: { [criteriaId: number]: Skill };
} => {
  const narrativeCriteria: Criteria[] =
    ownProps.jobId !== null
      ? getCriteriaByJobAndAssessmentType(
          state,
          ownProps.jobId,
          AssessmentTypeId.NarrativeAssessment,
        )
      : [];
  return {
    assessedCriteria: narrativeCriteria,
    criteriaToSkill: getCriteriaToSkills(state, narrativeCriteria.map(getId)),
  };
};

// @ts-ignore
const RatingGuideNarrativeAssessmentContainer: React.FunctionComponent<
  RatingGuideNarrativeAssessmentContainerProps
> = connect(mapStateToProps)(injectIntl(RatingGuideNarrativeAssessment));

export default RatingGuideNarrativeAssessmentContainer;
