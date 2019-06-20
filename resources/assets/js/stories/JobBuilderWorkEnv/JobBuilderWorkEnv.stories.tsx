import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import JobBuilderWorkEnv from "../../components/JobBuilderWorkEnv/JobBuilderWorkEnv";
import IntlContainer from "../../IntlContainer";
import WorkEnvForm from "../../components/JobBuilderWorkEnv/WorkEnvForm";
import WorkEnvModal from "../../components/JobBuilderWorkEnv/WorkEnvModal";

const stories = storiesOf("Job Builder - Work Environment", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

const langOptions = {
  English: "en",
  French: "fr",
};

stories
  .add(
    "Job Builder Body",
    (): React.ReactElement => (
      <IntlContainer
        locale={select("Language", langOptions, "en", "Lang-Group")}
      >
        <JobBuilderWorkEnv />
      </IntlContainer>
    ),
    {
      info: { inline: true },
    },
  )
  .add(
    "Work Environment Modal",
    (): React.ReactElement => {
      const isModalVisible = boolean("Visible", true);
      const modalParent = document.querySelector("#modal-root");
      return (
        <div id="modal-container">
          <WorkEnvModal
            modalConfirm={(): void => {
              console.log("Confirmed");
            }}
            modalCancel={(): void => {
              console.log("Cancelled");
            }}
            isVisible={isModalVisible}
            parentElement={modalParent}
            values={{
              physicalEnv: ["open_concept", "assigned_seating", "private"],
              technology: [
                "video_confrencing",
                "collaboration",
                "file_sharing",
              ],
              amenities: [
                "cafeteria_on_site",
                "walking_distances_resturants",
                "close_to_transit",
              ],
            }}
          />
        </div>
      );
    },
    {
      info: { inline: true },
    },
  );
