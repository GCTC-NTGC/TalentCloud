import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Modal from '../components/Modal';

const stories = storiesOf('Modal', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add(
  'Plain Modal',
  () => (
    <Modal
      id={text('ID', 'sample-modal')}
      title={text('Title', 'Hey what a Modal')}
      openText={text('Open Text', 'Check this out')}
      closeText={text('Close Text', 'close')}
      confirmText={text('Confirm Text', 'Cool')}
      cancelText={text('Cancel Text', 'No Thanks')}
      handleConfirm={action('Confirm clicked')}
    >
      <p data-c-margin="bottom(half)">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec mi
        non dui sodales pellentesque. Sed non est nec lacus malesuada sodales.
        Pellentesque aliquet tristique aliquet. Morbi blandit eros vitae nisi
        venenatis, vel hendrerit quam blandit. Nulla iaculis blandit ultricies.
        Etiam posuere lectus non augue aliquet iaculis. Integer consequat, metus
        nec vehicula suscipit, libero justo tincidunt mi, eget aliquam eros
        lacus eget est. Nulla congue dolor a viverra luctus.
      </p>
      <p>
        Suspendisse placerat massa justo, ut tempor orci dictum eget. Phasellus
        a placerat magna. Mauris quis risus quis nisi semper finibus ac
        dignissim odio. Donec ipsum nunc, porta quis mauris sit amet,
        ullamcorper varius lacus. Nulla tincidunt metus et neque molestie, sit
        amet mattis turpis vestibulum. Ut ac leo tempor, dictum magna sed,
        fringilla massa. Aliquam laoreet non dui ac facilisis. Aenean aliquet,
        nisi in posuere iaculis, libero turpis molestie orci, sit amet accumsan
        est sem eu diam. Donec imperdiet leo quam, vel lobortis dui semper sed.
        Quisque elementum neque viverra velit interdum ultricies.
      </p>
    </Modal>
  ),
  { info: { inline: true } },
);
