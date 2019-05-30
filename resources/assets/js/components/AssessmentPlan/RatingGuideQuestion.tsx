import React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import UpdatingInput from "../UpdatingInput";
import {
  RatingGuideQuestion as RatingGuideQuestionModel,
  TempRatingGuideQuestion as TempRatingGuideQuestionModel,
} from "../../models/types";
import { RootState } from "../../store/store";
import {
  ratingGuideQuestionIsEdited,
  ratingGuideQuestionIsUpdating,
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

interface RatingGuideQuestionProps {
  /** Question Model */
  question: RatingGuideQuestionModel;
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

const RatingGuideQuestion: React.FunctionComponent<
  RatingGuideQuestionProps
> = ({
  question,
  questionIndex,
  isUpdating,
  temp,
  editQuestion,
  removeQuestion,
  updateQuestion,
}): React.ReactElement => {
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
            htmlId={`ratingGuideQuestion${question.assessment_type_id}`}
            formName="ratingGuideQuestion"
            label="Interview Question"
            required
            placeholder="Write your interview question here..."
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
  question: RatingGuideQuestionModel;
  questionIndex: number;
  temp?: boolean;
}

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideQuestionContainerProps,
): {
  isEdited: boolean;
  isUpdating: boolean;
} => ({
  isEdited: ratingGuideQuestionIsEdited(state, ownProps.question.id),
  isUpdating: ratingGuideQuestionIsUpdating(state, ownProps.question.id),
});

const mapDispatchToProps = (dispatch: DispatchType, ownProps): any => ({
  editQuestion: ownProps.temp
    ? (ratingGuideQuestion: TempRatingGuideQuestionModel): void => {
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
// @ts-ignore
const RatingGuideQuestionContainer: React.FunctionComponent<
  RatingGuideQuestionContainerProps
> = connect(
  mapStateToProps,
  mapDispatchToProps,
  // @ts-ignore
)(injectIntl(RatingGuideQuestion));

export default RatingGuideQuestionContainer;
