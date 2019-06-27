import * as React from "react";
import { FieldProps } from "formik";
import Input from "../Input";

interface TextInputProps {
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

const TextInput: React.FunctionComponent<TextInputProps> = ({
  id,
  label,
  required,
  placeholder,
  grid,
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
    <Input
      id={id}
      label={label}
      placeholder={placeholder}
      required={required}
      name={name}
      value={value}
      grid={grid}
      minLength={minLength}
      maxLength={maxLength}
      onChange={onChange}
      onBlur={onBlur}
      errorText={errorText}
      invalid={invalid}
    />
  );
};

export default TextInput;
