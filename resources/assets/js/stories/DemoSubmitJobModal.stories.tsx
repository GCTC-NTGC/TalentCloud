import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import DemoSubmitJobModal from "../components/JobBuilder/Review/DemoSubmitJobModal";

const stories = storiesOf("Modals|DemoSubmitJobModal", module).addDecorator(
  withIntl,
);

stories.add(
  "Visible",
  (): React.ReactElement => {
    const isVisible = boolean("Is Visible", true);
    const modalParent = document.querySelector("#modal-root");
    return (
      <div id="modal-container">
        <div data-c-dialog-overlay={isVisible ? "active" : ""} />
        <DemoSubmitJobModal
          isVisible={isVisible}
          handleCancel={action("Handle Cancel")}
          parentElement={modalParent}
        />
      </div>
    );
  },
);
