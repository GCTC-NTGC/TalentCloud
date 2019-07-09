import * as React from "react";
import { FormikActions } from "formik";
import { FormattedMessage } from "react-intl";
import { inputMessages } from "./Messages";

interface CheckboxGroupProps {
  /** HTML ID of the input. */
  id: string;
  /** Text for the associated label of the input. */
  label: string;
  /** data-clone-grid-item value, see https://designwithclone.ca/#flexbox-grid. */
  grid: string;
  /** If this input is required for submission. */
  required: boolean;
  /** Error to display. */
  error: undefined[] | undefined;
  /** If this group has been affected by user input or a submission. */
  touched: undefined[] | undefined;
  /** Array of all selected values */
  value: string[] | number[];
  /** Function which takes an id and value as arguments, and sets the field (id) to the value */
  onChange: FormikActions<any>["setFieldValue"];
  /** Function which takes an id and boolean value as arguments, and sets the field (id) to the boolean value */
  onBlur: FormikActions<any>["setFieldTouched"];
}

const CheckboxGroup: React.FunctionComponent<CheckboxGroupProps> = ({
  id,
  label: checkboxGroupLabel,
  grid,
  required,
  children,
  value,
  error,
  touched,
  onChange,
  onBlur,
}): React.ReactElement => {
  const handleChange = (event): void => {
    // Get target checkbox element
    const target = event.currentTarget;

    // if the target is checked push the "name" to the values array
    if (target.checked) {
      value.push(target.id);
    } else {
      // if the target is unchecked then filter out the "name" from the array
      value.splice(value.indexOf(target.id), 1);
    }

    onChange(id, value);
  };

  const handleBlur = (): void => {
    onBlur(id, true);
  };

  return (
    <div
      data-c-grid-item={grid}
      data-c-input="checkbox"
      data-c-required={required || null}
      data-c-invalid={touched && error ? true : null}
    >
      <label>{checkboxGroupLabel}</label>
      <span>
        <FormattedMessage {...inputMessages.required} />
      </span>
      <div data-c-grid>
        {React.Children.map(
          children,
          (child: React.ReactElement): React.ReactElement => {
            return React.cloneElement(child, {
              field: {
                value: value.includes(child.props.id),
                onChange: handleChange,
                onBlur: handleBlur,
              },
              checked: value.includes(child.props.id),
            });
          },
        )}
      </div>
      <span>{error}</span>
    </div>
  );
};

export default CheckboxGroup;
