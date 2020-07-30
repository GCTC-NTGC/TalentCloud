import React, { ReactElement } from "react";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import { inputMessages } from "./Form/Messages";
import WordCounter from "./WordCounter/WordCounter";
import SimpleWordCounter from "./WordCounter/SimpleWordCounter";

export interface TextAreaProps {
  /** HTML id of the input element */
  id: string;
  /** HTML name of the input element */
  name: string;
  /** Holds text for label associated with input element */
  label: string;
  /** Custom class for the wrapper div */
  className?: string;
  /** boolean indicating if input must have a value, or not */
  required?: boolean;
  /** Holds message for right hand side, after required warning */
  rightMessage?: string | ReactElement;
  /** Boolean that sets the select input to invalid */
  invalid?: boolean | null;
  /** Let's you specify example text that appears in input element when empty */
  placeholder?: string;
  /** Minimum length of characters the text value can be */
  minLength?: number;
  /** Maximum length of characters the text value can be */
  maxLength?: number;
  /** The value of the input */
  value?: string | number | string[];
  /** Error text that appers underneath if error occurs (eg. required) */
  errorText?: string;
  /** data-clone-grid-item value: https://designwithclone.ca/#flexbox-grid */
  grid?: string;
  /** Event listener which fires when a change event occurs (varies on input type) */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Event listener which fires when a input loses focus */
  onBlur?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** The maximum word count. If set, adds a word counter. */
  wordLimit?: number;
}

const messages = defineMessages({
  underLimit: {
    id: "textArea.wordsUnderLimit",
    defaultMessage: "words left",
    description:
      "Message displayed on word counter when user is under/matching the limit.",
  },
  overLimit: {
    id: "textArea.wordsOverLimit",
    defaultMessage: "words over limit",
    description:
      "Message displayed on word counter when user passes the limit.",
  },
});

const TextArea: React.FunctionComponent<TextAreaProps> = ({
  id,
  name,
  label,
  className,
  required,
  rightMessage,
  invalid,
  placeholder,
  value,
  errorText,
  grid,
  minLength,
  maxLength,
  onChange,
  onBlur,
  wordLimit,
}): React.ReactElement => {
  const intl = useIntl();
  const valueString = typeof value === "string" ? value : "";
  const wordCounter = wordLimit ? (
    <span data-c-color="black">
      <SimpleWordCounter
        wordLimit={wordLimit}
        value={valueString}
        absoluteValue
        beforeText="( "
        underMaxMessage={`${intl.formatMessage(messages.underLimit)} )`}
        overMaxMessage={`${intl.formatMessage(messages.overLimit)} )`}
      />
    </span>
  ) : null;

  return (
    <div
      className={className}
      data-c-grid-item={grid}
      data-c-input="textarea"
      data-c-required={required || null}
      data-c-invalid={invalid || null}
    >
      <label htmlFor={id}>{label}</label>
      {required && (
        <span>
          <FormattedMessage {...inputMessages.required} /> {rightMessage}
          {wordCounter}
        </span>
      )}
      {/** rightMessage and wordCounter are repeated because if this input is not required,
       *   the previous span will not appear - and it is required, they must be part of the
       *   previous span to appear in the right place.
       */}
      {!required && (
        <span style={{ display: "block" }}>
          {rightMessage}
          {wordCounter}
        </span>
      )}
      <div>
        <textarea
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
      </div>
      <span>{errorText || <FormattedMessage {...inputMessages.error} />}</span>
    </div>
  );
};

export default TextArea;
