import { useCallback } from "react";
import staticAddrSource from "./static-addr-source";

type CompressedDatasourceItem = [string, [string, [string, number[]][]][]];
type CompressedDatasource = CompressedDatasourceItem[];
export type DatasourceItem = {
  /**
   * subdistrict
   */
  s: string;

  /**
   * district
   */
  d: string;
  /**
   * province
   */
  p: string;
  /**
   * postcode
   */
  po: string;
};
export const extractDatasource = (cds: CompressedDatasource): DatasourceItem[] => {
  const ds: DatasourceItem[] = [];
  cds.forEach((province) => {
    const provinceName = province[0];
    const districtList = province[1];
    districtList.forEach((district) => {
      const districtName = district[0];
      const subdistrictList = district[1];
      subdistrictList.forEach((subdistrict) => {
        const subdistrictName = subdistrict[0];
        const postcodeList = subdistrict[1];
        postcodeList.forEach((postcode) => {
          ds.push({
            d: districtName,
            p: provinceName,
            po: postcode + '',
            s: subdistrictName,
          });
        });
      });
    });
  });
  return ds;
};

export const searchDatasourceByField = (
  ds: DatasourceItem[],
  field: "po" | "p" | "d" | "s",
  input: string,
  max = 10,
) => {
  const result: DatasourceItem[] = []
  for (const item of ds) {
    if (item[field].toLowerCase().includes(input.toLocaleLowerCase())) {
      result.push(item)
    }
    if (result.length >= max) {
      break;
    }
  }
  return result;
};

export function useThailandAddressDatasource(
  ds = extractDatasource(staticAddrSource)
) {
  const searchByField = useCallback(
    (field: "po" | "p" | "d" | "s", input: string) => {
      return searchDatasourceByField(ds, field, input);
    },
    [ds]
  );
  return {
    searchByField,
  };
}
