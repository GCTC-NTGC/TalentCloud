export interface ProgressTrackerItem {
  state: 'active' | 'complete' | 'error' | 'null';
  label: string;
  title: string;
}
