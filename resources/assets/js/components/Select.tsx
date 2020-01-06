import React, { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { inputMessages } from "./Form/Messages";

export interface SelectOption {
  /** option value */
  value: string | number;
  /** option label */
  label: string;
}

export interface SelectProps {
  /** HTML id of the input element */
  id: string;
  /** HTML name of the input element */
  name: string;
  /** Holds text for label associated with input element */
  label: string | ReactElement;
  /** Boolean indicating if input must have a value, or not */
  required?: boolean;
  /** Boolean that sets the select input to invalid */
  invalid?: boolean | null;
  /** Selected string contains the default value of the select box */
  selected: string | number | null;
  /** Null selection string provides a null value with instructions to user (eg. Select a department...) */
  nullSelection?: string;
  /** A list of options for select element following the SelectOption structure */
  options: SelectOption[];
  /** Error text that appers underneath if error occurs (eg. required, ) */
  errorText?: string;
  /** The data-clone-grid-item value (refer to clone-framework docs for details) */
  grid?: string;
  /** Disables the element */
  disabled?: boolean;
  /** Event listener which fires when a change event occurs (varies on input type) */
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Event listener which fires when a input loses focus */
  onBlur?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FunctionComponent<SelectProps> = ({
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
  disabled,
  children,
}): React.ReactElement => (
  <div
    data-c-input="select"
    data-c-grid-item={grid}
    data-c-required={required || null}
    data-c-invalid={invalid || null}
  >
    <label htmlFor={id}>{label}</label>
    <span>
      <FormattedMessage {...inputMessages.required} />
    </span>
    <div>
      <i className="fa fa-caret-down" />
      <select
        id={id}
        name={name}
        value={selected !== null ? selected : ""}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        style={disabled ? { cursor: "not-allowed" } : {}}
      >
        {nullSelection && (
          <option value="" disabled>
            {nullSelection}
          </option>
        )}
        {options &&
          options.map(
            (option: SelectOption): React.ReactElement => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ),
          )}
        {children}
      </select>
    </div>
    <span>{errorText || <FormattedMessage {...inputMessages.error} />}</span>
  </div>
);

export default Select;
