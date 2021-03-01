import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { number, select, text } from "@storybook/addon-knobs";
import Accordion from "../../components/H2Components/Accordion";
import { triggerOptions, colorOptions, paddingOptions } from "./utils";

const stories = storiesOf("H2 Components/Accordion", module).addDecorator(
  withIntl,
);

stories
  .add(
    "Accordion Card",
    (): React.ReactElement => (
      <section>
        <Accordion
          triggerPos="right" // TODO: Create knob that works with specific type (eg. triggerPos: "left" | "right").
          data-h2-shadow="b(medium)"
        >
          <Accordion.Btn>
            <div
              data-h2-padding={`"b(all, ${select(
                "Title Padding",
                paddingOptions,
                ".5",
                "Padding",
              )}) b(left, 1)"`}
            >
              <p
                data-h2-font-color={`b(${select(
                  "Text Colors",
                  colorOptions,
                  "black",
                  "Text",
                )})`}
              >
                {text("Title", "Accordion Title", "Text")}
              </p>
              <p
                data-h2-font-color={`b(${select(
                  "Text Colors",
                  colorOptions,
                  "black",
                  "Text",
                )})`}
              >
                {text("Subtitle", "Accordion Subtitle", "Text")}
              </p>
            </div>
          </Accordion.Btn>
          <Accordion.Content data-h2-border="b(gray-2, top, solid, thin)">
            <div
              data-h2-padding={`"b(all, ${select(
                "Content Padding",
                paddingOptions,
                ".5",
                "Padding",
              )}) b(left, 1)"`}
            >
              <p
                data-h2-focus
                data-h2-font-color={`b(${select(
                  "Text Colors",
                  colorOptions,
                  "black",
                  "Text",
                )})`}
              >
                {text("Content", "Accordion Content", "Text")}
              </p>
            </div>
          </Accordion.Content>
        </Accordion>
      </section>
    ),
  )
  .add(
    "Default",
    (): React.ReactElement => (
      <Accordion
        triggerPos="right" // TODO: Create knob that works with specific type (eg. triggerPos: "left" | "right").
        data-h2-bg-color={`b(${select(
          "Background Colors",
          colorOptions,
          "white",
          "Background Color",
        )}, 1)`} // This gives the card component effect.
        data-h2-margin="b(bottom, )"
      >
        <Accordion.Btn>
          <div
            data-h2-padding={`b(all, ${select(
              "Title Padding",
              paddingOptions,
              ".5",
              "Padding",
            )}) b(left, 1)`}
          >
            <p
              data-h2-font-color={`b(${select(
                "Text Colors",
                colorOptions,
                "black",
                "Text",
              )})`}
            >
              {text("Title", "Accordion Title", "Text")}
            </p>
            <p
              data-h2-font-color={`b(${select(
                "Text Colors",
                colorOptions,
                "black",
                "Text",
              )})`}
            >
              {text("Subtitle", "Accordion Subtitle", "Text")}
            </p>
          </div>
        </Accordion.Btn>
        <Accordion.Content data-h2-border="b(gray-2, top, solid, thin)">
          <div
            data-h2-padding={`"b(all, ${select(
              "Content Padding",
              paddingOptions,
              ".5",
              "Padding",
            )}) b(left, 1)"`}
          >
            <p
              data-h2-focus
              data-h2-font-color={`b(${select(
                "Text Colors",
                colorOptions,
                "black",
                "Text",
              )})`}
            >
              {text("Content", "Accordion Content", "Text")}
            </p>
          </div>
        </Accordion.Content>
      </Accordion>
    ),
  );
