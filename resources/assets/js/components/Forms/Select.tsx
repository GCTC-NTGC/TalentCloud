import React, { ReactElement } from "react";
import { FieldProps } from "formik";

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
  onBlur?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  errorText?: string;
  grid?: string;
  children?: React.ReactNode;
  defaultValue?: string;

  // formik
  field?: FieldProps["field"];
  form?: FieldProps["form"];
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
    onBlur,
    errorText,
    grid,
    field,
    form,
    children,
  } = props;
  return (
    <div
      data-c-input="select"
      data-c-grid-item={grid}
      data-c-required={required}
      data-c-invalid={
        field && form && form.touched[field.name] && form.errors[field.name]
          ? true
          : null
      }
    >
      <label htmlFor={htmlId}>{label}</label>
      {required && <span>Required</span>}
      <div>
        <i className="fa fa-caret-down" />
        <select
          id={htmlId}
          name={(field && field.name) || formName}
          value={selected || ""}
          onChange={(field && field.onChange) || onChange}
          onBlur={(field && field.onBlur) || onBlur}
        >
          {nullSelection && (
            <option value="" disabled>
              {nullSelection}
            </option>
          )}
          {options &&
            options.map(
              (option): React.ReactElement => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ),
            )}
          {children}
        </select>
      </div>
      <span>
        {(form &&
          field &&
          form.touched[field.name] &&
          form.errors[field.name]) ||
          errorText ||
          "This input has an error."}
      </span>
    </div>
  );
}
