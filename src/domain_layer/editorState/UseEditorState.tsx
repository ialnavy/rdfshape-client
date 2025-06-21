import { useState } from "react";
import { useLocale } from "../../infrastructure_layer/utilities/ExternalisedStringsContext";
import { IEditorState } from "./IEditorState";

/*
 * This hook is used to manage the state of the editor.
 * It contains all the information related to the editor.
 */
let useEditorState = (): IEditorState => {
    let { getString } = useLocale();

    let [code, setCode] = useState<string>("");
    let [rdfFormat, setRdfFormat] = useState<string>(getString("api.formats.turtle"));
    let [rdfInference, setRdfInference] = useState<string>(getString("api.inference.none"));
    let [sourceOfRDFData, setSourceOfRDFData] = useState<string>(getString("api.sources.byText"));

    let [isError, setError] = useState<boolean>(false);
    let [fullResponse, setFullResponse] = useState<string>(getString("texts.dataInfoWillAppearHere"));
    let [responseMessage, setResponseMessage] = useState<string>("");
    let [responseNumberOfStatements, setResponseNumberOfStatements] = useState<number>(0);
    let [graphVizContent, setGraphVizContent] = useState<string | null>(null);
    let [convertedRdfData, setConvertedRdfData] = useState<string | null>(null);

    return {
        code,
        rdfFormat,
        rdfInference,
        sourceOfRDFData,

        isError,
        fullResponse,
        responseMessage,
        responseNumberOfStatements,
        graphVizContent,
        convertedRdfData,

        setCode,
        setRdfFormat,
        setRdfInference,
        setSourceOfRDFData,

        setError,
        setFullResponse,
        setResponseMessage,
        setResponseNumberOfStatements,
        setGraphVizContent,
        setConvertedRdfData
    };
};

export default useEditorState;
