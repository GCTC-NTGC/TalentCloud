import React from "react";
import { FormattedMessage } from "react-intl";
import { inputMessages } from "./Form/Messages";

export interface InputProps {
  /** HTML id of the input element */
  id: string;
  /** HTML name of the input element */
  name: string;
  /** Holds text for label associated with input element */
  label: string;
  /** boolean indicating if input must have a value, or not */
  required?: boolean;
  /** Boolean that sets the select input to invalid */
  invalid?: boolean | null;
  /** Let's you specify example text that appears in input element when empty */
  placeholder?: string;
  /**
   * The input type: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
   * Defaults to 'text'
   * */
  type?: string;
  /** Minimum length of characters the text value can be */
  minLength?: number;
  /** Maximum length of characters the text value can be */
  maxLength?: number;
  /** The value of the input */
  value?: string | number | string[];
  /** Error text that appers underneath if error occurs (eg. required) */
  errorText?: string;
  /** data-clone-grid-item value: https://designwithclone.ca/#flexbox-grid */
  grid?: string;
  /** Event listener which fires when a change event occurs (varies on input type) */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Event listener which fires when a input loses focus */
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FunctionComponent<InputProps> = ({
  id,
  name,
  label,
  required,
  placeholder,
  type,
  value,
  invalid,
  errorText,
  grid,
  minLength,
  maxLength,
  onBlur,
  onChange,
}): React.ReactElement => (
  <div
    data-c-input={type || "text"}
    data-c-grid-item={grid}
    data-c-required={required || null}
    data-c-invalid={invalid || null}
  >
    <label htmlFor={id}>{label}</label>
    <span>
      <FormattedMessage {...inputMessages.required} />
    </span>
    <div>
      <input
        id={id}
        name={name}
        required={required}
        placeholder={placeholder}
        type={type || "text"}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
    <span>{errorText || <FormattedMessage {...inputMessages.error} />}</span>
  </div>
);

export default Input;
