import React from "react";
import {
  RatingGuideAnswer as RatingGuideAnswerModel,
  Skill,
} from "../../models/types";
import Select from "../Select";
import Input from "../Input";

interface RatingGuideAnswerProps {
  answer: RatingGuideAnswerModel;
  availableSkills: Skill[];
  onChange: (updatedAnswer: RatingGuideAnswerModel) => void;
  onDelete: () => void;
}

const RatingGuideAnswer: React.FunctionComponent<RatingGuideAnswerProps> = ({
  answer,
  availableSkills,
  onChange,
  onDelete,
}): React.ReactElement => {
  const options = availableSkills.map(skill => {
    return { value: skill.id, label: skill.name };
  });
  return (
    <div data-c-grid="gutter middle">
      <div data-c-grid-item="base(1of1) tp(1of8)" />
      <div data-c-grid-item="base(1of1) tp(2of8)">
        <Select
          htmlId={`ratingGuideSelectSkill_${answer.id}`}
          formName="ratingGuideSelectSkill"
          label="Select a Skill"
          required
          options={options}
          onChange={event =>
            onChange({ ...answer, skill_id: Number(event.target.value) })
          }
          selected={answer.skill_id}
          nullSelection="Select a Skill..."
        />
      </div>
      <div data-c-grid-item="base(1of1) tp(4of8)">
        <Input
          htmlId={`ratingGuideAnswer${answer.id}`}
          formName="ratingGuideAnswer"
          label="Acceptable Passing Answer"
          required
          placeholder="Write the expected answer to pass the applicant on this skill..."
          type="text"
          value={answer.expected_answer}
          onChange={event =>
            onChange({ ...answer, expected_answer: event.target.value })
          }
        />
      </div>
      <div data-c-alignment="center" data-c-grid-item="base(1of1) tp(1of8)">
        <button
          className="button-trash"
          type="button"
          onClick={() => onDelete()}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    </div>
  );
};

export default RatingGuideAnswer;
