import React from "react";

export interface InputProps {
  htmlId: string;
  formName: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  checked?: boolean;
  type?: string;
  minLength?: number;
  maxLength?: number;
  value?: string | number;
  errorText?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FunctionComponent<InputProps> = ({
  htmlId,
  formName,
  label,
  required,
  placeholder,
  checked,
  type,
  value,
  onChange,
  errorText,
  minLength,
  maxLength,
  onBlur,
}): React.ReactElement => {
  function renderRadio(): React.ReactElement {
    return (
      <label htmlFor={htmlId}>
        <input
          id={htmlId}
          name={formName}
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
      <div data-c-input={type || "text"}>
        <label htmlFor={htmlId}>{label}</label>
        {required && <span>Required</span>}
        <input
          data-c-font-weight="800"
          id={htmlId}
          name={formName}
          placeholder={placeholder}
          type={type || "text"}
          value={value}
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
          onBlur={onBlur}
        />
        <span>{errorText || "Something went wrong."}</span>
      </div>
    );
  }
  if (type === "radio") {
    return renderRadio();
  }
  return renderText();
};

export default Input;
