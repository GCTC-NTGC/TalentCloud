/* eslint-disable no-lonely-if */
import React from "react";
import {
  injectIntl,
  WrappedComponentProps,
  FormattedMessage,
  MessageDescriptor,
} from "react-intl";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import {
  Criteria,
  Assessment,
  RatingGuideQuestion,
  RatingGuideAnswer,
  Skill,
} from "../../models/types";
import {
  skillLevelName,
  criteriaType,
  assessmentType,
} from "../../models/localizedConstants";
import { getAssessmentsByJob } from "../../store/Assessment/assessmentSelectorComplex";
import { getCriteriaByJob } from "../../store/Job/jobSelector";
import { getSkills } from "../../store/Skill/skillSelector";
import { getRatingGuideQuestionsByJob } from "../../store/RatingGuideQuestion/ratingGuideQuestionSelectors";
import { getRatingGuideAnswersByJob } from "../../store/RatingGuideAnswer/ratingGuideAnswerSelectors";
import { copyElementContents } from "../../helpers/clipboard";
import {
  Locales,
  getLocale,
  localizeFieldNonNull,
} from "../../helpers/localize";

export interface ClipboardTableRowProps {
  id: string;
  title: string;
  question: string | null;
  skillLevel: string;
  criteriaTypeName: string;
  skillName: string;
  skillDescription: string;
  modelAnswer: string | null;
}

