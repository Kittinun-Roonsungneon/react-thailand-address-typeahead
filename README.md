# react-thailand-address-typeahead
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This project fork from
[jquery.Thailand.js](https://github.com/earthchie/jquery.Thailand.js)

## Demo
[Example with storybook](http://zapkub.github.io/react-thailand-address)


## Requirement
- react

## Installation
```
$ npm install https://github.com/zapkub/JQLjs.git // will publish as module soon
$ npm install react react-thailand-address-typeahead
```

## Usage

```js
import AddressFormTypeahead from 'react-thailand-address-typeahead';

export default () => (
    <div>
        <AddressForm
         onAddressSelected={(addressObject) => console.log(addressObject)} 
        />
    </div>
)
```

> NOTE: For component styles you can include or use loader `./dist/styles.css` to your app or implement by yourself [styles](./dist/styles.css)

For futher more see [Example](./example/index.js)

## Performance for Perf nerd

| ไฟล์ | ขนาดไฟล์ |
| --- | ---:|
| without data.json | 69 KB 
| webpack with babili with data.json | 550 KB |
| webpack with babili with data.json gzip | **86 KB** |

## Todo
- custom styles example
- improve performance and reduce bundle size
- `data.json` lazy loading
- server-side implementation example
- using without React example
- using with google map example

## Original fork
[earthchie](https://github.com/earthchie/) - Project Owner, Original fork

## License
- Original : WTFPL 2.0 http://www.wtfpl.net/
- Also MIT
