import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import CheckboxGroupField from "../components/Form/CheckboxGroupField";

const stories = storiesOf(
  "Form Components|CheckboxGroupField",
  module,
).addDecorator(withIntl);

const allBoxes = [
  { value: "one", label: "Box One" },
  { value: "two", label: "Box Two" },
  { value: "three", label: "Box Three" },
];
const initialValues = { numbers: ["one", "three"] };

stories.add(
  "Plain",
  (): React.ReactElement => {
    return (
      <div data-c-grid="gutter" data-c-padding="left(double)">
        <Formik initialValues={initialValues} onSubmit={action("Submitted")}>
          <Form>
            <div data-c-grid-item="base(1of1)">
              <CheckboxGroupField
                id="checkboxGroup"
                groupLabel={text("Group Label", "This is a checkbox group.")}
                grid={text("Grid styling", "base(1of2)")}
                name="numbers"
                allBoxes={allBoxes}
              />
            </div>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    );
  },
);

stories.add(
  "Required",
  (): React.ReactElement => {
    return (
      <div data-c-grid="gutter" data-c-padding="left(double)">
        <Formik initialValues={initialValues} onSubmit={action("Submitted")}>
          <Form>
            <div data-c-grid-item="base(1of1)">
              <CheckboxGroupField
                id="checkboxGroup"
                groupLabel={text("Group Label", "This is a checkbox group.")}
                grid={text("Grid styling", "base(1of2)")}
                name="numbers"
                allBoxes={allBoxes}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    );
  },
);

stories.add(
  "Validation",
  (): React.ReactElement => {
    const schema = Yup.object().shape({
      numbers: Yup.array()
        .of(Yup.string())
        .required("At least one box must be checked."),
    });
    return (
      <div data-c-grid="gutter" data-c-padding="left(double)">
        <Formik
          initialValues={{ numbers: [] }}
          onSubmit={action("Submitted")}
          validationSchema={schema}
        >
          <Form>
            <div data-c-grid-item="base(1of1)">
              <CheckboxGroupField
                id="checkboxGroup"
                groupLabel={text("Group Label", "This is a checkbox group.")}
                grid={text("Grid styling", "base(1of2)")}
                name="numbers"
                allBoxes={allBoxes}
                required
              />
            </div>
            <button type="submit" style={{ marginTop: "100rem" }}>
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    );
  },
);
