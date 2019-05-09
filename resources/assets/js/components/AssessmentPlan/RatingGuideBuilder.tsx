import React from "react";
import { InjectedIntlProps, FormattedMessage } from "react-intl";
import {
  Criteria,
  Assessment,
  RatingGuideQuestion,
  RatingGuideAnswer,
} from "../../models/types";
import {
  skillLevelName,
  assessmentTypeDescription,
  assessmentType,
  narrativeReviewStandardQuestion,
  narrativeReviewStandardAnswer,
} from "../../models/localizedConstants";
import { getUniqueAssessmentTypes } from "./assessmentHelpers";
import { AssessmentTypeId } from "../../models/lookupConstants";
import RatingGuideAssessment from "./RatingGuideAssessment";
import { find } from "../../helpers/queries";
import RatingGuideClipboard from "./RatingGuideClipboard";

interface RatingsGuideBuilderProps {
  criteria: Criteria[];
  assessments: Assessment[];
  questions: RatingGuideQuestion[];
  answers: RatingGuideAnswer[];
  jobId: number | null;
}

const RatingGuideBuilder: React.FunctionComponent<
  RatingsGuideBuilderProps & InjectedIntlProps
> = ({
  criteria,
  assessments,
  questions,
  answers,
  jobId,
  intl,
}): React.ReactElement => {
  let sectionCount = 0;
  const narrativeReview = assessments.filter(
    (assessment: Assessment): boolean =>
      assessment.assessment_type_id === AssessmentTypeId.NarrativeAssessment,
  );
  const otherAssessments = assessments.filter(
    (assessment: Assessment): boolean =>
      assessment.assessment_type_id !== AssessmentTypeId.NarrativeAssessment,
  );
  const renderNarrativeReview = (): React.ReactElement => {
    sectionCount = +1;

    return (
      <div>
        <h4
          data-c-font-size="h4"
          data-c-font-colour="c5"
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
              index: sectionCount,
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
                <strong>{sectionCount}.</strong>
              </div>
              <div data-c-grid-item="base(1of1) tp(7of8)">
                <p data-c-font-weight="800">
                  {intl.formatMessage(narrativeReviewStandardQuestion())}
                </p>
              </div>
            </div>
          </div>
          {narrativeReview.map(
            (assessment: Assessment, index: number): React.ReactElement => {
              const narrativeCriteria = find(criteria, assessment.criterion_id);
              let skillLevel = "";
              if (narrativeCriteria) {
                skillLevel = intl.formatMessage(
                  skillLevelName(
                    narrativeCriteria.skill_level_id,
                    narrativeCriteria.skill.skill_type_id,
                  ),
                );
              }
              return (
                <div
                  key={`narrative-review-${index + 1}`}
                  data-c-padding="top(normal) bottom(normal)"
                >
                  <div data-c-grid="gutter middle">
                    <div data-c-grid-item="base(1of1) tp(1of8)" />
                    {narrativeCriteria && skillLevel.length > 0 && (
                      <div data-c-grid-item="base(1of1) tp(2of8)">
                        <FormattedMessage
                          id="ratingGuideBuilder.criteriaName"
                          defaultMessage="{skillName} - {skillLevel}"
                          description="How each criteria is listed in Rating Guide Builder."
                          values={{
                            skillName:
                              narrativeCriteria.skill[intl.locale].name,
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

  return (
    <div>
      <h3
        data-c-font-size="h3"
        data-c-font-weight="bold"
        data-c-margin="top(triple) bottom(normal)"
      >
        <FormattedMessage
          id="ratingGuideBuilder.title"
          defaultMessage="3. Ratings Guide Builder"
          description="Title of the Rating Guide Builder section."
        />
      </h3>
      <p data-c-margin="bottom(normal)">
        <FormattedMessage
          id="ratingGuideBuilder.instructions"
          defaultMessage={`Below you will create your own ratings guide tool to help you assess your candidates. This tool allows you to build your own questions/evaluations for each assessment you've selected above, and then allows you to jot down the criteria for what a great candidate response might be. Please note that "Narrative Review" is unique in that the content is generated for you below.`}
          description="Instructions for using the Rating Guide Builder"
        />
      </p>
      {narrativeReview.length > 0 && renderNarrativeReview()}
      {getUniqueAssessmentTypes(otherAssessments).map(
        (assessmentTypeId: number): React.ReactElement => {
          const matchingAssessments = otherAssessments.filter(
            (assessment: Assessment): boolean =>
              assessment.assessment_type_id === assessmentTypeId,
          );
          const requiredCriteria = matchingAssessments
            .map(
              (assessment: Assessment): Criteria | null =>
                find(criteria, assessment.criterion_id),
            )
            .filter(
              (criterion: Criteria): boolean => criterion != null,
            ) as Criteria[];
          sectionCount += 1;
          return (
            <RatingGuideAssessment
              key={assessmentTypeId}
              assessmentIndex={sectionCount}
              assessmentTypeId={assessmentTypeId}
              jobId={jobId}
              requiredCriteria={requiredCriteria}
              ratingGuideAnswers={answers}
            />
          );
        },
      )}

      <hr data-c-margin="top(double) bottom(double)" />
      <p data-c-margin="top(normal) bottom(normal)">
        <FormattedMessage
          id="ratingGuideBuilder.copyInstructions"
          defaultMessage="Now that you've built your Ratings Guide, you can use the button below to copy the entire thing to your clipboard, making it easy to paste in your favourite Word Processor."
          description="Instructions for copying your rating guide."
        />
      </p>
      <div data-c-alignment="center">
        <button data-c-button="solid(c5)" type="button">
          <FormattedMessage
            id="ratingGuideBuilder.copyButton"
            defaultMessage="Click to Copy This Ratings Guide to Your Clipboard"
            description="Text for the 'copy ratings guide' button."
          />
        </button>
      </div>
      {jobId !== null && <RatingGuideClipboard jobId={jobId} />}
    </div>
  );
};

export default RatingGuideBuilder;
