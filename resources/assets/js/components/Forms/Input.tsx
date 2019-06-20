import React from "react";
import { FieldProps } from "formik";

export interface InputProps {
  /** HTML id of the input element */
  htmlId: string;
  /** HTML name of the input element */
  formName: string;
  /** Holds text for label associated with input element */
  label: string;
  /** boolean indicating if input must have a value, or not */
  required?: boolean;
  /** Let's you specify example text that appears in input element when empty */
  placeholder?: string;
  /** For type radio and checkbox; a boolean indicating if input is checked, or not */
  checked?: boolean;
  /** The input type */
  type?: string;
  /** The input type */
  inputType?: string;
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

  trigger?: boolean;

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

const Input: React.FunctionComponent<InputProps> = ({
  htmlId,
  formName,
  label,
  required,
  placeholder,
  checked,
  type,
  inputType,
  value,
  onChange,
  errorText,
  grid,
  minLength,
  maxLength,
  onBlur,
  trigger,
  field,
  form,
}): React.ReactElement => {
  function renderCheckbox(): React.ReactElement {
    return (
      <div data-c-grid-item={grid}>
        <label htmlFor={htmlId}>
          <input
            id={htmlId}
            name={(field && field.name) || formName}
            type="checkbox"
            checked={checked}
            value={value}
            onChange={(field && field.onChange) || onChange}
            onBlur={(field && field.onBlur) || onBlur}
            // required
          />
          <span>{label}</span>
        </label>
      </div>
    );
  }

  function renderRadio(): React.ReactElement {
    const clicked: boolean = htmlId === (field && field.value);
    return (
      <label
        htmlFor={htmlId}
        data-tc-wenv-id={htmlId}
        data-tc-wenv-trigger={trigger}
        className={clicked ? "active" : ""}
      >
        <input
          id={htmlId}
          name={(field && field.name) || formName}
          type="radio"
          checked={checked}
          value={value}
          onChange={(field && field.onChange) || onChange}
          onBlur={(field && field.onBlur) || onBlur}
          // required
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
        data-c-invalid={
          form && field && form.touched[field.name] && form.errors[field.name]
            ? true
            : null
        }
      >
        <label htmlFor={htmlId}>{label}</label>
        <span>Required</span>
        <div>
          <input
            id={htmlId}
            name={(field && field.name) || formName}
            placeholder={placeholder}
            type={type || "text"}
            value={(field && field.value) || value}
            minLength={minLength}
            maxLength={maxLength}
            onChange={(field && field.onChange) || onChange}
            onBlur={(field && field.onBlur) || onBlur}
            // required
          />
        </div>
        <span>
          {(form &&
            field &&
            form.touched[field.name] &&
            form.errors[field.name]) ||
            errorText ||
            "Something went wrong."}
        </span>
      </div>
    );
  }

  switch (inputType || type) {
    case "radio":
      return renderRadio();
    case "checkbox":
      return renderCheckbox();
    default:
      return renderText();
  }
};

export default Input;
