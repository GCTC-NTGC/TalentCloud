/* eslint-disable camelcase, @typescript-eslint/camelcase */
import React, { useState, useRef, useReducer } from "react";
import {
  WrappedComponentProps,
  injectIntl,
  FormattedMessage,
  defineMessages,
} from "react-intl";
import nprogress from "nprogress";
import { Job, Skill, Criteria, JobPosterKeyTask } from "../../models/types";
import Modal from "../Modal";
import CriteriaForm from "./CriteriaForm";
import { mapToObject, getId, hasKey, notEmpty } from "../../helpers/queries";
import { CriteriaTypeId } from "../../models/lookupConstants";
import Select, { SelectOption } from "../Select";
import { getSkillLevelName } from "../../models/jobUtil";
import Criterion from "../JobBuilder/Criterion";

interface JobBuilderSkillsProps {
  // The job being built
  job: Job;
  // This job's key tasks
  keyTasks: JobPosterKeyTask[];
  // Criteria already part of the job
  initialCriteria: Criteria[];
  // The list of all possible skills
  skills: Skill[];
  // The function to run when user clicks Save. Must return the updated list of criteria if successufl.
  handleSubmit: (criteria: Criteria[]) => Promise<Criteria[]>;
  // The function to run when user clicks Prev Pag
  handleReturn: () => void;
  // The function to run when user clicks Next Page
  handleContinue: () => void;
  /** Whether the entire job is complete and valid for submission. */
  jobIsComplete: boolean;
  /** Function that skips to final review. */
  handleSkipToReview: () => Promise<void>;
}

const messages = defineMessages({
  emailUs: {
    id: "jobBuilder.skills.emailLink",
    defaultMessage: "get in touch with us through email",
    description: "Text for an email link in a larger block of text",
  },
  selectSkillLabel: {
    id: "jobBuilder.skills.selectSkillLabel",
    defaultMessage: "Please select a skill from our list",
    description: "Label for skill selection dropdown menu",
  },
  selectSkillNull: {
    id: "jobBuilder.skills.selectSkillNull",
    defaultMessage: "Please select a skill",
    description: "Label for skill selection dropdown null/default state",
  },
});

const altMessages = defineMessages({
  unhappyArrow: {
    id: "jobBuilder.skills.alt.unhappyArrow",
    defaultMessage: "Arrow icon highlighting the unhappy smiley icon.",
    description: "Alternative text describing unhappy arrow image",
  },
  unhappySmiley: {
    id: "jobBuilder.skills.alt.unhappySmiley",
    defaultMessage: "Unhappy coloured smiley icon.",
    description: "Alternative text describing unhappy smiley image",
  },
  unhappyGraySmiley: {
    id: "jobBuilder.skills.alt.unhappyGraySmiley",
    defaultMessage: "Unhappy grayscale smiley icon.",
    description: "Alternative text describing unhappy grayscale smiley image",
  },
  neutralArrow: {
    id: "jobBuilder.skills.alt.neutralArrow",
    defaultMessage: "Arrow icon highlighting the neutral smiley icon.",
    description: "Alternative text describing neutral arrow image",
  },
  neutralSmiley: {
    id: "jobBuilder.skills.alt.neutralSmiley",
    defaultMessage: "neutral coloured smiley icon.",
    description: "Alternative text describing neutral smiley image",
  },
  neutralGraySmiley: {
    id: "jobBuilder.skills.alt.neutralGraySmiley",
    defaultMessage: "neutral grayscale smiley icon.",
    description: "Alternative text describing neutral grayscale smiley image",
  },
  happyArrow: {
    id: "jobBuilder.skills.alt.happyArrow",
    defaultMessage: "Arrow icon highlighting the happy smiley icon.",
    description: "Alternative text describing happy arrow image",
  },
  happySmiley: {
    id: "jobBuilder.skills.alt.happySmiley",
    defaultMessage: "happy coloured smiley icon.",
    description: "Alternative text describing happy smiley image",
  },
  happyGraySmiley: {
    id: "jobBuilder.skills.alt.happyGraySmiley",
    defaultMessage: "happy grayscale smiley icon.",
    description: "Alternative text describing happy grayscale smiley image",
  },
});
// "Arrow highlighting the neutral smiley icon."
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

export const JobBuilderSkills: React.FunctionComponent<
  JobBuilderSkillsProps & WrappedComponentProps
