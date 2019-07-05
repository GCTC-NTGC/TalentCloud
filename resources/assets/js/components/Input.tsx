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
  /** For type radio and checkbox; a boolean indicating if input is checked, or not */
  checked?: boolean;
  /** For type radio; a boolean that triggers the corresponding contextblock item */
  trigger?: boolean;
  /** The input type */
  type?: string;
  /** Minimum length of characters the text value can be */
  minLength?: number;
  /** Maximum length of characters the text value can be */
  maxLength?: number;
  /** The value of the input */
  value?: string | number;
  /** Error text that appers underneath if error occurs (eg. required, ) */
  errorText?: string;
  /** data-clone-grid-item value (refer to clone-framework docs for details) */
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
  checked,
  trigger,
  type,
  value,
  invalid,
  errorText,
  grid,
  minLength,
  maxLength,
  onBlur,
  onChange,
}): React.ReactElement => {
  function renderCheckbox(): React.ReactElement {
    return (
      <div data-c-grid-item={grid}>
        <label htmlFor={id}>
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
          <span>{label}</span>
        </label>
      </div>
    );
  }

  function renderRadio(): React.ReactElement {
    const clicked: boolean = id === value;
    return (
      <label
        htmlFor={id}
        /*
          data-tc-wenv-id and data-tc-wenv-trigger are needed for the ContextBlock components.
        */
        data-tc-wenv-id={id}
        data-tc-wenv-trigger={trigger}
        className={clicked ? "active" : ""}
      >
        <input
          id={id}
          name={name}
          type={type}
          checked={checked}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <span>{label}</span>
      </label>
    );
  }

  function renderText(): React.ReactElement {
    return (
      <div
        data-c-input={type || "text"}
        data-c-grid-item={grid}
        data-c-required={required}
        data-c-invalid={invalid}
      >
        <label htmlFor={id}>{label}</label>
        <span>
          <FormattedMessage {...inputMessages.required} />
        </span>
        <div>
          <input
            id={id}
            name={name}
            placeholder={placeholder}
            type={type || "text"}
            value={value}
            minLength={minLength}
            maxLength={maxLength}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
        <span>{errorText || "Something went wrong."}</span>
      </div>
    );
  }

  switch (type) {
    case "radio":
      return renderRadio();
    case "checkbox":
      return renderCheckbox();
    default:
      return renderText();
  }
};

export default Input;
