import React, { Component } from "react";
import _ from "lodash";
import Input, { InputProps } from "./Input";

export interface UpdatingInputProps extends InputProps {
  updateDelay?: number | null;
  handleSave: () => void;
}

export interface UpdatingInputState {
  updateDelay: number | null | undefined;
}

class UpdatingInput extends Component<UpdatingInputProps, UpdatingInputState> {
  public constructor(props) {
    super(props);

    const { updateDelay } = this.props;

    if (updateDelay) {
      const bounceDelay: number = updateDelay;
      this.state = {
        updateDelay: bounceDelay,
      };
      // Lodash's debounce doesn't work properly if imported
      // by itself... something to do with how it handles 'this'
      this.triggerSave = _.debounce(this.triggerSave, bounceDelay);
    }
  }

  public triggerSave(): void {
    const { value, minLength, handleSave } = this.props;
    if (value !== undefined) {
      if (value.toString().length > (minLength || 3)) {
        handleSave();
      }
    }
  }

  public render(): React.ReactElement {
    const {
      id,
      name,
      label,
      required,
      placeholder,
      type,
      value,
      onChange,
      errorText,
      handleSave,
      minLength,
      maxLength,
    } = this.props;
    return (
      <Input
        id={id}
        name={name}
        label={label}
        required={required}
        placeholder={placeholder}
        type={type}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          onChange(event);
          if (this.state) {
            const { updateDelay } = this.state;

            if (updateDelay) {
              this.triggerSave();
            }
          }
        }}
        onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.value.length > 0) handleSave();
        }}
        errorText={errorText}
      />
    );
  }
}

export default UpdatingInput;