> = ({
  job,
  keyTasks,
  initialCriteria,
  skills,
  handleSubmit,
  handleReturn,
  handleContinue,
  jobIsComplete,
  handleSkipToReview,
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

  // Set this to true to show the Key Tasks modal
  const [tasksModalVisible, setTasksModalVisible] = useState(false);

  // When skillBeingAdded is not null, the modal to add a new skill will appear.
  const [skillBeingAdded, setSkillBeingAdded] = useState<Skill | null>(null);

  // Set to true if submit button is touched
  const [submitTouched, setSubmitTouched] = useState(false);

  // When criteriaBeingEdited is not null, the modal for editing that criterion will appear.
  const [
    criteriaBeingEdited,
    setCriteriaBeingEdited,
  ] = useState<Criteria | null>(null);

  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  // This should be true if ANY modal is visible. The modal overlay uses this.
  const isModalVisible =
    tasksModalVisible ||
    skillBeingAdded !== null ||
    criteriaBeingEdited !== null ||
    isPreviewVisible;
  const modalParentRef = useRef<HTMLDivElement>(null);

  const tasksModalId = "job-builder-review-tasks";
  const addModalId = "job-builder-add-skill";
  const editModalId = "job-builder-edit-skill";
  const previewModalId = "job-builder-preview-skills";

  const countInRange = (min: number, max: number, count: number): boolean => {
    return count >= min && count <= max;
  };

  const sortAlphabetically = (a: Skill, b: Skill): number => {
    const skillA: string = a[locale].name.toUpperCase();
    const skillB: string = b[locale].name.toUpperCase();

    return skillA.localeCompare(skillB, locale, { sensitivity: "base" });
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
  const occupationalSkills = skills
    .filter(isOccupational)
    .sort(sortAlphabetically);
  const occupationalCriteria = jobCriteria.filter((criterion): boolean => {
    const critSkill = getSkillOfCriteria(criterion);
    return critSkill !== null && isOccupational(critSkill);
  });

  const isCulture = (skill: Skill): boolean => skill.is_culture_skill;
  const cultureSkills = skills.filter(isCulture).sort(sortAlphabetically);
  const cultureCriteria = jobCriteria.filter((criterion): boolean => {
    const skill = getSkillOfCriteria(criterion);
    return skill !== null && isCulture(skill);
  });
  const isFuture = (skill: Skill): boolean => skill.is_future_skill;
  const futureSkills = skills.filter(isFuture).sort(sortAlphabetically);
  const futureCriteria = jobCriteria.filter((criterion): boolean => {
    const skill = getSkillOfCriteria(criterion);
    return skill !== null && isFuture(skill);
  });

  // Optional skills are those that don't fit into the other three categories
  const isOptional = (skill: Skill): boolean =>
    !isOccupational(skill) && !isCulture(skill) && !isFuture(skill);
  const otherSkills = skills.filter(isOptional).sort(sortAlphabetically);
  const selectedSkillIds = jobCriteria
    .map(getSkillOfCriteria)
    .filter(notEmpty)
    .map(getId);
  const selectedOtherSkills: Skill[] = otherSkills.filter((skill): boolean =>
    selectedSkillIds.includes(skill.id),
  );
  const unselectedOtherSkills: Skill[] = otherSkills.filter(
    (skill): boolean => !selectedSkillIds.includes(skill.id),
  );

  const [isSaving, setIsSaving] = useState(false);

  const errorMessage = useRef<HTMLAnchorElement>(null); //React.createRef<HTMLAnchorElement>();
  const focusOnError = (): void => {
    errorMessage.current && errorMessage.current.focus();
  };

  const saveAndPreview = (): void => {
    setSubmitTouched(true);
    if (essentialCount > 0) {
      nprogress.start();
      setIsSaving(true);
      handleSubmit(jobCriteria)
        .then((criteria: Criteria[]): void => {
          criteriaDispatch({ type: "replace", payload: criteria });
          nprogress.done();
          setIsPreviewVisible(true);
          setIsSaving(false);
        })
        .catch((): void => {
          nprogress.done();
          setIsSaving(false);
        });
    } else {
      focusOnError();
    }
  };
  const saveAndReturn = (): void => {
    nprogress.start();
    setIsSaving(true);
    handleSubmit(jobCriteria)
      .then((criteria: Criteria[]): void => {
        criteriaDispatch({ type: "replace", payload: criteria });
        nprogress.done();
        handleReturn();
        setIsSaving(false);
      })
      .catch((): void => {
        nprogress.done();
        setIsSaving(false);
      });
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
            {/* <span>0</span>
            <span
              data-c-background="grey(40)"
              data-c-font-size="small"
              data-c-margin="rl(half)"
              data-c-padding="tb(quarter) rl(half)"
              data-c-radius="rounded"
              data-c-colour="white"
            >
              <i className="fas fa-briefcase" />
            </span> */}
            <span>
              <FormattedMessage
                id="jobBuilder.skills.addSkillBelow"
                defaultMessage="Add skills below to proceed."
                description="Placeholder skill title / instructions to add skill"
              />
            </span>
          </div>
          <div data-c-grid-item="base(1of1) tl(1of3)">
            <span
              data-c-colour="white"
              data-c-background="grey(40)"
              data-c-padding="tb(quarter) rl(half)"
              data-c-radius="rounded"
              data-c-font-size="small"
            >
              <FormattedMessage
                id="jobBuilder.skills.skillLevel"
                defaultMessage="Skill Level"
                description="Placeholder label"
              />
            </span>
          </div>
        </div>
      </div>
      <div data-c-grid-item="base(3of10)">
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
        } ${isFuture(skill) ? "future" : ""} ${
          isOptional(skill) ? "optional" : ""
        }`}
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
                <span data-c-margin="right(normal)">{index + 1}.</span>
                {/* This icon will automatically update based on the class you've specified above, on the jpb-skill. */}
                {/* <span
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
                  <i className="fas fa-book" />
                </span> */}
                {/* The skill name. */}
                <span>{skill[locale].name}</span>
              </div>
              <div data-c-grid-item="base(1of1) tl(1of3)">
                <span
                  data-c-radius="pill"
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
          <div data-c-grid-item="base(3of10)">
            <div data-c-grid="gutter">
              <div
                data-c-grid-item="base(1of1) tl(1of2)"
                data-c-align="base(centre)"
              >
                <button
                  type="button"
                  data-c-colour="c1"
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
                  data-c-colour="c1"
                  data-c-hover-colour="stop"
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
          data-c-padding="all(half)"
          type="button"
          onClick={handleClick}
        >
          <span data-c-padding="right(half)">
            <i className="fas fa-plus-circle" />
            <i className="fas fa-minus-circle" />
          </span>
          {skill[locale].name}
        </button>
      </li>
    );
  };

  const submitButton = (
    <button
      data-c-button="solid(c2)"
      data-c-radius="rounded"
      type="button"
      disabled={isSaving}
      onClick={(): void => saveAndPreview()}
    >
      <FormattedMessage
        id="jobBuilder.skills.button.previewSkills"
        defaultMessage="Save &amp; Preview Skills"
        description="Label of Button"
      />
    </button>
  );
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
          <FormattedMessage
            id="jobBuilder.skills.title"
            defaultMessage="Skills"
            description="section title"
          />
        </h3>
        <p data-c-margin="bottom(triple)">
          <FormattedMessage
            id="jobBuilder.skills.description"
            defaultMessage="This is where you'll select the criteria that are required to do
            this job effectively. Below are two bars that indicate a measurement
            of your current skill selection."
            description="section description under title"
          />
        </p>
        <div
          data-c-margin="bottom(triple)"
          data-c-align="base(centre) tl(left)"
        >
          {/* We'll want this button to functionally be the exact same as the button at the bottom of the page, where it saves the data, and opens the preview modal. */}
          <button
            data-c-button="solid(c2)"
            data-c-radius="rounded"
            type="button"
            disabled={tasksModalVisible}
            onClick={(): void => setTasksModalVisible(true)}
          >
            <FormattedMessage
              id="jobBuilder.skills.button.keyTasks"
              defaultMessage="View Key Tasks"
              description="Button label"
            />
          </button>
        </div>

        {/* Total Skills List */}
        <h4
          data-c-colour="c2"
          data-c-font-size="h4"
          data-c-margin="bottom(normal)"
        >
          <FormattedMessage
            id="jobBuilder.skills.listTitle"
            defaultMessage="Your Skills List"
            description="List section title"
          />
        </h4>
        <div data-c-grid="gutter top">
          <div data-c-grid-item="base(1of1) tl(1of2)">
            <div
              data-c-border="all(thin, solid, black)"
              data-c-radius="rounded"
              data-c-padding="normal"
            >
              <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
                <FormattedMessage
                  id="jobBuilder.skills.statusSmiley.essentialTitle"
                  defaultMessage="Total Number of Essential Skills"
                  description="Title of skill status tracker"
                />
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
                    <img
                      src="\images\icon-smiley-arrow-bad.svg"
                      alt={intl.formatMessage(altMessages.unhappyArrow)}
                    />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {essentialCount}
                    </span>
                  </div>
                  <img
                    src="\images\icon-smiley-bad.svg"
                    alt={intl.formatMessage(altMessages.unhappySmiley)}
                  />
                  <img
                    src="\images\icon-smiley-bad-grey.svg"
                    alt={intl.formatMessage(altMessages.unhappyGraySmiley)}
                  />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    <FormattedMessage
                      id="jobBuilder.skills.statusSmiley.essential.tooFew"
                      defaultMessage="Too Few"
                      description="Description of quantity of skills"
                    />
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
                    <img
                      src="\images\icon-smiley-arrow-medium.svg"
                      alt={intl.formatMessage(altMessages.neutralArrow)}
                    />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {essentialCount}
                    </span>
                  </div>
                  <img
                    src="\images\icon-smiley-medium.svg"
                    alt={intl.formatMessage(altMessages.neutralSmiley)}
                  />
                  <img
                    src="\images\icon-smiley-medium-grey.svg"
                    alt={intl.formatMessage(altMessages.neutralGraySmiley)}
                  />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    <FormattedMessage
                      id="jobBuilder.skills.statusSmiley.essential.almost"
                      defaultMessage="Almost"
                      description="Description of quantity of skills"
                    />
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
                    <img
                      src="\images\icon-smiley-arrow-good.svg"
                      alt={intl.formatMessage(altMessages.happyArrow)}
                    />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {essentialCount}
                    </span>
                  </div>
                  <img
                    src="\images\icon-smiley-good.svg"
                    alt={intl.formatMessage(altMessages.happySmiley)}
                  />
                  <img
                    src="\images\icon-smiley-good-grey.svg"
                    alt={intl.formatMessage(altMessages.happyGraySmiley)}
                  />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    <FormattedMessage
                      id="jobBuilder.skills.statusSmiley.essential.awesome"
                      defaultMessage="Awesome"
                      description="Description of quantity of skills"
                    />
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
                    <img
                      src="\images\icon-smiley-arrow-medium.svg"
                      alt={intl.formatMessage(altMessages.neutralArrow)}
                    />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {essentialCount}
                    </span>
                  </div>
                  <img
                    src="\images\icon-smiley-medium.svg"
                    alt={intl.formatMessage(altMessages.neutralSmiley)}
                  />
                  <img
                    src="\images\icon-smiley-medium-grey.svg"
                    alt={intl.formatMessage(altMessages.neutralGraySmiley)}
                  />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    <FormattedMessage
                      id="jobBuilder.skills.statusSmiley.essential.acceptable"
                      defaultMessage="Acceptable"
                      description="Description of quantity of skills"
                    />
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
                    {/* TODO: Alt Text Translations */}
                    <img
                      src="\images\icon-smiley-arrow-bad.svg"
                      alt={intl.formatMessage(altMessages.unhappyArrow)}
                    />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {essentialCount}
                    </span>
                  </div>
                  <img
                    src="\images\icon-smiley-bad.svg"
                    alt={intl.formatMessage(altMessages.unhappySmiley)}
                  />
                  <img
                    src="\images\icon-smiley-bad-grey.svg"
                    alt={intl.formatMessage(altMessages.unhappyGraySmiley)}
                  />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    <FormattedMessage
                      id="jobBuilder.skills.statusSmiley.essential.tooMany"
                      defaultMessage="Too Many"
                      description="Description of quantity of skills"
                    />
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
                <FormattedMessage
                  id="jobBuilder.skills.statusSmiley.title"
                  defaultMessage="Total Number of Skills"
                  description="Title of skill quantity evaluator"
                />
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
                    <img
                      src="\images\icon-smiley-arrow-bad.svg"
                      alt={intl.formatMessage(altMessages.unhappyArrow)}
                    />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {skillCount}
                    </span>
                  </div>
                  <img
                    src="\images\icon-smiley-bad.svg"
                    alt={intl.formatMessage(altMessages.unhappySmiley)}
                  />
                  <img
                    src="\images\icon-smiley-bad-grey.svg"
                    alt={intl.formatMessage(altMessages.unhappyGraySmiley)}
                  />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    <FormattedMessage
                      id="jobBuilder.skills.statusSmiley.tooFew"
                      defaultMessage="Too Few"
                      description="Description of quantity of skills"
                    />
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
                    <img
                      src="\images\icon-smiley-arrow-medium.svg"
                      alt={intl.formatMessage(altMessages.neutralArrow)}
                    />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {skillCount}
                    </span>
                  </div>
                  <img
                    src="\images\icon-smiley-medium.svg"
                    alt={intl.formatMessage(altMessages.neutralSmiley)}
                  />
                  <img
                    src="\images\icon-smiley-medium-grey.svg"
                    alt={intl.formatMessage(altMessages.neutralGraySmiley)}
                  />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    <FormattedMessage
                      id="jobBuilder.skills.statusSmiley.almost"
                      defaultMessage="Almost"
                      description="Description of quantity of skills"
                    />
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
                    <img
                      src="\images\icon-smiley-arrow-good.svg"
                      alt={intl.formatMessage(altMessages.happyArrow)}
                    />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {skillCount}
                    </span>
                  </div>
                  <img
                    src="\images\icon-smiley-good.svg"
                    alt={intl.formatMessage(altMessages.happySmiley)}
                  />
                  <img
                    src="\images\icon-smiley-good-grey.svg"
                    alt={intl.formatMessage(altMessages.happyGraySmiley)}
                  />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    <FormattedMessage
                      id="jobBuilder.skills.statusSmiley.awesome"
                      defaultMessage="Awesome"
                      description="Description of quantity of skills"
                    />
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
                    <img
                      src="\images\icon-smiley-arrow-medium.svg"
                      alt={intl.formatMessage(altMessages.neutralArrow)}
                    />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {skillCount}
                    </span>
                  </div>
                  <img
                    src="\images\icon-smiley-medium.svg"
                    alt={intl.formatMessage(altMessages.neutralSmiley)}
                  />
                  <img
                    src="\images\icon-smiley-medium-grey.svg"
                    alt={intl.formatMessage(altMessages.neutralGraySmiley)}
                  />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    <FormattedMessage
                      id="jobBuilder.skills.statusSmiley.acceptable"
                      defaultMessage="Acceptable"
                      description="Description of quantity of skills"
                    />
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
                    <img
                      src="\images\icon-smiley-arrow-bad.svg"
                      alt={intl.formatMessage(altMessages.unhappyArrow)}
                    />
                    <span
                      data-c-font-weight="bold"
                      data-c-colour="white"
                      data-c-font-size="small"
                    >
                      {skillCount}
                    </span>
                  </div>
                  <img
                    src="\images\icon-smiley-bad.svg"
                    alt={intl.formatMessage(altMessages.unhappySmiley)}
                  />
                  <img
                    src="\images\icon-smiley-bad-grey.svg"
                    alt={intl.formatMessage(altMessages.unhappyGraySmiley)}
                  />
                  <p data-c-font-size="small" data-c-font-weight="bold">
                    <FormattedMessage
                      id="jobBuilder.skills.statusSmiley.tooMany"
                      defaultMessage="tooMany"
                      description="Description of quantity of skills"
                    />
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
            <FormattedMessage
              id="jobBuilder.skills.title.essentialSkills"
              defaultMessage="Essential Skills"
              description="Title of essential skills list"
            />
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
            <FormattedMessage
              id="jobBuilder.skills.title.assetSkills"
              defaultMessage="Asset Skills"
              description="Title of asset skills list"
            />
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
          {submitButton}
        </div>
        {/* The 3 sections below are each functionally similar and can probably be united into one component. The biggest difference between the three is that "Cultural Skills" has a categorical breakdown between "Recommended Skills" and the rest of the category. These recommendations are based directly on the way the manager answered their work environment questions, but I'm not sure how the logic works, so you'll want to check in with Lauren/Jasmita on this. */}
        <h4
          data-c-colour="c2"
          data-c-font-size="h4"
          data-c-margin="bottom(normal)"
        >
          <FormattedMessage
            id="jobBuilder.skills.title.skillSelection"
            defaultMessage="Skill Selection"
            description="Title of skill selection section"
          />
        </h4>
        {/* Occupational Skills */}
        {/* You can modify colour/icon using the category classes here again (occupational, cultural, future) on the "jpb-skill-category" element. */}
        <div
          id="jpb-occupational-skills"
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
                  <i className="fas fa-book" />
                </span>
                {/* Category Title */}
                <FormattedMessage
                  id="jobBuilder.skills.title.occupationalSkills"
                  defaultMessage="Occupational Competencies"
                  description="Title of skills category"
                />
              </h5>
              {/* Category description - basically this outlines what the category means. */}
              {/* <p>
                // TODO: Add this message back in once we have copy.
                <FormattedMessage
                  id="jobBuilder.skills.description.occupationalSkills"
                  defaultMessage=""
                  description="Description of a category of skills"
                />
              </p> */}
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
                <span>
                  <FormattedMessage
                    id="jobBuilder.skills.range.occupationalSkills"
                    defaultMessage="Aim for {minOccupational} - {maxOccupational} skills."
                    description="Ranage recommendation for occupational competencies in job poster"
                    values={{ minOccupational, maxOccupational }}
                  />
                </span>
              </div>
            </div>
            {/* This is the list of skills. Clicking a skill button should trigger the "Edit skill" modal so that the user can edit the definition/level before adding it. If they DO add it, you can assign an "active" class to the respective button so indicate that it's selected. This will change it's colour and icon automatically. This is also the area where "Culture Skills" is split into the two categories - see the Culture Skills section below for what that looks like. */}
            {(job.classification_code === "" ||
              job.classification_code === null) && (
              <p data-c-font-weight="bold" data-c-grid-item="base(1of1)">
                <FormattedMessage
                  id="jobBuilder.skills.nullText.occupationalSkills"
                  defaultMessage="You must return to Step 1 and choose a Classification."
                  description="Placeholder text for occupational competencies list."
                />
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
                  <i className="fas fa-book" />
                </span>
                <FormattedMessage
                  id="jobBuilder.skills.title.culturalSkills"
                  defaultMessage="Behavioural Competencies"
                  description="Title of skills category"
                />
              </h5>
              {/* <p>
              // TODO: Add this message back in once we have copy.
                <FormattedMessage
                  id="jobBuilder.skills.description.culturalSkills"
                  defaultMessage=""
                  description="Description of a category of skills"
                />
              </p> */}
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
                <span>
                  <FormattedMessage
                    id="jobBuilder.skills.range.culturalSkills"
                    defaultMessage="Aim for {minCulture} - {maxCulture} skills."
                    description="Range recommendation for behavioural competencies in job poster"
                    values={{ minCulture, maxCulture }}
                  />
                </span>
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
                  <i className="fas fa-book" />
                </span>
                <FormattedMessage
                  id="jobBuilder.skills.title.futureSkills"
                  defaultMessage="Public Service Competencies"
                  description="Title of skills category"
                />
              </h5>
              {/* <p>
              // TODO: Add this message back in once we have copy.
                <FormattedMessage
                  id="jobBuilder.skills.description.futureSkills"
                  defaultMessage=""
                  description="Description of a category of skills"
                />
              </p> */}
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
                <span>
                  <FormattedMessage
                    id="jobBuilder.skills.range.futureSkills"
                    defaultMessage="Aim for {minFuture} - {maxFuture} skills."
                    description="Ranage recommendation for public service competencies in job poster"
                    values={{ minFuture, maxFuture }}
                  />
                </span>
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
          <FormattedMessage
            id="jobBuilder.skills.title.missingSkill"
            defaultMessage="Can't find the skill you need?"
            description="Title of instructions for missing skill"
          />
        </h5>
        <p data-c-margin="bottom(normal)">
          {/* TODO: Refactor for react-intl version 3, using new rich text xml tag syntax eg.
          <FormattedMessage
            id="jobBuilder.skills.instructions.missingSkills"
            defaultMessage="Building a skills list is a huge endeavour, and it's not
  surprising that Talent Cloud's list doesn't have the skill
  you're looking for. To help us expand our skill list, please <link>get in touch with us through email</link>. Provide the skill's name, as well as a short description to
  kick-off the discussion."
            values={{
              link: msg => (
                <a href="mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca">
                  {msg}
                </a>
              ),
            }}
          /> */}
          <FormattedMessage
            id="jobBuilder.skills.instructions.missingSkills"
            defaultMessage="Building a skills list is a huge endeavour, and it's not
  surprising that Talent Cloud's list doesn't have the skill
  you're looking for. To help us expand our skill list, please {link}. Provide the skill's name, as well as a short description to
  kick-off the discussion."
            values={{
              link: (
                <a href="mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca">
                  {intl.formatMessage(messages.emailUs)}
                </a>
              ),
            }}
          />
        </p>
        <div
          className="jpb-skill-category optional"
          data-c-margin="bottom(normal)"
          data-c-padding="normal"
          data-c-radius="rounded"
          data-c-background="grey(10)"
        >
          <div data-c-grid="gutter top">
            <div data-c-grid-item="base(1of1)">
              {/** TODO: Fix the layout of the skill cloud */}
              <h5 className="jpb-skill-section-title" data-c-font-size="h4">
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
                  <i className="fas fa-book" />
                </span>
                <FormattedMessage
                  id="jobBuilder.skills.title.otherSkills"
                  defaultMessage="Other Skills"
                  description="Title of other skills section"
                />
              </h5>
            </div>
            <div data-c-grid-item="base(1of1)">
              <Select
                id="jpb-all-skills-select"
                name="jpbAllSkillsSelect"
                label={intl.formatMessage(messages.selectSkillLabel)}
                selected={null}
                nullSelection={intl.formatMessage(messages.selectSkillNull)}
                options={unselectedOtherSkills.map(
                  (skill): SelectOption => ({
                    value: skill.id,
                    label: skill[locale].name,
                  }),
                )}
                onChange={(event): void => {
                  const skillId = Number(event.target.value);
                  if (hasKey(skillsById, skillId)) {
                    const skill = skillsById[skillId];
                    setSkillBeingAdded(skill);
                  }
                }}
              />
            </div>
            <ul className="jpb-skill-cloud" data-c-grid-item="base(1of1)">
              {/** TODO: Get this null state text hiding/showing. */}
              {selectedOtherSkills.length === 0 && (
                <p>
                  <FormattedMessage
                    id="jobBuilder.skills.placeholder.otherSkills"
                    defaultMessage="There are no extra skills added."
                    description="Placeholder when there are no other skills"
                  />
                </p>
              )}
              {selectedOtherSkills.map(renderSkillButton)}
            </ul>
          </div>
        </div>
        <div data-c-grid="gutter">
          <div data-c-grid-item="base(1of1)">
            <hr data-c-margin="top(normal) bottom(normal)" />
          </div>
          <div
            data-c-alignment="base(centre) tp(left)"
            data-c-grid-item="tp(1of2)"
          >
            <button
              data-c-button="outline(c2)"
              data-c-radius="rounded"
              type="button"
              disabled={isSaving}
              onClick={(): void => saveAndReturn()}
            >
              <FormattedMessage
                id="jobBuilder.skills.button.returnToTasks"
                defaultMessage="Save &amp; Return to Tasks"
                description="Button Label"
              />
            </button>
          </div>
          <div
            data-c-alignment="base(centre) tp(right)"
            data-c-grid-item="tp(1of2)"
          >
            {/* Modal trigger, same as last step. */}
            {submitButton}

            <div
              role="alert"
              data-c-alert="error"
              data-c-radius="rounded"
              data-c-margin="top(normal)"
              data-c-padding="all(half)"
              data-c-visibility={
                essentialCount === 0 && submitTouched ? "visible" : "invisible"
              }
              style={{
                display: `inline-block`,
              }}
            >
              <a
                href="#jpb-occupational-skills"
                tabIndex={0}
                ref={errorMessage}
              >
                <FormattedMessage
                  id="jobBuilder.skills.essentialSkillRequiredError"
                  defaultMessage="At least one 'Essential Skill' is required."
                  description="Label of Button"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div data-c-dialog-overlay={isModalVisible ? "active" : ""} />
      {/** This modal simply displays key tasks. */}
      <Modal
        id={tasksModalId}
        parentElement={modalParentRef.current}
        visible={tasksModalVisible}
        onModalCancel={(): void => setTasksModalVisible(false)}
        onModalConfirm={(): void => setTasksModalVisible(false)}
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
              id={`${tasksModalId}-title`}
            >
              <FormattedMessage
                id="jobBuilder.skills.title.keyTasks"
                defaultMessage="Key Tasks"
                description="Title of Key Tasks Section"
              />
            </h5>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div data-c-border="bottom(thin, solid, black)">
            <div
              data-c-border="bottom(thin, solid, black)"
              data-c-padding="normal"
              id={`${tasksModalId}-description`}
            >
              <ul>
                {keyTasks.map(
                  (task): React.ReactElement => (
                    <li key={task.id}>{task[locale].description}</li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.FooterCancelBtn>
            <FormattedMessage
              id="jobBuilder.skills.tasksModalCancelLabel"
              defaultMessage="Back to Skills"
              description="The text displayed on the cancel button of the Key Tasks modal on the Job Builder Skills step."
            />
          </Modal.FooterCancelBtn>
        </Modal.Footer>
      </Modal>
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
              <FormattedMessage
                id="jobBuilder.skills.title.addASkill"
                defaultMessage="Add a skill"
                description="Title of Add a skill Section"
              />
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
              <FormattedMessage
                id="jobBuilder.skills.title.editSkill"
                defaultMessage="Edit skill"
                description="Title of Edit skill Modal"
              />
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
        onModalMiddle={(): void => {
          handleSkipToReview();
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
              id={`${previewModalId}-title`}
            >
              <FormattedMessage
                id="jobBuilder.skills.title.keepItUp"
                defaultMessage="Keep it up!"
                description="Title of Keep it up! Modal"
              />
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
              <p>
                <FormattedMessage
                  id="jobBuilder.skills.description.keepItUp"
                  defaultMessage="Here's a preview of the Skills you just entered. Feel free to
                go back and edit things or move to the next step if you're
                happy with it."
                  description="Body text of Keep it up! Modal"
                />
              </p>
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
                  <FormattedMessage
                    id="jobBuilder.skills.title.needsToHave"
                    defaultMessage="Skills the Employee Needs to Have"
                    description="Section Header in Modal"
                  />
                </h4>
                {essentialCriteria.length === 0 ? (
                  <p>
                    <FormattedMessage
                      id="jobBuilder.skills.nullState"
                      defaultMessage="You haven't added any skills yet."
                      description="The text displayed in the skills modal when you haven't added any skills."
                    />
                  </p>
                ) : (
                  essentialCriteria.map(
                    (criterion): React.ReactElement | null => {
                      const skill = getSkillOfCriteria(criterion);
                      if (skill === null) {
                        return null;
                      }
                      return (
                        <Criterion
                          criterion={criterion}
                          skill={skill}
                          key={skill.id}
                        />
                      );
                    },
                  )
                )}
                <h4
                  data-c-border="bottom(thin, solid, black)"
                  data-c-font-size="h4"
                  data-c-font-weight="600"
                  data-c-margin="top(double) bottom(normal)"
                  data-c-padding="bottom(normal)"
                >
                  <FormattedMessage
                    id="jobBuilder.skills.title.niceToHave"
                    defaultMessage="Skills That Would Be Nice For the Employee to Have"
                    description="Section Header in Modal"
                  />
                </h4>
                {assetCriteria.length === 0 ? (
                  <p>
                    <FormattedMessage
                      id="jobBuilder.skills.nullState"
                      defaultMessage="You haven't added any skills yet."
                      description="The text displayed in the skills modal when you haven't added any skills."
                    />
                  </p>
                ) : (
                  assetCriteria.map((criterion): React.ReactElement | null => {
                    const skill = getSkillOfCriteria(criterion);
                    if (skill === null) {
                      return null;
                    }
                    return (
                      <Criterion
                        criterion={criterion}
                        skill={skill}
                        key={skill.id}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.FooterCancelBtn>
            <FormattedMessage
              id="jobBuilder.skills.previewModalCancelLabel"
              defaultMessage="Go Back"
              description="The text displayed on the cancel button of the Job Builder Skills Preview modal."
            />
          </Modal.FooterCancelBtn>
          {jobIsComplete && (
            <Modal.FooterMiddleBtn>
              <FormattedMessage
                id="jobBuilder.skills.previewModalMiddleLabel"
                defaultMessage="Skip to Review"
                description="The text displayed on the 'Skip to Review' button of the Job Builder Skills Preview modal."
              />
            </Modal.FooterMiddleBtn>
          )}
          <Modal.FooterConfirmBtn>
            <FormattedMessage
              id="jobBuilder.skills.previewModalConfirmLabel"
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
