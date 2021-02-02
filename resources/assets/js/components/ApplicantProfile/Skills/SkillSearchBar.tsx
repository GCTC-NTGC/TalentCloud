import * as React from "react";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { useIntl, defineMessages } from "react-intl";
import { validationMessages } from "../../Form/Messages";
import { getLocale } from "../../../helpers/localize";
import TextInput from "../../Form/TextInput";
import { Skill } from "../../../models/types";

const formMessages = defineMessages({
  searchLabel: {
    id: "searchBar.search.label",
    defaultMessage: "Search for skills by name:",
    description: "The label displayed for the search input field.",
  },
  searchPlaceholder: {
    id: "searchBar.search.placeholder",
    defaultMessage: "eg. User interface design.",
    description: "The placeholder displayed for the search input field.",
  },
  searchButtonText: {
    id: "searchBar.search.buttonText",
    defaultMessage: "Search",
    description: "The placeholder displayed for the search button text.",
  },
});

interface SearchBarProps {
  inputTitle: string;
  submitButton?: React.ReactElement;
  handleSubmit: (locale: string, searchQuery: string) => Promise<Skill[]>;
}

interface SearchBarValues {
  search: string;
}

export const SearchBar: React.FunctionComponent<SearchBarProps> = ({
  inputTitle,
  submitButton,
  handleSubmit,
}: SearchBarProps): React.ReactElement => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const initialValues: SearchBarValues = {
    search: "",
  };
  const validationSchema = Yup.object().shape({
    search: Yup.string()
      .required(intl.formatMessage(validationMessages.required))
      .min(2),
  });

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          await handleSubmit(locale, values.search)
            .then(() => {
              setStatus("submitted");
              setSubmitting(false);
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ status, isSubmitting }): React.ReactElement => (
          <Form>
            <div data-h2-grid="b(middle, contained, padded, .5)">
              <div data-h2-grid-item="b(6of7)">
                <div data-h2-grid-content>
                  <FastField
                    id="search_form_input"
                    type="search"
                    name="search"
                    component={TextInput}
                    label={intl.formatMessage(formMessages.searchLabel)}
                    placeholder={intl.formatMessage(
                      formMessages.searchPlaceholder,
                    )}
                  />
                </div>
              </div>
              <div data-h2-grid-item="b(1of7)" data-h2-align="b(center)">
                {submitButton || (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-h2-button="theme-1, round, small, solid"
                  >
                    <p data-h2-button-label>
                      <i aria-hidden="true" className="fas fa-search" />
                      <span data-h2-visibility="b(hidden)">
                        {inputTitle ||
                          intl.formatMessage(formMessages.searchButtonText)}
                      </span>
                    </p>
                  </button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default SearchBar;
