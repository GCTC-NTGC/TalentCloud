import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text } from "@storybook/addon-knobs";
import BreadcrumbsItem from "../../components/Breadcrumbs/BreadcrumbsItem";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { crumbs } from "../../components/Breadcrumbs/fixtures/crumbs";

const stories = storiesOf("Breadcrumbs", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add(
  "Breadcrumb Item",
  (): React.ReactElement => (
    <div
      data-c-padding="all(normal)"
      data-c-background={`${text("Background color", "black")}(${text(
        "Opacity",
        "100",
      )})`}
    >
      <Breadcrumbs fontColor={text("Font Color", "white")}>
        <BreadcrumbsItem {...crumbs[0]} />
      </Breadcrumbs>
    </div>
  ),
  {
    info: { inline: true },
  },
);
