/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import Accordion from "../../../components/ApplicantProfile/Skills/Accordion";

const stories = storiesOf(
  "Applicant Profile/Skills/Accordion",
  module,
).addDecorator(withIntl);

stories
  .add(
    "Custom",
    (): React.ReactElement => (
      <Accordion
        title={<p data-h2-font-size="small">{text("Title", "Prototyping")}</p>}
        subtitle={
          <p
            data-h2-font-color="b(theme-1-light)"
            data-h2-font-weight="b(300)"
            data-h2-font-size="small"
          >
            {text("Subtitle", "No Experience")}
          </p>
        }
        badge={
          <div data-h2-tag="gray-1, pill, solid">
            <span data-h2-tag-label>{text("Badge", "Custom")}</span>
          </div>
        }
      >
        <div data-h2-padding="b(top, 1) b(rl, .25)">
          <p>
            {text(
              "Content",
              "Defined as: An experimental process where design teams implement ideas into tangible forms from paper to digital. Teams build prototypes of varying degrees of fidelity to capture design concepts and test on users.",
            )}
          </p>
        </div>
      </Accordion>
    ),
  )
  .add(
    "Experience Count",
    (): React.ReactElement => (
      <Accordion
        title={
          <p data-h2-font-size="small">{text("Title", "Web Programming")}</p>
        }
        subtitle={
          <p data-h2-font-size="small">{text("Subtitle", "4 Experiences")}</p>
        }
      >
        <div data-h2-padding="b(tb, 1) b(rl, .25)">
          <p>
            {text(
              "Content",
              "Defined as: Developing web applications using Javascript and a server side language such as PHP, Python or other.",
            )}
          </p>
          <ul data-h2-padding="b(top, 1)">
            <li>
              <a href="#">UX Designer - GC Talent Cloud</a>
            </li>
            <li>
              <a href="#">Lead Developer - Fancy Startup</a>
            </li>
            <li>
              <a href="#">Web Developer - Nonprofit Company</a>
            </li>
            <li>
              <a href="#">Web Developer - Volunteer</a>
            </li>
          </ul>
        </div>
      </Accordion>
    ),
  );
