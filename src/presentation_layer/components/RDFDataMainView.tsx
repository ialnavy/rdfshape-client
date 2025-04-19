import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useLocale } from "../../presentation_layer/containers/ExternalisedStringsContext";

import { useWindowDimensions } from "../../infrastructure_layer/utilities/ReactElementsUtils";
import RDFDataDesktopView from "./rdfData/RDFDataDesktopView";
import RDFDataMobileView from "./rdfData/RDFDataMobileView";

import EditorFactory from "../../domain_layer/use_cases/EditorFactory";
import { fetchRDFDataInfo } from '../../infrastructure_layer/services/FetchRdfData';


let RDFDataMainView: React.FC = () => {
    let { getString, getNumber, getBoolean, getStringsSet } = useLocale();

    // The idDoc is used to identify the document that is being edited
    let { idDoc } = useParams();

    // These variables are used for querying against RDFShape API
    let [code, setCode] = useState<string>(getString("defaultScripts.rdfData"));
    let [rdfFormat, setRdfFormat] = useState<string>(getString("api.formats.turtle"));
    let [rdfInference, setRdfInference] = useState<string>(getString("api.inference.none"));
    let [sourceOfRDFData, setSourceOfRDFData] = useState<string>(getString("api.sources.byText"));

    // These variables are used for assemblying the result of the previous query
    let [isError, setError] = useState<boolean>(false);
    let [fullResponse, setFullResponse] = useState<string>(getString("texts.dataInfoWillAppearHere"));
    let [responseMessage, setResponseMessage] = useState<string>("");
    let [responseNumberOfStatements, setResponseNumberOfStatements] = useState<number>(0);

    // These variables are used for conditional rendering of React subelements
    let [isHiddenApiResponse, setHiddenApiResponse] = useState<boolean>(getBoolean("defaultBehaviour.hidApiResponse"));
    let [isLineWrapping, setLineWrapping] = useState<boolean>(getBoolean("defaultBehaviour.lineWrapping"));
    let [fontSize, _setFontSize] = useState<number>(getNumber("defaultBehaviour.editorFontSizePx"));
    let setFontSize = (value: number) => {
        if (value >= getNumber("limits.minEditorFontSizePx")
            && value <= getNumber("limits.maxEditorFontSizePx")) {
            _setFontSize(value);
        }
    };
    let [editor, setEditor] = useState<React.ReactNode>(null);

    useEffect(() => {
        if (idDoc === undefined)
            idDoc = getString("api.defaultWssDocId");
        setEditor(
            <EditorFactory
                code={code}
                idDoc={idDoc}
                language={getString("mimeTypes.turtle")}
                editable={true}
                isLineWrapping={isLineWrapping}
                fontSize={fontSize}
                onChange={(value: string) => { setCode(value); }}
            />
        );
    }, [isLineWrapping, fontSize]);

    let doFetch = () => {
        fetchRDFDataInfo({
            host: (process.env.RDFSHAPE_API_HOST as string) ?? "http://127.0.0.1:8080/api",
            endpoints: getStringsSet("api.endpoints"),
            contentType: getString("mimeTypes.json.appJSON"),
            content: code, format: rdfFormat, inference: rdfInference, source: sourceOfRDFData
        }).then(data => {
            setError(false);
            setFullResponse(JSON.stringify(data, null, 2));

            setResponseMessage(data.message);
            setResponseNumberOfStatements(data.result.numberOfStatements);
        }).catch(error => {
            setError(true);
            setFullResponse((new String(error)).toString());
        });
    };

    useEffect(doFetch, [code, rdfFormat, rdfInference, sourceOfRDFData]);

    return (useWindowDimensions().width < getNumber("limits.adaptabilityThresholdPx")) ? (
        <RDFDataMobileView
            code={code}
            rdfFormat={rdfFormat}
            rdfInference={rdfInference}
            sourceOfRDFData={sourceOfRDFData}

            isError={isError}
            fullResponse={fullResponse}
            responseMessage={responseMessage}
            responseNumberOfStatements={responseNumberOfStatements}

            isHiddenApiResponse={isHiddenApiResponse}
            isLineWrapping={isLineWrapping}
            fontSize={fontSize}
            editor={editor}


            setCode={setCode}
            setRdfFormat={setRdfFormat}
            setRdfInference={setRdfInference}
            setSourceOfRDFData={setSourceOfRDFData}

            setError={setError}
            setFullResponse={setFullResponse}
            setResponseMessage={setResponseMessage}
            setResponseNumberOfStatements={setResponseNumberOfStatements}

            setHiddenApiResponse={setHiddenApiResponse}
            setLineWrapping={setLineWrapping}
            setFontSize={setFontSize}
            setEditor={setEditor} />
    ) : (
        <RDFDataDesktopView
            code={code}
            rdfFormat={rdfFormat}
            rdfInference={rdfInference}
            sourceOfRDFData={sourceOfRDFData}

            isError={isError}
            fullResponse={fullResponse}
            responseMessage={responseMessage}
            responseNumberOfStatements={responseNumberOfStatements}

            isHiddenApiResponse={isHiddenApiResponse}
            isLineWrapping={isLineWrapping}
            fontSize={fontSize}
            editor={editor}


            setCode={setCode}
            setRdfFormat={setRdfFormat}
            setRdfInference={setRdfInference}
            setSourceOfRDFData={setSourceOfRDFData}

            setError={setError}
            setFullResponse={setFullResponse}
            setResponseMessage={setResponseMessage}
            setResponseNumberOfStatements={setResponseNumberOfStatements}

            setHiddenApiResponse={setHiddenApiResponse}
            setLineWrapping={setLineWrapping}
            setFontSize={setFontSize}
            setEditor={setEditor} />);
};

export default RDFDataMainView;
