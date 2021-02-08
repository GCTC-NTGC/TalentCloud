import * as React from "react";
import { useIntl, defineMessages } from "react-intl";
import { h2AccordionToggle } from "@hydrogen-design-system/system/dist/import/latest/components/accordion/scripts/accordion";
import { GeneralProps, GeneralBtnProps } from "./utils";

const messages = defineMessages({
  expand: {
    id: "hydrogen.accordion.expand",
    defaultMessage: "Click to view...",
    description: " Accessibility text for the accordion expand button.",
  },
});

interface AccordionContext extends GeneralProps {
  /** The position of the open and close trigger element, which can be set to the left or right side of the accordion buttons content */
  triggerPos?: "left" | "right";
}

const AccordionContext = React.createContext<AccordionContext | undefined>(
  undefined,
);

/**
 * This Context hook allows our child components to easily reach
 * into the Tabs context and get the pieces it needs.
 *
 * Bonus: it even makes sure the component is used within a
 * Accordion component!
 */
const useAccordionContext = (): {} => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "This component must be used within a <Accordion> component.",
    );
  }
  return context;
};

interface BtnProps extends GeneralProps, GeneralBtnProps {
  /** The accordion add icon which can be a string or a react element */
  addIcon?: React.ReactElement | string;
  /** The accordion remove icon which can be a string or a react element */
  removeIcon?: React.ReactElement | string;
  /** The standard css class attribute */
  className?: string;
}

const Btn: React.FunctionComponent<BtnProps> = (props) => {
  useAccordionContext(); // Ensures sub-component can only be used within the Accordion component.
  const {
    addIcon,
    removeIcon,
    buttonStyling,
    className,
    children,
    ...rest
  } = props;
  const intl = useIntl();
  return (
    <button
      data-h2-button={buttonStyling}
      type="button"
      aria-expanded="false"
      data-h2-accordion-trigger
      tabIndex={0}
      className={className}
      {...rest}
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
    </button>
  );
};

const Content: React.FunctionComponent<GeneralProps> = (props) => {
  useAccordionContext(); // Ensures sub-component can only be used within the Accordion component.
  const { className, children, ...rest } = props;
  return (
    <div
      aria-hidden="true"
      data-h2-accordion-content
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
};

interface AccordionComposition {
  Btn: React.FunctionComponent<BtnProps>;
  Content: React.FunctionComponent<GeneralProps>;
}

const Accordion: React.FunctionComponent<AccordionContext> &
  AccordionComposition = (props) => {
  const { triggerPos, className, children, ...rest } = props;
  const ref = React.useRef(null);
  React.useEffect((): void => {
    h2AccordionToggle(ref.current, "latest");
  });
  return (
    <AccordionContext.Provider value={props}>
      <div
        ref={ref}
        data-h2-accordion={triggerPos || "left"}
        className={className}
        {...rest}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// We expose the children components here, as properties.
// Using the dot notation we explicitly set the composition relationships,
// btw the Accordion component and its sub components.
Accordion.Btn = Btn;
Accordion.Content = Content;

export default Accordion;
