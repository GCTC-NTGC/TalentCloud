import random from "lodash/random";
import React from "react";
import ReactDOM from "react-dom";
import { FormattedMessage } from "react-intl";
import fakeExperiences from "../../../fakeData/fakeExperience";
import fakeExperienceSkills from "../../../fakeData/fakeExperienceSkills";
import { getId, notEmpty, toIdMap } from "../../../helpers/queries";
import {
  useApplicantSkillIds,
  useSkillCategories,
  useSkills,
} from "../../../hooks/apiResourceHooks";
import { Skill } from "../../../models/types";
import FindSkillsModal from "../../FindSkillsModal";
import RootContainer from "../../RootContainer";
import List from "./List";

export const ProfileExperiencePage: React.FC<{ applicantId: number }> = ({
  applicantId,
}) => {
  const skillsResource = useSkills();
  const applicantSkillsResource = useApplicantSkillIds(applicantId);
  const skillCategoriesResource = useSkillCategories();

  const idToSkill = toIdMap(skillsResource.value);
  const applicantSkills = applicantSkillsResource.value.skill_ids
    .map((skillId) => idToSkill.get(skillId))
    .filter(notEmpty);

  const submitNewSkills = async (newSkills: Skill[]): Promise<void> => {
    await applicantSkillsResource.update({
      skill_ids: [
        ...applicantSkillsResource.value.skill_ids,
        ...newSkills.map(getId),
      ],
    });
  };

  const removeSkill = async (skillId: number): Promise<void> => {
    await applicantSkillsResource.update({
      skill_ids: applicantSkillsResource.value.skill_ids.filter(
        (id) => id !== skillId,
      ),
    });
  };

  // TODO: remove
  const fakeSkillSkillCategories = skillsResource.value.map(
    (skill: Skill, index) => {
      return {
        id: index,
        skill_id: skill.id,
        skill_category_id: random(3, 10), // non-parent skill categories.
      };
    },
  );

  return (
    <div>
      <p>Hello welcome to the skills page!</p>
      <FindSkillsModal
        dialogTrigger={
          <div data-h2-grid="b(top, expanded, flush, 0)">
            <div data-h2-grid-item="b(1of1)">
              <img alt="" src="https://via.placeholder.com/75" />
            </div>
            <p data-h2-grid-item="b(1of1)">
              <FormattedMessage
                id="profileSkillsPage.addSkillsButton"
                defaultMessage="Add Skills"
              />
            </p>
          </div>
        }
        oldSkills={applicantSkills}
        portal="applicant"
        skills={skillsResource.value}
        skillCategories={skillCategoriesResource.value}
        handleSubmit={submitNewSkills}
      />
      <List
        experiences={fakeExperiences()}
        experienceSkills={fakeExperienceSkills()}
        skillCategories={skillCategoriesResource.value}
        skillSkillCategories={fakeSkillSkillCategories}
        skills={applicantSkills}
        applicantId={applicantId}
        handleDeleteSkill={removeSkill}
      />
    </div>
  );
};

if (document.getElementById("profile-skills")) {
  const root = document.getElementById("profile-skills");
  if (root && "applicantId" in root.dataset) {
    const applicantId = Number(root.dataset.applicantId as string);
    ReactDOM.render(
      <RootContainer>
        <ProfileExperiencePage applicantId={applicantId} />
      </RootContainer>,
      root,
    );
  }
}

export default ProfileExperiencePage;
