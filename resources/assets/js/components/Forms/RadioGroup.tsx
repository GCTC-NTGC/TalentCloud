import * as React from "react";

interface RadioGroupProps {
  htmlId: string;
  label: string;
  required?: boolean;
  errorText?: string;
  grid?: string;
  children?: React.ReactNode;

  // formik
  touched?: boolean;
  error?: string;
  value?: string;
}

const RadioGroup: React.FunctionComponent<RadioGroupProps> = ({
  htmlId,
  label,
  required,
  grid,
  children,
  value,
  error,
  touched,
}): React.ReactElement => {
  const hasError = !!error && touched;
  return (
    <div
      data-c-grid-item={grid}
      data-c-input="radio"
      data-c-required={required}
      data-c-invalid={hasError ? true : null}
    >
      <label htmlFor={htmlId}>{label}</label>
      <span>Required</span>
      <div id={htmlId} role="radiogroup">
        {children}
      </div>
      <span>{error}</span>
    </div>
  );
};

export default RadioGroup;
