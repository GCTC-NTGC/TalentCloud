import React from "react";

export interface RadioProps {
  /** HTML id of the input element */
  id: string;
  /** HTML name of the input element */
  name: string;
  /** Holds text for label associated with input element */
  label: string;
  /** boolean indicating if this radio is selected */
  checked?: boolean;
  /** The value of the input */
  value?: string | number | string[];
  /** Optional boolean to trigger a related context block. */
  trigger?: boolean;
  /** Event listener which fires when a change event occurs (varies on input type) */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Event listener which fires when a input loses focus */
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.FunctionComponent<RadioProps> = ({
  id,
  name,
  label,
  checked,
  value,
  trigger,
  onBlur,
  onChange,
}): React.ReactElement => {
  const clicked: boolean = id === value;
  return (
    <label
      data-tc-wenv-id={id}
      data-tc-wenv-trigger={trigger}
      className={clicked ? "active" : ""}
    >
      <input
        id={id}
        name={name}
        type="radio"
        checked={checked}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span>{label}</span>
    </label>
  );
};

export default Radio;
