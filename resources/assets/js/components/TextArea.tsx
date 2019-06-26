import React from "react";
import { FormattedMessage } from "react-intl";
import { inputMessages } from "./Form/Messages";

export interface TextAreaProps {
  htmlId: string;
  formName: string;
  label: string;
  required: boolean;
  invalid?: boolean | null;
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
  invalid,
  placeholder,
  value,
  onChange,
  errorText,
  minLength,
  maxLength,
  onBlur,
}): React.ReactElement => {
  return (
    <div
      data-c-input="textarea"
      data-c-required={required}
      data-c-invalid={invalid}
    >
      <label htmlFor={htmlId}>{label}</label>
      <span>
        <FormattedMessage {...inputMessages.required} />
      </span>
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
          value={value}
        />
      </div>
      <span>{errorText || "Something went wrong."}</span>
    </div>
  );
};

export default TextArea;
