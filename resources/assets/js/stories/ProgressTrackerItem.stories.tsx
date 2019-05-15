import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ProgressTrackerItem from '../components/ProgressTracker/ProgressTrackerItem';
import ProgressTracker from '../components/ProgressTracker/ProgressTracker';

const stories = storiesOf('ProgressTracker/ProgressTracker Items', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add(
  'Active',
  () => (
    <ProgressTracker backgroundColor="white">
      <ProgressTrackerItem
        state={text('State', 'active')}
        label={text('Label', 'Step 01')}
        title={text('Title', 'Job Info')}
      />
    </ProgressTracker>
  ),
  {
    info: { inline: true },
  },
);

stories.add(
  'Complete',
  () => (
    <ProgressTracker backgroundColor="white">
      <ProgressTrackerItem
        state={text('State', 'complete')}
        label={text('Label', 'Step 02')}
        title={text('Title', 'Work Env.')}
      />
    </ProgressTracker>
  ),
  {
    info: { inline: true },
  },
);

stories.add(
  'Error',
  () => (
    <ProgressTracker backgroundColor="white">
      <ProgressTrackerItem
        state={text('State', 'error')}
        label={text('Label', 'Step 03')}
        title={text('Title', 'Impact')}
      />
    </ProgressTracker>
  ),
  {
    info: { inline: true },
  },
);

stories.add(
  'Null',
  () => (
    <ProgressTracker backgroundColor="white">
      <ProgressTrackerItem
        state={text('State', 'null')}
        label={text('Label', 'Step 04')}
        title={text('Title', 'Tasks')}
      />
    </ProgressTracker>
  ),
  {
    info: { inline: true },
  },
);
