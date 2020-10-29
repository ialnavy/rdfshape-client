import React from "react";
import API from "../API";
import QueryTabs from "./QueryTabs";
// import ShExTabs from "../shex/ShExTabs";

export const InitialQuery = {
    activeTab: API.defaultTab,
    textArea: '',
    url: '',
    file: null,
    fromParams: false,
    codeMirror: null
} ;

export function paramsFromStateQuery(state) {
    let params = {};
    let activeTab = state.activeTab;
    params['activeTab'] = convertTabQuery(activeTab);
    switch (activeTab) {
        case "byText":
            params['query'] = state.textArea;
            break;
        case "byUrl":
            params['queryURL'] = state.url;
            break;
        case "byFile":
            params['queryFile'] = state.file;
            break;
        default:
    }
    return params;
}

export function convertTabQuery(key) {
    switch (key) {
        case API.byTextTab: return "#queryTextArea";
        case API.byFileTab: return "#queryFile";
        case API.byUrlTab: return "#queryUrl";
        default:
            console.log("Unknown queryTab: " + key);
            return key
    }
}

export function updateStateQuery(params, query) {
    if (params['query']) {
        return {
            ...query,
            activeTab: API.byTextTab,
            textArea: params['query'],
            fromParams: true,
            format: params['queryFormat'] ? params['queryFormat'] : API.defaultQueryFormat
        };
    }
    else if (params['queryURL']) {
        return {
            ...query,
            activeTab: API.byUrlTab,
            url: params['queryURL'],
            fromParams: false,
            format: params['queryFormat'] ? params['queryFormat'] : API.defaultQueryFormat
        }
    }
    else if (params['queryFile']) {
        return {
            ...query,
            activeTab: API.byFileTab,
            file: params['queryFile'],
            fromParams: false,
            format: params['queryFormat'] ? params['queryFormat'] : API.defaultQueryFormat
        }
    }
    return query;
}


export function mkQueryTabs(query,setQuery, name, subname) {

    function handleQueryTabChange(value) { setQuery({...query, activeTab: value}); }
    function handleQueryByTextChange(value) { setQuery({...query, textArea: value}); }
    function handleQueryUrlChange(value) { setQuery( {...query, url: value}); }
    function handleQueryFileUpload(value) { setQuery({...query, file: value }); }
    const resetParams = () => setQuery({...query, fromParams: false});

    return (
        <QueryTabs
            name={name}
            subname={subname}
            activeTab={query.activeTab}
            handleTabChange={handleQueryTabChange}

            textAreaValue={query.textArea}
            handleByTextChange={handleQueryByTextChange}

            urlValue={query.url}
            handleUrlChange={handleQueryUrlChange}

            handleFileUpload={handleQueryFileUpload}
            setCodeMirror={(cm) => setQuery({...query, codeMirror: cm})}

            fromParams={query.fromParams}
            resetFromParams={resetParams}

        />
    );
}

export function queryParamsFromQueryParams(params) {
    // if (params["queryURL"]) params["url"] = params["queryURL"];
    // return params;

    let newParams = {};
    if (params.query) newParams["query"] = params.query ;
    if (params.queryURL) {
        newParams["queryURL"] = params.queryURL;
        // newParams["url"] = params.queryURL;
    }
    if (params.queryFile) newParams["queryFile"] = params.queryFile ;
    return newParams;
}
