import * as React from "react";
import { useIntl, defineMessages } from "react-intl";
import { h2ComponentAccordionAddTriggerEvent } from "@hydrogen-design-system/system/dist/import/latest/components/accordion/scripts/accordion";
import Button, { ButtonProps } from "./Button";

const messages = defineMessages({
  expand: {
    id: "hydrogen.accordion.expand",
    defaultMessage: "Click to view...",
    description: " Accessibility text for the accordion expand button.",
  },
});

interface AccordionContext {
  triggerIconPos?: "left" | "right";
}

const AccordionContext = React.createContext<AccordionContext>({});

const useAccordion = (): {} => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "This component must be used within a <Accordion> component.",
    );
  }
  return context;
};

interface BtnProps extends ButtonProps {
  addIcon?: React.ReactElement | string;
  removeIcon?: React.ReactElement | string;
}

const Btn: React.FunctionComponent<BtnProps> = (props) => {
  useAccordion();
  const { addIcon, removeIcon, styling, type, onClick, children } = props;
  const intl = useIntl();
  return (
    <Button
      styling={styling}
      type={type}
      aria-expanded="false"
      data-h2-accordion-trigger
      tabIndex={0}
      onClick={onClick}
      {...props}
    >
      <span data-h2-accordion-trigger-label>
        {intl.formatMessage(messages.expand)}
      </span>
      <span aria-hidden="true" data-h2-accordion-add-icon>
        {addIcon || <i className="fas fa-plus" />}
      </span>
      <span aria-hidden="true" data-h2-accordion-remove-icon>
        {removeIcon || <i className="fas fa-minus" />}
      </span>
      <div data-h2-accordion-trigger-content>{children}</div>
    </Button>
  );
};

const Content: React.FunctionComponent = (props) => {
  useAccordion();
  const { children } = props;
  return (
    <div aria-hidden="true" data-h2-accordion-content>
      {children}
    </div>
  );
};

interface AccordionComposition {
  Btn: React.FunctionComponent<BtnProps>;
  Content: React.FunctionComponent;
}

const Accordion: React.FunctionComponent<AccordionContext> &
  AccordionComposition = (props) => {
  const { triggerIconPos, children } = props;
  const ref = React.useRef(null);
  React.useEffect((): void => {
    h2ComponentAccordionAddTriggerEvent("latest", ref.current);
  });
  return (
    <AccordionContext.Provider value={props}>
      <div ref={ref} data-h2-accordion={triggerIconPos || "left"} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.Btn = Btn;
Accordion.Content = Content;

export default Accordion;
