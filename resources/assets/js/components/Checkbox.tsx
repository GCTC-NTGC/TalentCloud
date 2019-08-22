import React from "react";

export interface CheckboxProps {
  /** HTML id of the input element */
  id: string;
  /** HTML name of the input element */
  name: string;
  /** Holds text for label associated with input element */
  label: string;
  /** data-clone grid sizing value, see: https://designwithclone.ca/#flexbox-grid */
  grid?: string;
  /** boolean indicating if this radio is selected */
  checked?: boolean;
  /** The value of the input */
  value?: string | number | string[];
  /** Event listener which fires when a change event occurs (varies on input type) */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Event listener which fires when an input loses focus */
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  id,
  name,
  label,
  grid,
  checked,
  value,
  onBlur,
  onChange,
}): React.ReactElement => (
  <div data-c-grid-item={grid}>
    <label>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span>{label}</span>
    </label>
  </div>
);

export default Checkbox;
