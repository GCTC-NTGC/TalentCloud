/* eslint-disable camelcase, @typescript-eslint/camelcase */
import React, { useState, useRef, useReducer } from "react";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { Job, Skill, Criteria } from "../../models/types";
import Modal from "../Modal";
import CriteriaForm from "./CriteriaForm";
import { mapToObject, getId, hasKey } from "../../helpers/queries";
import { CriteriaTypeId } from "../../models/lookupConstants";
import {
  assetSkillName,
  skillLevelName,
} from "../../models/localizedConstants";

interface JobBuilderSkillsProps {
  // The job being built
  job: Job;
  // This job's key tasks
  keyTasks: string[];
  // Criteria already part of the job
  initialCriteria: Criteria[];
  // The list of all possible skills
  skills: Skill[];
  // The function to run when user clicks Save. Must return the updated list of criteria if successufl.
  handleSubmit: (criteria: Criteria[]) => Promise<Criteria[]>;
  // The function to run when user clicks Next Page
  handleContinue: () => void;
}

// function arrayMove<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
//   const arrCopy = [...arr];
//   const element = arrCopy[fromIndex];
//   arrCopy.splice(fromIndex, 1);
//   arrCopy.splice(toIndex, 0, element);
//   return arrCopy;
// }

// function moveUp<T>(arr: T[], fromIndex: number): T[] {
//   if (fromIndex <= 0) {
//     return arr;
//   }
//   return arrayMove(arr, fromIndex, fromIndex - 1);
// }

// function moveDown<T>(arr: T[], fromIndex: number): T[] {
//   if (fromIndex + 1 >= arr.length) {
//     return arr;
//   }
//   return arrayMove(arr, fromIndex, fromIndex + 1);
// }

type CriteriaAction =
  | {
      type: "add";
      payload: Criteria;
    }
  | {
      type: "edit";
      payload: Criteria;
    }
  | {
      type: "remove";
      payload: Criteria;
    }
  | {
      type: "removeSkill";
      payload: {
        skillId: number;
      };
    }
  | {
      type: "replace";
      payload: Criteria[];
    };
const criteriaReducer = (
  state: Criteria[],
  action: CriteriaAction,
): Criteria[] => {
  switch (action.type) {
    case "add":
      return [
        // When adding a criterion, make sure it isn't a duplicate
        // Always compare criteria using skill_id, to avoid duplicate skills. (And new criteria may not have unique ids yet.)
        ...state.filter(
          (criterion): boolean =>
            criterion.skill_id !== action.payload.skill_id,
        ),
        action.payload,
      ];
    case "edit":
      // Replace the edited criterion with the one from the action payload.
      // This is different from "add" because it keeps the same ordering.
      return state.map(
        (criterion): Criteria =>
          criterion.skill_id === action.payload.skill_id
            ? action.payload
            : criterion,
      );
    case "remove":
      return state.filter(
        (criterion): boolean => criterion.skill_id !== action.payload.skill_id,
      );
    case "removeSkill":
      return state.filter(
        (criterion): boolean => criterion.skill_id !== action.payload.skillId,
      );
    case "replace":
      // Totally replace the saved list of criteria with the recieved payload
      return action.payload;

    default:
      return state;
  }
};

export const skillAlreadySelected = (
  selectedCriteria: Criteria[],
  skill: Skill,
): boolean =>
  selectedCriteria.find(
    (criterion): boolean => criterion.skill_id === skill.id,
  ) !== undefined;

const getSkillLevelName = (
  { skill_level_id, criteria_type_id }: Criteria,
  { skill_type_id }: Skill,
): FormattedMessage.MessageDescriptor => {
  if (criteria_type_id === CriteriaTypeId.Asset) {
    return assetSkillName();
  }
  return skillLevelName(skill_level_id, skill_type_id);
};

export const JobBuilderSkills: React.FunctionComponent<
  JobBuilderSkillsProps & InjectedIntlProps
