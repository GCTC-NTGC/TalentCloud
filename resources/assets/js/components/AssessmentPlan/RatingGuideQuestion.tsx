import React from "react";
import { RatingGuideQuestion as RatingGuideQuestionModel } from "../../models/types";
import UpdatingInput from "../UpdatingInput";

interface RatingGuideQuestionProps {
  /** Question Model */
  question: RatingGuideQuestionModel;
  /** Whether the question is performing an asynchronous update */
  isUpdating: boolean;
  /** This questions display index on the page */
  questionIndex: number;
  /** Handler function for when question is changed */
  onChange: (newQuestion: RatingGuideQuestionModel) => void;
  /** Handler function for when this question is deleted */
  onDelete: (id: number) => void;
  /** Handler function for when this question is saved */
  onSave: (question: RatingGuideQuestionModel) => void;
}

const RatingGuideQuestion: React.FunctionComponent<
  RatingGuideQuestionProps
> = ({
  question,
  questionIndex,
  isUpdating,
  onChange,
  onDelete,
  onSave,
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
            updateDelay={500}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              const newQuestion = String(event.target.value);
              onChange({
                ...question,
                question: newQuestion,
              });
            }}
            handleSave={(): void => {
              onSave(question);
            }}
          />
        </div>
        <div data-c-alignment="center" data-c-grid-item="base(1of1) tp(1of8)">
          <button
            className="button-trash"
            type="button"
            onClick={(): void => {
              onDelete(question.id);
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

export default RatingGuideQuestion;
