import React from "react";
import { connect } from "react-redux";
import {
  RatingGuideAnswer as RatingGuideAnswerModel,
  Skill,
} from "../../models/types";
import Select from "../Select";
import Input from "../Input";
import { getId } from "../../helpers/queries";
import { RootState } from "../../store/store";
import { getSkillById } from "../../store/Skill/skillSelector";

interface RatingGuideAnswerProps {
  answer: RatingGuideAnswerModel;
  availableSkills: Skill[];
  selectedSkill: Skill | null;
  onChange: (updatedAnswer: RatingGuideAnswerModel) => void;
  onDelete: () => void;
}

const RatingGuideAnswer: React.FunctionComponent<RatingGuideAnswerProps> = ({
  answer,
  availableSkills,
  selectedSkill,
  onChange,
  onDelete,
}): React.ReactElement => {
  const selectionIsValid = availableSkills.map(getId).includes(answer.skill_id);
  const availableOptions = availableSkills.map(skill => {
    return { value: skill.id, label: skill.name };
  });
  // Add the selected skill to options, if its not part of available options
  const options =
    selectionIsValid || selectedSkill == null
      ? availableOptions
      : [
          ...availableOptions,
          { value: selectedSkill.id, label: selectedSkill.name },
        ];
  return (
    <div data-c-grid="gutter middle">
      <div data-c-grid-item="base(1of1) tp(1of8)" data-c-alignment="center">
        {!selectionIsValid && <i className="fa fa-exclamation" />}
      </div>
      <div data-c-grid-item="base(1of1) tp(2of8)">
        {!selectionIsValid && <p>Selected Skill no longer valid</p>}
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

interface RatingGuideAnswerContainerProps {
  answer: RatingGuideAnswerModel;
  availableSkills: Skill[];
  onChange: (updatedAnswer: RatingGuideAnswerModel) => void;
  onDelete: () => void;
}

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideAnswerContainerProps,
): { selectedSkill: Skill | null } => ({
  selectedSkill: getSkillById(state, ownProps.answer.skill_id),
});

const RatingGuideAnswerContainer: React.FunctionComponent<
  RatingGuideAnswerContainerProps
> = connect(mapStateToProps)(RatingGuideAnswer);

export default RatingGuideAnswerContainer;
