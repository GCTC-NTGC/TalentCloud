import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { useState } from "@storybook/addons";
import { fakeSkills } from "../fakeData/fakeSkills";
import SearchBar from "../components/SearchBar";
import {
  localizeFieldNonNull,
  matchStringsCaseDiacriticInsensitive,
} from "../helpers/localize";
import { Skill } from "../models/types";
import Accordion from "../components/H2Components/Accordion";

const stories = storiesOf("Components/Search Bar", module).addDecorator(
  withIntl,
);

const skills = fakeSkills();

stories.add(
  "Skills Search Bar",
  (): React.ReactElement => {
    const [skillResults, setSkillsResults] = useState<Skill[]>([]);
    const handleSubmit = (search: string): Promise<void> => {
      const skillNamesLocale = skills.map((skill) =>
        localizeFieldNonNull("en", skill, "name"),
      );
      const skillStrings = matchStringsCaseDiacriticInsensitive(
        search,
        skillNamesLocale,
      );
      const skillMatches = skills.filter((skill) =>
        skillStrings.includes(localizeFieldNonNull("en", skill, "name")),
      );
      setSkillsResults(skillMatches);
      action("Skill Results")(skillMatches);
      return Promise.resolve();
    };

    return (
      <section>
        <SearchBar
          buttonLabel={text("Button Label", "Search Skills", "Search Bar Text")}
          searchLabel={text(
            "Search Label",
            "Search for skills by name:",
            "Search Bar Text",
          )}
          searchPlaceholder={text(
            "Search Placeholder",
            "eg. User interface design.",
            "Search Bar Text",
          )}
          handleSubmit={handleSubmit}
        />
        {skillResults.map((skillResult) => (
          <Accordion key={skillResult.id} data-h2-grid-item="b(3of4)">
            <Accordion.Btn>
              <p data-h2-font-weight="b(700)" data-h2-font-style="b(underline)">
                {localizeFieldNonNull("en", skillResult, "name")}
              </p>
            </Accordion.Btn>
            <Accordion.Content>
              <p data-h2-focus>
                {localizeFieldNonNull("en", skillResult, "description")}
              </p>
            </Accordion.Content>
          </Accordion>
        ))}
      </section>
    );
  },
);
