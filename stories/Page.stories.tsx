import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThailandAddressTypeahead, ThailandAddressValue } from "../lib";
import { DatasourceItem } from "../lib/use-thailand-addr";
import styled from "styled-components";
import './Page.css'

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
    <div className="basic address-input-container">
      <ThailandAddressTypeahead
        value={val}
        onValueChange={(val) => setVal(val)}
      >
        {/* see CustomSuggestionUsage for create your own suggestion panel */}
        <ThailandAddressTypeahead.Suggestion containerProps={{className: 'suggestion-container'}} optionItemProps={{className: 'suggestion-option'}} />

        {/* you can custom layout here without touching the logic of the component */}
        <ThailandAddressTypeahead.SubdistrictInput containerProps={{className: "address-input-field-container"}} className="address-input-field" placeholder="ตำบล / แขวง" />
        <ThailandAddressTypeahead.DistrictInput containerProps={{className: "address-input-field-container"}} className="address-input-field" placeholder="อำเภอ / เขต" />
        <ThailandAddressTypeahead.ProvinceInput containerProps={{className: "address-input-field-container"}} className="address-input-field" placeholder="จังหวัด" />
        <ThailandAddressTypeahead.PostalCodeInput containerProps={{className: "address-input-field-container"}} className="address-input-field" placeholder="รหัสไปรษณีย์" />
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

const Template3: ComponentStory<typeof ThailandAddressTypeahead> = (args) => {
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
              return null;
            }
            return (
              <div style={{ background: "blue" }}>
                {suggestions.map((ds, i) => (
                  <div onMouseDown={() => onSuggestionSelected(ds)} key={i}>
                    {ds.postalCode}
                  </div>
                ))}
              </div>
            );
          }}
        </ThailandAddressTypeahead.CustomSuggestion>
      </ThailandAddressTypeahead>
      <br />
      <code>{JSON.stringify(val)}</code>
    </div>
  );
};
export const CustomSuggestionUsage = Template3.bind({});

const customDatasource: DatasourceItem[] = [
  { d: "Khongteoy", p: "Bangkok", po: "10110", s: "Phrakanong" },
  { d: "Khongteoy", p: "Bangkok", po: "10110", s: "Khongteoy" },
  { d: "Phrakanong", p: "Bangkok", po: "10110", s: "Phrakanong" },
];
const Template4 = () => {
  const [val, setVal] = React.useState<ThailandAddressValue>(
    ThailandAddressValue.fromDatasourceItem({
      d: "Khongteoy",
      p: "Bangkok",
      po: "10110",
      s: "Khongteoy",
    })
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
  );
};
export const CustomDatasourceUsage = Template4.bind({});

export const CustomStyling = () => {
  const [val, setVal] = React.useState<ThailandAddressValue>(
    ThailandAddressValue.empty()
  );
  return (
    <div>
      <ThailandAddressTypeahead
        value={val}
        onValueChange={(val) => setVal(val)}
      >
        <ThailandAddressTypeahead.SubdistrictInput
          style={{ borderRadius: 4, marginBottom: 4, fontSize: 18 }}
          placeholder="ตำบล / แขวง"
        />
        <ThailandAddressTypeahead.DistrictInput
          style={{ borderRadius: 4, marginBottom: 4, fontSize: 18 }}
          placeholder="อำเภอ / เขต"
        />
        <ThailandAddressTypeahead.ProvinceInput
          style={{ borderRadius: 4, marginBottom: 4, fontSize: 18 }}
          placeholder="จังหวัด"
        />
        <ThailandAddressTypeahead.PostalCodeInput
          style={{ borderRadius: 4, marginBottom: 4, fontSize: 18 }}
          placeholder="รหัสไปรษณีย์"
        />
        <ThailandAddressTypeahead.Suggestion
          containerProps={{ style: { border: "1px solid black" } }}
          optionItemProps={{ style: { fontSize: 10, cursor: "pointer" } }}
        />
      </ThailandAddressTypeahead>
      <br />
      <code>{JSON.stringify(val)}</code>
    </div>
  );
};

const StyledContainer = styled.div`
  .suggestion-container {
    max-width: 300px;
  }
  .address-option {
    cursor: pointer;
    &:hover {
      background-color: lightgrey;
    }
  }
`;

export const WithStyledComponent = () => {
  const [val, setVal] = React.useState<ThailandAddressValue>(
    ThailandAddressValue.empty()
  );

  // StyledContainer
  // const StyledContainer = styled.div`
  //   .suggestion-container {
  //     max-width: 300px;
  //   }
  //   .address-option {
  //     cursor: pointer;
  //     &:hover {
  //       background-color: lightgrey;
  //     }
  //   }
  // `
  return (
    <StyledContainer>
      <ThailandAddressTypeahead
        value={val}
        onValueChange={(val) => setVal(val)}
      >
        <ThailandAddressTypeahead.SubdistrictInput placeholder="ตำบล / แขวง" />
        <ThailandAddressTypeahead.DistrictInput placeholder="อำเภอ / เขต" />
        <ThailandAddressTypeahead.ProvinceInput placeholder="จังหวัด" />
        <ThailandAddressTypeahead.PostalCodeInput placeholder="รหัสไปรษณีย์" />
        <ThailandAddressTypeahead.Suggestion
          containerProps={{ className: "suggestion-container" }}
          optionItemProps={{ className: "address-option" }}
        />
      </ThailandAddressTypeahead>
      <br />
      <code>{JSON.stringify(val)}</code>
    </StyledContainer>
  );
};
