import { cnvValueFromSPARQL, showQualified, showQualify } from "../utils/Utils";

// Parse the server response for SPARQL Queries to more readable structures
export function parseData(data, prefixes) {
  if (data.head && data.head.vars && data.head.vars.length) {
    const vars = data.head.vars;
    const columns = vars.map((v) => {
      return {
        dataField: v,
        text: v,
        sort: true,
      };
    });
    const rows = data.results.bindings.map((binding, idx) => {
      let row = { _id: idx };
      vars.map((v) => {
        const b = binding[v];
        let value = "";
        if (b) {
          const converted = cnvValueFromSPARQL(b, prefixes);
          const qualify = showQualify(converted, prefixes);
          value = showQualified(qualify, prefixes);
        }
        row[v] = value;
      });
      return row;
    });
    return {
      columns: columns,
      rows: rows,
    };
  } else {
    return [];
  }
}
