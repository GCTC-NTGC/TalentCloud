import * as React from "react";
import { useIntl } from "react-intl";
import { FieldName, FieldValues, RegisterOptions } from "react-hook-form";
import { GeneralProps } from "./utils";
import { inputMessages } from "../Form/Messages";

interface SelectContext extends GeneralProps {
  /** Additional information displayed under the input */
  additionalInfo?: string;
  /** The default value of the select input when it is rendered. */
  defaultValue?: string | number;
  /** The error message displayed if the form validation fails. */
  errorMessage?: string;
  /** The text for label associated with select input. */
  label: string;
  /** A string specifying a name for the input control. This name is submitted along with the control's value when the form data is submitted. */
  name: string;
  /** Provides a null value with instructions to user (eg. Select one of the following...). */
  nullSelection?: string;
  /** Supplementary information about the purpose of the select input. */
  supplementaryInfo?: string;
  /** Boolean indicating if input must have a value, or not */
  required?: boolean;
  /** Event listener which fires when a change event occurs (varies on input type) */
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  /** This method allows you to register an input/select Ref and apply validation rules into React Hook Form. https://react-hook-form.com/api#register */
  register?: (name: FieldName<FieldValues>, rules?: RegisterOptions) => void;
}

const SelectContext = React.createContext<SelectContext | undefined>(undefined);

/**
 * This Context hook allows our child components to easily reach
 * into the Tabs context and get the pieces it needs.
 *
 * Bonus: it even makes sure the component is used within a
 * Select component!
 */
const useSelectContext = (): Partial<SelectContext> => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("This component must be used within a <Select> component.");
  }
  return context;
};

interface OptionProps {
  /** option value */
  value: string | number;
}

const Option: React.FunctionComponent<OptionProps> = ({ value, children }) => {
  useSelectContext(); // Ensures sub-component can only be used within the Option component.
  return <option value={value}>{children}</option>;
};

interface SelectComposition {
  Option: React.FunctionComponent<OptionProps>;
}

const Select: React.FunctionComponent<SelectContext> & SelectComposition = (
  props,
) => {
  const intl = useIntl();
  const {
    additionalInfo,
    defaultValue,
    errorMessage,
    label,
    name,
    nullSelection,
    register,
    required,
    supplementaryInfo,
    onChange,
    children,
    ...rest
  } = props;
  return (
    // The select context provider doesn't provide any props to its children (Option),
    // however it does ensure the Option component can only be used within a Select component.
    <SelectContext.Provider value={props}>
      <div data-h2-form-item="select" {...rest}>
        <div data-h2-input-title-wrapper>
          <div data-h2-input-label-wrapper>
            <label data-h2-input-label htmlFor="selectInput">
              {label}
            </label>
          </div>
          <div data-h2-input-data-wrapper>
            <span data-h2-input-required>
              ({intl.formatMessage(inputMessages.required)})
            </span>
            <span data-h2-input-optional>
              ({intl.formatMessage(inputMessages.optional)})
            </span>
            <span data-h2-input-data>{supplementaryInfo}</span>
          </div>
        </div>
        <div data-h2-input-wrapper>
          <span data-h2-input-select-icon>▼</span>
          <select
            name={name}
            ref={register}
            data-h2-input
            id="selectInput"
            required={required}
            onChange={onChange}
            defaultValue={defaultValue}
          >
            {nullSelection ? (
              <option value="" disabled>
                {nullSelection}
              </option>
            ) : (
              <option value="" disabled>
                {intl.formatMessage(inputMessages.nullSelectOption)}
              </option>
            )}
            {children}
          </select>
        </div>
        <div data-h2-input-context-wrapper>
          <div data-h2-input-error-wrapper>
            <span data-h2-input-error>{errorMessage}</span>
          </div>
          <div data-h2-input-info-trigger-wrapper>
            {additionalInfo && (
              <button
                aria-expanded="false"
                data-h2-input-info-trigger
                type="button"
              >
                <span data-h2-input-info-trigger-more-label>
                  {intl.formatMessage(inputMessages.moreInfo)}
                </span>
                <span data-h2-input-info-trigger-less-label>
                  {intl.formatMessage(inputMessages.lessInfo)}
                </span>{" "}
                {intl.formatMessage(inputMessages.info)}
              </button>
            )}
          </div>
        </div>
        <div aria-hidden="true" data-h2-input-info-wrapper>
          <p data-h2-focus>{additionalInfo}</p>
        </div>
      </div>
    </SelectContext.Provider>
  );
};

// We expose the children components here, as properties.
// Using the dot notation we explicitly set the composition relationships,
// btw the Dialog component and its sub components.
Select.Option = Option;

export default Select;
