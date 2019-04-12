import React from "react";

export interface InputProps {
  htmlId: string;
  formName: string;
  label: string;
  required: boolean;
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
}): React.ReactElement => {
  return (
    <div data-c-input="text">
      <label htmlFor="TI2">{label}</label>
      {required && <span>Required</span>}
      <div>
        <input
          data-c-font-weight="800"
          id={htmlId}
          name={formName}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
      <span>This input has an error.</span>
    </div>
  );
};

export default Input;
