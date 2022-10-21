import { createContext, useContext } from "react";
import { DatasourceItem, useThailandAddressDatasource } from "./use-thailand-addr";

/**
 * About Thailand address format
 * @see https://en.wikipedia.org/wiki/Thai_addressing_system#:~:text=With%20the%20exception%20of%20the,Road
 */
export type ThailandAddressValue = {
  /**
   * @description tambon (ตำบล), khwaeng (แขวง)
   */
  subdistrict: string;

  /**
   * @description tambon (ตำบล), khwaeng (แขวง)
   */
  district: string;
  /**
   * @description changwat (จังหวัด)
   */
  province: string;
  postalCode: string;
};
export const ThailandAddressValue = {
  empty: (): ThailandAddressValue => ({
    district: "",
    postalCode: "",
    province: "",
    subdistrict: "",
  }),
  fromDatasourceItem: (ds: DatasourceItem): ThailandAddressValue => {
    return {
      district: ds.d,
      postalCode: ds.po,
      province: ds.p,
      subdistrict: ds.s,
    };
  },
};

export type TypeaheadAdressContextData = {
  value: ThailandAddressValue;
  onValueChange?: (nextVal: ThailandAddressValue) => void;
  onInputFieldChange: (
    fieldName: keyof ThailandAddressValue,
    inputText: string
  ) => void;
  searchByField: ReturnType<
    typeof useThailandAddressDatasource
  >["searchByField"];

  suggestionContainerElem: Element | null;
  setSuggestionContainerElem: (e: Element | null) => void;

  suggestions: DatasourceItem[];
  setSuggestions: (ds: DatasourceItem[]) => void;

  shouldDisplaySuggestion: boolean;
  setShouldDisplaySuggestion: (v: boolean) => void;
};

export const typeaheadAddressContext =
  createContext<TypeaheadAdressContextData | null>(null);

export function useAddressTypeaheadContext() {
  const ctx = useContext(typeaheadAddressContext);
  if (!ctx) {
    throw new Error(
      "invalid context provider, make sure you place this component under ThailandAddressTypeahead"
    );
  }
  return ctx;
}