import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { select, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Alert from "../../components/H2Components/Alert";
import { colorOptions } from "./utils";

const stories = storiesOf("H2 Components/Alert", module).addDecorator(withIntl);

const positionOptions: { [key: string]: "toast" | "static" } = {
  toast: "toast",
  static: "static",
};

stories.add(
  "Toast Alert",
  (): React.ReactElement => (
    <section>
      <Alert
        color={select("color", colorOptions, "stop")}
        position={select("position", positionOptions, positionOptions.toast)}
        dismissBtn={
          <Alert.DismissBtn onClick={action("Dismiss")}>x</Alert.DismissBtn>
        }
        data-h2-radius="b(round)"
        data-h2-padding="b(all, .25)"
      >
        <Alert.Title>
          {text("title", "Oops! Something went wrong.")}
        </Alert.Title>
        <p>
          {text(
            "content",
            "Please note the information here before continuing.",
          )}
        </p>
      </Alert>
    </section>
  ),
);

stories.add(
  "Inline Alert",
  (): React.ReactElement => (
    <section>
      <Alert
        color={select("color", colorOptions, "slow")}
        position={select("position", positionOptions, positionOptions.static)}
        data-h2-radius="b(round)"
        data-h2-padding="b(all, .25)"
        dismissBtn={
          <Alert.DismissBtn onClick={action("Dismiss")}>x</Alert.DismissBtn>
        }
      >
        <Alert.Title>
          {text("title", "Oops! Something went wrong.")}
        </Alert.Title>
        <p>
          {text(
            "content",
            "Please note the information here before continuing.",
          )}
        </p>
      </Alert>
    </section>
  ),
);

stories.add(
  "Icon dismiss btn",
  (): React.ReactElement => (
    <section>
      <Alert
        color={select("color", colorOptions, "slow")}
        position={select("position", positionOptions, positionOptions.static)}
        data-h2-radius="b(round)"
        data-h2-padding="b(all, .25)"
        dismissBtn={
          <Alert.DismissBtn
            data-h2-padding="b(all, .25)"
            onClick={action("Dismiss")}
          >
            <span>
              <i
                data-h2-font-size="b(normal)"
                data-h2-font-color="b(stop)"
                className="fas fa-trash"
              />
            </span>
          </Alert.DismissBtn>
        }
      >
        <Alert.Title>
          {text("title", "Oops! Something went wrong.")}
        </Alert.Title>
        <p>
          {text(
            "content",
            "Please note the information here before continuing.",
          )}
        </p>
      </Alert>
    </section>
  ),
);

stories.add(
  "No title (overlaps with dismiss btn!)",
  (): React.ReactElement => (
    <section>
      <Alert
        color={select("color", colorOptions, "stop")}
        position={select("position", positionOptions, positionOptions.toast)}
        data-h2-radius="b(round)"
        data-h2-padding="b(all, .25)"
        dismissBtn={
          <Alert.DismissBtn onClick={action("Dismiss")}>x</Alert.DismissBtn>
        }
      >
        <p>
          {text(
            "content",
            "Please note the information here before continuing!",
          )}
        </p>
      </Alert>
    </section>
  ),
);

stories.add(
  "Only title (works fine)",
  (): React.ReactElement => (
    <section>
      <Alert
        color={select("color", colorOptions, "stop")}
        position={select("position", positionOptions, positionOptions.toast)}
        data-h2-radius="b(round)"
        data-h2-padding="b(all, .25)"
        dismissBtn={
          <Alert.DismissBtn onClick={action("Dismiss")}>x</Alert.DismissBtn>
        }
      >
        <Alert.Title>
          {text("title", "Oops! Something went wrong.")}
        </Alert.Title>
      </Alert>
    </section>
  ),
);

stories.add(
  "No Dismiss btn",
  (): React.ReactElement => (
    <section>
      <Alert
        color={select("color", colorOptions, "stop")}
        position={select("position", positionOptions, positionOptions.toast)}
        data-h2-radius="b(round)"
        data-h2-padding="b(all, .25)"
      >
        <Alert.Title>
          {text("title", "Oops! Something went wrong.")}
        </Alert.Title>
        <p>
          {text(
            "content",
            "Please note the information here before continuing.",
          )}
        </p>
      </Alert>
    </section>
  ),
);
