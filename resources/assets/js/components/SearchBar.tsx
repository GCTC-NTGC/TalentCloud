import * as React from "react";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { FormattedMessage } from "react-intl";
import TextInput from "./Form/TextInput";

interface SearchBarProps {
  /** The search button label */
  buttonLabel: string;
  /** The search input's label */
  searchLabel: string;
  /** The search input's placeholder text */
  searchPlaceholder: string;
  /** This replaces the default submit button for a custom one. */
  submitButton?: React.ReactElement;
  /** The function that runs when user clicks the search button, if the validation is successful. */
  handleSubmit: (searchQuery: string) => Promise<void>;
}

interface SearchBarValues {
  search: string;
}

export const SearchBar: React.FunctionComponent<SearchBarProps> = ({
  buttonLabel,
  searchLabel,
  searchPlaceholder,
  submitButton,
  handleSubmit,
}: SearchBarProps): React.ReactElement => {
  const initialValues: SearchBarValues = {
    search: "",
  };
  const validationSchema = Yup.object().shape({
    search: Yup.string().min(2),
  });

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          await handleSubmit(values.search)
            .then(() => {
              setStatus("submitted");
              setSubmitting(false);
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }): React.ReactElement => (
          <Form>
            <div data-h2-grid="b(middle, contained, padded, .5)">
              <div data-h2-grid-item="b(6of7)">
                <div data-h2-grid-content>
                  <FastField
                    id="search_form_input"
                    type="search"
                    name="search"
                    component={TextInput}
                    label={searchLabel}
                    placeholder={searchPlaceholder}
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
                        {buttonLabel || (
                          <FormattedMessage
                            id="searchBar.search.buttonText"
                            defaultMessage="Search"
                            description="The placeholder displayed for the search button text."
                          />
                        )}
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
