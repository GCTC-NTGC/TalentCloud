import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { useState } from "@storybook/addons";
import ErrorContainer, { ErrorContext } from "../components/ErrorContainer";
import ErrorToast from "../components/ErrorToast";

const stories = storiesOf("Components/Error Toast", module).addDecorator(
  withIntl,
);

stories.add("Error Toast", () => {
  const [counter, setCounter] = useState(1);
  return (
    <ErrorContainer>
      <ErrorToast />
      <ErrorContext.Consumer>
        {({ dispatch }) => {
          return (
            <button
              type="button"
              onClick={() => {
                dispatch({
                  type: "push",
                  payload: `Error #${counter} was just triggered! You're welcome!`,
                });
                setCounter((prev) => prev + 1);
              }}
            >
              Trigger an error!
            </button>
          );
        }}
      </ErrorContext.Consumer>
    </ErrorContainer>
  );
});
