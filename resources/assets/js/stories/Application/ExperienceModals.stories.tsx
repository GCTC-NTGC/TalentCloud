import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { text, number, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import WorkExperienceModal from "../../components/Application/ExperienceModals/WorkExperienceModal";
import {
  fakeExperienceWork,
  fakeExperienceEducation,
  fakeExperienceCommunity,
  fakeExperiencePersonal,
  fakeExperienceAward,
} from "../../fakeData/fakeExperience";
import {
  fakeSkill,
  fakeSkill2,
  fakeSkill3,
  fakeSkill4,
} from "../../fakeData/fakeSkills";
import EducationExperienceModal from "../../components/Application/ExperienceModals/EducationExperienceModal";
import CommunityExperienceModal from "../../components/Application/ExperienceModals/CommunityExperienceModal";
import PersonalExperienceModal from "../../components/Application/ExperienceModals/PersonalExperienceModal";
import AwardExperienceModal from "../../components/Application/ExperienceModals/AwardExperienceModal";

const stories = storiesOf("Application|Experience Modals", module).addDecorator(
  withIntl,
);

const groupIds = {
  type: "Experience Type",
  details: "Details",
  switches: "Switches",
};

function sleep(ms): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const requiredSkills = [
  fakeSkill({
    id: 1,
  }),
  fakeSkill2({
    id: 2,
  }),
  fakeSkill3({
    id: 3,
  }),
  fakeSkill4({
    id: 4,
  }),
];
const optionalSkills = [
  fakeSkill({
    id: 11,
    name: {
      en: "Networking",
      fr: "Mise en réseau",
    },
  }),
  fakeSkill2({
    id: 12,
    name: {
      en: "Conflict Resolution",
      fr: "Résolution des conflits",
    },
  }),
  fakeSkill3({
    id: 13,
    name: {
      en: "Resilience",
      fr: "Résilience",
    },
  }),
];

export const educationTypes = [
  { id: 1, name: { en: "Diploma", fr: "Diplôme" } },
  { id: 2, name: { en: "Bachelor's Degree", fr: "Licence" } },
  { id: 3, name: { en: "Master's Degree", fr: "Maîtrise" } },
  {
    id: 4,
    name: {
      en: "Post-doctoral Fellowship",
      fr: "Bourse post-doctorale",
    },
  },
  { id: 5, name: { en: "Online Course", fr: "Cours en ligne" } },
  { id: 6, name: { en: "Certification", fr: "Certification" } },
  { id: 7, name: { en: "Other", fr: "Autres" } },
];

export const educationStatuses = [
  {
    id: 1,
    name: {
      en: "Successful Completion (Certificate Awarded)",
      fr: "Réussite (certificat délivré)",
    },
  },
  {
    id: 2,
    name: {
      en: "Successful Completion (No Certificate Awarded)",
      fr: "Réussite (aucun certificat accordé)",
    },
  },
  { id: 3, name: { en: "In Progress", fr: "En cours" } },
  {
    id: 4,
    name: {
      en: "Audited",
      fr: "Audité",
    },
  },
  {
    id: 5,
    name: { en: "Did Not Complete", fr: "N'a pas complété" },
  },
];

export const recipientTypes = [
  { id: 1, name: { en: "Me", fr: "Moi" } },
  { id: 2, name: { en: "My Team", fr: "Mon équipe" } },
  { id: 3, name: { en: "My Project", fr: "Mon projet" } },
  { id: 4, name: { en: "My Organization", fr: "Mon organization" } },
];
export const recogntitionTypes = [
  { id: 1, name: { en: "International", fr: "International" } },
  { id: 2, name: { en: "National", fr: "National" } },
  { id: 3, name: { en: "Provincial", fr: "Provincial" } },
  { id: 4, name: { en: "Local", fr: "Local" } },
  { id: 5, name: { en: "Community", fr: "Communauté" } },
  { id: 6, name: { en: "Organizational", fr: "Organisation" } },
  {
    id: 7,
    name: {
      en: "Sub-Organizational (Branch)",
      fr: "Sous-Organisation (Branche)",
    },
  },
];

export const experienceRequirements = {
  educationRequirement: {
    title: text(
      "Education Requirment Title",
      "2 Years Post-secondary",
      groupIds.details,
    ),
    description: text(
      "Education Requirment Description",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, officiis delectus excepturi voluptate laudantium omnis nesciunt consectetur eum sapiente aliquid ipsam obcaecati expedita odio id eligendi voluptatum. Consequuntur, quibusdam voluptates.",
      groupIds.details,
    ),
  },
  equivalentRequirment: {
    title: text(
      "Equivalent Experience requirment Title",
      "Equivalent Experience",
      groupIds.details,
    ),
    description: text(
      "Equivalent Experience requirment Description",
      "ELorem ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus animi consequatur dolorem voluptatum earum iure doloremque, facere est asperiores, dignissimos quae architecto vero unde vitae quis excepturi! Totam, libero.",
      groupIds.details,
    ),
  },
};

stories.add(
  "Work Experience Modal",
  (): React.ReactElement => {
    const isModalVisible = boolean("Visible", true, groupIds.switches);
    const modalParent = document.querySelector("#modal-root");

    return (
      <div id="work-modal-container">
        <div
          id="work-modal-overlay"
          data-c-dialog-overlay={isModalVisible ? "active" : ""}
        />
        <div>
          <WorkExperienceModal
            modalId="work-experience-modal"
            experienceWork={fakeExperienceWork()}
            jobId={number("Job Id", 1, undefined, groupIds.details)}
            requiredSkills={requiredSkills}
            savedRequiredSkills={[requiredSkills[2], requiredSkills[3]]}
            optionalSkills={optionalSkills}
            savedOptionalSkills={[optionalSkills[0]]}
            experienceRequirments={{
              educationRequirement: {
                title: text(
                  "Education Requirment Title",
                  "2 Years Post-secondary",
                  groupIds.details,
                ),
                description: text(
                  "Education Requirment Description",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, officiis delectus excepturi voluptate laudantium omnis nesciunt consectetur eum sapiente aliquid ipsam obcaecati expedita odio id eligendi voluptatum. Consequuntur, quibusdam voluptates.",
                  groupIds.details,
                ),
              },
              equivalentRequirment: {
                title: text(
                  "Equivalent Experience requirment Title",
                  "Equivalent Experience",
                  groupIds.details,
                ),
                description: text(
                  "Equivalent Experience requirment Description",
                  "ELorem ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus animi consequatur dolorem voluptatum earum iure doloremque, facere est asperiores, dignissimos quae architecto vero unde vitae quis excepturi! Totam, libero.",
                  groupIds.details,
                ),
              },
            }}
            experienceableId={1}
            experienceableType="application"
            parentElement={modalParent}
            visible={isModalVisible}
            onModalConfirm={async (x) => {
              await sleep(2000);
              action("Confirmed")(x);
            }}
            onModalCancel={action("Cancelled")}
          />
        </div>
      </div>
    );
  },
);
stories.add(
  "Education Experience Modal",
  (): React.ReactElement => {
    const isModalVisible = boolean("Visible", true, groupIds.switches);
    const modalParent = document.querySelector("#modal-root");

    return (
      <div id="education-modal-container">
        <div
          id="education-modal-overlay"
          data-c-dialog-overlay={isModalVisible ? "active" : ""}
        />
        <div>
          <EducationExperienceModal
            modalId="education-experience-modal"
            experienceEducation={fakeExperienceEducation()}
            educationTypes={educationTypes}
            educationStatuses={educationStatuses}
            jobId={number("Job Id", 1, undefined, groupIds.details)}
            requiredSkills={requiredSkills}
            savedRequiredSkills={[requiredSkills[2], requiredSkills[3]]}
            optionalSkills={optionalSkills}
            savedOptionalSkills={[optionalSkills[0]]}
            experienceRequirments={{
              educationRequirement: {
                title: text(
                  "Education Requirment Title",
                  "2 Years Post-secondary",
                  groupIds.details,
                ),
                description: text(
                  "Education Requirment Description",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, officiis delectus excepturi voluptate laudantium omnis nesciunt consectetur eum sapiente aliquid ipsam obcaecati expedita odio id eligendi voluptatum. Consequuntur, quibusdam voluptates.",
                  groupIds.details,
                ),
              },
              equivalentRequirment: {
                title: text(
                  "Equivalent Experience requirment Title",
                  "Equivalent Experience",
                  groupIds.details,
                ),
                description: text(
                  "Equivalent Experience requirment Description",
                  "ELorem ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus animi consequatur dolorem voluptatum earum iure doloremque, facere est asperiores, dignissimos quae architecto vero unde vitae quis excepturi! Totam, libero.",
                  groupIds.details,
                ),
              },
            }}
            experienceableId={1}
            experienceableType="application"
            parentElement={modalParent}
            visible={isModalVisible}
            onModalConfirm={async (x) => {
              await sleep(2000);
              action("Confirmed")(x);
            }}
            onModalCancel={action("Cancelled")}
          />
        </div>
      </div>
    );
  },
);
stories.add(
  "Education Experience Modal (Creating new)",
  (): React.ReactElement => {
    const isModalVisible = boolean("Visible", true, groupIds.switches);
    const modalParent = document.querySelector("#modal-root");

    return (
      <div id="education-modal-container">
        <div
          id="education-modal-overlay"
          data-c-dialog-overlay={isModalVisible ? "active" : ""}
        />
        <div>
          <EducationExperienceModal
            modalId="education-experience-modal"
            experienceEducation={null}
            educationTypes={educationTypes}
            educationStatuses={educationStatuses}
            jobId={number("Job Id", 1, undefined, groupIds.details)}
            requiredSkills={requiredSkills}
            savedRequiredSkills={[requiredSkills[2], requiredSkills[3]]}
            optionalSkills={optionalSkills}
            savedOptionalSkills={[optionalSkills[0]]}
            experienceRequirments={{
              educationRequirement: {
                title: text(
                  "Education Requirment Title",
                  "2 Years Post-secondary",
                  groupIds.details,
                ),
                description: text(
                  "Education Requirment Description",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, officiis delectus excepturi voluptate laudantium omnis nesciunt consectetur eum sapiente aliquid ipsam obcaecati expedita odio id eligendi voluptatum. Consequuntur, quibusdam voluptates.",
                  groupIds.details,
                ),
              },
              equivalentRequirment: {
                title: text(
                  "Equivalent Experience requirment Title",
                  "Equivalent Experience",
                  groupIds.details,
                ),
                description: text(
                  "Equivalent Experience requirment Description",
                  "ELorem ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus animi consequatur dolorem voluptatum earum iure doloremque, facere est asperiores, dignissimos quae architecto vero unde vitae quis excepturi! Totam, libero.",
                  groupIds.details,
                ),
              },
            }}
            experienceableId={1}
            experienceableType="application"
            parentElement={modalParent}
            visible={isModalVisible}
            onModalConfirm={async (x) => {
              await sleep(2000);
              action("Confirmed")(x);
            }}
            onModalCancel={action("Cancelled")}
          />
        </div>
      </div>
    );
  },
);
stories.add(
  "Community Experience Modal",
  (): React.ReactElement => {
    const isModalVisible = boolean("Visible", true, groupIds.switches);
    const modalParent = document.querySelector("#modal-root");

    return (
      <div id="community-modal-container">
        <div
          id="community-modal-overlay"
          data-c-dialog-overlay={isModalVisible ? "active" : ""}
        />
        <div>
          <CommunityExperienceModal
            modalId="community-experience-modal"
            experienceCommunity={fakeExperienceCommunity()}
            jobId={number("Job Id", 1, undefined, groupIds.details)}
            requiredSkills={requiredSkills}
            savedRequiredSkills={[requiredSkills[2], requiredSkills[3]]}
            optionalSkills={optionalSkills}
            savedOptionalSkills={[optionalSkills[0]]}
            experienceRequirments={{
              educationRequirement: {
                title: text(
                  "Education Requirment Title",
                  "2 Years Post-secondary",
                  groupIds.details,
                ),
                description: text(
                  "Education Requirment Description",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, officiis delectus excepturi voluptate laudantium omnis nesciunt consectetur eum sapiente aliquid ipsam obcaecati expedita odio id eligendi voluptatum. Consequuntur, quibusdam voluptates.",
                  groupIds.details,
                ),
              },
              equivalentRequirment: {
                title: text(
                  "Equivalent Experience requirment Title",
                  "Equivalent Experience",
                  groupIds.details,
                ),
                description: text(
                  "Equivalent Experience requirment Description",
                  "ELorem ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus animi consequatur dolorem voluptatum earum iure doloremque, facere est asperiores, dignissimos quae architecto vero unde vitae quis excepturi! Totam, libero.",
                  groupIds.details,
                ),
              },
            }}
            experienceableId={1}
            experienceableType="application"
            parentElement={modalParent}
            visible={isModalVisible}
            onModalConfirm={async (x) => {
              await sleep(2000);
              action("Confirmed")(x);
            }}
            onModalCancel={action("Cancelled")}
          />
        </div>
      </div>
    );
  },
);
stories.add(
  "Personal Experience Modal",
  (): React.ReactElement => {
    const isModalVisible = boolean("Visible", true, groupIds.switches);
    const modalParent = document.querySelector("#modal-root");

    return (
      <div id="personal-modal-container">
        <div
          id="personal-modal-overlay"
          data-c-dialog-overlay={isModalVisible ? "active" : ""}
        />
        <div>
          <PersonalExperienceModal
            modalId="personal-experience-modal"
            experiencePersonal={fakeExperiencePersonal()}
            jobId={number("Job Id", 1, undefined, groupIds.details)}
            requiredSkills={requiredSkills}
            savedRequiredSkills={[requiredSkills[2], requiredSkills[3]]}
            optionalSkills={optionalSkills}
            savedOptionalSkills={[optionalSkills[0]]}
            experienceRequirments={{
              educationRequirement: {
                title: text(
                  "Education Requirment Title",
                  "2 Years Post-secondary",
                  groupIds.details,
                ),
                description: text(
                  "Education Requirment Description",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, officiis delectus excepturi voluptate laudantium omnis nesciunt consectetur eum sapiente aliquid ipsam obcaecati expedita odio id eligendi voluptatum. Consequuntur, quibusdam voluptates.",
                  groupIds.details,
                ),
              },
              equivalentRequirment: {
                title: text(
                  "Equivalent Experience requirment Title",
                  "Equivalent Experience",
                  groupIds.details,
                ),
                description: text(
                  "Equivalent Experience requirment Description",
                  "ELorem ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus animi consequatur dolorem voluptatum earum iure doloremque, facere est asperiores, dignissimos quae architecto vero unde vitae quis excepturi! Totam, libero.",
                  groupIds.details,
                ),
              },
            }}
            experienceableId={1}
            experienceableType="application"
            parentElement={modalParent}
            visible={isModalVisible}
            onModalConfirm={async (x) => {
              await sleep(2000);
              action("Confirmed")(x);
            }}
            onModalCancel={action("Cancelled")}
          />
        </div>
      </div>
    );
  },
);
stories.add(
  "Award Experience Modal",
  (): React.ReactElement => {
    const isModalVisible = boolean("Visible", true, groupIds.switches);
    const modalParent = document.querySelector("#modal-root");

    return (
      <div id="award-modal-container">
        <div
          id="award-modal-overlay"
          data-c-dialog-overlay={isModalVisible ? "active" : ""}
        />
        <div>
          <AwardExperienceModal
            modalId="award-experience-modal"
            experienceAward={fakeExperienceAward()}
            recipientTypes={recipientTypes}
            recognitionTypes={recogntitionTypes}
            jobId={number("Job Id", 1, undefined, groupIds.details)}
            requiredSkills={requiredSkills}
            savedRequiredSkills={[requiredSkills[2], requiredSkills[3]]}
            optionalSkills={optionalSkills}
            savedOptionalSkills={[optionalSkills[0]]}
            experienceRequirments={{
              educationRequirement: {
                title: text(
                  "Education Requirment Title",
                  "2 Years Post-secondary",
                  groupIds.details,
                ),
                description: text(
                  "Education Requirment Description",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, officiis delectus excepturi voluptate laudantium omnis nesciunt consectetur eum sapiente aliquid ipsam obcaecati expedita odio id eligendi voluptatum. Consequuntur, quibusdam voluptates.",
                  groupIds.details,
                ),
              },
              equivalentRequirment: {
                title: text(
                  "Equivalent Experience requirment Title",
                  "Equivalent Experience",
                  groupIds.details,
                ),
                description: text(
                  "Equivalent Experience requirment Description",
                  "ELorem ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus animi consequatur dolorem voluptatum earum iure doloremque, facere est asperiores, dignissimos quae architecto vero unde vitae quis excepturi! Totam, libero.",
                  groupIds.details,
                ),
              },
            }}
            experienceableId={1}
            experienceableType="application"
            parentElement={modalParent}
            visible={isModalVisible}
            onModalConfirm={async (x) => {
              await sleep(2000);
              action("Confirmed")(x);
            }}
            onModalCancel={action("Cancelled")}
          />
        </div>
      </div>
    );
  },
);
stories.add(
  "Award Experience Modal (New)",
  (): React.ReactElement => {
    const isModalVisible = boolean("Visible", true, groupIds.switches);
    const modalParent = document.querySelector("#modal-root");
    return (
      <div id="award-new-modal-container">
        <div
          id="award-new-modal-overlay"
          data-c-dialog-overlay={isModalVisible ? "active" : ""}
        />
        <div>
          <AwardExperienceModal
            modalId="award-new-experience-modal"
            experienceAward={null}
            recipientTypes={recipientTypes}
            recognitionTypes={recogntitionTypes}
            jobId={number("Job Id", 1, undefined, groupIds.details)}
            requiredSkills={requiredSkills}
            savedRequiredSkills={[requiredSkills[2], requiredSkills[3]]}
            optionalSkills={optionalSkills}
            savedOptionalSkills={[optionalSkills[0]]}
            experienceRequirments={{
              educationRequirement: {
                title: text(
                  "Education Requirment Title",
                  "2 Years Post-secondary",
                  groupIds.details,
                ),
                description: text(
                  "Education Requirment Description",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, officiis delectus excepturi voluptate laudantium omnis nesciunt consectetur eum sapiente aliquid ipsam obcaecati expedita odio id eligendi voluptatum. Consequuntur, quibusdam voluptates.",
                  groupIds.details,
                ),
              },
              equivalentRequirment: {
                title: text(
                  "Equivalent Experience requirment Title",
                  "Equivalent Experience",
                  groupIds.details,
                ),
                description: text(
                  "Equivalent Experience requirment Description",
                  "ELorem ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus animi consequatur dolorem voluptatum earum iure doloremque, facere est asperiores, dignissimos quae architecto vero unde vitae quis excepturi! Totam, libero.",
                  groupIds.details,
                ),
              },
            }}
            experienceableId={1}
            experienceableType="application"
            parentElement={modalParent}
            visible={isModalVisible}
            onModalConfirm={async (x) => {
              await sleep(2000);
              action("Confirmed")(x);
            }}
            onModalCancel={action("Cancelled")}
          />
        </div>
      </div>
    );
  },
);
