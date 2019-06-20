import * as React from "react";

interface RadioGroupProps {
  htmlId: string;
  label: string;
  required?: boolean;
  errorText?: string;
  grid?: string;
  children?: React.ReactNode;

  /** Formik prop "touched" - if the radio group has been clicked on touched is set to true, otherwise it is false. */
  touched?: boolean;
  /** Formik prop "error" - error message for radio group validation */
  error?: string;
}

const RadioGroup: React.FunctionComponent<RadioGroupProps> = ({
  htmlId,
  label,
  required,
  grid,
  children,
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
