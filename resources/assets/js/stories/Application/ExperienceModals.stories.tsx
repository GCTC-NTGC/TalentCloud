import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { select, text, number, boolean, date } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import BaseExperienceModal from "../../components/Application/ExperienceModals/BaseExperienceModal";

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
            id="base-experience-modal"
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
