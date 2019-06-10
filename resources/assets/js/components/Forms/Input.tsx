import React from "react";

export interface InputProps {
  htmlId: string;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  checked?: boolean;
  type?: string;
  inputType?: string;
  minLength?: number;
  maxLength?: number;
  value?: string | number;
  errorText?: string;
  grid?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // formik
  field?: any;
  form?: any;

  // radio context id
  contextId?: string;
  trigger?: boolean;
}

const Input: React.FunctionComponent<InputProps> = ({
  htmlId,
  name,
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
  field,
  form: { errors, touched },
  contextId,
  trigger,
}): React.ReactElement => {
  function renderCheckbox(): React.ReactElement {
    return (
      <div data-c-grid-item={grid}>
        <label htmlFor={htmlId}>
          <input
            id={htmlId}
            name={field.name || name}
            type="checkbox"
            checked={checked}
            value={value}
            onChange={field.onChange || onChange}
            onBlur={field.onBlur || onBlur}
            required={required}
          />
          <span>{label}</span>
        </label>
      </div>
    );
  }

  function renderRadio(): React.ReactElement {
    const clicked: boolean = htmlId === field.value;
    return (
      <label
        htmlFor={htmlId}
        data-tc-wenv-id={contextId}
        data-tc-wenv-trigger={trigger}
        className={clicked ? "active" : ""}
      >
        <input
          data-c-font-weight="800"
          id={htmlId}
          name={field.name}
          type="radio"
          checked={clicked}
          value={htmlId}
          onChange={field.onChange}
          onBlur={field.onBlur}
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
        data-c-invalid={touched[field.name] && errors[field.name] ? true : null}
      >
        <label htmlFor={htmlId}>{label}</label>
        {required && <span>Required</span>}
        <div>
          <input
            id={htmlId}
            name={field.name || name}
            placeholder={placeholder}
            type={type || "text"}
            value={field.value || value}
            onChange={field.onChange || onChange}
            minLength={minLength}
            maxLength={maxLength}
            onBlur={field.onBlur || onBlur}
          />
        </div>
        <span>
          {(touched[field.name] && errors[field.name]) ||
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
