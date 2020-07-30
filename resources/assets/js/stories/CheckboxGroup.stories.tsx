import React from "react";
import { storiesOf } from "@storybook/react";
import { text, array } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { Field, Formik } from "formik";
import CheckboxGroup from "../components/Form/CheckboxGroup";
import CheckboxInput from "../components/Form/CheckboxInput";

const stories = storiesOf("Form Components|CheckboxGroup", module).addDecorator(
  withIntl,
);

stories.add(
  "Plain",
  (): React.ReactElement => {
    const possibleValues = array("Checkbox options array", [
      "first",
      "second",
      "third",
    ]);
    const checkedValues = array("Checked values array", ["first", "second"]);
    return (
      <div data-c-grid="gutter" data-c-padding="left(double)">
        <Formik initialValues={checkedValues} onSubmit={action("Submitted")}>
          <CheckboxGroup
            id={text("Group ID", "input-group")}
            label={text("Label", "This is a checkbox group")}
            grid={text("Grid styling", "base(1of1) tl(1of3)")}
            error={text("Error", "")}
            touched={undefined}
            value={checkedValues}
            onChange={action("Contents changed")}
            onBlur={action("Lost focus")}
          >
            {possibleValues.map(
              (value): React.ReactElement => {
                return (
                  <Field
                    key={value}
                    id={value}
                    name={value}
                    label={`This checkbox has the value '${value}'`}
                    component={CheckboxInput}
                    grid="base(1of2)"
                  />
                );
              },
            )}
          </CheckboxGroup>
        </Formik>
      </div>
    );
  },
);
