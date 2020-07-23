import React, { useState } from "react";
import { FormikErrors, FormikTouched } from "formik";
import { FormattedMessage } from "react-intl";
import { inputMessages } from "./Messages";

interface RadioGroupProps {
  /** HTML ID of the input. */
  id: string;
  /** Text for the associated label of the input. */
  label: string;
  /** data-clone-grid-item value, see https://designwithclone.ca/#flexbox-grid. */
  grid: string;
  /** If this input is required for submission. */
  required: boolean;
  /** Error to display. */
  error: string | FormikErrors<any> | undefined;
  /** If this group has been affected by user input or a submission. */
  touched: boolean | FormikTouched<any> | undefined;
  /** The value set for the contained group of radio inputs */
  value: string | number | undefined;
}

const RadioGroup: React.FunctionComponent<RadioGroupProps> = ({
  id,
  label,
  grid,
  required,
  error,
  touched,
  children,
}): React.ReactElement => {
  // Add a temporary style when radiogroup is focused, until it's added to clone.
  const [focus, setFocus] = useState(false);
  const focusStyle = {
    boxShadow:
      "-3px -3px 0 #0a6cbc, 3px -3px 0 #0a6cbc, 3px 3px 0 #0a6cbc, -3px 3px 0 #0a6cbc",
    transition: "all .2s ease",
  };
  const hasError = !!error && touched;
  return (
    <div
      data-c-grid-item={grid}
      data-c-input="radio"
      data-c-required={required}
      data-c-invalid={hasError ? true : null}
    >
      <label htmlFor={id}>{label}</label>
      <span>
        <FormattedMessage {...inputMessages.required} />
      </span>
      <div
        id={id}
        role="radiogroup"
        onFocus={(): void => setFocus(true)}
        onBlur={(): void => setFocus(false)}
        style={focus && !!error ? focusStyle : {}}
      >
        {children}
      </div>
      <span>{error}</span>
    </div>
  );
};

export default RadioGroup;
