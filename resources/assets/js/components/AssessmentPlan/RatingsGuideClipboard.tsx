import React from "react";
import {
  Criteria,
  Assessment,
  RatingsGuideQuestion,
  RatingsGuideAnswer,
} from "../../models/types";
import { getUniqueAssessmentTypes } from "./assessmentHelpers";
import RatingsGuideAssessment from "./RatingsGuideAssessment";
import { find } from "../../helpers/queries";

const dummyData = [
  {
    title: "Assessment",
    question: "My First Question is why?",
    skillLevel: "3",
    skillType: "Essential",
    skillName: "Hacking",
    modelAnswer: "Hack the Planet",
    id: "hacker",
  },
  {
    skillType: "Asset",
    skillLevel: "1",
    skillName: "Jedi",
    modelAnswer:
      "Strike me down and I will become more powerful than you can imagine.",
    id: "jedi",
  },
  {
    skillType: "Esential",
    skillLevel: "2",
    skillName: "Detective",
    modelAnswer: "I'll ask the questions here.",
    id: "detective",
  },
  {
    question: "My Second Question is who?",
    skillType: "Essential",
    skillLevel: "4",
    skillName: "Ninja",
    modelAnswer: "*Silence*",
    id: "ninja",
  },
  {
    skillType: "Asset",
    skillLevel: "3",
    skillName: "Monk",
    modelAnswer: "Quickly as you can, snatch the pebble from my hand.",
    id: "monk",
  },
  {
    question: "My Third Question is how long?",
    skillType: "Essential",
    skillLevel: "4",
    skillName: "Jester",
    modelAnswer:
      "A bear there was, a bear, a bear! All black and brown, and covered with hair. The bear! The bear!",
    id: "jester",
  },
];

interface TableRowProps {
  id: string;
  title?: string;
  question?: string;
  skillLevel: string;
  skillType: string;
  skillName: string;
  modelAnswer: string;
}

const TableRow: React.FunctionComponent<TableRowProps> = ({
  title,
  question,
  skillType,
  skillLevel,
  skillName,
  modelAnswer,
  id,
}): React.ReactElement => (
  <tr>
    <td>{title}</td>
    <td>{question}</td>
    <td>{skillType}</td>
    <td>{skillLevel}</td>
    <td>{skillName}</td>
    <td>{modelAnswer}</td>
    <td />
  </tr>
);

interface TableProps {
  rows: TableRowProps[];
}

const Table: React.FunctionComponent<TableProps> = ({
  rows,
}): React.ReactElement => (
  <div className="screening-plan-layout">
    <section className="plan-table">
      <table>
        <tr>
          <th>Title</th>
          <th>Question</th>
          <th>Skill Type</th>
          <th>Target Skill Level</th>
          <th>Skill</th>
          <th>Rating Guide</th>
          <th>Applicant Answer</th>
        </tr>
        {rows.map(
          (row): React.ReactElement => (
            <TableRow key={`RatingsGuideTableRow${row.id}`} {...row} />
          ),
        )}
      </table>
    </section>
  </div>
);

interface RatingsGuildeClipboardProps {
  criteria: Criteria[];
  assessments: Assessment[];
  questions: RatingsGuideQuestion[];
  answers: RatingsGuideAnswer[];
}

const RatingsGuideClipboard: React.FunctionComponent<
  RatingsGuildeClipboardProps
> = ({ criteria, assessments, questions, answers }): React.ReactElement => {
  return <Table rows={dummyData} />;
};

export default RatingsGuideClipboard;
