import * as React from "react";
import {
  h2FormIndicateRequiredFields,
  h2FormValidationCheck,
  h2FormAccordionToggle,
  h2FormPasswordToggle,
} from "@hydrogen-design-system/system/dist/import/latest/components/forms/scripts/forms";

interface FormProps {
  /** Event handler that processes submit events. */
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FunctionComponent<FormProps> = ({
  onSubmit,
  children,
  ...rest
}) => {
  React.useEffect((): void => {
    h2FormIndicateRequiredFields("all");
    h2FormValidationCheck("all");
    h2FormAccordionToggle("all");
    h2FormPasswordToggle("all");
  });

  return (
    <form data-h2-form action="submit" onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
};

export default Form;
