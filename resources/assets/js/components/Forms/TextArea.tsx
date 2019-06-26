import React from "react";
import { injectIntl, InjectedIntlProps, defineMessages } from "react-intl";

const messages = defineMessages({
  requiredField: {
    id: "formField.required",
    defaultMessage: "Required",
    description: "Flag text for empty required field",
  },
  defaultErrorText: {
    id: "formField.error",
    defaultMessage: "Something went wrong",
    description: "Default flag for error message",
  },
});

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

const TextArea: React.FunctionComponent<TextAreaProps & InjectedIntlProps> = ({
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
  form,
  intl,
}): React.ReactElement => {
  return (
    <div
      data-c-input="textarea"
      data-c-required={required}
      data-c-invalid={
        form && field && form.touched[field.name] && form.errors[field.name]
          ? true
          : null
      }
    >
      <label htmlFor={htmlId}>{label}</label>
      <span>{intl.formatMessage(messages.requiredField)}</span>
      <div>
        <textarea
          id={htmlId}
          name={(field && field.name) || formName}
          placeholder={placeholder}
          value={(field && field.value) || value}
          minLength={minLength}
          maxLength={maxLength}
          onChange={(field && field.onChange) || onChange}
          onBlur={(field && field.onBlur) || onBlur}
        >
          {value}
        </textarea>
      </div>
      <span>
        {(form &&
          field &&
          form.touched[field.name] &&
          form.errors[field.name]) ||
          errorText ||
          intl.formatMessage(messages.defaultErrorText)}
      </span>
    </div>
  );
};

export default injectIntl(TextArea);
