import React from "react";
import { connect } from "react-redux";
import {
  RatingGuideAnswer as RatingGuideAnswerModel,
  Skill,
  Criteria,
} from "../../models/types";
import Select, { SelectOption } from "../Select";
import Input from "../Input";
import { getId, hasKey, mapToObjectTrans } from "../../helpers/queries";
import { RootState } from "../../store/store";
import { getSkillById } from "../../store/Skill/skillSelector";
import { DispatchType } from "../../configureStore";

interface RatingGuideAnswerProps {
  answer: RatingGuideAnswerModel;
  availableCriteria: Criteria[];
  criteriaIdToSkill: { [id: number]: Skill | null };
  onChange: (updatedAnswer: RatingGuideAnswerModel) => void;
  onDelete: () => void;
}

const RatingGuideAnswer: React.FunctionComponent<RatingGuideAnswerProps> = ({
  answer,
  availableCriteria,
  criteriaIdToSkill,
  onChange,
  onDelete,
}): React.ReactElement => {
  // const criteriaIdToSkill = availableCriteria.reduce(
  //   (map: Dictionary<Skill>, criterion): Dictionary<Skill> => {
  //     map[criterion.id] = find(skills);
  //   },
  //   {},
  // );
  const options = availableCriteria.map(
    (criterion): SelectOption<number> => {
      return {
        value: criterion.id,
        label:
          hasKey<Skill | null>(criteriaIdToSkill, criterion.id) &&
          criteriaIdToSkill[criterion.id] !== null
            ? (criteriaIdToSkill[criterion.id] as Skill).name // TODO: localize
            : "",
      };
    },
  );
  return (
    <div data-c-grid="gutter middle">
      <div data-c-grid-item="base(1of1) tp(1of8)" data-c-alignment="center" />
      <div data-c-grid-item="base(1of1) tp(2of8)">
        <Select
          htmlId={`ratingGuideSelectSkill_${answer.id}`}
          formName="ratingGuideSelectSkill"
          label="Select a Skill"
          required
          options={options}
          onChange={(event): void =>
            onChange({ ...answer, criterion_id: Number(event.target.value) })
          }
          selected={answer.criterion_id}
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
          onChange={(event): void =>
            onChange({ ...answer, expected_answer: event.target.value })
          }
        />
      </div>
      <div data-c-alignment="center" data-c-grid-item="base(1of1) tp(1of8)">
        <button
          className="button-trash"
          type="button"
          onClick={(): void => onDelete()}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    </div>
  );
};

interface RatingGuideAnswerContainerProps {
  answer: RatingGuideAnswerModel;
  availableCriteria: Criteria[];
}

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideAnswerContainerProps,
): { criteriaIdToSkill: { [id: number]: Skill | null } } => ({
  criteriaIdToSkill: mapToObjectTrans(
    ownProps.availableCriteria,
    getId,
    (criterion): Skill | null => getSkillById(state, criterion.skill_id),
  ),
});

const mapDispatchToProps = (dispatch: DispatchType, ownProps): any => ({
  onChange: (updatedAnswer: RatingGuideAnswerModel) => {},
  onDelete: () => {},
});

const RatingGuideAnswerContainer: React.FunctionComponent<
  RatingGuideAnswerContainerProps
> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingGuideAnswer);

export default RatingGuideAnswerContainer;
