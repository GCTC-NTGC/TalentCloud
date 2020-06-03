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
