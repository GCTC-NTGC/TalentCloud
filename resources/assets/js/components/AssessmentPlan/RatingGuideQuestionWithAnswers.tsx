import React, { ReactElement } from "react";
import { connect } from "react-redux";
import RatingGuideQuestionComponent from "./RatingGuideQuestion";
import RatingGuideAnswerComponent from "./RatingGuideAnswer";
import { RootState } from "../../store/store";
import {
  getRatingGuideAnswerIdsByQuestion,
  getTempRatingGuideAnswerIdsByQuestion,
} from "../../store/RatingGuideAnswer/ratingGuideAnswerSelectors";
import { getCriteriaIdsByJobAndAssessmentType } from "../../store/Job/jobSelectorComplex";
import { DispatchType } from "../../configureStore";
import { createTempRatingGuideAnswer } from "../../store/RatingGuideAnswer/ratingGuideAnswerActions";
import {
  getCurrentRatingGuideQuestionById,
  getTempRatingGuideQuestionById,
} from "../../store/RatingGuideQuestion/ratingGuideQuestionSelectors";

interface RatingGuideQuestionWithAnswersProps {
  questionId: number;
  questionIndex: number;
  /** If this is a Temp question */
  temp?: boolean;
  /** Expected answers to this question */
  answerIds: number[];
  tempAnswerIds: number[];
  /** Whether the Add Answer button should be shown */
  allowMoreAnswers: boolean;
  /** Handler function for creating a new RatingGuideAnswer */
  createAnswer: (ratingGuideQuestionId: number) => void;
}

export const RatingGuideQuestionWithAnswers: React.FunctionComponent<
  RatingGuideQuestionWithAnswersProps
> = ({
  questionId,
  questionIndex,
  temp,
  answerIds,
  tempAnswerIds,
  allowMoreAnswers,
  createAnswer,
}): React.ReactElement => {
  return (
    <div
      key={questionId}
      data-c-background="black(10)"
      data-c-border="all(thin, solid, black)"
      data-c-margin="top(normal) bottom(normal)"
      data-c-padding="bottom(normal)"
    >
      <RatingGuideQuestionComponent
        key={questionId}
        ratingGuideQuestionId={questionId}
        questionIndex={questionIndex}
        temp={temp}
      />

      <div data-c-padding="top(normal)">
        {answerIds.map((answerId: number): ReactElement | null => (
          <RatingGuideAnswerComponent key={answerId} answerId={answerId} />
        ))}
        {tempAnswerIds.map((answerId: number): ReactElement | null => (
          <RatingGuideAnswerComponent key={answerId} answerId={answerId} temp />
        ))}
        {allowMoreAnswers && (
          <div data-c-grid="gutter middle">
            <div
              data-c-alignment="center"
              data-c-grid-item="base(1of1) tp(1of8)"
            >
              <button
                className="button-plus"
                type="button"
                onClick={(): void => createAnswer(questionId)}
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface RatingGuideQuestionWithAnswersContainerProps {
  questionId: number;
  questionIndex: number;
  /** If this is a Temp question */
  temp?: boolean;
}

/**
 * Only allow more answers to be added, if there are currently less answers than criteria to be answered.
 * @param state
 * @param ownProps
 */
const allowMoreAnswers = (
  state: RootState,
  ownProps: RatingGuideQuestionWithAnswersContainerProps,
): boolean => {
  // Require questions to save before adding answers
  if (ownProps.temp) {
    return false;
  }

  const answerIds = getRatingGuideAnswerIdsByQuestion(state, ownProps);
  const tempAnswerIds = getTempRatingGuideAnswerIdsByQuestion(state, ownProps);
  const allAnswerIds = answerIds.concat(tempAnswerIds);
  const question = ownProps.temp
    ? getTempRatingGuideQuestionById(state, ownProps.questionId)
    : getCurrentRatingGuideQuestionById(state, ownProps.questionId);
  if (question === null) {
    return false;
  }
  const criteriaIdsForQuestion = getCriteriaIdsByJobAndAssessmentType(state, {
    jobId: question.job_poster_id,
    assessmentTypeId: question.assessment_type_id,
  });
  return allAnswerIds.length < criteriaIdsForQuestion.length;
};

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideQuestionWithAnswersContainerProps,
): {
  answerIds: number[];
  tempAnswerIds: number[];
  /** Whether the Add Answer button should be shown */
  allowMoreAnswers: boolean;
} => {
  // We decided a temp question must be saved before it can contain answers.
  return {
    answerIds: ownProps.temp
      ? []
      : getRatingGuideAnswerIdsByQuestion(state, ownProps),
    tempAnswerIds: ownProps.temp
      ? []
      : getTempRatingGuideAnswerIdsByQuestion(state, ownProps),
    allowMoreAnswers: ownProps.temp ? false : allowMoreAnswers(state, ownProps),
  };
};

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  createAnswer: (ratingGuideQuestionId: number) => void;
} => ({
  createAnswer: (ratingGuideQuestionId: number): void => {
    dispatch(createTempRatingGuideAnswer(ratingGuideQuestionId, null, null));
  },
});

export const RatingGuideQuestionWithAnswersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingGuideQuestionWithAnswers);

export default RatingGuideQuestionWithAnswersContainer;
