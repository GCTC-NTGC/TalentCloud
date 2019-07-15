import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import Input from "./Input";

const renderWithReactIntl = (
  component: React.ReactElement,
): React.ReactElement => <IntlProvider locale="en">{component}</IntlProvider>;

const TextInput = (): React.ReactElement => (
  <Input
    id="sample-input"
    name="name"
    label="label"
    placeholder="Write stuff"
    type="text"
    minLength={0}
    maxLength={30}
    value="Hello World"
    onChange={(): void => {}}
  />
);

it.only("renders correctly", (): void => {
  const tree = renderer.create(renderWithReactIntl(<TextInput />)).toJSON();
  expect(tree).toMatchSnapshot();
});
