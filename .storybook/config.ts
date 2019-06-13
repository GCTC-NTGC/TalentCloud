import { configure } from "@storybook/react";
// automatically import all files ending in *.stories.tsx
const req = require.context(
  "../resources/assets/js/stories",
  true,
  /\.stories\.tsx$/
);

// Create a parent element for modals.
// Modals use the createPortal function, which needs a dom node passed in as a parent.
// That node needs to exist before the story file runs.
// See for explanation: https://github.com/storybookjs/storybook/issues/4604
// TODO: find better workaround
const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
modalRoot.setAttribute("data-clone", "");
document.body.append(modalRoot);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
