import { Field, useField } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";
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
  return (
    <div
      data-c-input="checkbox(group)"
      data-c-required={required || null}
      data-c-invalid={meta.touched && meta.error ? true : null}
      role="group"
      aria-labelledby="checkbox-group"
    >
      <label>{groupLabel}</label>
      <span>
        <FormattedMessage {...inputMessages.required} />
      </span>
      <div data-c-grid>
        {allBoxes.map((box) => {
          return (
            <div data-c-grid-item={grid}>
              <label>
                <Field type="checkbox" name={name} value={box.value} />
                <span>{box.label}</span>
              </label>
            </div>
          );
        })}
      </div>
      <span>{meta.error}</span>
    </div>
  );
};

export default CheckboxGroupField;
