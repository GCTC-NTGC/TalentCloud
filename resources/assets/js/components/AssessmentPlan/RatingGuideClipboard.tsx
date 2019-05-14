import React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
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
import { getAssessmentsByJob } from "../../store/Assessment/assessmentSelector";
import { getCriteriaByJob } from "../../store/Job/jobSelector";
import { getSkills } from "../../store/Skill/skillSelector";
import { getRatingGuideQuestionsByJob } from "../../store/RatingGuideQuestion/ratingGuideQuestionSelectors";
import { getRatingGuideAnswersByJob } from "../../store/RatingGuideAnswer/ratingGuideAnswerSelectors";
import { copyElementContents } from "../../helpers/clipboard";

export interface ClipboardTableRowProps {
  id: string;
  title: string;
  question: string | null;
  skillLevel: string;
  criteriaType: string;
  skillName: string;
  modelAnswer: string;
}

export const clipboardData = (
  assessments: Assessment[],
  criteria: Criteria[],
  skills: Skill[],
  ratingGuideQuestions: RatingGuideQuestion[],
  ratingGuideAnswers: RatingGuideAnswer[],
  locale: string,
  formatMessage: (message: FormattedMessage.MessageDescriptor) => string,
): ClipboardTableRowProps[] => {
  ratingGuideAnswers = ratingGuideAnswers.filter(
    answer => answer.criterion_id !== null,
  );
  ratingGuideAnswers = ratingGuideAnswers.filter(answer => {
    const question = ratingGuideQuestions.find(
      question => question.id === answer.rating_guide_question_id,
    );
    return (
      question !== undefined &&
      assessments.find(
        assessment =>
          assessment.criterion_id === answer.criterion_id &&
          question.assessment_type_id === assessment.assessment_type_id,
      ) !== undefined
    );
  });
  const data = ratingGuideAnswers.map(
    (answer): ClipboardTableRowProps => {
      const criterion = criteria.find(
        criterion => criterion.id === answer.criterion_id,
      );
      if (criterion === undefined) {
        throw new Error(`Criteria with id ${answer.criterion_id} not found`);
      }
      const skill = skills.find(skill => skill.id === criterion.skill_id);
      if (skill === undefined) {
        throw new Error(`Skill with id ${criterion.skill_id} not found.`);
      }
      const question = ratingGuideQuestions.find(
        question => question.id === answer.rating_guide_question_id,
      );
      if (question === undefined) {
        throw new Error(
          `RatingGuideQuestion ${answer.rating_guide_question_id} not found.`,
        );
      }
      return {
        title: formatMessage(assessmentType(question.assessment_type_id)),
        question: question.question,
        skillLevel: formatMessage(
          skillLevelName(criterion.skill_level_id, skill.skill_type_id),
        ),
        criteriaType: formatMessage(criteriaType(criterion.criteria_type_id)),
        skillName: skill[locale].name,
        modelAnswer: answer.expected_answer,
        id: `A${question.assessment_type_id}-Q${question.id}-T${
          criterion.criteria_type_id
        }-AN${answer.id}`,
      };
    },
  );
  const compareRowProps = (
    a: ClipboardTableRowProps,
    b: ClipboardTableRowProps,
  ): number => {
    let num: number = 0;
    if (a.title > b.title) {
      num = 1;
    } else if (a.title < b.title) {
      num = -1;
    } else {
      if (a.question === null || b.question === null) {
        num = 0;
      } else if (a.question > b.question) {
        num = 1;
      } else if (a.question < b.question) {
        num = -1;
      } else {
        if (a.criteriaType > b.criteriaType) {
          num = -1; // Essential should be listed before Asset
        } else if (a.criteriaType < b.criteriaType) {
          num = 1;
        }
      }
    }
    return num;
  };
  data.sort(compareRowProps);
  return data;
};

const cloneAndCleanTableRowProps = (
  data: ClipboardTableRowProps[],
): ClipboardTableRowProps[] => {
  const cleanedData: ClipboardTableRowProps[] = JSON.parse(
    JSON.stringify(data),
  );
  // const lastIndex: number = data.length - 1;
  // for (let i: number = 0; i <= lastIndex; i++) {
  //   let row = data[i]
  //   if (i > 0) {
  //     let lastRow = data[i - 1]
  //     if {}
  //   }
  // }
  const lastIndex: number = cleanedData.length - 1; // Takes out duplicate titles and questions
  for (let i: number = lastIndex; i >= 0; --i) {
    let j: number = i + 1;
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
  criteriaType,
  skillLevel,
  skillName,
  modelAnswer,
  id,
}): React.ReactElement => (
  <tr>
    <td>{title}</td>
    <td>{question}</td>
    <td>{criteriaType}</td>
    <td>{skillLevel}</td>
    <td>{skillName}</td>
    <td>{modelAnswer}</td>
    <td />
    <td />
  </tr>
);

interface TableProps {
  assessments: Assessment[];
  criteria: Criteria[];
  skills: Skill[];
  ratingGuideQuestions: RatingGuideQuestion[];
  ratingGuideAnswers: RatingGuideAnswer[];
}

const RatingGuideClipboard: React.FunctionComponent<
  TableProps & InjectedIntlProps
> = ({
  assessments,
  criteria,
  skills,
  ratingGuideQuestions,
  ratingGuideAnswers,
  intl,
}): React.ReactElement => {
  const rows = cloneAndCleanTableRowProps(
    clipboardData(
      assessments,
      criteria,
      skills,
      ratingGuideQuestions,
      ratingGuideAnswers,
      intl.locale,
      intl.formatMessage,
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
            <tr>
              <th>Title</th>
              <th>Question</th>
              <th>Criteria Type</th>
              <th>Target Level</th>
              <th>Skill</th>
              <th>Rating Guide</th>
              <th>Applicant Answer</th>
              <th>Score</th>
            </tr>
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
}

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideClipboardContainerProps,
): TableProps => ({
  assessments: getAssessmentsByJob(state, ownProps.jobId),
  criteria: getCriteriaByJob(state, ownProps.jobId),
  skills: getSkills(state),
  ratingGuideQuestions: getRatingGuideQuestionsByJob(state, ownProps.jobId),
  ratingGuideAnswers: getRatingGuideAnswersByJob(state, ownProps.jobId),
});

const RatingGuideClipboardContainer: React.FunctionComponent<
  RatingGuideClipboardContainerProps
> = connect(mapStateToProps)(injectIntl(RatingGuideClipboard));

export default RatingGuideClipboardContainer;
