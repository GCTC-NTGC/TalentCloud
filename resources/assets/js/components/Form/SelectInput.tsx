import React from "react";
import { FieldProps } from "formik";

interface SelectInputProps {
  // HTML ID of the input.
  id: string;
  // Text for the associated label of the input.
  label: string;
  // data-clone-grid-item value, see https://designwithclone.ca/#flexbox-grid.
  grid: string;
  // If this input is required for submission.
  required: boolean;
  // Options that are rendered out within the input.
  options: { label: string; value: string | number }[];
  // Text for an empty selection.
  nullSelection: string;
  // Formik field prop of the shape { name, value, onChange, onBlur }
  field: FieldProps["field"];
  // Formik form prop of the shape { errors }
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
  form: { errors },
  ...props
}): React.ReactElement => (
  <div
    data-c-grid-item={grid}
    data-c-input="select"
    data-c-required={required}
    data-c-invalid={errors[name] ? true : null}
  >
    <label htmlFor={id}>{label}</label>
    <span>Required</span>
    <div>
      <i className="fa fa-caret-down" />
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      >
        <option value="">{nullSelection}</option>
        {options.map(
          (option): React.ReactElement => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ),
        )}
      </select>
    </div>
    <span>{errors[name]}</span>
  </div>
);

export default SelectInput;
