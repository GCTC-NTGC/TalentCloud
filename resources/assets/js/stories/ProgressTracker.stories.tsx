import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ProgressTracker from '../components/ProgressTracker/ProgressTracker';

const items = [
  { state: 'active', label: 'Step 01', title: 'Job Info' },
  { state: 'complete', label: 'Step 02', title: 'Work Env.' },
  { state: 'error', label: 'Step 03', title: 'Impact' },
];

const stories = storiesOf('ProgressTracker', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add(
  'Progress Tracker',
  () => (
    <ProgressTracker items={items} backgroundColor={'white'} />
  ),
  { info: { inline: true } },
);
