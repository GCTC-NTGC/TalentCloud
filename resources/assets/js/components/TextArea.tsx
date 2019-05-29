import React from "react";

export interface TextAreaProps {
  htmlId: string;
  formName: string;
  label: string;
  required: boolean;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  value: string;
  errorText?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FunctionComponent<TextAreaProps> = ({
  htmlId,
  formName,
  label,
  required,
  placeholder,
  value,
  onChange,
  errorText,
  minLength,
  maxLength,
  onBlur,
}): React.ReactElement => {
  return (
    <div data-c-input="textarea">
      <label htmlFor={htmlId}>{label}</label>
      {required && <span>Required</span>}
      <div>
        <textarea
          data-c-font-weight="800"
          id={htmlId}
          name={formName}
          placeholder={placeholder}
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
          onBlur={onBlur}
        >
          {value}
        </textarea>
      </div>
      <span>{errorText || "Something went wrong."}</span>
    </div>
  );
};

export default TextArea;
