import * as React from "react";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { useIntl, defineMessages } from "react-intl";
import SkillSearchResults from "./SkillSearchResults";
import { validationMessages } from "../../Form/Messages";
import { getLocale } from "../../../helpers/localize";
import TextInput from "../../Form/TextInput";
import { Skill } from "../../../models/types";

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
  handleSubmit: (locale: string, search: string) => Promise<Skill[]>;
  handleAddSkill: (skillId: number) => Promise<Skill>;
}

interface SearchBarValues {
  locale: string;
  search: string;
}

export const SearchBar: React.FunctionComponent<SearchBarProps> = ({
  inputTitle,
  handleSubmit,
  handleAddSkill,
}: SearchBarProps): React.ReactElement => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const initialValues: SearchBarValues = {
    locale,
    search: "",
  };
  const validationSchema = Yup.object().shape({
    search: Yup.string()
      .required(intl.formatMessage(validationMessages.required))
      .min(2),
  });

  const [results, setResults] = React.useState<Skill[]>([]);

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          await handleSubmit(values.locale, values.search)
            .then((searchMatches) => {
              setStatus("submitted");
              setResults(searchMatches);
              setSubmitting(false);
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ status, isSubmitting }): React.ReactElement => (
          <Form>
            <div data-h2-grid="b(middle, contained, padded, .25)">
              <div data-h2-grid-item="b(2of3)">
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
              <div data-h2-grid-item="b(1of3)">
                <div data-h2-grid-content data-h2-display="b(grid)">
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
            <SkillSearchResults
              status={status}
              results={results}
              handleAddSkill={handleAddSkill}
            />
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default SearchBar;
