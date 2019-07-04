import * as React from "react";
import { FieldProps } from "formik";
import TextArea from "../TextArea";

interface TextAreaInputProps {
  /** HTML ID of the input. */
  id: string;
  /** Text for the associated label of the input. */
  label: string;
  /** data-clone-grid-item value, see https:/;designwithclone.ca/#flexbox-grid. */
  grid: string;
  /** If this input is required for submission. */
  required: boolean;
  /** Let's you specify example text that appears in input element when empty */
  placeholder?: string;
  /** Minimum length of characters the text value can be */
  minLength?: number;
  /** Maximum length of characters the text value can be */
  maxLength?: number;
  /** Formik field prop of the shape { name, value, onChange, onBlur } */
  field: FieldProps["field"];
  /** Formik form prop of the shape { errors } */
  form: FieldProps["form"];
}

const TextAreaInput: React.FunctionComponent<TextAreaInputProps> = ({
  id,
  label,
  required,
  placeholder,
  minLength,
  maxLength,
  field: { name, value, onChange, onBlur },
  form: { errors, touched },
}): React.ReactElement => {
  // TODO: find solution for ts error
  // @ts-ignore
  const errorText: string = errors[name] ? errors[name] : undefined;
  const invalid = touched[name] && errors[name] ? true : null;
  return (
    <TextArea
      htmlId={id}
      label={label}
      formName={name}
      required={required}
      invalid={invalid}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      errorText={errorText}
    />
  );
};

export default TextAreaInput;
