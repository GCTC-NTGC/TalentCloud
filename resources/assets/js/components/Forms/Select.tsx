import React, { ReactElement } from "react";

export interface SelectOption<T extends string | number> {
  value: T;
  label: string;
}

export interface SelectProps<T extends string | number> {
  htmlId: string;
  formName: string;
  label: string | ReactElement;
  required: boolean;
  selected: T | null;
  nullSelection: string | undefined;
  options: SelectOption<T>[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  errorText?: string;
  grid?: string;

  // formik
  field?: any;
  form?: any;
}

export default function Select<T extends string | number>(
  props: SelectProps<T>,
): React.ReactElement<SelectProps<T>> {
  const {
    htmlId,
    formName,
    label,
    required,
    selected,
    nullSelection,
    options,
    onChange,
    errorText,
    grid,
    field,
    form: { errors },
  } = props;

  const { name } = field;

  return (
    <div
      data-c-input="select"
      data-c-grid-item={grid}
      data-c-required={required}
    >
      <label htmlFor={htmlId}>{label}</label>
      {required && <span>Required</span>}
      <div>
        <i className="fa fa-caret-down" />
        <select
          id={htmlId}
          name={name || formName}
          value={selected || ""}
          onChange={field.onChange || (e => onChange(e))}
        >
          {nullSelection && (
            <option value="" disabled>
              {nullSelection}
            </option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <span>{errors[name] || errorText || "This input has an error."}</span>
    </div>
  );
}
