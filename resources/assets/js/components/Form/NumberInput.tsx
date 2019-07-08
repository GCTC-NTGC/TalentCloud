import * as React from "react";
import { FieldProps } from "formik";
import { FormattedMessage } from "react-intl";
import { inputMessages } from "./Messages";

interface NumberInputProps {
  /** HTML id of the input element */
  id: string;
  /** Holds text for label associated with input element */
  label: string;
  /** boolean indicating if input must have a value, or not */
  required?: boolean;
  /** Let's you specify example text that appears in input element when empty */
  placeholder?: string;
  /** Minimum value for the input */
  min?: number;
  /** Maximum value for the input */
  max?: number;
  /** data-clone-grid-item value: https://designwithclone.ca/#flexbox-grid */
  grid?: string;
  /** Formik field prop of the shape { name, value, onChange, onBlur } */
  field: FieldProps["field"];
  /** Formik form prop of the shape { errors, touched } */
  form: FieldProps["form"];
}

const NumberInput: React.FunctionComponent<NumberInputProps> = ({
  id,
  label,
  required,
  placeholder,
  min,
  max,
  grid,
  field: { name, value, onChange, onBlur },
  form: { errors, touched },
  ...props
}): React.ReactElement => {
  const specificError = errors ? errors[name] : null;
  const errorText = specificError ? specificError.toString() : undefined;
  const invalid = touched[name] && errors[name] ? true : null;

  return (
    <div
      data-c-input="number"
      data-c-grid-item={grid}
      data-c-required={required || null}
      data-c-invalid={invalid}
    >
      <label htmlFor={id}>{label}</label>
      <span>
        <FormattedMessage {...inputMessages.required} />
      </span>
      <div>
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          type="number"
          value={value || undefined}
          min={min}
          max={max}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
      </div>
      <span>{errorText || <FormattedMessage {...inputMessages.error} />}</span>
    </div>
  );
};

export default NumberInput;
