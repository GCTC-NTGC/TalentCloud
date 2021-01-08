import * as React from "react";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { useIntl, defineMessages } from "react-intl";
import { validationMessages } from "./Form/Messages";
import TextInput from "./Form/TextInput";

const formMessages = defineMessages({
  searchLabel: {
    id: "searchBar.search.label",
    defaultMessage: "Search",
    description: "The label displayed for the search input field.",
  },
  searchPlaceholder: {
    id: "searchBar.search.placeholder",
    defaultMessage: "eg. Enter a value.",
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
  handleSubmit: (search: string) => Promise<void>;
}

interface SearchBarValues {
  search: string;
}

export const SearchBar: React.FunctionComponent<SearchBarProps> = ({
  inputTitle,
  handleSubmit,
}: SearchBarProps): React.ReactElement => {
  const intl = useIntl();
  const initialValues: SearchBarValues = {
    search: "",
  };

  const searchSchema = Yup.object().shape({
    search: Yup.string().required(
      intl.formatMessage(validationMessages.required),
    ),
  });

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={searchSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await handleSubmit(values.search)
            .then(() => {
              resetForm();
              setSubmitting(false);
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }): React.ReactElement => (
          <Form>
            <div data-h2-grid="b(middle, expanded, padded, 1)">
              <div data-h2-grid-item="b(1of2)">
                <div data-h2-grid-content>
                  <FastField
                    id="search_form_input"
                    type="search"
                    name="search"
                    component={TextInput}
                    required
                    label={intl.formatMessage(formMessages.searchLabel)}
                    placeholder={intl.formatMessage(
                      formMessages.searchPlaceholder,
                    )}
                  />
                </div>
              </div>
              <div data-h2-grid-item="b(1of2)">
                <div data-h2-grid-content>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-h2-button="theme-1, round, medium, solid"
                  >
                    <span data-h2-button-label>
                      {inputTitle ||
                        intl.formatMessage(formMessages.searchButtonText)}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default SearchBar;
