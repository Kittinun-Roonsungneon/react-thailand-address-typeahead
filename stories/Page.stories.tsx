import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThailandAddressTypeahead, ThailandAddressValue } from "../lib";
import { DatasourceItem } from "../lib/use-thailand-addr";

export default {
  title: "Thailand Address Typeahead",
  component: ThailandAddressTypeahead,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ThailandAddressTypeahead>;

const Template: ComponentStory<typeof ThailandAddressTypeahead> = (args) => {
  const [val, setVal] = React.useState<ThailandAddressValue>(
    ThailandAddressValue.empty()
  );
  return (
    <div>
      <ThailandAddressTypeahead
        value={val}
        onValueChange={(val) => setVal(val)}
      >
        <ThailandAddressTypeahead.SubdistrictInput placeholder="ตำบล / แขวง" />
        <ThailandAddressTypeahead.DistrictInput placeholder="อำเภอ / เขต" />
        <ThailandAddressTypeahead.ProvinceInput placeholder="จังหวัด" />
        <ThailandAddressTypeahead.PostalCodeInput placeholder="รหัสไปรษณีย์" />
        <ThailandAddressTypeahead.Suggestion />
      </ThailandAddressTypeahead>
      <br />
      <code>{JSON.stringify(val)}</code>
    </div>
  );
};
export const BasicUsage = Template.bind({});

const Template2: ComponentStory<typeof ThailandAddressTypeahead> = (args) => {
  const [val, setVal] = React.useState<ThailandAddressValue>(
    ThailandAddressValue.empty()
  );
  return (
    <div>
      <ThailandAddressTypeahead
        value={val}
        onValueChange={(val) => setVal(val)}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ThailandAddressTypeahead.SubdistrictInput
            style={{ fontWeight: "bold" }}
            placeholder="ตำบล / แขวง"
          />
          <ThailandAddressTypeahead.DistrictInput placeholder="อำเภอ / เขต" />
        </div>

        <div style={{ display: "flex" }}>
          <ThailandAddressTypeahead.ProvinceInput placeholder="จังหวัด" />
          <ThailandAddressTypeahead.PostalCodeInput placeholder="รหัสไปรษณีย์" />
        </div>
        <ThailandAddressTypeahead.Suggestion />
      </ThailandAddressTypeahead>
      <br />
      <code>{JSON.stringify(val)}</code>
    </div>
  );
};
export const CustomLayoutUsage = Template2.bind({});

const Template3: ComponentStory<typeof ThailandAddressTypeahead> = (args) =>  {
  const [val, setVal] = React.useState<ThailandAddressValue>(
    ThailandAddressValue.empty()
  );
  return (
    <div>
      <ThailandAddressTypeahead
        value={val}
        onValueChange={(val) => setVal(val)}
      >
        <ThailandAddressTypeahead.PostalCodeInput placeholder="รหัสไปรษณีย์" />
        <ThailandAddressTypeahead.CustomSuggestion>
          {(suggestions, shouldDisplaySuggestion, onSuggestionSelected) => {
            if (!shouldDisplaySuggestion) {
              return null
            }
            return (
            <div style={{ background: 'blue'}}>
              {suggestions.map((ds, i) => <div onMouseDown={() => onSuggestionSelected(ds)} key={i}>{ds.postalCode}</div>)}
            </div>
            )
          }}
        </ThailandAddressTypeahead.CustomSuggestion>
      </ThailandAddressTypeahead>
      <br />
      <code>{JSON.stringify(val)}</code>
    </div>
  );
}
export const CustomSuggestionUsage = Template3.bind({});


const customDatasource: DatasourceItem[] = [
  { d: 'Khongteoy', p: 'Bangkok', po: '10110', s: 'Phrakanong'},
  { d: 'Khongteoy', p: 'Bangkok', po: '10110', s: 'Khongteoy'},
  { d: 'Phrakanong', p: 'Bangkok', po: '10110', s: 'Phrakanong'},
]
const Template4 = () => {

  const [val, setVal] = React.useState<ThailandAddressValue>(
    ThailandAddressValue.fromDatasourceItem(
      { d: 'Khongteoy', p: 'Bangkok', po: '10110', s: 'Khongteoy'},
    )
  );
  return (
    <div>
      <ThailandAddressTypeahead
        value={val}
        onValueChange={(val) => setVal(val)}
        datasouce={customDatasource}
      >
        <ThailandAddressTypeahead.SubdistrictInput placeholder="Tumbon" />
        <ThailandAddressTypeahead.DistrictInput placeholder="Amphoe" />
        <ThailandAddressTypeahead.ProvinceInput placeholder="Province" />
        <ThailandAddressTypeahead.PostalCodeInput placeholder="Postal Code" />
        <ThailandAddressTypeahead.Suggestion />
      </ThailandAddressTypeahead>
      <br />
      <code>{JSON.stringify(val)}</code>
    </div>
  )
}
export const CustomDatasourceUsage = Template4.bind({});
