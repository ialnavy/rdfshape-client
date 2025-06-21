import { useState } from "react";
import { useLocale } from "../../infrastructure_layer/utilities/ExternalisedStringsContext";
import { IEditorState, IEditorStateOperation } from "./IEditorState";

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

    let getEditorStateOperation = (): IEditorStateOperation => {
        let [isError, setError] = useState<boolean>(false);
        let [fullResponse, setFullResponse] = useState<string>(getString("texts.dataInfoWillAppearHere"));
        let [responseMessage, setResponseMessage] = useState<string>("");
        let [responseNumberOfStatements, setResponseNumberOfStatements] = useState<number>(0);
        let [content, setContent] = useState<string | null>(null);

        return {
            isError,
            fullResponse,
            responseMessage,
            responseNumberOfStatements,
            content,

            setError,
            setFullResponse,
            setResponseMessage,
            setResponseNumberOfStatements,
            setContent
        };
    };

    return {
        code,
        rdfFormat,
        rdfInference,
        sourceOfRDFData,

        setCode,
        setRdfFormat,
        setRdfInference,
        setSourceOfRDFData,

        validate: getEditorStateOperation(),
        convertToGraph: getEditorStateOperation(),
        convertToAny: getEditorStateOperation(),
        merge: getEditorStateOperation()
    };
};

export default useEditorState;
