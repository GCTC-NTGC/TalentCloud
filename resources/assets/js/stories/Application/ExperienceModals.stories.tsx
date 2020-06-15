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
} from "../../fakeData/fakeExperience";
import {
  fakeSkill,
  fakeSkill2,
  fakeSkill3,
  fakeSkill4,
} from "../../fakeData/fakeSkills";
import EducationExperienceModal from "../../components/Application/ExperienceModals/EducationExperienceModal";
import CommunityExperienceModal from "../../components/Application/ExperienceModals/CommunityExperienceModal";

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

const educationTypes = [
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

const educationStatuses = [
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
            useAsEducationRequirement={boolean(
              "Use As Education Requirment",
              false,
              groupIds.details,
            )}
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
            modalId="work-experience-modal"
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
            useAsEducationRequirement={boolean(
              "Use As Education Requirment",
              false,
              groupIds.details,
            )}
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
            modalId="work-experience-modal"
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
            useAsEducationRequirement={boolean(
              "Use As Education Requirment",
              false,
              groupIds.details,
            )}
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
            modalId="work-experience-modal"
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
            useAsEducationRequirement={boolean(
              "Use As Education Requirment",
              false,
              groupIds.details,
            )}
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
