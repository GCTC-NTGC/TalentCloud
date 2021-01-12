/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Experience,
  Skill,
  ExperienceSkill,
  ExperienceEducation,
  ExperienceWork,
  ExperienceCommunity,
  ExperiencePersonal,
  ExperienceAward,
} from "../../models/types";
import {
  modalButtonProps,
  ModalButton,
} from "../Application/Experience/Experience";
import {
  AwardRecipientType,
  AwardRecognitionType,
  ProfileAwardModal,
} from "../Application/ExperienceModals/AwardExperienceModal";
import {
  EducationStatus,
  EducationType,
  ProfileEducationModal,
} from "../Application/ExperienceModals/EducationExperienceModal";
import { mapToObject, getId } from "../../helpers/queries";
import { experienceMessages } from "../Application/applicationMessages";
import { toggleAccordion } from "../../helpers/forms";
import { useUrlHash } from "../../helpers/router";

import { getExperienceSkillsOfExperience } from "../Application/helpers";
import { ProfileWorkModal } from "../Application/ExperienceModals/WorkExperienceModal";
import { ProfileCommunityModal } from "../Application/ExperienceModals/CommunityExperienceModal";
import { ProfilePersonalModal } from "../Application/ExperienceModals/PersonalExperienceModal";
import { ProfileEducationAccordion } from "../Application/ExperienceAccordions/ExperienceEducationAccordion";
import { ProfileWorkAccordion } from "../Application/ExperienceAccordions/ExperienceWorkAccordion";
import { ProfileCommunityAccordion } from "../Application/ExperienceAccordions/ExperienceCommunityAccordion";
import { ProfilePersonalAccordion } from "../Application/ExperienceAccordions/ExperiencePersonalAccordion";
import { ProfileAwardAccordion } from "../Application/ExperienceAccordions/ExperienceAwardAccordion";

const profileExperienceAccordion = (
  experience: Experience,
  relevantSkills: ExperienceSkill[],
  skillsById: { [id: number]: Skill },
  handleEdit: () => void,
  handleDelete: () => Promise<void>,
): React.ReactElement | null => {
  switch (experience.type) {
    case "experience_education":
      return (
        <ProfileEducationAccordion
          key={`${experience.id}-${experience.type}`}
          experience={experience}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          relevantSkills={relevantSkills}
          skillsById={skillsById}
        />
      );
    case "experience_work":
      return (
        <ProfileWorkAccordion
          key={`${experience.id}-${experience.type}`}
          experience={experience}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          relevantSkills={relevantSkills}
          skillsById={skillsById}
        />
      );
    case "experience_community":
      return (
        <ProfileCommunityAccordion
          key={`${experience.id}-${experience.type}`}
          experience={experience}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          relevantSkills={relevantSkills}
          skillsById={skillsById}
        />
      );
    case "experience_personal":
      return (
        <ProfilePersonalAccordion
          key={`${experience.id}-${experience.type}`}
          experience={experience}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          relevantSkills={relevantSkills}
          skillsById={skillsById}
        />
      );
    case "experience_award":
      return (
        <ProfileAwardAccordion
          key={`${experience.id}-${experience.type}`}
          experience={experience}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          relevantSkills={relevantSkills}
          skillsById={skillsById}
        />
      );
    default:
      return null;
  }
};
export interface ProfileExperienceProps {
  experiences: Experience[];
  educationStatuses: EducationStatus[];
  educationTypes: EducationType[];
  experienceSkills: ExperienceSkill[];
  skills: Skill[];
  recipientTypes: AwardRecipientType[];
  recognitionTypes: AwardRecognitionType[];
  handleCreateExperience: (data: Experience) => Promise<void>;
  handleUpdateExperience: (data: Experience) => Promise<void>;
  handleDeleteExperience: (
    id: number,
    type: Experience["type"],
  ) => Promise<void>;
  handleUpdateExperienceSkill: (expSkill: ExperienceSkill) => Promise<void>;
  handleDeleteExperienceSkill: (expSkill: ExperienceSkill) => Promise<void>;
}

