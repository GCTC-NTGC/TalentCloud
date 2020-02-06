import React from "react";
import { connect } from "react-redux";
import UpdatingInput from "../UpdatingInput";
import { RatingGuideQuestion as RatingGuideQuestionModel } from "../../models/types";
import { RootState } from "../../store/store";
import { defineMessages, useIntl } from "react-intl";
import {
  ratingGuideQuestionIsEdited,
  ratingGuideQuestionIsUpdating,
  getTempRatingGuideQuestionById,
  getCurrentRatingGuideQuestionById,
  tempRatingGuideQuestionIsSaving,
} from "../../store/RatingGuideQuestion/ratingGuideQuestionSelectors";
import {
  editRatingGuideQuestion,
  updateRatingGuideQuestion,
  deleteRatingGuideQuestion,
  editTempRatingGuideQuestion,
  deleteTempRatingGuideQuestion,
  storeNewRatingGuideQuestion,
} from "../../store/RatingGuideQuestion/ratingGuideQuestionActions";
import { DispatchType } from "../../configureStore";

const messages = defineMessages({
  questionLabel: {
    id: "ratingGuideQuestion.questionLabel",
    defaultMessage: "Interview Question",
    description:
      "Label for the rating guide question.",
  },
  questionPlaceholder: {
    id: "ratingGuideQuestion.questionPlaceholder",
    defaultMessage: "Write your interview question here...",
    description:
      "Placeholder for the rating guide question.",
  },

});

interface RatingGuideQuestionProps {
  /** Question Model */
  question: RatingGuideQuestionModel | null;
  /** Whether the question is performing an asynchronous update */
  isUpdating: boolean;
  /** This questions display index on the page */
  questionIndex: number;
  /** If this is a temporary question */
  temp?: boolean;
  /** Handler function for when question is changed */
  editQuestion: (newQuestion: RatingGuideQuestionModel) => void;
  /** Handler function for when this question is deleted */
  removeQuestion: (id: number) => void;
  /** Handler function for when this question is saved */
  updateQuestion: (question: RatingGuideQuestionModel) => void;
}

const RatingGuideQuestion: React.FunctionComponent<RatingGuideQuestionProps> = ({
  question,
  questionIndex,
  isUpdating,
  temp,
  editQuestion,
  removeQuestion,
  updateQuestion,
}): React.ReactElement | null => {
  const intl =  useIntl();
  if (question === null) {
    return null;
  }
  return (
    <div
      data-c-background="black(10)"
      data-c-border="bottom(thin, solid, black)"
      data-c-padding="top(normal) bottom(normal)"
    >
      <div data-c-grid="gutter middle">
        <div data-c-alignment="center" data-c-grid-item="base(1of1) tp(1of8)">
          <strong>{questionIndex}</strong>
        </div>
        <div data-c-grid-item="base(1of1) tp(6of8)">
          <UpdatingInput
            id={`ratingGuideQuestion${question.assessment_type_id}`}
            name="ratingGuideQuestion"
            label={intl.formatMessage(messages.questionLabel)}
            required
            placeholder={intl.formatMessage(messages.questionPlaceholder)}
            value={question.question || ""}
            updateDelay={temp ? null : 500}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              const newQuestion = String(event.target.value);
              editQuestion({
                ...question,
                question: newQuestion,
              });
            }}
            handleSave={(): void => {
              updateQuestion(question);
            }}
          />
        </div>
        <div data-c-alignment="center" data-c-grid-item="base(1of1) tp(1of8)">
          <button
            className="button-trash"
            type="button"
            onClick={(): void => {
              removeQuestion(question.id);
            }}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <i className="fa fa-spinner fa-spin" />
            ) : (
              <i className="fa fa-trash" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

interface RatingGuideQuestionContainerProps {
  ratingGuideQuestionId: number;
  questionIndex: number;
  temp?: boolean;
}

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideQuestionContainerProps,
): {
  question: RatingGuideQuestionModel | null;
  isEdited: boolean;
  isUpdating: boolean;
} => ({
  question: ownProps.temp
    ? getTempRatingGuideQuestionById(state, ownProps.ratingGuideQuestionId)
    : getCurrentRatingGuideQuestionById(state, ownProps.ratingGuideQuestionId),
  isEdited: ratingGuideQuestionIsEdited(state, ownProps.ratingGuideQuestionId),
  isUpdating: ownProps.temp
    ? tempRatingGuideQuestionIsSaving(state, ownProps.ratingGuideQuestionId)
    : ratingGuideQuestionIsUpdating(state, ownProps.ratingGuideQuestionId),
});

const mapDispatchToProps = (dispatch: DispatchType, ownProps): any => ({
  editQuestion: ownProps.temp
    ? (ratingGuideQuestion: RatingGuideQuestionModel): void => {
        dispatch(editTempRatingGuideQuestion(ratingGuideQuestion));
      }
    : (ratingGuideQuestion: RatingGuideQuestionModel): void => {
        dispatch(editRatingGuideQuestion(ratingGuideQuestion));
      },
  updateQuestion: ownProps.temp
    ? (ratingGuideQuestion: RatingGuideQuestionModel): void =>
        dispatch(storeNewRatingGuideQuestion(ratingGuideQuestion))
    : (ratingGuideQuestion: RatingGuideQuestionModel): void =>
        dispatch(updateRatingGuideQuestion(ratingGuideQuestion)),
  removeQuestion: ownProps.temp
    ? (id: number): void => {
        dispatch(deleteTempRatingGuideQuestion(id));
      }
    : (ratingGuideQuestionId: number): void => {
        dispatch(deleteRatingGuideQuestion(ratingGuideQuestionId));
      },
});

const RatingGuideQuestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingGuideQuestion);

export default RatingGuideQuestionContainer;
