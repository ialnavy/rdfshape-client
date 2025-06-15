let getQuickGraphApiEndpoint = (): string => {
    return (import.meta.env.VITE_QUICKCHART_API_HOST as string) ?? "https://quickchart.io/";
};


export type IFetchSvgFromGraphViz = {
    graph: string;
};

export let fetchSvgFromGraphViz = (data: IFetchSvgFromGraphViz) => {
    return (fetch(getQuickGraphApiEndpoint().concat("graphviz"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, layout: "dot", format: "svg" })
    }).then(response => response.json()));
};
