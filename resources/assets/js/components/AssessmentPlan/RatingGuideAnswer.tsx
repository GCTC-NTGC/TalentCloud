/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { connect } from "react-redux";
import { defineMessages, InjectedIntlProps, injectIntl } from "react-intl";
import {
  RatingGuideAnswer as RatingGuideAnswerModel,
  Skill,
  Criteria,
} from "../../models/types";
import Select, { SelectOption } from "../Select";
import UpdatingInput from "../UpdatingInput";
import { getId, hasKey, mapToObjectTrans } from "../../helpers/queries";
import { RootState } from "../../store/store";
import { getSkillById } from "../../store/Skill/skillSelector";
import { DispatchType } from "../../configureStore";
import {
  editTempRatingGuideAnswer,
  editRatingGuideAnswer,
  updateRatingGuideAnswer,
  storeNewRatingGuideAnswer,
  deleteTempRatingGuideAnswer,
  deleteRatingGuideAnswer,
} from "../../store/RatingGuideAnswer/ratingGuideAnswerActions";
import {
  ratingGuideAnswerIsEdited,
  ratingGuideAnswerIsUpdating,
  getRatingGuideAnswerById,
  getTempRatingGuideAnswerById,
} from "../../store/RatingGuideAnswer/ratingGuideAnswerSelectors";
import {
  getCriteriaById,
  getCriteriaUnansweredForQuestion,
} from "../../store/Job/jobSelector";

interface RatingGuideAnswerProps {
  answer: RatingGuideAnswerModel | null;
  availableCriteria: Criteria[];
  criteriaIdToSkill: { [id: number]: Skill | null };
  temp?: boolean;
  isUpdating: boolean;
  isEdited: boolean;
  editAnswer: (newAnswer: RatingGuideAnswerModel) => void;
  updateAnswer: (updatedAnswer: RatingGuideAnswerModel) => void;
  deleteAnswer: (id: number) => void;
}

const messages = defineMessages({
  selectLabel: {
    id: "ratingGuideAnswer.selectLabel",
    defaultMessage: "Select a Skill",
    description:
      "Label for the dropdown for selecting the skill this rating guide answer is used to assess.",
  },
  nullSelection: {
    id: "ratingGuideAnswer.nullSelection",
    defaultMessage: "Select a Skill...",
    description:
      "Null selection for the dropdown for selecting a skill this rating guide answer is used to assess.",
  },
  inputLabel: {
    id: "ratingGuideAnswer.answerLabel",
    defaultMessage: "Acceptable Passing Answer / Required to demonstrate",
    description: "Label for the rating guide answer input.",
  },
  inputPlaceholder: {
    id: "ratingGuideAnswer.answerPlaceholder",
    defaultMessage:
      "Write the expected answer to pass the applicant on this skill...",
    description: "Placeholder text for the rating guide answer.",
  },
});

const RatingGuideAnswer: React.FunctionComponent<
  RatingGuideAnswerProps & InjectedIntlProps
> = ({
  answer,
  availableCriteria,
  criteriaIdToSkill,
  isUpdating,
  editAnswer,
  updateAnswer,
  deleteAnswer,
  intl,
}): React.ReactElement | null => {
  if (answer === null || availableCriteria.length === 0) {
    return null;
  }
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
          label={intl.formatMessage(messages.selectLabel)}
          required
          options={options}
          onChange={(event): void =>
            updateAnswer({
              ...answer,
              criterion_id: Number(event.target.value),
            })
          }
          selected={answer.criterion_id}
          nullSelection={intl.formatMessage(messages.nullSelection)}
        />
      </div>
      <div data-c-grid-item="base(1of1) tp(4of8)">
        <UpdatingInput
          htmlId={`ratingGuideAnswer${answer.id}`}
          formName="ratingGuideAnswer"
          label={intl.formatMessage(messages.inputLabel)}
          required
          placeholder={intl.formatMessage(messages.inputPlaceholder)}
          value={answer.expected_answer || ""}
          updateDelay={500}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            const newAnswer = String(event.target.value);
            editAnswer({
              ...answer,
              expected_answer: newAnswer,
            });
          }}
          handleSave={(): void => {
            updateAnswer(answer);
          }}
        />
      </div>
      <div data-c-alignment="center" data-c-grid-item="base(1of1) tp(1of8)">
        <button
          className="button-trash"
          type="button"
          onClick={(): void => deleteAnswer(answer.id)}
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
  );
};

const getAnswer = (
  state: RootState,
  answerId: number,
  temp?: boolean,
): RatingGuideAnswerModel | null =>
  temp
    ? getTempRatingGuideAnswerById(state, answerId)
    : getRatingGuideAnswerById(state, answerId);

const getAvailableCriteria = (
  state: RootState,
  answer: RatingGuideAnswerModel | null,
): Criteria[] => {
  if (answer === null) {
    return [];
  }
  const availableCriteria = getCriteriaUnansweredForQuestion(
    state,
    answer.rating_guide_question_id,
  );
  const availableCriteriaIds = availableCriteria.map(getId);
  const answerCriteria =
    answer.criterion_id !== null
      ? getCriteriaById(state, answer.criterion_id)
      : null;
  // If this answer has a selected criteria, it should be considered available
  if (
    answer.criterion_id === null ||
    availableCriteriaIds.includes(answer.criterion_id) ||
    answerCriteria === null
  ) {
    return availableCriteria;
  }
  return [...availableCriteria, answerCriteria];
};

interface RatingGuideAnswerContainerProps {
  answerId: number;
  temp?: boolean;
}

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideAnswerContainerProps,
): {
  answer: RatingGuideAnswerModel | null;
  availableCriteria: Criteria[];
  criteriaIdToSkill: { [id: number]: Skill | null };
  isEdited: boolean;
  isUpdating: boolean;
} => {
  const answer = getAnswer(state, ownProps.answerId, ownProps.temp);
  const availableCriteria = getAvailableCriteria(state, answer);
  return {
    answer,
    availableCriteria,
    criteriaIdToSkill: mapToObjectTrans(
      availableCriteria,
      getId,
      (criterion): Skill | null => getSkillById(state, criterion.skill_id),
    ),
    isEdited: ratingGuideAnswerIsEdited(state, ownProps.answerId),
    isUpdating: ratingGuideAnswerIsUpdating(state, ownProps.answerId),
  };
};

const mapDispatchToProps = (dispatch: DispatchType, ownProps): any => ({
  editAnswer: ownProps.temp
    ? (ratingGuideAnswer: RatingGuideAnswerModel): void => {
        dispatch(editTempRatingGuideAnswer(ratingGuideAnswer));
      }
    : (ratingGuideAnswer: RatingGuideAnswerModel): void => {
        dispatch(editRatingGuideAnswer(ratingGuideAnswer));
      },
  updateAnswer: ownProps.temp
    ? (ratingGuideAnswer: RatingGuideAnswerModel): void =>
        dispatch(storeNewRatingGuideAnswer(ratingGuideAnswer))
    : (ratingGuideAnswer: RatingGuideAnswerModel): void =>
        dispatch(updateRatingGuideAnswer(ratingGuideAnswer)),
  deleteAnswer: ownProps.temp
    ? (id: number): void => {
        dispatch(deleteTempRatingGuideAnswer(id));
      }
    : (ratingGuideAnswerId: number): void => {
        dispatch(deleteRatingGuideAnswer(ratingGuideAnswerId));
      },
});
// @ts-ignore
const RatingGuideAnswerContainer: React.FunctionComponent<
  RatingGuideAnswerContainerProps
> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(RatingGuideAnswer));

export default RatingGuideAnswerContainer;
