import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import Accordion from "../../components/H2Components/Accordion";

const stories = storiesOf("H2 Components/Accordion", module).addDecorator(
  withIntl,
);

stories.add(
  "Accordion",
  (): React.ReactElement => (
    <section>
      <Accordion
        triggerIconPos="right"
        data-h2-card="white, round"
        data-h2-margin="b(bottom, 1)"
      >
        <Accordion.Btn>
          <div data-h2-padding="b(all, .5) b(left, 1)">
            <p>Accordion Title</p>
            <p>Accordion Subtitle</p>
          </div>
        </Accordion.Btn>
        <Accordion.Content>
          <div
            data-h2-padding="b(all, .5) b(left, 1)"
            data-h2-border="b(gray-2, top, solid, thin)"
          >
            <p data-h2-focus>Accordion Content</p>
          </div>
        </Accordion.Content>
      </Accordion>

      <Accordion
        triggerIconPos="right"
        data-h2-card="gray-2, round"
        data-h2-margin="b(bottom, 1)"
      >
        <Accordion.Btn>
          <div data-h2-padding="b(all, .5) b(left, 1)">
            <p>Accordion Title</p>
            <p>Accordion Subtitle</p>
          </div>
        </Accordion.Btn>
        <Accordion.Content>
          <div
            data-h2-padding="b(all, .5) b(left, 1)"
            data-h2-border="b(gray-2, top, solid, thin)"
          >
            <p data-h2-focus>Accordion Content</p>
          </div>
        </Accordion.Content>
      </Accordion>

      <Accordion triggerIconPos="right" data-h2-card="theme-1-light, round">
        <Accordion.Btn>
          <div data-h2-padding="b(all, .5) b(left, 1)">
            <p>Accordion Title</p>
            <p>Accordion Subtitle</p>
          </div>
        </Accordion.Btn>
        <Accordion.Content>
          <div
            data-h2-padding="b(all, .5) b(left, 1)"
            data-h2-border="b(gray-2, top, solid, thin)"
          >
            <p data-h2-focus>Accordion Content</p>
          </div>
        </Accordion.Content>
      </Accordion>
    </section>
  ),
);
