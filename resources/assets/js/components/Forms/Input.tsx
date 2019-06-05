import React from "react";

export interface InputProps {
  htmlId: string;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  checked?: boolean;
  type?: string;
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
}

const Input: React.FunctionComponent<InputProps> = ({
  htmlId,
  name: htmlName,
  label,
  required,
  placeholder,
  checked,
  type,
  value,
  onChange,
  errorText,
  grid,
  minLength,
  maxLength,
  onBlur,
  field,
  form: { errors, touched },
}): React.ReactElement => {
  function renderCheckbox(): React.ReactElement {
    return (
      <label htmlFor={htmlId}>
        <input
          id={htmlId}
          name={field.name || name}
          type={type}
          checked={checked}
          value={value}
          onChange={field.onChange || onChange}
          onBlur={field.onBlur || onBlur}
          required
        />
        <span>{label}</span>
      </label>
    );
  }

  function renderRadio(): React.ReactElement {
    return (
      <label htmlFor={htmlId}>
        <input
          id={htmlId}
          name={htmlName}
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
        data-c-invalid={touched[field.name] && errors[field.name] ? true : null}
      >
        <label htmlFor={htmlId}>{label}</label>
        {required && <span>Required</span>}
        <div>
          <input
            id={htmlId}
            name={field.name || htmlName}
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
