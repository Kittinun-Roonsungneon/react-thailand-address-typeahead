import staticAddrSource from "./static-addr-source";
import { extractDatasource, searchDatasourceByField } from "./use-thailand-addr";

describe("search test", () => {
    const ds = extractDatasource(staticAddrSource);
  it("should find province properly", () => {
    const result = searchDatasourceByField(ds, 'po', '10110');
    expect(result).toHaveLength(6)
  });

});
