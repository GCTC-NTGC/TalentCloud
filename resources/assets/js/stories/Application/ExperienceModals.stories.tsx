import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { select, text, number, boolean, array } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import BaseExperienceModal from "../../components/Application/ExperienceModals/BaseExperienceModal";
import WorkExperienceModal from "../../components/Application/ExperienceModals/WorkExperienceModal";

const stories = storiesOf("Application|Experience Modals", module).addDecorator(
  withIntl,
);

const groupIds = {
  type: "Experience Type",
  details: "Details",
  switches: "Switches",
};

const iconClassOptions = {
  education: "fa-book",
  work: "fa-briefcase",
  community: "fa-people-carry",
  personal: "fa-mountain",
  award: "fa-trophy",
};

stories.add(
  "Base Experience Modal",
  (): React.ReactElement => {
    const isModalVisible = boolean("Visible", true, groupIds.switches);
    const modalParent = document.querySelector("#modal-root");
    return (
      <div id="modal-container">
        <div
          id="modal-overlay"
          data-c-dialog-overlay={isModalVisible ? "active" : ""}
        />
        <div>
          <BaseExperienceModal
            modalId="base-experience-modal"
            title={text("Title", "Base Experience", groupIds.details)}
            iconClass={select(
              "Icon",
              iconClassOptions,
              "education",
              groupIds.type,
            )}
            jobId={number("Job Id", 1, undefined, groupIds.details)}
            description={text(
              "Description",
              "Got creds? Share your degree, certificates, online courses, a trade apprenticeship, licences or alternative credentials. If you've learned something from a recognized educational provider, include your experiences here.  (Learned something from your community or on your own? Share this as a 'Community Experience' or 'Personal Experience'.",
              groupIds.details,
            )}
            requiredSkills={array(
              "Required Skills",
              ["HTML", "React", "CSS", "Database Management", "Hacking"],
              ",",
              groupIds.details,
            )}
            savedRequiredSkills={array(
              "Saved Required Skills",
              ["HTML", "React", "Hacking"],
              ",",
              groupIds.details,
            )}
            optionalSkills={array(
              "Optional Skills",
              ["Networking", "Conflict Resolution", "Resilience"],
              ",",
              groupIds.details,
            )}
            savedOptionalSkills={array(
              "Saved Optional Skills",
              ["Resilience"],
              ",",
              groupIds.details,
            )}
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
            onModalConfirm={action("Confirmed")}
            onModalCancel={action("Cancelled")}
          />
        </div>
      </div>
    );
  },
);

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
            title={text("Title", "Add Work Experience", groupIds.details)}
            iconClass={select("Icon", iconClassOptions, "work", groupIds.type)}
            jobId={number("Job Id", 1, undefined, groupIds.details)}
            description={text(
              "Description",
              "Did work? Share your experiences gained from full-time positions, part-time positions, self-employment, fellowships or internships.  (Did some volunteering? Share this as a “Community Experience”.)",
              groupIds.details,
            )}
            requiredSkills={array(
              "Required Skills",
              ["HTML", "React", "CSS", "Database Management", "Hacking"],
              ",",
              groupIds.details,
            )}
            savedRequiredSkills={array(
              "Saved Required Skills",
              ["HTML", "React", "Hacking"],
              ",",
              groupIds.details,
            )}
            optionalSkills={array(
              "Optional Skills",
              ["Networking", "Conflict Resolution", "Resilience"],
              ",",
              groupIds.details,
            )}
            savedOptionalSkills={array(
              "Saved Optional Skills",
              ["Resilience"],
              ",",
              groupIds.details,
            )}
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
            onModalConfirm={action("Confirmed")}
            onModalCancel={action("Cancelled")}
          />
        </div>
      </div>
    );
  },
);
