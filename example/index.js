import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import AddressForm from '../src/index';

import '../src/styles.css';

storiesOf('Component', module)
  .add('montage', () => (
    <div style={{ width: 350 }}>
      <AddressForm />
    </div>
  ));

