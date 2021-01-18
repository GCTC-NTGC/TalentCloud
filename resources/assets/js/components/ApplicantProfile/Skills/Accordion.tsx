import React, { useEffect, ReactElement } from "react";
import { useIntl, defineMessages } from "react-intl";
import { h2ComponentAccordionAddTriggerEvent } from "@hydrogen-design-system/system/dist/import/latest/components/accordion/scripts/accordion";

const messages = defineMessages({
  expand: {
    id: "applicantProfile.skills.accordion.expand",
    defaultMessage: "Click to view...",
    description: " Accessibility text for the accordion expand button.",
  },
});

interface AccordionProps {
  title: ReactElement;
  subtitle?: ReactElement;
  badge?: ReactElement;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  subtitle,
  badge,
  children,
}) => {
  useEffect((): void => {
    h2ComponentAccordionAddTriggerEvent();
  }, []);

  const intl = useIntl();

  return (
    <div
      data-h2-accordion="right"
      data-h2-card="white,round"
      data-h2-margin="b(bottom, .25)"
      data-h2-padding="b(tb, .5) b(rl, 1)"
    >
      <button
        aria-expanded="false"
        data-h2-accordion-trigger
        type="button"
        tabIndex={0}
      >
        <span data-h2-accordion-trigger-label>
          {intl.formatMessage(messages.expand)}
        </span>
        <span
          aria-hidden="true"
          data-h2-accordion-add-icon
          data-h2-font-size="b(h4)"
          data-h2-font-color="b(theme-1)"
        >
          +
        </span>
        <span
          aria-hidden="true"
          data-h2-accordion-remove-icon
          data-h2-font-size="b(h4)"
          data-h2-font-color="b(theme-1)"
        >
          -
        </span>
        <div
          data-h2-accordion-trigger-content
          data-h2-grid="b(middle, contained, padded, .25)"
        >
          <div data-h2-grid-item="b(1of2)">
            <div data-h2-grid-content>{title}</div>
          </div>
          <div data-h2-grid-item="b(1of4)">
            {badge && <div data-h2-grid-content>{badge}</div>}
          </div>
          <div data-h2-grid-item="b(1of4)">
            {subtitle && <div data-h2-grid-content>{subtitle}</div>}
          </div>
        </div>
      </button>
      <div aria-hidden="true" data-h2-accordion-content>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