export const ProfileExperience: React.FC<ProfileExperienceProps> = ({
  experiences,
  educationStatuses,
  educationTypes,
  experienceSkills,
  skills,
  handleCreateExperience,
  handleUpdateExperience,
  handleDeleteExperience,
  handleUpdateExperienceSkill,
  handleDeleteExperienceSkill,
  recipientTypes,
  recognitionTypes,
}) => {
  const intl = useIntl();

  const [isModalVisible, setIsModalVisible] = React.useState<{
    id: Experience["type"] | "";
    visible: boolean;
  }>({
    id: "",
    visible: false,
  });

  const [experienceData, setExperienceData] = React.useState<Experience | null>(
    null,
  );

  const modalButtons = modalButtonProps(intl);

  const openModal = (id: Experience["type"]): void => {
    setIsModalVisible({ id, visible: true });
  };

  const closeModal = (): void => {
    setExperienceData(null);
    setIsModalVisible({ id: "", visible: false });
  };

  const updateExperience = (data) =>
    handleUpdateExperience(data).then(closeModal);
  const createExperience = (data) =>
    handleCreateExperience(data).then(closeModal);

  const editExperience = (experience: Experience): void => {
    setExperienceData(experience);
    setIsModalVisible({ id: experience.type, visible: true });
  };

  const deleteExperience = (experience: Experience): Promise<void> =>
    handleDeleteExperience(experience.id, experience.type).then(closeModal);

  const skillsById = mapToObject(skills, getId);

  const modalRoot = document.getElementById("modal-root");

  // Open modal for editing if URI has a hash.
  const uriHash = useUrlHash();
  let experienceType: string;
  let experienceId: number;

  if (uriHash) {
    const uriHashFragments = uriHash.substring(1).split("_");
    // Get experience type from first two fragments of URI hash.
    experienceType = `${uriHashFragments[0]}_${uriHashFragments[1]}`;
    // Get experience id from third fragment of URI hash.
    experienceId = Number(uriHashFragments[2]);
  }

  const experienceCurrent: Experience | undefined = experiences.find(
    (experience) =>
      experience.type === experienceType && experience.id === experienceId,
  );

  useEffect(() => {
    if (uriHash && experienceCurrent) {
      toggleAccordion(uriHash.substring(1));
      // Open edit experience modal.
      editExperience(experienceCurrent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // useEffect should only run on mount and unmount.

  return (
    <>
      <div>
        <h2 data-c-heading="h2" data-c-margin="bottom(1)">
          {intl.formatMessage(experienceMessages.heading)}
        </h2>
        <p data-c-margin="bottom(1)">
          <FormattedMessage
            id="profile.experience.preamble"
            defaultMessage="Use the buttons below to add experiences you want to share with the manager. Experiences you have added in the past also appear below, and you can edit them to link them to skills required for this job when necessary."
            description="First section of text on the experience step of the Application Timeline."
          />
        </p>
        {/* Experience Modal Buttons */}
        <div data-c-grid="gutter(all, 1)">
          {Object.values(modalButtons).map((buttonProps) => {
            const { id, title, icon } = buttonProps;
            return (
              <ModalButton
                key={id}
                id={id}
                title={title}
                icon={icon}
                openModal={openModal}
              />
            );
          })}
        </div>
        {/* Experience Accordion List */}
        {experiences && experiences.length > 0 ? (
          <div className="experience-list" data-c-margin="top(2)">
            <div data-c-accordion-group>
              {experiences.map((experience) => {
                const relevantSkills: ExperienceSkill[] = getExperienceSkillsOfExperience(
                  experienceSkills,
                  experience,
                );
                const handleEdit = () => editExperience(experience);
                const handleDelete = () => deleteExperience(experience);
                const errorAccordion = () => (
                  <div
                    data-c-background="gray(10)"
                    data-c-radius="rounded"
                    data-c-border="all(thin, solid, gray)"
                    data-c-margin="top(1)"
                    data-c-padding="all(1)"
                  >
                    <div data-c-align="base(center)">
                      <p data-c-color="stop">
                        {intl.formatMessage(
                          experienceMessages.errorRenderingExperience,
                        )}
                      </p>
                    </div>
                  </div>
                );
                return (
                  profileExperienceAccordion(
                    experience,
                    relevantSkills,
                    skillsById,
                    handleEdit,
                    handleDelete,
                  ) ?? errorAccordion()
                );
              })}
            </div>
          </div>
        ) : (
          <div
            data-c-background="gray(10)"
            data-c-radius="rounded"
            data-c-border="all(thin, solid, gray)"
            data-c-margin="top(2)"
            data-c-padding="all(1)"
          >
            <div data-c-align="base(center)">
              <p data-c-color="gray">
                <FormattedMessage
                  id="profile.experience.noExperiences"
                  defaultMessage="Looks like you don't have any experience added yet. Use the buttons above to add experience. Don't forget that experience will always be saved to your profile so that you can use it on future applications!"
                  description="Message displayed when application has no experiences."
                />
              </p>
            </div>
          </div>
        )}
      </div>
      <div data-c-dialog-overlay={isModalVisible.visible ? "active" : ""} />
      <ProfileEducationModal
        educationStatuses={educationStatuses}
        educationTypes={educationTypes}
        experienceEducation={experienceData as ExperienceEducation}
        experienceableId={experienceData?.experienceable_id ?? 0}
        experienceableType={
          experienceData?.experienceable_type ?? "application"
        }
        modalId={modalButtons.education.id}
        onModalCancel={closeModal}
        onModalConfirm={
          experienceData === null ? createExperience : updateExperience
        }
        parentElement={modalRoot}
        visible={
          isModalVisible.visible &&
          isModalVisible.id === modalButtons.education.id
        }
      />
      <ProfileWorkModal
        experienceWork={experienceData as ExperienceWork}
        experienceableId={experienceData?.experienceable_id ?? 0}
        experienceableType={
          experienceData?.experienceable_type ?? "application"
        }
        modalId={modalButtons.work.id}
        onModalCancel={closeModal}
        onModalConfirm={
          experienceData === null ? createExperience : updateExperience
        }
        parentElement={modalRoot}
        visible={
          isModalVisible.visible && isModalVisible.id === modalButtons.work.id
        }
      />
      <ProfileCommunityModal
        experienceCommunity={experienceData as ExperienceCommunity}
        experienceableId={experienceData?.experienceable_id ?? 0}
        experienceableType={
          experienceData?.experienceable_type ?? "application"
        }
        modalId={modalButtons.community.id}
        onModalCancel={closeModal}
        onModalConfirm={
          experienceData === null ? createExperience : updateExperience
        }
        parentElement={modalRoot}
        visible={
          isModalVisible.visible &&
          isModalVisible.id === modalButtons.community.id
        }
      />
      <ProfilePersonalModal
        experiencePersonal={experienceData as ExperiencePersonal}
        experienceableId={experienceData?.experienceable_id ?? 0}
        experienceableType={
          experienceData?.experienceable_type ?? "application"
        }
        modalId={modalButtons.personal.id}
        onModalCancel={closeModal}
        onModalConfirm={
          experienceData === null ? createExperience : updateExperience
        }
        parentElement={modalRoot}
        visible={
          isModalVisible.visible &&
          isModalVisible.id === modalButtons.personal.id
        }
      />
      <ProfileAwardModal
        experienceAward={experienceData as ExperienceAward}
        experienceableId={experienceData?.experienceable_id ?? 0}
        experienceableType={
          experienceData?.experienceable_type ?? "application"
        }
        modalId={modalButtons.award.id}
        onModalCancel={closeModal}
        onModalConfirm={
          experienceData === null ? createExperience : updateExperience
        }
        parentElement={modalRoot}
        recipientTypes={recipientTypes}
        recognitionTypes={recognitionTypes}
        visible={
          isModalVisible.visible && isModalVisible.id === modalButtons.award.id
        }
      />
    </>
  );
};

export default ProfileExperience;
