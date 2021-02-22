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
} from "../../../models/types";
import {
  modalButtonProps,
  ModalButton,
  ModalButtonH2,
} from "../../Application/Experience/Experience";
import { mapToObject, getId } from "../../../helpers/queries";
import { experienceMessages } from "../../Application/applicationMessages";
import { toggleAccordion } from "../../../helpers/forms";
import { useUrlHash } from "../../../helpers/router";

import { getExperienceSkillsOfExperience } from "../../Application/helpers";
import { ProfileEducationAccordion } from "../../Application/ExperienceAccordions/ExperienceEducationAccordion";
import { ProfileWorkAccordion } from "../../Application/ExperienceAccordions/ExperienceWorkAccordion";
import { ProfileCommunityAccordion } from "../../Application/ExperienceAccordions/ExperienceCommunityAccordion";
import { ProfilePersonalAccordion } from "../../Application/ExperienceAccordions/ExperiencePersonalAccordion";
import { ProfileAwardAccordion } from "../../Application/ExperienceAccordions/ExperienceAwardAccordion";
import ProfileEducationModal from "./EducationExperienceProfileModal";
import ProfileWorkModal from "./WorkExperienceProfileModal";
import ProfileCommunityModal from "./CommunityExperienceProfileModal";
import ProfilePersonalModal from "./PersonalExperienceProfileModal";
import ProfileAwardModal from "./AwardExperienceProfileModal";
import {
  FormEducationStatus,
  FormEducationType,
} from "../../Application/ExperienceModals/EducationExperienceModal";
import {
  FormAwardRecipientType,
  FormAwardRecognitionType,
} from "../../Application/ExperienceModals/AwardExperienceModal";
import { ExperienceSubmitData } from "./ProfileExperienceCommon";
import { getApplicantSkillsUrl } from "../../../helpers/routes";
import { getLocale } from "../../../helpers/localize";

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

const NoSkillsNotification: React.FC<{ applicantId: number }> = ({
  applicantId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  return (
    <div
      data-c-alert="warning"
      data-c-radius="rounded"
      role="alert"
      data-c-margin="bottom(1)"
      // data-c-grid="middle"
    >
      <div data-c-padding="half" data-c-grid="middle">
        <div
          data-c-grid-item="base(1of1) pl(1of8) tl(1of12)"
          data-c-align="center"
        >
          <i
            aria-hidden="true"
            className="fa fa-exclamation-circle"
            data-c-padding="right(.5)"
            data-c-font-size="h2"
            data-c-margin="tb(.5)"
          />
        </div>
        <div data-c-grid-item="base(1of1) pl(7of8) tl(11of12)">
          <p>
            <FormattedMessage
              id="profile.experience.noSkills"
              defaultMessage="<b>No skills:</b> It seems you have not added any skills yet. You can create experiences now, but this section works best when you have some skills on your profile. <a>Click here to add skills.</a>"
              description="Alert that appears when there are no skills yet attached to profile."
              values={{
                b: (value) => <span data-c-font-weight="bold">{value}</span>,
                a: (...chunks): React.ReactElement => (
                  <a href={getApplicantSkillsUrl(locale, applicantId)}>
                    {chunks}
                  </a>
                ),
              }}
            />
          </p>
        </div>
      </div>
    </div>
  );
};
export interface ProfileExperienceProps {
  applicantId: number;
  experiences: Experience[];
  educationStatuses: FormEducationStatus[];
  educationTypes: FormEducationType[];
  experienceSkills: ExperienceSkill[];
  userSkills: Skill[];
  recipientTypes: FormAwardRecipientType[];
  recognitionTypes: FormAwardRecognitionType[];
  handleCreateExperience: (
    data: ExperienceSubmitData<Experience>,
  ) => Promise<void>;
  handleUpdateExperience: (
    data: ExperienceSubmitData<Experience>,
  ) => Promise<void>;
  handleDeleteExperience: (
    id: number,
    type: Experience["type"],
  ) => Promise<void>;
}

export const ProfileExperience: React.FC<ProfileExperienceProps> = ({
  applicantId,
  experiences,
  educationStatuses,
  educationTypes,
  experienceSkills,
  userSkills,
  handleCreateExperience,
  handleUpdateExperience,
  handleDeleteExperience,
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

  const updateExperience = (data: ExperienceSubmitData<Experience>) =>
    handleUpdateExperience(data).then(closeModal);
  const createExperience = (data: ExperienceSubmitData<Experience>) =>
    handleCreateExperience(data).then(closeModal);

  const editExperience = (experience: Experience): void => {
    setExperienceData(experience);
    setIsModalVisible({ id: experience.type, visible: true });
  };

  const deleteExperience = (experience: Experience): Promise<void> =>
    handleDeleteExperience(experience.id, experience.type).then(closeModal);

  const skillsById = mapToObject(userSkills, getId);

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
      {userSkills.length === 0 && (
        <NoSkillsNotification applicantId={applicantId} />
      )}
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
            // TODO: Use one type of button for everything.
            return id === "experience_work" ? (
              <ModalButtonH2
                key={id}
                id={id}
                title={title}
                icon={icon}
                openModal={openModal}
              />
            ) : (
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
        userSkills={userSkills}
        experienceSkills={experienceSkills}
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
        userSkills={userSkills}
        experienceSkills={experienceSkills}
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
        userSkills={userSkills}
        experienceSkills={experienceSkills}
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
        userSkills={userSkills}
        experienceSkills={experienceSkills}
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
        userSkills={userSkills}
        experienceSkills={experienceSkills}
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
