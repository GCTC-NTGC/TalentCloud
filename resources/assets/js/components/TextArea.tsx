import React from "react";
import { FormattedMessage } from "react-intl";
import { inputMessages } from "./Form/Messages";

export interface TextAreaProps {
  /** HTML id of the input element */
  id: string;
  /** HTML name of the input element */
  name: string;
  /** Holds text for label associated with input element */
  label: string;
  /** Custom class for the wrapper div */
  className?: string;
  /** boolean indicating if input must have a value, or not */
  required?: boolean;
  /** Boolean that sets the select input to invalid */
  invalid?: boolean | null;
  /** Let's you specify example text that appears in input element when empty */
  placeholder?: string;
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
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Event listener which fires when a input loses focus */
  onBlur?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FunctionComponent<TextAreaProps> = ({
  id,
  name,
  label,
  className,
  required,
  invalid,
  placeholder,
  value,
  errorText,
  grid,
  minLength,
  maxLength,
  onChange,
  onBlur,
}): React.ReactElement => (
  <div
    className={className}
    data-c-grid-item={grid}
    data-c-input="textarea"
    data-c-required={required || null}
    data-c-invalid={invalid || null}
  >
    <label htmlFor={id}>{label}</label>
    <span>
      <FormattedMessage {...inputMessages.required} />
    </span>
    <div>
      <textarea
        id={id}
        name={name}
        required={required}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </div>
    <span>{errorText || <FormattedMessage {...inputMessages.error} />}</span>
  </div>
);

export default TextArea;
