import * as React from "react";
import { FieldProps } from "formik";
import Input from "../Input";

interface RadioInputProps {
  /** HTML id of the input element */
  id: string;
  /** Holds text for label associated with input element */
  label: string;
  /** For type radio and checkbox; a boolean indicating if input is checked, or not */
  checked?: boolean;
  /** The value of the input */
  value?: string | number;
  /** Formik field prop of the shape { name, value, onChange, onBlur } */
  field: FieldProps["field"];
  /** For type radio; a boolean that triggers the corresponding contextblock item */
  trigger?: boolean;
}

const RadioInput: React.FunctionComponent<RadioInputProps> = ({
  id,
  label,
  checked,
  field: { name, onChange, onBlur },
  trigger,
}): React.ReactElement => {
  return (
    <Input
      id={id}
      name={name}
      type="radio"
      label={label}
      value={id}
      checked={checked}
      onChange={onChange}
      onBlur={onBlur}
      trigger
    />
  );
};

export default RadioInput;
