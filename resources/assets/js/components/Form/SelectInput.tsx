import React from "react";
import { FieldProps } from "formik";
import Select, { SelectProps } from "../Select";

interface SelectInputProps
  extends Exclude<SelectProps, "name" | "value" | "onChange" | "onBlur"> {
  /** Formik field prop of the shape { name, value, onChange, onBlur } */
  field: FieldProps["field"];
  /** Formik form prop of the shape { errors } */
  form: FieldProps["form"];
}

const SelectInput: React.FunctionComponent<SelectInputProps> = ({
  id,
  label,
  grid,
  required,
  options,
  disabled,
  nullSelection,
  field: { name, value, onChange, onBlur },
  form: { errors, touched },
}): React.ReactElement => {
  const specificError = errors ? errors[name] : null;
  const errorText = specificError ? specificError.toString() : undefined;
  const invalid = touched[name] && errors[name] ? true : null;

  return (
    <Select
      id={id}
      label={label}
      name={name}
      required={required}
      nullSelection={nullSelection}
      options={options}
      grid={grid}
      disabled={disabled}
      selected={value}
      onChange={onChange}
      onBlur={onBlur}
      errorText={errorText}
      invalid={invalid}
    />
  );
};

export default SelectInput;
