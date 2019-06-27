import React from "react";
import { FieldProps } from "formik";
import Select from "./Select";

interface SelectInputProps {
  /** HTML ID of the input. */
  id: string;
  /** Text for the associated label of the input. */
  label: string;
  /** data-clone-grid-item value, see https:/;designwithclone.ca/#flexbox-grid. */
  grid: string;
  /** If this input is required for submission. */
  required: boolean;
  /** Selected string contains the default value of the select box */
  selected: string | number | null;
  /** Options that are rendered out within the input. */
  options: { label: string; value: string | number }[];
  /** Text for an empty selection. */
  nullSelection: string;
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
  nullSelection,
  field: { name, value, onChange, onBlur },
  form: { errors, touched },
}): React.ReactElement => {
  // TODO: find solution for ts error
  // @ts-ignore
  const errorText: string = errors[name] ? errors[name] : undefined;
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
      selected={value}
      onChange={onChange}
      onBlur={onBlur}
      errorText={errorText}
      invalid={invalid}
    />
  );
};

export default SelectInput;
