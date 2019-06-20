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

  // formik
  field?: any;
  form?: any;
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
  field,
  form: { errors, touched },
}): React.ReactElement => {
  const { name } = field;
  return (
    <div
      data-c-input="textarea"
      data-c-required={required}
      data-c-invalid={touched[field.name] && errors[field.name] ? true : null}
    >
      <label htmlFor={htmlId}>{label}</label>
      <span>Required</span>
      <div>
        <textarea
          data-c-font-weight="800"
          id={htmlId}
          name={name || formName}
          placeholder={placeholder}
          onChange={field.onChange || onChange}
          minLength={minLength}
          maxLength={maxLength}
          onBlur={field.onBlur || onBlur}
          // required
        >
          {value}
        </textarea>
      </div>
      <span>
        {(touched[field.name] && errors[field.name]) ||
          errorText ||
          "Something went wrong."}
      </span>
    </div>
  );
};

export default TextArea;
