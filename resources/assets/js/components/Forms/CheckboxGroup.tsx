import * as React from "react";

interface CheckboxGroupProps {
  id: string;
  label: string;
  grid?: string;
  required?: boolean;
  items?: [];
  children?: any;
  value: any;

  // formik
  field?: any;
  form?: any;
  error?: any;
  touched?: any;
  onChange: any;
  onBlur?: any;
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

  const handleBlur = () => {
    onBlur(id, true);
  };

  return (
    <div
      data-c-grid-item={grid}
      data-c-input="checkbox"
      data-c-required={required}
      data-c-invalid={touched && error ? true : null}
    >
      <label>{checkboxGroupLabel}</label>
      {required && <span>Required</span>}
      <div data-c-grid>
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            field: {
              value: value.includes(child.props.htmlId),
              onChange: handleChange,
              onBlur: handleBlur,
            },
            checked: value.includes(child.props.htmlId),
          });
        })}
      </div>
      <span>{touched && error}</span>
    </div>
  );
};

export default CheckboxGroup;
