import * as React from "react";
import { defineMessages, useIntl } from "react-intl";
import { h2ComponentAccordionAddTriggerEvent } from "@hydrogen-design-system/system/dist/import/latest/components/accordion/scripts/accordion";
import { getLocale, localizeFieldNonNull } from "../helpers/localize";
import { Skill } from "../models/types";

const resultMessages = defineMessages({
  resultTitle: {
    id: "results.title",
    defaultMessage: "Results",
    description: "The message displayed before the number of results returned.",
  },
  resultEmpty: {
    id: "results.empty",
    defaultMessage: "Nothing found",
    description: "The message displayed if no results returned.",
  },
  resultAccordionExpand: {
    id: "results.accordion.expand",
    defaultMessage: "Click to view...",
    description: "The message displayed to expand the accordion.",
  },
  resultAccordionAdd: {
    id: "results.accordion.add",
    defaultMessage: "Add",
    description: "The label for the add button.",
  },
  resultAccordionAdded: {
    id: "results.accordion.added",
    defaultMessage: "Added!",
    description: "The message displayed if skill added.",
  },
});

interface SearchResultsProps {
  status: string;
  results: Array<Skill> | null;
}

interface SearchResultItemProps {
  item: {
    id: number;
    name: { en: string; fr: string };
    description: { en: string; fr: string };
    isChecked?: boolean;
  };
}

const SearchResultItem: React.FunctionComponent<SearchResultItemProps> = ({
  item,
}: SearchResultItemProps): React.ReactElement => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const [check, setCheck] = React.useState(item.isChecked);
  const [added, setAdded] = React.useState(false);

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
          {intl.formatMessage(resultMessages.resultAccordionExpand)}
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
        <div data-h2-accordion-trigger-content>
          <p>
            <span>{localizeFieldNonNull(locale, item, "name")}</span>
            {check === true && (
              <span data-h2-color="theme-1" data-h2-padding="b(left, 1)">
                <i className="fas fa-check" />
              </span>
            )}
          </p>
        </div>
      </button>
      <div aria-hidden="true" data-h2-accordion-content>
        <div data-h2-grid="b(middle, contained, padded, 0)">
          <div data-h2-grid-item="b(2of3)">
            <div data-h2-grid-content>
              <p data-h2-focus>
                {localizeFieldNonNull(locale, item, "description")}
              </p>
            </div>
          </div>
          <div data-h2-grid-item="b(1of3)" data-h2-align="b(right)">
            <div data-h2-grid-content data-h2-padding="b(right, 1)">
              {added !== true && check !== true && (
                <button
                  data-h2-button="gray-9, pill, medium, outline"
                  type="button"
                  onClick={() => {
                    setCheck(true);
                    setAdded(true);
                  }}
                >
                  <span data-h2-button-label>
                    {intl.formatMessage(resultMessages.resultAccordionAdd)}
                  </span>
                </button>
              )}
              {added === true && (
                <p data-h2-padding="b(all, .5)" data-h2-font-weight="b(600)">
                  {intl.formatMessage(resultMessages.resultAccordionAdded)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SearchResults: React.FunctionComponent<SearchResultsProps> = ({
  status,
  results,
}: SearchResultsProps): React.ReactElement => {
  const intl = useIntl();
  React.useEffect((): void => {
    h2ComponentAccordionAddTriggerEvent();
  }, [results]);

  return (
    <div data-h2-grid="b(middle, contained, padded, .25)">
      <div data-h2-grid-item="b(1of1)">
        <div data-h2-grid-content>
          <div data-h2-padding="b(bottom, .5)">
            <p>
              {results && results.length === 0 && status === "submitted" && (
                <span>{intl.formatMessage(resultMessages.resultEmpty)}</span>
              )}
              {results && results.length !== 0 && status === "submitted" && (
                <span>
                  {intl.formatMessage(resultMessages.resultTitle)}:{" "}
                  {results.length}
                </span>
              )}
            </p>
          </div>
          <div>
            {results &&
              results.length !== 0 &&
              results.map(
                (item: {
                  id: number;
                  name: { en: string; fr: string };
                  description: { en: string; fr: string };
                  isChecked?: boolean;
                }) => <SearchResultItem key={item.id} item={item} />,
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
