import React from "react";
import { FieldProps } from "formik";

interface TextInputProps {
  // HTML ID of the input.
  id: string;
  // Text for the associated label of the input.
  label: string;
  // data-clone-grid-item value, see https://designwithclone.ca/#flexbox-grid.
  grid: string;
  // If this input is required for submission.
  required: boolean;
  // Type of text input, i.e. "text" or "email".
  type: string;
  // Placeholder to display within the input.
  placeholder: string;
  // Minimum amount of characters required by the input.
  minLength: number;
  // Maximum possible amount of characters in the input.
  maxLength: number;
  // Formik field prop of the shape { name, value, onChange, onBlur }
  field: FieldProps["field"];
  // Formik form prop of the shape { errors }
  form: FieldProps["form"];
}

const TextInput = ({
  id,
  label,
  grid,
  required,
  type,
  placeholder,
  minLength,
  maxLength,
  field: { name, value, onChange, onBlur },
  form: { errors },
  ...props
}): React.ReactElement => (
  <div
    data-c-grid-item={grid}
    data-c-input={type}
    data-c-required={required}
    data-c-invalid={errors[name] ? true : null}
  >
    <label htmlFor={id}>{label}</label>
    <span>Required</span>
    <div>
      <input
        data-c-font-weight="800"
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        onBlur={onBlur}
        {...props}
      />
    </div>
    <span>{errors[name]}</span>
  </div>
);

export default TextInput;
