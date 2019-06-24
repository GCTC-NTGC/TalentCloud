import React, { ReactElement } from "react";

export interface SelectOption<T extends string | number> {
  value: T;
  label: string;
}

export interface SelectProps<T extends string | number> {
  /** HTML id of the input element */
  id: string;
  /** HTML name of the input element */
  name: string;
  /** Holds text for label associated with input element */
  label: string | ReactElement;
  /** Boolean indicating if input must have a value, or not */
  required: boolean;
  /** Boolean that sets the select input to invalid */
  invalid?: boolean | null;
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
}

export default function Select<T extends string | number>(
  props: SelectProps<T>,
): React.ReactElement<SelectProps<T>> {
  const {
    id,
    name,
    label,
    required,
    invalid,
    selected,
    nullSelection,
    options,
    onChange,
    onBlur,
    errorText,
    grid,
    children,
  } = props;
  return (
    <div
      data-c-input="select"
      data-c-grid-item={grid}
      data-c-required={required}
      data-c-invalid={invalid}
    >
      <label htmlFor={id}>{label}</label>
      <span>Required</span>
      <div>
        <i className="fa fa-caret-down" />
        <select
          id={id}
          name={name}
          value={selected || ""}
          onChange={onChange}
          onBlur={onBlur}
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
      <span>{errorText || "This input has an error."}</span>
    </div>
  );
}
