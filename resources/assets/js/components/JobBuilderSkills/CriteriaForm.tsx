import React from "react";
import { Criteria, Skill } from "../../models/types";
import { InjectedIntlProps, injectIntl } from "react-intl";

interface CriteriaFormProps {
  // The criteria being edited, if we're not creating a new one.
  criteria?: Criteria;
  // The skill this criteria will evaluate
  skill: Skill;
}

export const CriteriaForm: React.FunctionComponent<
  CriteriaFormProps & InjectedIntlProps
> = ({ criteria, skill, intl }): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unknown intl.locale");
  }

  return (
    <form>
      <div
        data-c-background="c1(100)"
        data-c-border="bottom(thin, solid, black)"
        data-c-padding="normal"
      >
        {/* TODO: What's the deal with this tabIndex on a header here? */}
        <h5
          data-c-dialog-focus
          tabIndex={0}
          data-c-colour="white"
          data-c-font-size="h4"
          id="example-dialog-01-title"
        >
          Add a Skill to Task 01
        </h5>
      </div>
      <div data-c-border="bottom(thin, solid, black)">
        {/* Skill Definition */}
        <div data-c-padding="all(normal)" data-c-background="grey(10)">
          <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
            Skill Definition
          </p>
          <div>
            <p data-c-margin="bottom(normal)">{skill[locale].name}</p>
            <p data-c-margin="bottom(normal)">{skill[locale].description}</p>
            <div className="job-builder-custom-skill-definition">
              <div data-c-input="textarea">
                <label>Skill Specificity</label>
                <span>Required</span>
                <div>
                  <textarea placeholder="Add specificity to the definition of this skill that will only appear on my job poster but note that this will have be approved prior to posting..." />
                </div>
                <span>This input has an error.</span>
              </div>
            </div>
            <button className="job-builder-add-skill-definition-trigger">
              <span className="add">
                <i className="fas fa-plus-circle" data-c-colour="c1"></i>I'd
                like to add specificity to this definition. This will only apply
                to my job poster.
              </span>
              <span className="remove">
                <i className="fas fa-minus-circle" data-c-colour="c1"></i>Remove
                additional specificity.
              </span>
            </button>
          </div>
        </div>
        {/* Skill Level */}
        <div data-c-padding="all(normal)">
          <div className="job-builder-culture-block">
            <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
              Choose a Skill Level
            </p>
            {/* This is a null state for when the user hasn't yet selected a skill from the dropdown. */}
            {/*
                                <div data-c-background="grey(10)" data-c-border="all(thin, solid, grey)" data-c-radius="rounded" data-c-padding="normal" data-c-alignment="base(centre)">
                                    Please select a skill above to continue to this step.
                                </div>
                                */}
            <div data-c-grid="gutter">
              <div data-c-grid-item="base(1of1) tl(1of3)" data-c-input="radio">
                <label htmlFor="builder06Level">Select a skill level:</label>
                <span>Required</span>
                <div id="builder06Level" role="radiogroup">
                  <label
                    data-tc-wEnv-id="Level1"
                    data-tc-wEnv-trigger
                    htmlFor="builder06LevelOption01"
                  >
                    <input
                      required
                      id="builder06LevelOption01"
                      name="builder06Level"
                      type="radio"
                    />
                    <span>Basic</span>
                  </label>
                  {/* Just a heads up this has a default checked value. */}
                  <label
                    data-tc-wEnv-id="Level2"
                    data-tc-wEnv-trigger
                    htmlFor="builder06LevelOption02"
                  >
                    <input
                      checked
                      id="builder06LevelOption02"
                      name="builder06Level"
                      type="radio"
                    />
                    <span>Intermediate</span>
                  </label>
                  <label
                    data-tc-wEnv-id="Level3"
                    data-tc-wEnv-trigger
                    htmlFor="builder06LevelOption03"
                  >
                    <input
                      id="builder06LevelOption03"
                      name="builder06Level"
                      type="radio"
                    />
                    <span>Advanced</span>
                  </label>
                  <label
                    data-tc-wEnv-id="Level4"
                    data-tc-wEnv-trigger
                    htmlFor="builder06LevelOption04"
                  >
                    <input
                      id="builder06LevelOption04"
                      name="builder06Level"
                      type="radio"
                    />
                    <span>Lead</span>
                  </label>
                  <div
                    className="job-builder-skill-level-or-block"
                    data-c-alignment="base(centre)"
                  >
                    <div />
                    <span>or</span>
                  </div>
                  <label
                    data-tc-wEnv-id="Level5"
                    data-tc-wEnv-trigger
                    htmlFor="builder06LevelOption05"
                  >
                    <input
                      id="builder06LevelOption05"
                      name="builder06Level"
                      type="radio"
                    />
                    <span>Asset Skill / No Level Required</span>
                  </label>
                </div>
                <span>This input has an error.</span>
              </div>
              <div data-c-grid-item="base(1of1) tl(2of3)">
                <div className="job-builder-context-block">
                  <div
                    className="job-builder-context-item"
                    data-tc-wEnv-id="Level1"
                    data-c-background="grey(20)"
                    data-c-padding="all(normal)"
                    data-c-radius="rounded"
                  >
                    <p
                      data-c-font-size="small"
                      data-c-margin="bottom(half)"
                      data-c-font-weight="bold"
                    >
                      Basic
                    </p>
                    <p data-c-font-size="small" data-c-margin="bottom(quarter)">
                      You have the ability to accomplish basic tasks with steady
                      supervision and clear direction. The tasks you're assigned
                      are clear and don't involve significant complexity. Their
                      impact is usually locally felt.
                    </p>
                    <p data-c-font-size="small" data-c-margin="bottom(quarter)">
                      As you advance in this category, you should be developing
                      the ability to accomplish tasks of moderate complexity
                      with steady supervision. You will also need to be able to
                      accomplish basic tasks with little or no supervision.
                    </p>
                    <p data-c-font-size="small">
                      This level is usually associated with tasks that form the
                      bulk of the work for lower level positions, such as junior
                      analysts or entry level developers.
                    </p>
                  </div>
                  <div
                    className="active job-builder-context-item"
                    data-tc-wEnv-id="Level2"
                    data-c-background="grey(20)"
                    data-c-padding="all(normal)"
                    data-c-radius="rounded"
                  >
                    <p
                      data-c-font-size="small"
                      data-c-margin="bottom(half)"
                      data-c-font-weight="bold"
                    >
                      Intermediate
                    </p>
                    <p data-c-font-size="small" data-c-margin="bottom(quarter)">
                      You have the ability to accomplish tasks of moderate
                      complexity or moderate impact with supervision. The
                      approach to the tasks, and how they are delivered, is
                      determined by the supervisor. You contribute input and
                      advice. You are able to advance the task, even in the face
                      of small to moderate hurdles and complications.
                    </p>
                    <p data-c-font-size="small" data-c-margin="bottom(quarter)">
                      As you advance in this category, you should be developing
                      the ability to accomplish tasks of significant complexity
                      or larger impact with steady supervision. You will also
                      need to be able to accomplish tasks of moderate complexity
                      or impact with little or no supervision.
                    </p>
                    <p data-c-font-size="small">
                      This level is usually associated with tasks that form the
                      bulk of the work for mid-level positions, such as analysts
                      or developers.
                    </p>
                  </div>
                  <div
                    className="job-builder-context-item"
                    data-tc-wEnv-id="Level3"
                    data-c-background="grey(20)"
                    data-c-padding="all(normal)"
                    data-c-radius="rounded"
                  >
                    <p
                      data-c-font-size="small"
                      data-c-margin="bottom(half)"
                      data-c-font-weight="bold"
                    >
                      Advanced
                    </p>
                    <p data-c-font-size="small" data-c-margin="bottom(quarter)">
                      You have the ability to accomplish tasks of significant
                      complexity or impact with supervision. You provide advice
                      and input on the approach to the tasks, and how they are
                      delivered, for the supervisor's consideration. You are
                      able to advance the task, even in the face of moderate to
                      large hurdles and complications.
                    </p>
                    <p data-c-font-size="small" data-c-margin="bottom(quarter)">
                      As you advance in this category, you should be developing
                      the ability to accomplish tasks of significant complexity
                      or larger impact with only light levels of supervision,
                      where you are effectively the lead on the initiative. You
                      may also take on a role of training others in this skills
                      set or take on a light supervisory role for those at lower
                      levels.
                    </p>
                    <p data-c-font-size="small">
                      This level is usually associated with tasks that form the
                      bulk of the work for higher level positions, such as
                      senior analysts or senior developers.
                    </p>
                  </div>
                  <div
                    className="job-builder-context-item"
                    data-tc-wEnv-id="Level4"
                    data-c-background="grey(20)"
                    data-c-padding="all(normal)"
                    data-c-radius="rounded"
                  >
                    <p
                      data-c-font-size="small"
                      data-c-margin="bottom(half)"
                      data-c-font-weight="bold"
                    >
                      Lead
                    </p>
                    <p data-c-font-size="small" data-c-margin="bottom(quarter)">
                      You have the ability to accomplish tasks of significant
                      complexity or impact, where you call the shots and answer
                      to the organization's senior management for your
                      decisions. You bring forward the tasks, the approach and
                      the delivery plan for senior management consideration. You
                      often supervise others (individuals or teams) in
                      delivering tasks of high complexity or system wide impact.
                      You are able to advance these tasks, even in the face of
                      significant unforeseen hurdles and complications.
                    </p>
                    <p data-c-font-size="small" data-c-margin="bottom(quarter)">
                      As you advance in this category, you should be developing
                      the ability to assess others at more junior levels,
                      becoming able to clearly identify the difference between
                      beginner, intermediate and advanced tasks. You should be
                      able to build teams, set direction and provide
                      supervision.
                    </p>
                    <p data-c-font-size="small">
                      This level is usually associated with tasks that form the
                      bulk of the work for management and executive level
                      positions.
                    </p>
                  </div>
                  <div
                    className="job-builder-context-item"
                    data-tc-wEnv-id="Level5"
                    data-c-background="grey(20)"
                    data-c-padding="all(normal)"
                    data-c-radius="rounded"
                  >
                    <p
                      data-c-font-size="small"
                      data-c-margin="bottom(half)"
                      data-c-font-weight="bold"
                    >
                      Asset / No Level Required
                    </p>
                    <p data-c-font-size="small" data-c-margin="bottom(quarter)">
                      This skill isn't required for the employee to do the job,
                      but it provides an added benefit to their skillset and
                      will improve the speed or effectiveness of their work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-c-padding="normal">
        <div data-c-grid="gutter middle">
          <div data-c-grid-item="base(1of2)">
            <button
              data-c-button="outline(c2)"
              data-c-dialog-action="close"
              data-c-dialog-id="example-dialog-01"
              data-c-radius="rounded"
            >
              Cancel
            </button>
          </div>
          <div data-c-alignment="base(right)" data-c-grid-item="base(1of2)">
            <button
              data-c-button="solid(c2)"
              data-c-dialog-action="close"
              data-c-dialog-id="example-dialog-01"
              data-c-radius="rounded"
            >
              Add Skill
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default injectIntl(CriteriaForm);
