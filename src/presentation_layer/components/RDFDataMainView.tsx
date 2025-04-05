import React, { useEffect, useState } from "react";

import { useLocale } from "../../presentation_layer/containers/ExternalisedStringsContext";

import { useWindowDimensions } from "../../infrastructure_layer/utilities/ReactElementsUtils";
import RDFDataDesktopView from "./rdfData/RDFDataDesktopView";
import RDFDataMobileView from "./rdfData/RDFDataMobileView";

import EditorFactory from "../../domain_layer/use_cases/EditorFactory";
import { fetchRDFDataInfo } from '../../infrastructure_layer/services/FetchRdfData';


let RDFDataMainView: React.FC = () => {
    let { getString, getNumber, getBoolean, getStringsSet } = useLocale();

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
    let [editor, setEditor] = useState<React.ReactNode>(null);

    useEffect(() => {
        setEditor(
            <EditorFactory
                code={code}
                language={getString("mimeTypes.turtle")}
                editable={true}
                isLineWrapping={isLineWrapping}
                onChange={(value: string) => { setCode(value); }}
            />
        );
    }, [isLineWrapping]);

    let doFetch = () => {
        fetchRDFDataInfo({
            host: getString("api.host"),
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
            setEditor={setEditor} />);
};

export default RDFDataMainView;
