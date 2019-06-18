import React from "react";
import { FormikErrors, FormikTouched } from "formik";
import { FormattedMessage } from "react-intl";
import { inputMessages } from "./Messages";

interface RadioGroupProps {
  // HTML ID of the input.
  id: string;
  // Text for the associated label of the input.
  label: string;
  // data-clone-grid-item value, see https://designwithclone.ca/#flexbox-grid.
  grid: string;
  // If this input is required for submission.
  required: boolean;
  // Formatted JSX elements used to display information about the available options.
  info: React.ReactElement;
  // Error to display.
  error: string | FormikErrors<any> | undefined;
  // If this group has been affected by user input or a submission.
  touched: boolean | FormikTouched<any> | undefined;
  // Selected value from available options.
  value: any;
}

const RadioGroup: React.FunctionComponent<RadioGroupProps> = ({
  id,
  label,
  grid,
  required,
  info,
  error,
  touched,
  children,
}): React.ReactElement => {
  const hasError = !!error && touched;
  return (
    <div
      data-c-grid-item={grid}
      data-c-input="radio"
      data-c-required={required}
      data-c-invalid={hasError ? true : null}
    >
      {info}
      <label htmlFor={id}>{label}</label>
      <span>
        <FormattedMessage {...inputMessages.required} />
      </span>
      <div id={id} role="radiogroup">
        {children}
      </div>
      <span>{error}</span>
    </div>
  );
};

export default RadioGroup;
