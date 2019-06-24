import React from "react";
import renderer from "react-test-renderer";
import Input from "./Input";

it("renders correctly", (): void => {
  const tree = renderer
    .create(
      <Input
        id="sample-input"
        name="name"
        label="label"
        required={false}
        placeholder="Write stuff"
        type="text"
        minLength={0}
        maxLength={30}
        value="Hello World"
        onChange={(): void => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
