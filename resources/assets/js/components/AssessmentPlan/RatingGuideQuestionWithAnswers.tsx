import React, { ReactElement } from "react";
import { connect } from "react-redux";
import RatingGuideQuestionComponent from "./RatingGuideQuestion";
import RatingGuideAnswerComponent from "./RatingGuideAnswer";
import { RootState } from "../../store/store";
import {
  getRatingGuideAnswersByQuestion,
  getTempRatingGuideAnswersByQuestion,
} from "../../store/RatingGuideAnswer/ratingGuideAnswerSelectors";
import { getCriteriaUnansweredForQuestion } from "../../store/Job/jobSelector";
import { DispatchType } from "../../configureStore";
import { createTempRatingGuideAnswer } from "../../store/RatingGuideAnswer/ratingGuideAnswerActions";

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
        {answerIds.map(
          (answerId: number): ReactElement | null => (
            <RatingGuideAnswerComponent key={answerId} answerId={answerId} />
          ),
        )}
        {tempAnswerIds.map(
          (answerId: number): ReactElement | null => (
            <RatingGuideAnswerComponent
              key={answerId}
              answerId={answerId}
              temp
            />
          ),
        )}
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

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideQuestionWithAnswersContainerProps,
): {
  answerIds: number[];
  tempAnswerIds: number[];
  /** Whether the Add Answer button should be shown */
  allowMoreAnswers: boolean;
} => {
  return {
    answerIds: getRatingGuideAnswersByQuestion(state, ownProps.questionId).map(
      (answer): number => answer.id,
    ),
    tempAnswerIds: getTempRatingGuideAnswersByQuestion(
      state,
      ownProps.questionId,
    ).map((answer): number => answer.id),
    allowMoreAnswers:
      getCriteriaUnansweredForQuestion(
        state,
        ownProps.questionId,
        ownProps.temp,
      ).length > 0,
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

// @ts-ignore
const RatingGuideQuestionWithAnswersContainer: React.FunctionComponent<
  RatingGuideQuestionWithAnswersContainerProps
> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingGuideQuestionWithAnswers);

export default RatingGuideQuestionWithAnswersContainer;
