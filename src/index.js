// @flow
import React from 'react';
import { fieldsEnum, resolveResultbyField } from './finder';
import AddressTypeahead from './AddressTypeahead.component';

export {

};

export default () => (
  <div>
    <AddressTypeahead fieldType={fieldsEnum.DISTRICT} />
  </div>
);
