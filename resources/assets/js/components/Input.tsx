import React from "react";

export interface InputProps {
  htmlId: string;
  formName: string;
  label: string;
  required: boolean;
  placeholder: string;
  type?: string;
  minLength?: number;
  maxLength?: number;
  value: string;
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
  type,
  value,
  onChange,
  errorText,
  minLength,
  maxLength,
  onBlur,
}): React.ReactElement => {
  return (
    <div data-c-input={type || "text"}>
      <label htmlFor={htmlId}>{label}</label>
      {required && <span>Required</span>}
      <div>
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
      </div>
      <span>{errorText || "Something went wrong."}</span>
    </div>
  );
};

export default Input;
