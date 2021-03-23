import React from "react";
import ReactDOM from "react-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { getId, notEmpty, toIdMap } from "../../../helpers/queries";
import {
  useApplicantExperience,
  useApplicantExperienceSkills,
  useApplicantSkillIds,
  useSkillCategories,
  useSkills,
} from "../../../hooks/apiResourceHooks";
import { Experience, ExperienceSkill, Skill } from "../../../models/types";
import { loadingMessages } from "../../Application/applicationMessages";
import FindSkillsDialog, {
  FindSkillsDialogTrigger,
} from "../../FindSkillsDialog/FindSkillsDialog";
import RootContainer from "../../RootContainer";
import List from "./List";

export const ProfileExperiencePage: React.FC<{ applicantId: number }> = ({
  applicantId,
}) => {
  const intl = useIntl();

  const skillsResource = useSkills();
  const skillCategoriesResource = useSkillCategories();
  const applicantSkillsResource = useApplicantSkillIds(applicantId);
  const experienceResource = useApplicantExperience(applicantId);
  const experienceSkillResource = useApplicantExperienceSkills(applicantId);

  const idToSkill = toIdMap(skillsResource.value);
  const applicantSkills = applicantSkillsResource.value.skill_ids
    .map((skillId) => idToSkill.get(skillId))
    .filter(notEmpty);
  const experiences: Experience[] = Object.values(experienceResource.values);
  const experienceSkills: ExperienceSkill[] = Object.values(
    experienceSkillResource.values,
  );

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

  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const openDialog = () => setIsDialogVisible(true);
  const closeDialog = () => {
    setIsDialogVisible(false);
  };

  return (
    <div>
      <h2 data-h2-heading="b(h3)" data-h2-margin="b(bottom, 1)">
        <FormattedMessage
          id="profileSkillsPage.heading"
          defaultMessage="Your Skills"
        />
      </h2>
      <p data-h2-margin="b(bottom, 1)">
        <FormattedMessage
          id="profileSkillsPage.preamble"
          defaultMessage="This is your library of skills. Managers will try to match their needs to these skills when searching for talent, or after you apply for a job. Use the Add Skills button to start building your library of skills."
          description="Appears at the top of the Profile Skills page, explaining the purpose of the page."
        />
      </p>
      <div
        data-h2-grid="b(middle, expanded, flush, 1)"
        data-h2-margin="b(bottom, 1)"
      >
        <div data-h2-grid-item="b(1of1) m(5of6)">
          <div
            data-h2-bg-color="b(gray-1, 1)"
            data-h2-radius="b(round)"
            data-h2-padding="b(all, 1)"
            data-h2-grid-content
          >
            <h4 data-h2-heading="b(h4)">
              <FormattedMessage
                id="profileSkillsPage.addSkills.subtitle"
                defaultMessage="Find and Add Skills"
                description="Section title acompanying the button that opens the Explore Skills modal."
              />
            </h4>
            <p>
              <FormattedMessage
                id="profileSkillsPage.addSkills.explanation"
                defaultMessage="Explore the government's most sought after skills, find the ones that apply to you, and add them to your profile."
                description="Text accompanying the button that opens the Explore Skills modal."
              />
            </p>
          </div>
        </div>
        <div data-h2-grid-item="b(1of1) m(1of6)">
          <div data-h2-grid-content>
            <FindSkillsDialogTrigger openDialog={openDialog} />
            <FindSkillsDialog
              previousSkills={applicantSkills}
              portal="applicant"
              skills={skillsResource.value}
              skillCategories={skillCategoriesResource.value}
              handleSubmit={submitNewSkills}
              isDialogVisible={isDialogVisible}
              closeDialog={closeDialog}
            />
          </div>
        </div>
      </div>
      {(skillsResource.status === "pending" ||
        experienceResource.indexStatus === "pending" ||
        experienceSkillResource.indexStatus === "pending" ||
        skillCategoriesResource.status === "pending" ||
        applicantSkillsResource.status === "pending") && (
        <h4
          data-h2-heading="b(h4)"
          data-h2-align="center"
          data-h2-padding="b(bottom, 1)"
        >
          {intl.formatMessage(loadingMessages.loading)}
        </h4>
      )}
      <List
        experiences={experiences}
        experienceSkills={experienceSkills}
        skillCategories={skillCategoriesResource.value}
        skills={applicantSkills}
        applicantId={applicantId}
        handleDeleteSkill={removeSkill}
        updateInProgress={applicantSkillsResource.status === "pending"}
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
