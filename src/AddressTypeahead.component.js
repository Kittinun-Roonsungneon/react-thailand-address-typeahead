// @flow
import { compose, withState, withProps } from 'recompose';
import React, { Component } from 'react';

import { resolveResultbyField } from './finder';

const Typeahead = require('react-typeahead').Typeahead;

type AddressInputType = {
    // local state
    searchStr: string;
    option: string[];

    // external props
    fieldType: string;
}
const AddressTypeaheadComponent = (props: AddressInputType) => {
  const { searchStr, setSearchStr, fieldType, options } = props;
  if (!fieldType) {
    console.warn('No field type provide');
    return <div />;
  }
  return (
    <div className="typeahead-input-wrap">
      <Typeahead
        options={options}
        maxVisible={2}
        value={searchStr}
        onChange={e => setSearchStr(e.target.value)}
      />
      <input type="text" className="typeahead-input-hint" value={searchStr} />
    </div>
  );
};

const AddressTypeahead: Component<AddressInputType> = compose(
    withState('searchStr', 'setSearchStr', ''),
    withProps(({ searchStr, fieldType }) => ({
      options: resolveResultbyField(fieldType, searchStr),
    })),
)(AddressTypeaheadComponent);

export default AddressTypeahead;
