import React from "react";
import {
  RatingsGuideQuestion as RatingsGuideQuestionModel,
  Skill,
  RatingsGuideAnswer
} from "../types";
import Input from "../Input";
import RatingsGuideAnswerComponent from "./RatingsGuideAnswer";

interface RatingsGuideQuestionProps {
  question: RatingsGuideQuestionModel;
  /** This questions display index on the page */
  questionIndex: number;
  /** The skills that can be assessed by this question */
  assessedSkills: Skill[];
  answers: RatingsGuideAnswer[];
  /** Handler function for when question is changed */
  onQuestionChange: (newQuestion: string) => void;
  /** Handler function for when this question is deleted */
  onQuestionDelete: () => void;
  /** Handle function for creating a new RatingsGuideAnswer */
  onAnswerCreate: () => void;
}

const RatingsGuideQuestion: React.FunctionComponent<
  RatingsGuideQuestionProps
> = ({
  question,
  questionIndex,
  assessedSkills,
  answers,
  onQuestionChange,
  onQuestionDelete,
  onAnswerCreate
}): React.ReactElement => {
  const selectedSkillIds = answers.map(answer => answer.skill_id);
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
      <div data-c-padding="top(normal)">
        {answers.map(answer => {
          const availableSkills = assessedSkills.filter(skill => {
            return (
              answer.skill_id === skill.id ||
              !selectedSkillIds.includes(skill.id)
            );
          });
          return (
            <RatingsGuideAnswerComponent
              answer={answer}
              availableSkills={availableSkills}
              onChange={/** TODO: setup */ () => console.log("answer change")}
              onDelete={/** TODO: setup */ () => console.log("answer delete")}
            />
          );
        })}

        <div data-c-grid="gutter middle">
          <div data-c-alignment="center" data-c-grid-item="base(1of1) tp(1of8)">
            <button
              className="button-plus"
              type="button"
              onClick={() => onAnswerCreate()}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingsGuideQuestion;
