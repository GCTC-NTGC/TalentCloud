import React from "react";
import { RatingsGuideQuestion as RatingsGuideQuestionModel } from "../types";
import Input from "../Input";

interface RatingsGuideQuestionProps {
  question: RatingsGuideQuestionModel;
  /** This questions display index on the page */
  questionIndex: number;
  /** Handler function for when question is changed */
  onQuestionChange: (newQuestion: string) => void;
  /** Handler function for when this question is deleted */
  onQuestionDelete: () => void;
}

const RatingsGuideQuestion: React.FunctionComponent<
  RatingsGuideQuestionProps
> = ({
  question,
  questionIndex,
  onQuestionChange,
  onQuestionDelete
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
          <Input
            htmlId={`ratingGuideQuestion${question.assessment_type_id}`}
            formName="ratingGuideQuestion"
            label="Interview Question"
            required
            placeholder="Write your interview question here..."
            type="text"
            value={question.question}
            onChange={event => onQuestionChange(event.target.value)}
          />
        </div>
        <div data-c-alignment="center" data-c-grid-item="base(1of1) tp(1of8)">
          <button
            className="button-trash"
            type="button"
            onClick={() => onQuestionDelete()}
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingsGuideQuestion;
