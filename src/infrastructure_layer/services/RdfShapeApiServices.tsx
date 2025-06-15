let getRdfShapeApiEndpoint = (): string => {
    return (import.meta.env.VITE_RDFSHAPE_API_HOST as string) ?? "http://127.0.0.1:8080/api/";
};


export type IFetchDataInfo = {
    content: string;
    format: string;
    inference: string;
    source: string;
};

export let fetchDataInfo = (data: IFetchDataInfo) => {
    return (fetch(getRdfShapeApiEndpoint().concat("data/info"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data })
    }).then(response => response.json()));
};

export let fetchDataConvertGraphViz = (data: IFetchDataInfo) => {
    return (fetch(getRdfShapeApiEndpoint().concat("data/convert"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, targetFormat: "DOT" })
    }).then(response => response.json()));
};
