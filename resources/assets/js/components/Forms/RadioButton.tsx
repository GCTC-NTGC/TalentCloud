import * as React from "react";

interface RadioButtonProps {
  htmlId: string;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  checked?: boolean;
  type?: string;
  minLength?: number;
  maxLength?: number;
  value?: string | number;
  errorText?: string;
  grid?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // formik
  field?: any;
  form?: any;

  // radio context id
  contextId?: string;
}

const RadioButton: React.FunctionComponent<RadioButtonProps> = ({
  htmlId,
  name,
  label,
  required,
  placeholder,
  checked,
  type,
  value,
  onChange,
  errorText,
  grid,
  minLength,
  maxLength,
  onBlur,
  field,
  form: { errors, touched },
  ...props
}): React.ReactElement => {
  return (
    <label htmlFor={htmlId}>
      <input
        data-c-font-weight="800"
        id={htmlId}
        name={field.name}
        type="radio"
        checked={htmlId === field.value}
        value={htmlId}
        onChange={field.onChange}
        onBlur={field.onBlur}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
};

export default RadioButton;
