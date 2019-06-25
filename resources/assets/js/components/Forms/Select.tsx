import React, { ReactElement } from "react";
import { FieldProps } from "formik";

export interface SelectOption<T extends string | number> {
  value: T;
  label: string;
}

export interface SelectProps<T extends string | number> {
  /** HTML id of the input element */
  htmlId: string;
  /** HTML name of the input element */
  formName: string;
  /** Holds text for label associated with input element */
  label: string | ReactElement;
  /** Boolean indicating if input must have a value, or not */
  required: boolean;
  /** Selected string contains the default value of the select box */
  selected: T | null;
  /** Null selection string provides a null value with instructions to user (eg. Select a department...) */
  nullSelection: string | undefined;
  /** A list of options for select element following the SelectOption structure */
  options: SelectOption<T>[];
  /** Event listener which fires when a change event occurs (varies on input type) */
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Event listener which fires when a input loses focus */
  onBlur?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Error text that appers underneath if error occurs (eg. required, ) */
  errorText?: string;
  /** The data-clone-grid-item value (refer to clone-framework docs for details) */
  grid?: string;
  /** Children should inlcude one or more HTML <option> tag(s) */
  children?: React.ReactNode;

  /*
    Formik Props

    - The props below will be available only when using Formik library.
    - The <Field /> component passes in these to objects, containing useful props.

  */

  /** Formik field prop is an object which holds the following: OnChange, OnBlur, value, and name.
   * These props will take precedence over default Input props.
   */
  field?: FieldProps["field"];
  /** Formik form prop is an object which holds the following: errors and touched.
   * - errors: object which holds the all errors in the formik form, where the key is the name of the form element.
   * - touched: a boolean which is initially set to false, until the element gains focus.
   * These props will take precedence over the default Input props.
   */
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
      <span>Required</span>
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
