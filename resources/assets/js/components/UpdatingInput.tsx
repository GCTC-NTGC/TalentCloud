import React, { Component } from "react";
import _ from "lodash";
// Lodash's debounce doesn't work properly if imported
// by itself... something to do with how it handles 'this'
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
      this.state = {
        updateDelay,
      };

      const { updateDelay: bounceDelay } = this.state;
      // Lodash's debounce doesn't work properly if imported
      // by itself... something to do with how it handles 'this'
      this.triggerSave = _.debounce(this.triggerSave, bounceDelay);
    }
  }

  public triggerSave(): void {
    const { value, minLength, handleSave } = this.props;
    if (value.length > (minLength || 3) || value.length === 0) {
      handleSave();
    }
  }

  public render(): React.ReactElement {
    const {
      htmlId,
      formName,
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
        htmlId={htmlId}
        formName={formName}
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
        onBlur={handleSave}
        errorText={errorText}
      />
    );
  }
}

export default UpdatingInput;