> = ({
  job,
  keyTasks,
  initialCriteria,
  skills,
  handleSubmit,
  handleContinue,
  intl,
}): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unknown intl.locale");
  }

  // The ideal number of skills for each category
  const minOccupational = 3;
  const maxOccupational = 5;
  const minCulture = 0;
  const maxCulture = 4;
  const minFuture = 0;
  const maxFuture = 2;

  // This is where the edited list of criteria is stored
  const [jobCriteria, criteriaDispatch] = useReducer(
    criteriaReducer,
    initialCriteria,
  );
  const skillCount: number = jobCriteria.length;
  const essentialCriteria: Criteria[] = jobCriteria.filter(
    (criteria): boolean =>
      criteria.criteria_type_id === CriteriaTypeId.Essential,
  );
  const essentialCount: number = essentialCriteria.length;
  const assetCriteria: Criteria[] = jobCriteria.filter(
    (criteria): boolean => criteria.criteria_type_id === CriteriaTypeId.Asset,
  );
  const assetCount: number = assetCriteria.length;

  // When skillBeingAdded is not null, the modal to add a new skill will appear.
  const [skillBeingAdded, setSkillBeingAdded] = useState<Skill | null>(null);

  // When criteriaBeingEdited is not null, the modal for editing that criterion will appear.
  const [
    criteriaBeingEdited,
    setCriteriaBeingEdited,
  ] = useState<Criteria | null>(null);

  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  // This should be true if ANY modal is visible. The modal overlay uses this.
  const isModalVisible =
    skillBeingAdded !== null ||
    criteriaBeingEdited !== null ||
    isPreviewVisible;
  const modalParentRef = useRef<HTMLDivElement>(null);

  const addModalId = "job-builder-add-skill";
  const editModalId = "job-builder-edit-skill";
  const previewModalId = "job-builder-preview-skills";

  const countInRange = (min: number, max: number, count: number): boolean => {
    return count >= min && count <= max;
  };

  // Map the skills into a dictionary for quicker access
  const skillsById = mapToObject(skills, getId);
  const getSkillOfCriteria = (criterion: Criteria): Skill | null => {
    return hasKey(skillsById, criterion.skill_id)
      ? skillsById[criterion.skill_id]
      : null;
  };

  const getClassifications = (skill: Skill): string[] =>
    skill.classifications.map((classification): string => classification.key);
  const isOccupational = (skill: Skill): boolean =>
    job.classification_code !== null &&
    getClassifications(skill).includes(job.classification_code);
  const occupationalSkills = skills.filter(isOccupational);
  const occupationalCriteria = jobCriteria.filter((criterion): boolean => {
    const critSkill = getSkillOfCriteria(criterion);
    return critSkill !== null && isOccupational(critSkill);
  });

  const isCulture = (skill: Skill): boolean => skill.is_culture_skill;
  const cultureSkills = skills.filter(isCulture);
  const cultureCriteria = jobCriteria.filter((criterion): boolean => {
    const skill = getSkillOfCriteria(criterion);
    return skill !== null && isCulture(skill);
  });
  const isFuture = (skill: Skill): boolean => skill.is_future_skill;
  const futureSkills = skills.filter(isFuture);
  const futureCriteria = jobCriteria.filter((criterion): boolean => {
    const skill = getSkillOfCriteria(criterion);
    return skill !== null && isFuture(skill);
  });

  const [isSaving, setIsSaving] = useState(false);
  const saveAndPreview = (): void => {
    setIsSaving(true);
    handleSubmit(jobCriteria)
      .then((criteria: Criteria[]): void => {
        criteriaDispatch({ type: "replace", payload: criteria });
        setIsPreviewVisible(true);
      })
      .finally((): void => setIsSaving(false));
  };

  const renderNullCriteriaRow = (): React.ReactElement => (
    <div className="jpb-skill-null" data-c-grid="gutter middle">
      {/** TODO: add these back in when implementing UP/DOWN buttons again */}
      {/* <div data-c-grid-item="base(2of10) tl(1of10)" data-c-align="base(centre)">
        <button type="button" data-tc-move-up-trigger>
          <i className="fas fa-angle-up" />
        </button>
        <button type="button" data-tc-move-down-trigger>
          <i className="fas fa-angle-down" />
        </button>
      </div> */}
      <div data-c-grid-item="base(6of10) tl(7of10)">
        <div data-c-grid="gutter">
          <div data-c-grid-item="base(1of1) tl(2of3)">
            <span>0</span>
            <span
              data-c-background="grey(40)"
              data-c-font-size="small"
              data-c-margin="rl(half)"
              data-c-padding="tb(quarter) rl(half)"
              data-c-radius="rounded"
              data-c-colour="white"
            >
              <i className="fas fa-briefcase" />
            </span>
            <span>Add skills below to proceed.</span>
          </div>
          <div data-c-grid-item="base(1of1) tl(1of3)">
            <span
              data-c-colour="white"
              data-c-background="grey(40)"
              data-c-padding="tb(quarter) rl(half)"
              data-c-radius="rounded"
              data-c-font-size="small"
            >
              Skill Level
            </span>
          </div>
        </div>
      </div>
      <div data-c-grid-item="base(2of10)">
        <div data-c-grid="gutter">
          <div
            data-c-grid-item="base(1of1) tl(1of2)"
            data-c-align="base(centre)"
          >
            <button type="button">
              <i className="fas fa-edit" />
            </button>
          </div>
          <div
            data-c-grid-item="base(1of1) tl(1of2)"
            data-c-align="base(centre)"
          >
            <button type="button">
              <i className="fas fa-trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCriteriaRow = (
    criterion: Criteria,
    index: number,
  ): React.ReactElement | null => {
    const skill = getSkillOfCriteria(criterion);
    if (skill === null) {
      return null;
    }
    return (
      <li
        key={skill.id}
        className={`jpb-skill ${isOccupational(skill) ? "occupational" : ""} ${
          isCulture(skill) ? "cultural" : ""
        } ${isFuture(skill) ? "future" : ""}`}
        data-tc-up-down-item
      >
        <div data-c-grid="gutter middle">
          {/** Removing the up/down buttons for now */}
          {/** TODO: removing the buttons messes with the row height, get Josh's help to fix it */}
          {/* <div
            data-c-grid-item="base(2of10) tl(1of10)"
            data-c-align="base(centre)"
          >
            <button type="button" data-tc-move-up-trigger>
              <i className="fas fa-angle-up" />
            </button>
            <button type="button" data-tc-move-down-trigger>
              <i className="fas fa-angle-down" />
            </button>
          </div> */}
          <div data-c-grid-item="base(6of10) tl(7of10)">
            <div data-c-grid="gutter">
              <div data-c-grid-item="base(1of1) tl(2of3)">
                <span>{index + 1}</span>
                {/* This icon will automatically update based on the class you've specified above, on the jpb-skill. */}
                <span
                  className="jpb-skill-type"
                  data-c-font-size="small"
                  data-c-margin="rl(half)"
                  data-c-padding="tb(quarter) rl(half)"
                  data-c-radius="rounded"
                  data-c-colour="white"
                  title="This is an occupational skill."
                >
                  <i className="fas fa-briefcase" />
                  <i className="fas fa-coffee" />
                  <i className="fas fa-certificate" />
                </span>
                {/* The skill name. */}
                <span>{skill[locale].name}</span>
              </div>
              <div data-c-grid-item="base(1of1) tl(1of3)">
                <span
                  data-c-radius="rounded"
                  data-c-padding="tb(quarter) rl(half)"
                  data-c-border="all(thin, solid, c1)"
                  data-c-colour="c1"
                  data-c-font-size="small"
                >
                  {intl.formatMessage(getSkillLevelName(criterion, skill))}
                </span>
              </div>
            </div>
          </div>
          <div data-c-grid-item="base(2of10)">
            <div data-c-grid="gutter">
              <div
                data-c-grid-item="base(1of1) tl(1of2)"
                data-c-align="base(centre)"
              >
                <button
                  type="button"
                  data-c-colour="c1"
                  data-c-dialog-action="open"
                  onClick={(): void => setCriteriaBeingEdited(criterion)}
                >
                  <i className="fas fa-edit" />
                </button>
              </div>
              <div
                data-c-grid-item="base(1of1) tl(1of2)"
                data-c-align="base(centre)"
              >
                <button
                  type="button"
                  data-c-colour="stop"
                  onClick={(): void =>
                    criteriaDispatch({
                      type: "remove",
                      payload: criterion,
                    })
                  }
                >
                  <i className="fas fa-trash" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  };

  const renderSkillButton = (skill: Skill): React.ReactElement => {
    const alreadySelected = skillAlreadySelected(jobCriteria, skill);
    // Open the Add Skill modal, or remove it if its already added
    const handleClick = (): void =>
      alreadySelected
        ? criteriaDispatch({
            type: "removeSkill",
            payload: { skillId: skill.id },
          })
        : setSkillBeingAdded(skill);
    return (
      <li key={skill.id}>
        <button
          className={`jpb-skill-trigger ${alreadySelected ? "active" : ""}`}
          data-c-button="outline(c1)"
          data-c-radius="rounded"
          type="button"
          onClick={handleClick}
        >
          <i className="fas fa-plus-circle" />
          <i className="fas fa-minus-circle" />
          {skill[locale].name}
        </button>
      </li>
    );
  };

  return (
    <>
      <div
        data-c-container="form"
        data-c-padding="top(triple) bottom(triple)"
        ref={modalParentRef}
      >
        <h3
          data-c-font-size="h3"
          data-c-font-weight="bold"
          data-c-margin="bottom(double)"
        >
          Skills
        </h3>
        <p data-c-margin="bottom(triple)">
          This is where you'll select the criteria that are required to do this
          job effectively. Below are two bars that indicate a measurement of
          your current skill selection.
        </p>
        <h4
          data-c-colour="c2"
          data-c-font-size="h4"
          data-c-margin="bottom(normal)"
        >
          Review Your Tasks
        </h4>
        {/* This is just regurgitated tasks from the previous step. */}
        <ul data-c-margin="bottom(triple)">
          {keyTasks.map(
            (task): React.ReactElement => (
              <li>{task}</li>
            ),
          )}
        </ul>
        {/* Total Skills List */}
        <h4
          data-c-colour="c2"
          data-c-font-size="h4"
          data-c-margin="bottom(normal)"
        >
          Your Skills List
        </h4>
        <div data-c-grid="gutter top">
          <div data-c-grid-item="base(1of1) tl(1of2)">
            <div
              data-c-border="all(thin, solid, black)"
              data-c-radius="rounded"
              data-c-padding="normal"
            >
              <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
                Total Number of Essential Skills
              </p>
              {/* TODO: SmileyStatusIndicator can be extracted as its own component, since its already repeated within this page. */}
              {/* This is the new smiley status indicator component. It is reused twice on this page, once to indicate how many ESSENTIAL skills the user has selected, and a second time to indicate the TOTAL number of skills selected. The component functions the same way for both instances, but the ***scale is different***. There's a chance that the labels will be different too, so best to build it with that in mind. You can activate the appropriate smiley by assigning an "active" class to the relevant "jpb-skill-measure-item" element. See the UI in-browser for an example of what this looks like. */}
              <div
                data-c-grid="gutter"
                data-c-align="centre"
                data-c-padding="top(normal)"
              >
                <div
                  className={`jpb-skill-measure-item bad ${
                    countInRange(0, 1, essentialCount) ? "active" : ""
                  }`}
                  data-c-grid-item="base(1of5)"
                >
                  {/* This div appears in each step of the indicator, but we need the number inside the "span" to reflect the number of skills currently selected (within the context of the indicator, i.e. only show the number of essential skills selected in the essential indicator). */}
                  <div>
                    <img src="\images\icon-smiley-arrow-bad.svg" />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {essentialCount}
                    </span>
                  </div>
                  <img src="\images\icon-smiley-bad.svg" />
                  <img src="\images\icon-smiley-bad-grey.svg" />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    Too Few
                  </p>
                  <p data-c-font-size="small">0 - 1</p>
                </div>
                <div
                  className={`jpb-skill-measure-item medium ${
                    countInRange(2, 3, essentialCount) ? "active" : ""
                  }`}
                  data-c-grid-item="base(1of5)"
                >
                  <div>
                    <img src="\images\icon-smiley-arrow-medium.svg" />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {essentialCount}
                    </span>
                  </div>
                  <img src="\images\icon-smiley-medium.svg" />
                  <img src="\images\icon-smiley-medium-grey.svg" />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    Almost
                  </p>
                  <p data-c-font-size="small">2 - 3</p>
                </div>
                <div
                  className={`jpb-skill-measure-item good ${
                    countInRange(4, 6, essentialCount) ? "active" : ""
                  }`}
                  data-c-grid-item="base(1of5)"
                >
                  <div>
                    <img src="\images\icon-smiley-arrow-good.svg" />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {essentialCount}
                    </span>
                  </div>
                  <img src="\images\icon-smiley-good.svg" />
                  <img src="\images\icon-smiley-good-grey.svg" />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    Awesome
                  </p>
                  <p data-c-font-size="small">4 - 6</p>
                </div>
                <div
                  className={`jpb-skill-measure-item medium ${
                    countInRange(7, 8, essentialCount) ? "active" : ""
                  }`}
                  data-c-grid-item="base(1of5)"
                >
                  <div>
                    <img src="\images\icon-smiley-arrow-medium.svg" />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {essentialCount}
                    </span>
                  </div>
                  <img src="\images\icon-smiley-medium.svg" />
                  <img src="\images\icon-smiley-medium-grey.svg" />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    Acceptable
                  </p>
                  <p data-c-font-size="small">7 - 8</p>
                </div>
                <div
                  className={`jpb-skill-measure-item bad ${
                    essentialCount >= 9 ? "active" : ""
                  }`}
                  data-c-grid-item="base(1of5)"
                >
                  <div>
                    <img src="\images\icon-smiley-arrow-bad.svg" />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {essentialCount}
                    </span>
                  </div>
                  <img src="\images\icon-smiley-bad.svg" />
                  <img src="\images\icon-smiley-bad-grey.svg" />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    Too Many
                  </p>
                  <p data-c-font-size="small">9 +</p>
                </div>
              </div>
            </div>
          </div>
          <div data-c-grid-item="base(1of1) tl(1of2)">
            <div
              data-c-border="all(thin, solid, black)"
              data-c-radius="rounded"
              data-c-padding="normal"
            >
              <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
                Total Number of Skills
              </p>
              {/* This is the second smiley indicator, used for total skills. Note the difference in the scale from the first. */}
              <div
                data-c-grid="gutter"
                data-c-align="centre"
                data-c-padding="top(normal)"
              >
                <div
                  className={`jpb-skill-measure-item bad ${
                    countInRange(0, 3, skillCount) ? "active" : ""
                  }`}
                  data-c-grid-item="base(1of5)"
                >
                  <div>
                    <img src="\images\icon-smiley-arrow-bad.svg" />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {skillCount}
                    </span>
                  </div>
                  <img src="\images\icon-smiley-bad.svg" />
                  <img src="\images\icon-smiley-bad-grey.svg" />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    Too Few
                  </p>
                  <p data-c-font-size="small">0 - 3</p>
                </div>
                <div
                  className={`jpb-skill-measure-item medium ${
                    countInRange(4, 6, skillCount) ? "active" : ""
                  }`}
                  data-c-grid-item="base(1of5)"
                >
                  <div>
                    <img src="\images\icon-smiley-arrow-medium.svg" />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {skillCount}
                    </span>
                  </div>
                  <img src="\images\icon-smiley-medium.svg" />
                  <img src="\images\icon-smiley-medium-grey.svg" />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    Almost
                  </p>
                  <p data-c-font-size="small">4 - 6</p>
                </div>
                <div
                  className={`jpb-skill-measure-item good ${
                    countInRange(7, 8, skillCount) ? "active" : ""
                  }`}
                  data-c-grid-item="base(1of5)"
                >
                  <div>
                    <img src="\images\icon-smiley-arrow-good.svg" />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {skillCount}
                    </span>
                  </div>
                  <img src="\images\icon-smiley-good.svg" />
                  <img src="\images\icon-smiley-good-grey.svg" />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    Awesome
                  </p>
                  <p data-c-font-size="small">7 - 8</p>
                </div>
                <div
                  className={`jpb-skill-measure-item medium  ${
                    countInRange(9, 10, skillCount) ? "active" : ""
                  }`}
                  data-c-grid-item="base(1of5)"
                >
                  <div>
                    <img src="\images\icon-smiley-arrow-medium.svg" />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {skillCount}
                    </span>
                  </div>
                  <img src="\images\icon-smiley-medium.svg" />
                  <img src="\images\icon-smiley-medium-grey.svg" />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    Acceptable
                  </p>
                  <p data-c-font-size="small">9 - 10</p>
                </div>
                <div
                  className={`jpb-skill-measure-item bad ${
                    skillCount >= 11 ? "active" : ""
                  }`}
                  data-c-grid-item="base(1of5)"
                >
                  <div>
                    <img src="\images\icon-smiley-arrow-bad.svg" />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {skillCount}
                    </span>
                  </div>
                  <img src="\images\icon-smiley-bad.svg" />
                  <img src="\images\icon-smiley-bad-grey.svg" />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    Too Many
                  </p>
                  <p data-c-font-size="small">11 +</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* This element is the skills list/management area for the user. From here they can see the skills they've added, modify the order, see the type (occupational [based on classification], cultural, future), see the level they've selected (only if the skill isn't an asset skill), edit the skill, and remove it. */}
        <div
          data-c-background="grey(10)"
          data-c-radius="rounded"
          data-c-padding="all(normal)"
          data-c-margin="top(normal) bottom(normal)"
        >
          <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
            Essential Skills
          </p>
          {/* This is the null state to be used when the user lands on the page for the first time. Be sure to include it in the assets list too! Note that it exists outside the skill-list div to avoid it being confused with the list of skills. */}
          {/* Null state. */}
          {essentialCount === 0 && renderNullCriteriaRow()}
          <ol className="jpb-skill-list" data-tc-up-down-list>
            {/* This is an individual skill. I've handled the up/down script and the modal trigger, but I'll leave managing the value of the skill's list number, the modal contents,  and the deletion to you folks. I've also migrated the up/down script to a universal one. When it comes to the "jpb-skill", you'll need to add a class that specifies which TYPE of skill it is (occupational, cultural, future). This will handle interior colour/icon changes. */}
            {essentialCriteria.map(renderCriteriaRow)}
          </ol>
          {/* Repeat what you have above for asset skills. The biggest thing to note here is that the level should be empty in this list, and when the user changes the level of an essential skill to asset, it should be moved down into this list (and vice versa). */}
          <p
            data-c-font-weight="bold"
            data-c-margin="top(normal) bottom(normal)"
          >
            Asset Skills
          </p>
          {/* Asset null state goes here. */}
          {assetCount === 0 && renderNullCriteriaRow()}
          <ol className="jpb-skill-list" data-tc-up-down-list>
            {assetCriteria.map(renderCriteriaRow)}
          </ol>
        </div>
        <div
          data-c-margin="bottom(triple)"
          data-c-align="base(centre) tl(right)"
        >
          {/* We'll want this button to functionally be the exact same as the button at the bottom of the page, where it saves the data, and opens the preview modal. */}
          <button
            data-c-button="solid(c2)"
            data-c-radius="rounded"
            type="button"
            disabled={isSaving}
            onClick={(): void => saveAndPreview()}
          >
            Save &amp; Preview Skills
          </button>
        </div>
        {/* The 3 sections below are each functionally similar and can probably be united into one component. The biggest difference between the three is that "Cultural Skills" has a categorical breakdown between "Recommended Skills" and the rest of the category. These recommendations are based directly on the way the manager answered their work environment questions, but I'm not sure how the logic works, so you'll want to check in with Lauren/Jasmita on this. */}
        <h4
          data-c-colour="c2"
          data-c-font-size="h4"
          data-c-margin="bottom(normal)"
        >
          Skill Selection
        </h4>
        {/* Occupational Skills */}
        {/* You can modify colour/icon using the category classes here again (occupational, cultural, future) on the "jpb-skill-category" element. */}
        <div
          className="jpb-skill-category occupational"
          data-c-margin="bottom(normal)"
          data-c-padding="normal"
          data-c-radius="rounded"
          data-c-background="grey(10)"
        >
          <div data-c-grid="gutter top">
            <div data-c-grid-item="tp(2of3) ds(3of4)">
              <h5
                className="jpb-skill-section-title"
                data-c-font-size="h4"
                data-c-margin="bottom(normal)"
              >
                {/* These icons will change automatically based on the class specified above. */}
                <span
                  data-c-font-size="small"
                  data-c-margin="right(half)"
                  data-c-padding="tb(quarter) rl(half)"
                  data-c-radius="rounded"
                  data-c-colour="white"
                >
                  <i className="fas fa-briefcase" />
                  <i className="fas fa-coffee" />
                  <i className="fas fa-certificate" />
                </span>
                {/* Category Title */}
                Occupational Skills
              </h5>
              {/* Category description - basically this outlines what the category means. */}
              <p>Lorem ipsum.</p>
            </div>
            <div
              data-c-grid-item="tp(1of3) ds(1of4)"
              data-c-align="base(centre) tp(right)"
            >
              {/* This target value changes depending on the category (occupational has 3 - 4, cultural and future have fewer) - you can see these values in their respective sections below. You can also add a "complete" class to this "jpb-skill-target" element to change the target icon to a checkmark to indicate to the user that they're within the range. Note that the other two categories (cultural and future) start their ranges at 0, so the "complete" class should be on those sections by default. */}
              <div
                className={`jpb-skill-target ${
                  countInRange(
                    minOccupational,
                    maxOccupational,
                    occupationalCriteria.length,
                  )
                    ? "complete"
                    : ""
                }`}
              >
                <i data-c-colour="stop" className="fas fa-bullseye" />
                <i data-c-colour="go" className="fas fa-check" />
                Aim for {minOccupational} - {maxOccupational} skills.
              </div>
            </div>
            {/* This is the list of skills. Clicking a skill button should trigger the "Edit skill" modal so that the user can edit the definition/level before adding it. If they DO add it, you can assign an "active" class to the respective button so indicate that it's selected. This will change it's colour and icon automatically. This is also the area where "Culture Skills" is split into the two categories - see the Culture Skills section below for what that looks like. */}
            {(job.classification_code === "" ||
              job.classification_code === null) && (
              <p data-c-font-weight="bold" data-c-grid-item="base(1of1)">
                You must return to Step 1 and choose a Classification.
              </p>
            )}

            <ul className="jpb-skill-cloud" data-c-grid-item="base(1of1)">
              {occupationalSkills.map(renderSkillButton)}
            </ul>
          </div>
        </div>
        {/* Cultural Skills */}
        {/* This section is here so that you can see the categorical division of culture skills. */}
        <div
          className="jpb-skill-category cultural"
          data-c-margin="bottom(normal)"
          data-c-padding="normal"
          data-c-radius="rounded"
          data-c-background="grey(10)"
        >
          <div data-c-grid="gutter top">
            <div data-c-grid-item="tp(2of3) ds(3of4)">
              <h5
                className="jpb-skill-section-title"
                data-c-font-size="h4"
                data-c-margin="bottom(normal)"
              >
                <span
                  data-c-font-size="small"
                  data-c-margin="right(half)"
                  data-c-padding="tb(quarter) rl(half)"
                  data-c-radius="rounded"
                  data-c-colour="white"
                >
                  <i className="fas fa-briefcase" />
                  <i className="fas fa-coffee" />
                  <i className="fas fa-certificate" />
                </span>
                Cultural Skills
              </h5>
              <p>Lorem ipsum.</p>
            </div>
            <div
              data-c-grid-item="tp(1of3) ds(1of4)"
              data-c-align="base(centre) tp(right)"
            >
              <div
                className={`jpb-skill-target ${
                  countInRange(minCulture, maxCulture, cultureCriteria.length)
                    ? "complete"
                    : ""
                }`}
              >
                <i data-c-colour="stop" className="fas fa-bullseye" />
                <i data-c-colour="go" className="fas fa-check" />
                Aim for {minCulture} - {maxCulture} skills.
              </div>
            </div>
            {/** Culture skills are intended to be split into two lists, Recommended and Remaining. Until the recommendation logic is nailed down, its just one. */}
            <ul className="jpb-skill-cloud" data-c-grid-item="base(1of1)">
              {cultureSkills.map(renderSkillButton)}
            </ul>
            {/* So here's where culture skills get broken into categories. In theory this logic will be used down the road to break occupational skills into occupations (e.g. CS - UX Designer), but for now this the only instance where it happens. */}
            {/* <ul className="jpb-skill-cloud" data-c-grid-item="base(1of1)">
              // Note that this "p" tag has a different margin value than the one in the "ul" below.
              <p
                data-c-font-weight="bold"
                data-c-margin="top(half) bottom(normal)"
              >
                Recommended Skills:
              </p>
              // This is where the skill recommendations from Work Environment go.
              <li>
                <button
                  className="jpb-skill-trigger"
                  data-c-button="outline(c1)"
                  data-c-radius="rounded"
                >
                  <i className="fas fa-plus-circle" />
                  <i className="fas fa-minus-circle" />
                  Skill Name
                </button>
              </li>
            </ul>
            <ul className="jpb-skill-cloud" data-c-grid-item="base(1of1)">
              <p
                data-c-font-weight="bold"
                data-c-margin="top(normal) bottom(normal)"
              >
                Remaining Skills:
              </p>
              // This is where the remaining culture skills go. Please make sure that the skills in the recommendation list above do not appear here.
              <li>
                <button
                  className="jpb-skill-trigger"
                  data-c-button="outline(c1)"
                  data-c-radius="rounded"
                >
                  <i className="fas fa-plus-circle" />
                  <i className="fas fa-minus-circle" />
                  Skill Name
                </button>
              </li>
            </ul> */}
          </div>
        </div>
        {/* Future Skills */}
        {/* This section is just here so you can see what it looks like with the future class. */}
        <div
          className="jpb-skill-category future"
          data-c-margin="bottom(normal)"
          data-c-padding="normal"
          data-c-radius="rounded"
          data-c-background="grey(10)"
        >
          <div data-c-grid="gutter top">
            <div data-c-grid-item="tp(2of3) ds(3of4)">
              <h5
                className="jpb-skill-section-title"
                data-c-font-size="h4"
                data-c-margin="bottom(normal)"
              >
                <span
                  data-c-font-size="small"
                  data-c-margin="right(half)"
                  data-c-padding="tb(quarter) rl(half)"
                  data-c-radius="rounded"
                  data-c-colour="white"
                >
                  <i className="fas fa-briefcase" />
                  <i className="fas fa-coffee" />
                  <i className="fas fa-certificate" />
                </span>
                Future Skills
              </h5>
              <p>Lorem ipsum.</p>
            </div>
            <div
              data-c-grid-item="tp(1of3) ds(1of4)"
              data-c-align="base(centre) tp(right)"
            >
              <div
                className={`jpb-skill-target ${
                  countInRange(minFuture, maxFuture, futureCriteria.length)
                    ? "complete"
                    : ""
                }`}
              >
                <i data-c-colour="stop" className="fas fa-bullseye" />
                <i data-c-colour="go" className="fas fa-check" />
                Aim for {minFuture} - {maxFuture} skills.
              </div>
            </div>
            <ul className="jpb-skill-cloud" data-c-grid-item="base(1of1)">
              {futureSkills.map(renderSkillButton)}
            </ul>
          </div>
        </div>
        {/* This section is basically just text, but it prompts the manager to get in touch with us if they can't find the skill they're looking for. */}
        {/* "Custom" Skills */}
        <h5 data-c-font-weight="bold" data-c-margin="top(double) bottom(half)">
          Can't find the skill you need?
        </h5>
        <p data-c-margin="bottom(normal)">
          Building a skills list is a huge endeavour, and it's not surprising
          that Talent Cloud's list doesn't have the skill you're looking for. To
          help us expand our skill list, please{" "}
          <a
            href="mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca"
            title="Get in touch with Talent Cloud to have a skill added to the platform."
          >
            get in touch with us through email
          </a>
          . Provide the skill's name, as well as a short description to kick-off
          the discussion.
        </p>
        <div data-c-grid="gutter">
          <div data-c-grid-item="base(1of1)">
            <hr data-c-margin="top(normal) bottom(normal)" />
          </div>
          <div
            data-c-alignment="base(centre) tp(left)"
            data-c-grid-item="tp(1of2)"
          >
            <a
              href="/builder-05"
              data-c-button="outline(c2)"
              data-c-radius="rounded"
              type="button"
            >
              Save &amp; Return to Tasks
            </a>
          </div>
          <div
            data-c-alignment="base(centre) tp(right)"
            data-c-grid-item="tp(1of2)"
          >
            {/* Modal trigger, same as last step. */}
            <button
              data-c-button="solid(c2)"
              data-c-radius="rounded"
              type="button"
              disabled={isSaving}
              onClick={(): void => saveAndPreview()}
            >
              Save &amp; Preview Skills
            </button>
          </div>
        </div>
      </div>
      <div data-c-dialog-overlay={isModalVisible ? "active" : ""} />
      {/** This modal is for adding brand new skills */}
      <Modal
        id={addModalId}
        parentElement={modalParentRef.current}
        visible={skillBeingAdded !== null}
        onModalCancel={(): void => {
          setSkillBeingAdded(null);
        }}
        onModalConfirm={(): void => {
          setSkillBeingAdded(null);
        }}
      >
        <Modal.Header>
          <div
            data-c-background="c1(100)"
            data-c-border="bottom(thin, solid, black)"
            data-c-padding="normal"
          >
            <h5
              data-c-colour="white"
              data-c-font-size="h4"
              id={`${addModalId}-title`}
            >
              Add a skill
            </h5>
          </div>
        </Modal.Header>
        <Modal.Body>
          {skillBeingAdded !== null && (
            <CriteriaForm
              jobPosterId={job.id}
              skill={skillBeingAdded}
              handleCancel={(): void => {
                setSkillBeingAdded(null);
              }}
              handleSubmit={(criteria: Criteria): void => {
                criteriaDispatch({ type: "add", payload: criteria });
                setSkillBeingAdded(null);
              }}
            />
          )}
        </Modal.Body>
      </Modal>
      {/** This modal is for editing already added skills */}
      <Modal
        id={editModalId}
        parentElement={modalParentRef.current}
        visible={criteriaBeingEdited !== null}
        onModalCancel={(): void => {
          setCriteriaBeingEdited(null);
        }}
        onModalConfirm={(): void => {
          setCriteriaBeingEdited(null);
        }}
      >
        <Modal.Header>
          <div
            data-c-background="c1(100)"
            data-c-border="bottom(thin, solid, black)"
            data-c-padding="normal"
          >
            <h5
              data-c-colour="white"
              data-c-font-size="h4"
              id={`${editModalId}-title`}
            >
              Edit skill
            </h5>
          </div>
        </Modal.Header>
        <Modal.Body>
          {criteriaBeingEdited !== null &&
            getSkillOfCriteria(criteriaBeingEdited) !== null && (
              <CriteriaForm
                jobPosterId={job.id}
                criteria={criteriaBeingEdited}
                skill={getSkillOfCriteria(criteriaBeingEdited) as Skill} // The cast is okay here (but still not ideal) because of the !== null check a few lines up
                handleCancel={(): void => {
                  setCriteriaBeingEdited(null);
                }}
                handleSubmit={(criteria: Criteria): void => {
                  criteriaDispatch({ type: "edit", payload: criteria });
                  setCriteriaBeingEdited(null);
                }}
              />
            )}
        </Modal.Body>
      </Modal>
      {/** This modal is the preview */}
      <Modal
        id={previewModalId}
        parentElement={modalParentRef.current}
        visible={isPreviewVisible}
        onModalCancel={(): void => setIsPreviewVisible(false)}
        onModalConfirm={(): void => handleContinue()}
      >
        <Modal.Header>
          <div
            data-c-background="c1(100)"
            data-c-border="bottom(thin, solid, black)"
            data-c-padding="normal"
          >
            <h5
              data-c-dialog-focus
              tabIndex={0}
              data-c-colour="white"
              data-c-font-size="h4"
              id={`${previewModalId}-title`}
            >
              Keep it up!
            </h5>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div data-c-border="bottom(thin, solid, black)">
            <div
              data-c-border="bottom(thin, solid, black)"
              data-c-padding="normal"
              id={`${previewModalId}-description`}
            >
              Here's a preview of the Tasks you just entered. Feel free to go
              back and edit things or move to the next step if you're happy with
              it.
            </div>

            <div data-c-background="grey(20)" data-c-padding="normal">
              <div
                className="manager-job-card"
                data-c-background="white(100)"
                data-c-padding="normal"
                data-c-radius="rounded"
              >
                <h4
                  data-c-border="bottom(thin, solid, black)"
                  data-c-font-size="h4"
                  data-c-font-weight="600"
                  data-c-margin="bottom(normal)"
                  data-c-padding="bottom(normal)"
                >
                  Skills the Employee Needs to Have
                </h4>
                {essentialCriteria.map(
                  (criterion): React.ReactElement | null => {
                    const skill = getSkillOfCriteria(criterion);
                    if (skill === null) {
                      return null;
                    }
                    return (
                      <div
                        key={skill.id}
                        data-c-margin="top(normal) bottom(double)"
                      >
                        <p
                          data-c-font-weight="bold"
                          data-c-margin="bottom(half)"
                        >
                          {skill[locale].name}
                        </p>
                        <p data-c-margin="bottom(half)">
                          Required Level:{" "}
                          {intl.formatMessage(
                            getSkillLevelName(criterion, skill),
                          )}
                        </p>
                        <p>{criterion[locale].description}</p>
                      </div>
                    );
                  },
                )}
                <h4
                  data-c-border="bottom(thin, solid, black)"
                  data-c-font-size="h4"
                  data-c-font-weight="600"
                  data-c-margin="top(double) bottom(normal)"
                  data-c-padding="bottom(normal)"
                >
                  Skills That Would Be Nice For the Employee to Have
                </h4>
                {assetCriteria.map((criterion): React.ReactElement | null => {
                  const skill = getSkillOfCriteria(criterion);
                  if (skill === null) {
                    return null;
                  }
                  return (
                    <div
                      key={skill.id}
                      data-c-margin="top(normal) bottom(double)"
                    >
                      <p data-c-font-weight="bold" data-c-margin="bottom(half)">
                        {skill[locale].name}
                      </p>
                      <p>{criterion[locale].description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.FooterCancelBtn>
            <FormattedMessage
              id="jobSkills.modalCancelLabel"
              defaultMessage="Go Back"
              description="The text displayed on the cancel button of the Job Builder Skills Preview modal."
            />
          </Modal.FooterCancelBtn>
          <Modal.FooterConfirmBtn>
            <FormattedMessage
              id="jobSkills.modalConfirmLabel"
              defaultMessage="Next Step"
              description="The text displayed on the confirm button of the Job Builder Skills Preview modal."
            />
          </Modal.FooterConfirmBtn>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default injectIntl(JobBuilderSkills);
