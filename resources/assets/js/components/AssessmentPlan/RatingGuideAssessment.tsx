import React, { ReactElement } from "react";
import {
  WrappedComponentProps,
  injectIntl,
  FormattedMessage,
} from "react-intl";
import { connect } from "react-redux";
import { createTempRatingGuideQuestion } from "../../store/RatingGuideQuestion/ratingGuideQuestionActions";
import {
  assessmentType,
  assessmentTypeDescription,
} from "../../models/localizedConstants";
import { RootState } from "../../store/store";
import { DispatchType } from "../../configureStore";
import {
  getRatingGuideQuestionIdsByJobAndAssessmentType,
  getTempRatingGuideQuestionIdsByAssessment,
} from "../../store/RatingGuideQuestion/ratingGuideQuestionSelectors";
import RatingGuideQuestionWithAnswers from "./RatingGuideQuestionWithAnswers";
import RatingGuideMissing from "./RatingGuideMissing";

interface RatingGuideAssessmentProps {
  /** The id of the job Job Poster this is part of */
  jobId: number;
  /** Display index of this ratings guide assessment compared to others on the page */
  assessmentIndex: number;
  /** The assessment tool used with this assessment question */
  assessmentTypeId: number;
  /** The ids of interview questions to be asked during this assessment */
  questionIds: number[];
  /** Ids of interview questions that have not been saved to the server */
  tempQuestionIds: number[];
  /** Handler function for creating a new RatingGuideQuestion */
  createQuestion: () => void;
}

const RatingGuideAssessment: React.FunctionComponent<
  RatingGuideAssessmentProps & WrappedComponentProps
> = ({
  jobId,
  assessmentIndex,
  assessmentTypeId,
  questionIds,
  createQuestion,
  tempQuestionIds,
  intl,
}): React.ReactElement => {
  return (
    <div>
      <h4
        data-c-font-size="h4"
        data-c-colour="c5"
        data-c-font-weight="bold"
        data-c-margin="top(double) bottom(normal)"
      >
        <FormattedMessage
          id="ratingGuideBuilder.sectionTitle"
          defaultMessage="Assessment {index}: {assessmentType}"
          description="Subtitle for given assessment type section in the Rating Guide Builder."
          values={{
            index: assessmentIndex,
            assessmentType: intl.formatMessage(
              assessmentType(assessmentTypeId),
            ),
          }}
        />
      </h4>
      <p>{intl.formatMessage(assessmentTypeDescription(assessmentTypeId))}</p>

      {questionIds.map(
        (questionId: number, index: number): ReactElement => (
          <RatingGuideQuestionWithAnswers
            key={`question${questionId}`}
            questionId={questionId}
            questionIndex={index + 1}
          />
        ),
      )}
      {tempQuestionIds.map(
        (questionId: number, index: number): ReactElement => (
          <RatingGuideQuestionWithAnswers
            key={`tempQuestion${questionId}`}
            questionId={questionId}
            questionIndex={questionIds.length + index + 1}
            temp
          />
        ),
      )}
      <RatingGuideMissing jobId={jobId} assessmentTypeId={assessmentTypeId} />
      <div data-c-alignment="center">
        <button
          data-c-button="solid(c5)"
          data-c-radius="rounded"
          type="button"
          onClick={(): void => createQuestion()}
        >
          <FormattedMessage
            id="ratingGuideBuilder.addQuestion"
            defaultMessage="Add a Question"
            description="Button text for adding a new rating guide question."
          />
        </button>
      </div>
    </div>
  );
};

interface RatingGuideAssessmentContainerProps {
  assessmentIndex: number;
  assessmentTypeId: number;
  jobId: number;
}

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideAssessmentContainerProps,
): {
  questionIds: number[];
  tempQuestionIds: number[];
} => ({
  questionIds: getRatingGuideQuestionIdsByJobAndAssessmentType(state, ownProps),
  tempQuestionIds: getTempRatingGuideQuestionIdsByAssessment(state, ownProps),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
  ownProps: RatingGuideAssessmentContainerProps,
): {
  createQuestion: () => void;
} => ({
  createQuestion: (): void => {
    dispatch(
      createTempRatingGuideQuestion(
        ownProps.jobId,
        ownProps.assessmentTypeId,
        null,
      ),
    );
  },
});

const RatingGuideAssessmentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(RatingGuideAssessment));

export default RatingGuideAssessmentContainer;
