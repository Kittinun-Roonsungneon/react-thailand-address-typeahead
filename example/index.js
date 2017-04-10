import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withState } from 'recompose';
import AddressForm, { AddressTypeahead } from '../src/index';

import '../src/styles.css';

storiesOf('AddressForm Component', module)
  .addWithInfo('Simple usage',
  `
    ## Enum
    \`\`\`
    const fieldsEnum = {
      DISTRICT: 'd',
      AMPHOE: 'a',
      PROVINCE: 'p',
      ZIPCODE: 'z',
    };
    \`\`\`
    ## Simple usage
    \`import AddressForm from '../src/index';\`
  `, () => (
    <div style={{ width: 350 }}>
      <AddressForm
        maxVisible={20}
        onAddressSelected={action('onSelectedAdress')}
      />
    </div>
  ), { inline: true })
  .addWithInfo('with handle result state',
  `
    ## with Recompose style
    \`\`\`js
    const WithStateComponent = withState('result', 'setResult', null)(({ result, setResult }) => (
      <div style={{ width: 350 }}>
        <div>
          selected : {result ? \`\${result.p} \${result.a} \${result.d} \${result.z}\` : null}
        </div>
        <AddressForm onAddressSelected={address => setResult(address)} />
      </div>
      ));
    \`\`\`
  `, () => {
    const WithStateComponent = withState('result', 'setResult', null)(({ result, setResult }) => (
      <div style={{ width: 350 }}>
        <div style={{ color: 'red' }}>
          ผลลัพธ์ : {result ? `${result.p} ${result.a} ${result.d} ${result.z}` : null}
        </div>
        <AddressForm onAddressSelected={address => setResult(address)} />
      </div>
    ));
    return (
      <div>
        <WithStateComponent />
      </div>);
  }, { inline: true })
  .addWithInfo('with custom render result',
  `
    you can custom your result item by give a render function
    \`\`\`
    const renderResult = data => <b>{\`Hi \${data.p}:\${data.d} \${data.a}\`}</b>
    \`\`\`
  `,
  () => (
    <div style={{ width: 400 }}>
      <AddressForm
        renderResult={data => <b>{`Hi ${data.p}:${data.d} ${data.a}`}</b>}
        onAddressSelected={action('onSelectedAdress')}
      />
    </div>
  ), { inline: true });


storiesOf('AddressInput Component', module)
  .addWithInfo('Simple usage',
  `
    \`\`\`
    const WithStateComponent = withState(
      'value', 'setValue', '',
    )(({ value, setValue }) => (<AddressTypeahead
      value={value}
      renderResult={data => <b>{\`Hi \${data.p}:\${data.d} \${data.a}\`}</b>}
      fieldType={'d'}
      onOptionSelected={data => setValue(data.d)}
    />))
    \`\`\`
  `, (() => {
    const WithStateComponent = withState(
      'value', 'setValue', '',
    )(({ value, setValue }) => (<AddressTypeahead
      value={value}

      placeholder={'ตำบล...'}
      renderResult={data => <b>{`Hi ${data.p}:${data.d} ${data.a}`}</b>}
      fieldType={'d'}
      onOptionSelected={data => setValue(data.d)}
    />));
    return (
      <WithStateComponent />
    );
  }), { inline: true });
