import { action } from "@storybook/addon-actions";

export function sleep(ms): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const promiseAction = (text: string) => async (...args: any[]) => {
  await sleep(1000);
  action(text)(...args);
};
