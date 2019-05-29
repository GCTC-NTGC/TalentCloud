import React, { Component } from "react";
import _ from "lodash";
// Lodash's debounce doesn't work properly if imported
// by itself... something to do with how it handles 'this'
import TextArea, { TextAreaProps } from "./TextArea";

export interface UpdatingTextAreaProps extends TextAreaProps {
  updateDelay?: number | null;
  handleSave: () => void;
}

export interface UpdatingTextAreaState {
  updateDelay: number | null | undefined;
}

class UpdatingTextArea extends Component<UpdatingTextAreaProps, UpdatingTextAreaState> {
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
      value,
      onChange,
      errorText,
      handleSave,
      minLength,
      maxLength,
    } = this.props;
    return (
      <TextArea
        htmlId={htmlId}
        formName={formName}
        label={label}
        required={required}
        placeholder={placeholder}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
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

export default UpdatingTextArea;
