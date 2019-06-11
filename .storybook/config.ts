import { configure } from "@storybook/react";
// automatically import all files ending in *.stories.tsx
const req = require.context(
  "../resources/assets/js/stories",
  true,
  /\.stories\.tsx$/
);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
