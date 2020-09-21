import { Field, useField } from "formik";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { focusOnElement } from "../../helpers/forms";
import { inputMessages } from "./Messages";

interface CheckboxGroupFieldProps {
  groupLabel: string;
  name: string;
  allBoxes: {
    value: string | number;
    label: string;
  }[];
  /** data-clone grid sizing value to be applied to individual boxes; see https://designwithclone.ca/#flexbox-grid */
  grid?: string;
  required?: boolean;
}

export const CheckboxGroupField: React.FC<CheckboxGroupFieldProps> = ({
  groupLabel,
  grid,
  name,
  allBoxes,
  required,
}) => {
  const [field, meta] = useField(name);
  const hasError = !!meta.error && meta.touched;
  useEffect(() => {
    if (hasError) {
      focusOnElement(`${allBoxes[0].value}`);
    }
  });
  return (
    <fieldset
      data-c-input="checkbox(group)"
      className="clone-checkbox-group"
      data-c-required={required || null}
      data-c-invalid={meta.touched && meta.error ? true : null}
    >
      <legend>{groupLabel}</legend>
      <span>
        <FormattedMessage {...inputMessages.required} />
      </span>
      <div data-c-grid>
        {allBoxes.map((box) => {
          return (
            <div key={box.value} data-c-grid-item={grid}>
              <label>
                <Field
                  id={box.value}
                  type="checkbox"
                  name={name}
                  value={box.value}
                />
                <span>{box.label}</span>
              </label>
            </div>
          );
        })}
      </div>
      <span>{meta.error}</span>
    </fieldset>
  );
};

export default CheckboxGroupField;
