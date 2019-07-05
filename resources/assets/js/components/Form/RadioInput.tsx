import * as React from "react";
import { FieldProps } from "formik";
import Radio, { RadioProps } from "../Radio";

interface RadioInputProps extends RadioProps {
  /** Formik field prop of the shape { name, value, onChange, onBlur } */
  field: FieldProps["field"];
}

const RadioInput: React.FunctionComponent<RadioInputProps> = ({
  id,
  label,
  field: { name, value, onChange, onBlur },
}): React.ReactElement => {
  return (
    <Radio
      id={id}
      name={name}
      label={label}
      value={id}
      checked={id === value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default RadioInput;
