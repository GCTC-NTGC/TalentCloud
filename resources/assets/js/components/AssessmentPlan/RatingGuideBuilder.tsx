import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Assessment } from "../../models/types";

import { getUniqueAssessmentTypes } from "./assessmentHelpers";
import { AssessmentTypeId } from "../../models/lookupConstants";
import RatingGuideAssessment from "./RatingGuideAssessment";
import RatingGuideClipboard from "./RatingGuideClipboard";
import RatingGuideNarrativeAssessment from "./RatingGuideNarrativeAssessment";
import { RootState } from "../../store/store";
import { getAssessmentsByJob } from "../../store/Assessment/assessmentSelectorComplex";

interface RatingsGuideBuilderProps {
  assessments: Assessment[];
  jobId: number;
}

const RatingGuideBuilder: React.FunctionComponent<RatingsGuideBuilderProps> = ({
  assessments,
  jobId,
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
  const isNarrativeAssessments = narrativeReview.length > 0;
  const narrativeAssessments = (
    <RatingGuideNarrativeAssessment jobId={jobId} assessmentIndex={1} />
  );
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
      {narrativeAssessments}
      {getUniqueAssessmentTypes(otherAssessments).map(
        (assessmentTypeId: number, index: number): React.ReactElement => {
          sectionCount = isNarrativeAssessments ? index + 2 : index + 1;
          return (
            <RatingGuideAssessment
              key={assessmentTypeId}
              assessmentIndex={sectionCount}
              assessmentTypeId={assessmentTypeId}
              jobId={jobId}
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

      {jobId !== null && (
        <RatingGuideClipboard jobId={jobId} narrativeReview={narrativeReview} />
      )}
    </div>
  );
};

interface RatingGuideBuilderContainerProps {
  jobId: number;
}

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideBuilderContainerProps,
): { assessments: Assessment[] } => ({
  assessments: getAssessmentsByJob(state, ownProps),
});

export const RatingGuideBuilderContainer = connect(mapStateToProps)(
  RatingGuideBuilder,
);

export default RatingGuideBuilderContainer;
