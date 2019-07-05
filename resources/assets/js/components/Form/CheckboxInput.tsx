import * as React from "react";
import { FieldProps } from "formik";
import Input from "../Input";

interface CheckboxInputProps {
  /** HTML id of the input element */
  id: string;
  /** Holds text for label associated with input element */
  label: string;
  /** For type radio and checkbox; a boolean indicating if input is checked, or not */
  checked?: boolean;
  /** data-clone-grid-item value (refer to clone-framework docs for details) */
  grid?: string;
  /** Formik field prop of the shape { name, value, onChange, onBlur } */
  field: FieldProps["field"];
}

const CheckboxInput: React.FunctionComponent<CheckboxInputProps> = ({
  id,
  label,
  checked,
  grid,
  field: { name, value, onChange, onBlur },
}): React.ReactElement => {
  return (
    <Input
      id={id}
      name={name}
      type="checkbox"
      label={label}
      value={value}
      grid={grid}
      checked={checked}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default CheckboxInput;
