import React from "react";
import { FieldProps, FormikActions, FormikErrors } from "formik";
import { FormattedMessage } from "react-intl";
import { inputMessages } from "./Messages";
import Select from "./Select";

interface SelectFormikProps {
  // HTML ID of the input.
  id: string;
  // Text for the associated label of the input.
  label: string;
  // data-clone-grid-item value, see https://designwithclone.ca/#flexbox-grid.
  grid: string;
  // If this input is required for submission.
  required: boolean;
  /** Selected string contains the default value of the select box */
  selected: string | number | null;
  // Options that are rendered out within the input.
  options: { label: string; value: string | number }[];
  // Text for an empty selection.
  nullSelection: string;
  // Formik field prop of the shape { name, value, onChange, onBlur }
  field: FieldProps["field"];
  // Formik form prop of the shape { errors }
  form: FieldProps["form"];
}

const SelectFormik: React.FunctionComponent<SelectFormikProps> = ({
  id,
  label,
  grid,
  required,
  options,
  selected,
  nullSelection,
  field: { name, value, onChange, onBlur },
  form: { errors, touched },
  ...props
}): React.ReactElement => {
  // TODO: find solution for ts error
  //@ts-ignore
  const errorText: string = errors[name] ? errors[name] : undefined;
  const invalid = touched[name] && errors[name] ? true : null;
  return (
    <Select
      id={id}
      label={label}
      name={name}
      nullSelection={nullSelection}
      selected={selected}
      options={options}
      grid={grid}
      onChange={onChange}
      onBlur={onBlur}
      errorText={errorText}
      required
      invalid={invalid}
    />
  );
};

export default SelectFormik;
