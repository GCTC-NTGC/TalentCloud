import * as React from "react";
import { useIntl, defineMessages } from "react-intl";
import { getFocusableElements } from "../../helpers/focus";
import { GeneralBtnProps } from "./utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

const messages = defineMessages({
  expand: {
    id: "hydrogen.accordion.expand",
    defaultMessage: "Click to view...",
    description: " Accessibility text for the accordion expand button.",
  },
});

interface AccordionContext extends DivProps {
  /** The accordions id. */
  id?: string;
  /** The state of the accordion (expanded or collapsed). */
  isExpanded?: boolean;
  /** The position of the open and close trigger element, which can be set to the left or right side of the accordion buttons content */
  triggerPos?: "left" | "right";
  /** Callback method for opening or closing accordion. */
  toggleAccordion?: () => void;
  /** If true, don't focus the accordion trigger when it closes. */
  overrideFocusRules?: boolean;
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
const useAccordionContext = (): AccordionContext => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "This component must be used within a <Accordion> component.",
    );
  }

  return context;
};

interface BtnProps extends GeneralBtnProps {
  /** The accordion add icon which can be a string or a react element. */
  addIcon?: React.ReactElement | string;
  /** The accordion remove icon which can be a string or a react element. */
  removeIcon?: React.ReactElement | string;
  /** Get access to the DOM element by passing a react ref.  */
  innerRef?: React.LegacyRef<HTMLButtonElement>;
}

const Btn: React.FunctionComponent<BtnProps> = ({
  addIcon,
  buttonStyling,
  removeIcon,
  innerRef,
  onClick,
  children,
  ...rest
}) => {
  const {
    isExpanded,
    toggleAccordion,
    overrideFocusRules,
  } = useAccordionContext(); // Ensures sub-component can only be used within the Accordion component.
  const intl = useIntl();
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  React.useEffect(() => {
    if (buttonRef.current && !isExpanded && !overrideFocusRules) {
      buttonRef.current.focus();
    }
  }, [buttonRef, isExpanded, overrideFocusRules]);
  return (
    <button
      aria-expanded={isExpanded}
      data-h2-accordion-trigger
      data-h2-button={buttonStyling}
      type="button"
      ref={innerRef || buttonRef}
      onClick={(e) => {
        if (toggleAccordion) toggleAccordion();
        if (onClick) onClick(e);
      }}
      {...rest}
    >
      <span aria-hidden="true" data-h2-accordion-trigger-label>
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

type ContentProps = DivProps;
const Content: React.FunctionComponent<ContentProps> = ({
  children,
  ...rest
}) => {
  const { isExpanded } = useAccordionContext(); // Ensures sub-component can only be used within the Accordion component.
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (contentRef.current && isExpanded) {
      const focusableElements = getFocusableElements(contentRef.current);
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [contentRef, isExpanded]);
  return (
    <div
      data-h2-visibility={!isExpanded ? "b(hidden)" : ""}
      aria-hidden={!isExpanded}
      data-h2-accordion-content
      ref={contentRef}
      {...rest}
    >
      {children}
    </div>
  );
};

interface AccordionComposition {
  Btn: React.FunctionComponent<BtnProps>;
  Content: React.FunctionComponent<ContentProps>;
}

const Accordion: React.FunctionComponent<AccordionContext> &
  AccordionComposition = (props) => {
  const {
    id,
    isExpanded = false,
    toggleAccordion,
    triggerPos,
    overrideFocusRules,
    children,
    ...rest
  } = props;
  const [expanded, setExpanded] = React.useState<boolean>(isExpanded);
  React.useEffect(() => {
    // Need to add this useEffect hook to ensure the state changes when the Accordion acts a controlled component.
    setExpanded(isExpanded);
  }, [isExpanded]);

  return (
    <AccordionContext.Provider
      value={{
        id,
        triggerPos,
        isExpanded: expanded,
        toggleAccordion: toggleAccordion || (() => setExpanded(!expanded)),
        overrideFocusRules,
      }}
    >
      <div
        data-h2-no-js
        id={id}
        data-h2-accordion={triggerPos || "left"}
        className={expanded ? "h2-active" : ""}
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
