import React from "react";
import { Job, Skill } from "../../models/types";

interface JobBuilderSkillsProps {
  // The job being built
  job: Job;
  // The list of all possible skills
  skills: Skill[];
  skillCount: number;
  essentialCount: number;
}

export const JobBuilderSkills: React.FunctionComponent<
  JobBuilderSkillsProps
> = ({ job, skillCount, essentialCount }): React.ReactElement => {
  const countInRange = (min: number, max: number, count: number): boolean => {
    return count >= min && count <= max;
  };
  const isOccupational = (skill: Skill): boolean => {
    // TODO:
    return true;
  };
  const isCulture = (skill: Skill): boolean => {
    // TODO:
    return false;
  };
  const isFuture = (skill: Skill): boolean => {
    // TODO:
    return false;
  };
  return (
    <div data-c-container="form" data-c-padding="top(triple) bottom(triple)">
      <h3
        data-c-font-size="h3"
        data-c-font-weight="bold"
        data-c-margin="bottom(double)"
      >
        Skills
      </h3>
      <p data-c-margin="bottom(triple)">
        This is where you'll select the criteria that are required to do this
        job effectively. Below are two bars that indicate a measurement of your
        current skill selection.
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
        <li>
          Consult broadly and recruit executive leadership in digital and
          technology for federal organizations (e.g., C-Suite level positions
          like Chief Information Officers, Chief Digital Officers, Chief
          Technology Officers, and their deputies).
        </li>
        <li>
          Connect partner organizations (departments, agencies) with top talent
          (i.e., high-performing executives) with an interest and the potential
          to assume technology leadership roles.
        </li>
        <li>
          Identify and attract exceptional executive candidates, including those
          who haven’t considered government as an option before.
        </li>
        <li>
          Build a diverse pipeline of candidates and strong partnerships with
          government departments. This means proactively going out and building
          a network and strong relationships with senior level external talent
          (CIOs and similar senior-level positions) across Canada, as well as
          with senior leaders in departments and agencies who have vacant
          positions.
        </li>
        <li>
          Take a human-centered approach to recruitment by understanding users’
          needs (hiring executives and candidates) to deliver exceptional user
          experience.
        </li>
        <li>
          Work creatively using a broad array of traditional and social media
          approaches.
        </li>
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
        {skillCount === 0 && (
          <div className="jpb-skill-null" data-c-grid="gutter middle">
            <div
              data-c-grid-item="base(2of10) tl(1of10)"
              data-c-align="base(centre)"
            >
              <button type="button" data-tc-move-up-trigger>
                <i className="fas fa-angle-up" />
              </button>
              <button type="button" data-tc-move-down-trigger>
                <i className="fas fa-angle-down" />
              </button>
            </div>
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
        )}
        <ol className="jpb-skill-list" data-tc-up-down-list>
          {/* This is an individual skill. I've handled the up/down script and the modal trigger, but I'll leave managing the value of the skill's list number, the modal contents,  and the deletion to you folks. I've also migrated the up/down script to a universal one. When it comes to the "jpb-skill", you'll need to add a class that specifies which TYPE of skill it is (occupational, cultural, future). This will handle interior colour/icon changes. */}
          <li className="jpb-skill occupational" data-tc-up-down-item>
            <div data-c-grid="gutter middle">
              <div
                data-c-grid-item="base(2of10) tl(1of10)"
                data-c-align="base(centre)"
              >
                {/* These should work already. */}
                <button type="button" data-tc-move-up-trigger>
                  <i className="fas fa-angle-up" />
                </button>
                <button type="button" data-tc-move-down-trigger>
                  <i className="fas fa-angle-down" />
                </button>
              </div>
              <div data-c-grid-item="base(6of10) tl(7of10)">
                <div data-c-grid="gutter">
                  <div data-c-grid-item="base(1of1) tl(2of3)">
                    {/* This value needs to update based on the order. Wasn't sure if this should be done as a part of my arrow script or if React can handle it better. */}
                    <span>1</span>
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
                    <span>HTML5</span>
                  </div>
                  <div data-c-grid-item="base(1of1) tl(1of3)">
                    <span
                      data-c-radius="rounded"
                      data-c-padding="tb(quarter) rl(half)"
                      data-c-border="all(thin, solid, c1)"
                      data-c-colour="c1"
                      data-c-font-size="small"
                    >
                      {/* This value should update based on the selections made in the edit modal. */}
                      Intermediate
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
                    {/* Right now, this is just triggering the edit modal, but that edit modal will obviously have to be unique to each skill so that it can be properly edited. */}
                    <button
                      type="button"
                      data-c-colour="c1"
                      data-c-dialog-action="open"
                      data-c-dialog-id="example-dialog-01"
                    >
                      <i className="fas fa-edit" />
                    </button>
                  </div>
                  <div
                    data-c-grid-item="base(1of1) tl(1of2)"
                    data-c-align="base(centre)"
                  >
                    {/* I've left this thing blank for now, because I assumed you'd want to handle deletion through React. */}
                    <button type="button" data-c-colour="stop">
                      <i className="fas fa-trash" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ol>
        {/* Repeat what you have above for asset skills. The biggest thing to note here is that the level should be empty in this list, and when the user changes the level of an essential skill to asset, it should be moved down into this list (and vice versa). */}
        <p data-c-font-weight="bold" data-c-margin="top(normal) bottom(normal)">
          Asset Skills
        </p>
        {/* Asset null state goes here. */}
        <ol className="jpb-skill-list" data-tc-up-down-list>
          {/* Asset skills go here. */}
        </ol>
      </div>
      <div data-c-margin="bottom(triple)" data-c-align="base(centre) tl(right)">
        {/* We'll want this button to functionally be the exact same as the button at the bottom of the page, where it saves the data, and opens the preview modal. */}
        <button
          data-c-button="solid(c2)"
          data-c-radius="rounded"
          data-c-dialog-action="open"
          data-c-dialog-id="example-dialog-02"
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
            <div className="jpb-skill-target">
              <i data-c-colour="stop" className="fas fa-bullseye" />
              <i data-c-colour="go" className="fas fa-check" />
              Aim for 3 - 5 skills.
            </div>
          </div>
          {/* This is the list of skills. Clicking a skill button should trigger the "Edit skill" modal so that the user can edit the definition/level before adding it. If they DO add it, you can assign an "active" class to the respective button so indicate that it's selected. This will change it's colour and icon automatically. This is also the area where "Culture Skills" is split into the two categories - see the Culture Skills section below for what that looks like. */}
          <ul className="jpb-skill-cloud" data-c-grid-item="base(1of1)">
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
            <div className="jpb-skill-target complete">
              <i data-c-colour="stop" className="fas fa-bullseye" />
              <i data-c-colour="go" className="fas fa-check" />
              Aim for 0 - 4 skills.
            </div>
          </div>
          {/* So here's where culture skills get broken into categories. In theory this logic will be used down the road to break occupational skills into occupations (e.g. CS - UX Designer), but for now this the only instance where it happens. */}
          <ul className="jpb-skill-cloud" data-c-grid-item="base(1of1)">
            {/* Note that this "p" tag has a different margin value than the one in the "ul" below. */}
            <p
              data-c-font-weight="bold"
              data-c-margin="top(half) bottom(normal)"
            >
              Recommended Skills:
            </p>
            {/* This is where the skill recommendations from Work Environment go. */}
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
            {/* This is where the remaining culture skills go. Please make sure that the skills in the recommendation list above do not appear here. */}
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
            <div className="jpb-skill-target complete">
              <i data-c-colour="stop" className="fas fa-bullseye" />
              <i data-c-colour="go" className="fas fa-check" />
              Aim for 0 - 2 skills.
            </div>
          </div>
          <ul className="jpb-skill-cloud" data-c-grid-item="base(1of1)">
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
        </div>
      </div>
      {/* This section is basically just text, but it prompts the manager to get in touch with us if they can't find the skill they're looking for. */}
      {/* "Custom" Skills */}
      <h5 data-c-font-weight="bold" data-c-margin="top(double) bottom(half)">
        Can't find the skill you need?
      </h5>
      <p data-c-margin="bottom(normal)">
        Building a skills list is a huge endeavour, and it's not surprising that
        Talent Cloud's list doesn't have the skill you're looking for. To help
        us expand our skill list, please{" "}
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
            data-c-dialog-action="open"
            data-c-dialog-id="example-dialog-02"
            data-c-radius="rounded"
            type="button"
          >
            Save &amp; Preview Skills
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobBuilderSkills;
