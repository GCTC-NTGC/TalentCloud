import { ProgressTrackerItem } from "../types";

export const items: ProgressTrackerItem[] = [
  { link: "/", state: "active", label: "Step 01", title: "Job Info" },
  { link: "/", state: "complete", label: "Step 02", title: "Work Env." },
  { link: "/", state: "error", label: "Step 03", title: "Impact" },
];

export default items;
