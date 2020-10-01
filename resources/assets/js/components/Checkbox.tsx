import React from "react";
import { FormattedMessage } from "react-intl";
import { inputMessages } from "./Form/Messages";

export interface CheckboxProps {
  /** HTML id of the input element */
  id: string;
  /** HTML name of the input element */
  name: string;
  /** Holds text for label associated with input element */
  label: string;
  /** data-clone grid sizing value, see: https://designwithclone.ca/#flexbox-grid */
  grid?: string;
  /** boolean indicating if this radio is selected */
  checked?: boolean;
  /** The value of the input */
  value?: string | number | string[];
  /** boolean indicating if input must have a value, or not */
  required?: boolean;
  /** Error text that appers underneath if error occurs (eg. required) */
  errorText?: string;
  /** Boolean that sets the select input to invalid */
  invalid?: boolean | null;
  /** If true, returns component meant for checkbox group */
  checkboxGroup?: boolean;
  /** Creates a single checkbox with border */
  checkboxBorder?: boolean;
  /** Label for the single checkbox with a border */
  borderLabel?: string;
  /** Event listener which fires when a change event occurs (varies on input type) */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Event listener which fires when an input loses focus */
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  id,
  name,
  label,
  grid,
  checked,
  value,
  required,
  errorText,
  invalid,
  checkboxGroup,
  checkboxBorder,
  borderLabel,
  onBlur,
  onChange,
}): React.ReactElement => {
  return (
    <>
      {checkboxGroup ? (
        <div data-c-grid-item={grid}>
          <label>
            <input
              id={id}
              name={name}
              type="checkbox"
              checked={checked}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              required={required}
            />
            <span>{label}</span>
          </label>
        </div>
      ) : (
        <div
          data-c-input={checkboxBorder ? "checkbox(group)" : "checkbox(single)"}
          data-c-grid-item={grid}
          data-c-required={required || null}
          data-c-invalid={invalid || null}
        >
          {checkboxBorder && <label>{borderLabel}</label>}
          <span>
            <FormattedMessage {...inputMessages.required} />
          </span>
          <div>
            <label>
              <input
                id={id}
                name={name}
                type="checkbox"
                checked={checked}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
              />
              <span>{label}</span>
            </label>
          </div>
          <span>
            {errorText || <FormattedMessage {...inputMessages.error} />}
          </span>
        </div>
      )}
    </>
  );
};

export default Checkbox;
