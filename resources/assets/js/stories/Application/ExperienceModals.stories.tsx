import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { select, text, number, boolean, array } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import WorkExperienceModal from "../../components/Application/ExperienceModals/WorkExperienceModal";
import { fakeExperienceWork } from "../../fakeData/fakeExperience";
import {
  fakeSkill,
  fakeSkill2,
  fakeSkill3,
  fakeSkill4,
} from "../../fakeData/fakeSkills";

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

stories.add(
  "Work Experience Modal",
  (): React.ReactElement => {
    const isModalVisible = boolean("Visible", true, groupIds.switches);
    const modalParent = document.querySelector("#modal-root");

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