export const clipboardData = (
  assessments: Assessment[],
  criteria: Criteria[],
  skills: Skill[],
  ratingGuideQuestions: RatingGuideQuestion[],
  ratingGuideAnswers: RatingGuideAnswer[],
  locale: Locales,
  formatMessage: (message: MessageDescriptor) => string,
  narrativeReview?: Assessment[],
): ClipboardTableRowProps[] => {
  let narrativeData: ClipboardTableRowProps[] = [];
  if (narrativeReview !== undefined) {
    narrativeData = narrativeReview.map(
      (narrative: Assessment): ClipboardTableRowProps => {
        const narrativeCriterion = criteria.find(
          (criterion: Criteria): boolean =>
            criterion.id === narrative.criterion_id,
        );
        const narrativeSkill = skills.find((skill: Skill): boolean => {
          if (narrativeCriterion === undefined) return false;
          return skill.id === narrativeCriterion.skill_id;
        });
        return {
          title: formatMessage(assessmentType(narrative.assessment_type_id)),
          question: null,
          skillLevel:
            narrativeCriterion === undefined || narrativeSkill === undefined
              ? ""
              : formatMessage(
                  skillLevelName(
                    narrativeCriterion.skill_level_id,
                    narrativeSkill.skill_type_id,
                  ),
                ),
          criteriaTypeName:
            narrativeCriterion === undefined
              ? ""
              : formatMessage(
                  criteriaType(narrativeCriterion.criteria_type_id),
                ),
          skillName:
            narrativeSkill === undefined
              ? ""
              : localizeFieldNonNull(locale, narrativeSkill, "name"),
          skillDescription:
            narrativeSkill === undefined
              ? ""
              : localizeFieldNonNull(locale, narrativeSkill, "description"),
          modelAnswer: "",
          id:
            narrativeCriterion === undefined
              ? ""
              : `A${narrative.assessment_type_id}-Q${narrative.id}-T${narrativeCriterion.criteria_type_id}`,
        };
      },
    );
  }
  let availableAnswers = ratingGuideAnswers.filter(
    (answer: RatingGuideAnswer): boolean => answer.criterion_id !== null,
  );
  availableAnswers = availableAnswers.filter(
    (answer: RatingGuideAnswer): boolean => {
      const questionByAnswer = ratingGuideQuestions.find(
        (question: RatingGuideQuestion): boolean =>
          question.id === answer.rating_guide_question_id,
      );
      return (
        questionByAnswer !== undefined &&
        assessments.find(
          (assessment: Assessment): boolean =>
            assessment.criterion_id === answer.criterion_id &&
            questionByAnswer.assessment_type_id ===
              assessment.assessment_type_id,
        ) !== undefined
      );
    },
  );
  const ratingData = availableAnswers.map(
    (answer): ClipboardTableRowProps => {
      const criterionByAnswer = criteria.find(
        (criterion: Criteria): boolean => criterion.id === answer.criterion_id,
      );
      const skillByCriterion = skills.find((skill: Skill): boolean => {
        if (criterionByAnswer === undefined) return false;
        return skill.id === criterionByAnswer.skill_id;
      });
      const questionByAnswer = ratingGuideQuestions.find(
        (question: RatingGuideQuestion): boolean =>
          question.id === answer.rating_guide_question_id,
      );
      return {
        title:
          questionByAnswer === undefined
            ? ""
            : formatMessage(
                assessmentType(questionByAnswer.assessment_type_id),
              ),
        question:
          questionByAnswer === undefined ? null : questionByAnswer.question,
        skillLevel:
          criterionByAnswer === undefined || skillByCriterion === undefined
            ? ""
            : formatMessage(
                skillLevelName(
                  criterionByAnswer.skill_level_id,
                  skillByCriterion.skill_type_id,
                ),
              ),
        criteriaTypeName:
          criterionByAnswer === undefined
            ? ""
            : formatMessage(criteriaType(criterionByAnswer.criteria_type_id)),
        skillName:
          skillByCriterion === undefined
            ? ""
            : localizeFieldNonNull(locale, skillByCriterion, "name"),
        skillDescription:
          skillByCriterion === undefined
            ? ""
            : localizeFieldNonNull(locale, skillByCriterion, "description"),
        modelAnswer: answer.expected_answer ? answer.expected_answer : "",
        id:
          questionByAnswer === undefined || criterionByAnswer === undefined
            ? ""
            : `A${questionByAnswer.assessment_type_id}-Q${questionByAnswer.id}-T${criterionByAnswer.criteria_type_id}-AN${answer.id}`,
      };
    },
  );
  const compareRowProps = (
    a: ClipboardTableRowProps,
    b: ClipboardTableRowProps,
  ): number => {
    let num = 0;
    if (a.title > b.title) {
      num = 1;
    } else if (a.title < b.title) {
      num = -1;
    } else {
      if (a.criteriaTypeName > b.criteriaTypeName) {
        num = -1; // Essential should be listed before Asset
      } else if (a.criteriaTypeName < b.criteriaTypeName) {
        num = 1;
      } else {
        if (a.question === null || b.question === null) {
          num = 0;
        } else if (a.question > b.question) {
          num = 1;
        } else if (a.question < b.question) {
          num = -1;
        }
      }
    }
    return num;
  };
  let data: ClipboardTableRowProps[] = [];
  if (narrativeData.length > 0) {
    data = narrativeData.concat(ratingData);
  } else {
    data = ratingData;
  }
  data.sort(compareRowProps);
  return data;
};

const cloneAndCleanTableRowProps = (
  data: ClipboardTableRowProps[],
): ClipboardTableRowProps[] => {
  const cleanedData: ClipboardTableRowProps[] = JSON.parse(
    JSON.stringify(data),
  );
  const lastIndex: number = cleanedData.length - 1; // Takes out duplicate titles and questions
  for (let i: number = lastIndex; i >= 0; i -= 1) {
    const j: number = i + 1;
    if (j <= lastIndex && cleanedData[j] !== undefined) {
      if (cleanedData[i].title === cleanedData[j].title) {
        cleanedData[j].title = "";
      }
      if (cleanedData[i].question === cleanedData[j].question) {
        cleanedData[j].question = "";
      }
    }
  }
  return cleanedData;
};

const TableRow: React.FunctionComponent<ClipboardTableRowProps> = ({
  title,
  question,
  criteriaTypeName,
  skillLevel,
  skillName,
  skillDescription,
  modelAnswer,
}): React.ReactElement => (
  <tr>
    <th scope="row">{title}</th>
    <td>{question}</td>
    <td>{criteriaTypeName}</td>
    <td>{skillLevel}</td>
    <td>{skillName}</td>
    <td>{skillDescription}</td>
    <td>{modelAnswer}</td>
  </tr>
);

