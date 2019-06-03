import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text } from "@storybook/addon-knobs";
import BreadCrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { crumbs } from "../../components/Breadcrumbs/fixtures/crumbs";

const stories = storiesOf("Breadcrumbs", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

console.log(crumbs);

stories.add(
  "Default Breadcrumbs",
  (): React.ReactElement => (
    <div
      data-c-padding="all(normal)"
      data-c-background={`${text("Background color", "black")}(${text(
        "Opacity",
        "100",
      )})`}
    >
      <BreadCrumbs crumbs={crumbs} fontColor={text("Font Color", "white")} />
    </div>
  ),
  {
    info: { inline: true },
  },
);
