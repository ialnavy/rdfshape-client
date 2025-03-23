export type IRDFShape = {
    host: string;
    endpoints: Record<string, any>;
    contentType: string;
};

export type IFetchRDFDataInfo = IRDFShape & {
    content: string;
    format: string;
    inference: string;
    source: string;
};

export let fetchRDFDataInfo = (data: IFetchRDFDataInfo) => {
    return (fetch(data.host.concat(data.endpoints["rdfDataInfo"]), {
        method: "POST",
        headers: { "Content-Type": data.contentType },
        body: JSON.stringify({ data })
    }).then(response => response.json()));
};
