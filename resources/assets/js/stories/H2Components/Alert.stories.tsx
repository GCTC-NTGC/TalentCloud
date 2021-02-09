import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { boolean, select, text } from "@storybook/addon-knobs";
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
        dismissBtn={<Alert.DismissBtn>x</Alert.DismissBtn>}
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
        dismissBtn={<Alert.DismissBtn>x</Alert.DismissBtn>}
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
          <Alert.DismissBtn data-h2-padding="b(all, .25)">
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
        dismissBtn={<Alert.DismissBtn>x</Alert.DismissBtn>}
      >
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
  "Bold title",
  (): React.ReactElement => (
    <section>
      <Alert
        color={select("color", colorOptions, "stop")}
        position={select("position", positionOptions, positionOptions.toast)}
        data-h2-radius="b(round)"
        data-h2-padding="b(all, .25)"
        dismissBtn={<Alert.DismissBtn>x</Alert.DismissBtn>}
      >
        <Alert.Title>
          <strong>{text("title", "Oops! Something went wrong.")}</strong>
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
  "Disabled Dismiss btn",
  (): React.ReactElement => (
    <section>
      <Alert
        color={select("color", colorOptions, "stop")}
        position={select("position", positionOptions, positionOptions.toast)}
        dismissBtn={
          <Alert.DismissBtn disabled={boolean("Dismiss disabled", true)}>
            x
          </Alert.DismissBtn>
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
