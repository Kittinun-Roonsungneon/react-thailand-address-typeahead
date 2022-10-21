import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { ThailandAddressValue, typeaheadAddressContext, TypeaheadAdressContextData, useAddressTypeaheadContext } from "./context";
import {
  DatasourceItem,
  useThailandAddressDatasource,
} from "./use-thailand-addr";

const fieldMap: {
  [key in keyof ThailandAddressValue]: "d" | "s" | "p" | "po";
} = {
  district: "d",
  province: "p",
  postalCode: "po",
  subdistrict: "s",
};



const SuggestionPanel = ({
  ds,
  shouldVisible,
  onDatasourceItemSelected,
}: {
  ds: DatasourceItem[];
  shouldVisible: boolean;
  onDatasourceItemSelected?: (ds: ThailandAddressValue) => void;
}) => {
  const onClick = (i: number) => (evt: React.MouseEvent) => {
    evt.stopPropagation();
    onDatasourceItemSelected?.(ThailandAddressValue.fromDatasourceItem(ds[i]));
  };
  if (!shouldVisible) {
    return null;
  }
  return (
    <ul>
      {ds.map((d, i) => {
        return (
          <li
            onMouseDown={onClick(i)}
            key={d.po + "_" + i}
          >{`${d.s} ${d.d} ${d.p} ${d.po}`}</li>
        );
      })}
    </ul>
  );
};

const AddressInputField = (fieldName: keyof ThailandAddressValue) => {
  const InputComponent = (
    innerProps: Omit<JSX.IntrinsicElements["input"], "value" | "onChange">
  ) => {
    const {
      value,
      searchByField,
      onInputFieldChange,
      setSuggestions,
      setShouldDisplaySuggestion,
      setSuggestionContainerElem,
    } = useAddressTypeaheadContext();
    const onInputChange = useCallback(
      (evt: React.ChangeEvent<HTMLInputElement>) => {
        onInputFieldChange(fieldName, evt.currentTarget.value);
        if (!evt.currentTarget.value) {
          setSuggestions([]);
          return;
        }
        setSuggestions(
          searchByField(fieldMap[fieldName], evt.currentTarget.value)
        );
      },
      [onInputFieldChange, searchByField, setSuggestions]
    );

    const suggestPanelContainerRef = useRef<HTMLDivElement>(null);

    const onBlur = useCallback(() => {
      setShouldDisplaySuggestion(false);
    }, [setShouldDisplaySuggestion]);
    const onFocus = useCallback(() => {
      setShouldDisplaySuggestion(true);
      setSuggestionContainerElem(suggestPanelContainerRef.current);
    }, [setShouldDisplaySuggestion, setSuggestionContainerElem]);

    return (
      <div onBlur={onBlur} onFocus={onFocus}>
        <input
          {...innerProps}
          onChange={onInputChange}
          value={value[fieldName]}
        />
        <div ref={suggestPanelContainerRef} />
      </div>
    );
  };
  InputComponent.DisplayName = fieldName + "InputField";

  return InputComponent;
};

export type ThailandAddressTypeaheadPropTypes = {
  value?: ThailandAddressValue;
  onValueChange?: (nextVal: ThailandAddressValue) => void;
  children: React.ReactNode;

  /**
   * custom datasource will replace the default datasource
   * @see DatasourceItem to provide a right format
   */
  datasouce?: DatasourceItem[]
};

export const ThailandAddressTypeahead = ({
  children,
  value,
  onValueChange,
  datasouce,
}: ThailandAddressTypeaheadPropTypes) => {
  const [suggestions, setSuggestions] = useState<DatasourceItem[]>([]);
  const { searchByField } = useThailandAddressDatasource(datasouce);
  const [suggestionContainerElem, setSuggestionContainerElem] =
    useState<Element | null>(null);
  const [shouldDisplaySuggestion, setShouldDisplaySuggestion] = useState(false);

  const onInputFieldChange = useCallback(
    (fieldName: keyof ThailandAddressValue, inputValue: string) => {
      const nextVal = value ? { ...value } : ThailandAddressValue.empty();
      nextVal[fieldName] = inputValue;
      onValueChange?.(nextVal);
    },
    [value, onValueChange]
  );

  const contextData = useMemo<TypeaheadAdressContextData>(() => {
    return {
      value: value || {
        district: "",
        postalCode: "",
        province: "",
        subdistrict: "",
      },
      searchByField,
      onInputFieldChange,
      onValueChange,
      suggestionContainerElem,
      setSuggestionContainerElem,
      suggestions,
      setSuggestions,
      shouldDisplaySuggestion,
      setShouldDisplaySuggestion,
    };
  }, [
    value,
    searchByField,
    onInputFieldChange,
    onValueChange,
    suggestionContainerElem,
    suggestions,
    shouldDisplaySuggestion,
  ]);

  return (
    <typeaheadAddressContext.Provider value={contextData}>
      {children}
    </typeaheadAddressContext.Provider>
  );
};

const DefaultSuggestionPanel = () => {
  const {
    suggestionContainerElem,
    suggestions,
    shouldDisplaySuggestion,
    onValueChange,
  } = useAddressTypeaheadContext();

  if (!suggestionContainerElem) {
    return null;
  }
  return createPortal(
    <SuggestionPanel
      ds={suggestions}
      shouldVisible={shouldDisplaySuggestion}
      onDatasourceItemSelected={onValueChange}
    />,
    suggestionContainerElem
  );
};

type CustomSuggestionPanelPropTypes = {
  children: (
    ds: ThailandAddressValue[],
    shouldVisible: boolean,
    onSuggestionSelected: (nextVal: ThailandAddressValue) => void
  ) => React.ReactNode;
};
export const CustomSuggestionPanel = ({
  children,
}: CustomSuggestionPanelPropTypes) => {
  const { suggestionContainerElem, suggestions, shouldDisplaySuggestion, onValueChange } =
    useAddressTypeaheadContext();

  const onSuggestionSelected = useCallback((nextVal: ThailandAddressValue) => {
    onValueChange?.(nextVal)
  }, [onValueChange])

  const ds = useMemo(() => {
    return suggestions.map(ThailandAddressValue.fromDatasourceItem);
  }, [suggestions])

  if (!suggestionContainerElem) {
    return null;
  }


  return createPortal(
    children(ds, shouldDisplaySuggestion, onSuggestionSelected),
    suggestionContainerElem
  );
};

export const SubdistrictInput = AddressInputField("subdistrict");
export const ProvinceInput = AddressInputField("province");
export const DistrictInput = AddressInputField("district");
export const PostalCodeInput = AddressInputField("postalCode");
export const Suggestion = DefaultSuggestionPanel;
export const CustomSuggestion = CustomSuggestionPanel;

ThailandAddressTypeahead.SubdistrictInput = SubdistrictInput;
ThailandAddressTypeahead.DistrictInput = DistrictInput;
ThailandAddressTypeahead.ProvinceInput = ProvinceInput;
ThailandAddressTypeahead.PostalCodeInput = PostalCodeInput;
ThailandAddressTypeahead.SubdistrictInput = SubdistrictInput;

ThailandAddressTypeahead.Suggestion = DefaultSuggestionPanel;
ThailandAddressTypeahead.CustomSuggestion = CustomSuggestionPanel;

export {
  ThailandAddressValue,
}