interface TableProps {
  assessments: Assessment[];
  criteria: Criteria[];
  skills: Skill[];
  ratingGuideQuestions: RatingGuideQuestion[];
  ratingGuideAnswers: RatingGuideAnswer[];
  narrativeReview?: Assessment[];
}

const RatingGuideClipboard: React.FunctionComponent<
  TableProps & WrappedComponentProps
> = ({
  assessments,
  criteria,
  skills,
  ratingGuideQuestions,
  ratingGuideAnswers,
  intl,
  narrativeReview,
}): React.ReactElement => {
  const rows = cloneAndCleanTableRowProps(
    clipboardData(
      assessments,
      criteria,
      skills,
      ratingGuideQuestions,
      ratingGuideAnswers,
      getLocale(intl.locale),
      intl.formatMessage,
      narrativeReview,
    ),
  );
  const tableRef = React.createRef<HTMLTableElement>();
  return (
    <div data-c-alignment="center">
      <button
        data-c-button="solid(c5)"
        type="button"
        onClick={(): void => {
          if (tableRef.current !== null) {
            copyElementContents(tableRef.current);
          }
        }}
      >
        <FormattedMessage
          id="ratingGuideBuilder.copyButton"
          defaultMessage="Click to Copy This Ratings Guide to Your Clipboard"
          description="Text for the 'copy ratings guide' button."
        />
      </button>

      <div className="screening-plan-layout">
        <section className="plan-table">
          <table ref={tableRef}>
            <thead>
              <tr>
                <th scope="col">
                  <FormattedMessage
                    id="ratingGuideBuilder.titleHeading"
                    defaultMessage="Title"
                    description="Text for the Title column heading."
                  />
                </th>
                <th scope="col">
                  <FormattedMessage
                    id="ratingGuideBuilder.questionHeading"
                    defaultMessage="Question"
                    description="Text for the Question column heading."
                  />
                </th>
                <th scope="col">
                  <FormattedMessage
                    id="ratingGuideBuilder.criteriaTypeHeading"
                    defaultMessage="Criteria Type"
                    description="Text for the Criteria Type column heading."
                  />
                </th>
                <th scope="col">
                  <FormattedMessage
                    id="ratingGuideBuilder.targetLevelHeading"
                    defaultMessage="Target Level"
                    description="Text for the Target Level column heading."
                  />
                </th>
                <th scope="col">
                  <FormattedMessage
                    id="ratingGuideBuilder.skillHeading"
                    defaultMessage="Skill"
                    description="Text for the Skill column heading."
                  />
                </th>
                <th scope="col">
                  <FormattedMessage
                    id="ratingGuideBuilder.skillDescriptionHeading"
                    defaultMessage="Skill Description"
                    description="Text for the Skill Description column heading."
                  />
                </th>
                <th scope="col">
                  <FormattedMessage
                    id="ratingGuideBuilder.ratingGuideHeading"
                    defaultMessage="Rating Guide"
                    description="Text for the Rating Guide column heading."
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(
                (row): React.ReactElement => (
                  <TableRow key={`RatingsGuideTableRow${row.id}`} {...row} />
                ),
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

interface RatingGuideClipboardContainerProps {
  jobId: number;
  narrativeReview?: Assessment[];
}

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideClipboardContainerProps,
): TableProps => ({
  assessments: getAssessmentsByJob(state, ownProps),
  criteria: getCriteriaByJob(state, ownProps),
  skills: getSkills(state),
  ratingGuideQuestions: getRatingGuideQuestionsByJob(state, ownProps),
  ratingGuideAnswers: getRatingGuideAnswersByJob(state, ownProps),
});

const RatingGuideClipboardContainer = connect(mapStateToProps)(
  injectIntl(RatingGuideClipboard),
);

export default RatingGuideClipboardContainer;
