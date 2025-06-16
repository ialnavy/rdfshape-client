import { Container, Divider, Stack, Typography } from "@mui/material";
import { Graphviz } from 'graphviz-react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchDataConvertGraphViz, fetchDataInfo } from "../infrastructure_layer/services/RdfShapeApiServices";
import { useLocale } from "../infrastructure_layer/utilities/ExternalisedStringsContext";

import ConfigHeader from "./components/configHeader/ConfigHeader";
import ShareYasheEditor from './components/editor/ShareYasheEditor';
import DataResultFull from "./components/result/DataResultFull";


let RDFDataMainView: React.FC = () => {
    let { getString, getNumber, getBoolean /*, getStringsSet */ } = useLocale();

    // The idDoc is used to identify the document that is being edited
    let { idDoc } = useParams();

    // These variables are used for querying against RDFShape API
    let [code, setCode] = useState<string>("");
    let [rdfFormat, setRdfFormat] = useState<string>(getString("api.formats.turtle"));
    let [rdfInference, setRdfInference] = useState<string>(getString("api.inference.none"));
    let [sourceOfRDFData /*, setSourceOfRDFData */] = useState<string>(getString("api.sources.byText"));

    // These variables are used for assemblying the result of the previous query
    let [isError, setError] = useState<boolean>(false);
    let [fullResponse, setFullResponse] = useState<string>(getString("texts.dataInfoWillAppearHere"));
    let [responseMessage, setResponseMessage] = useState<string>("");
    let [responseNumberOfStatements, setResponseNumberOfStatements] = useState<number>(0);
    let [graphVizContent, setGraphVizContent] = useState<string | null>(null);

    // These variables are used for conditional rendering of React subelements
    let [isHiddenApiResponse, setHiddenApiResponse] = useState<boolean>(getBoolean("defaultBehaviour.hidApiResponse"));
    let [isHiddenGraph, setHiddenGraph] = useState<boolean>(getBoolean("defaultBehaviour.hidRdfGraph"));
    let [isLineWrapping, setLineWrapping] = useState<boolean>(getBoolean("defaultBehaviour.lineWrapping"));
    let [fontSize, _setFontSize] = useState<number>(getNumber("defaultBehaviour.editorFontSizePx"));
    let setFontSize = (fontSize: number) => {
        if (fontSize >= getNumber("limits.minEditorFontSizePx")
            && fontSize <= getNumber("limits.maxEditorFontSizePx"))
            _setFontSize(fontSize);
    };

    let doFetch = () => {
        /*
         * Against the RDFShape API,
         * RDF data is validated.
         */
        fetchDataInfo({
            content: code,
            format: rdfFormat,
            inference: rdfInference,
            source: sourceOfRDFData
        }).then(data => {
            setError(false);
            setFullResponse(JSON.stringify(data, null, 2));

            /*
             * Against the RDFShape API,
             * RDF data is converted to GraphViz dot.
             */
            fetchDataConvertGraphViz({
                content: code,
                format: rdfFormat,
                inference: rdfInference,
                source: sourceOfRDFData
            }).then(data => {
                if (data?.result?.content !== undefined)
                    setGraphVizContent(data.result.content);
            }).catch(_error => { setGraphVizContent(null); });

            setResponseMessage(data.message);
            setResponseNumberOfStatements(data.result.numberOfStatements);
        }).catch(error => {
            setError(true);
            setFullResponse((new String(error)).toString());
            setGraphVizContent(null);
        });
    };

    /*
     * "doFetch()" function is invoked each time the code,
     * rdfFormat, rdfInference, or sourceOfRDFData changes.
     */
    useEffect(doFetch, [code, rdfFormat, rdfInference, sourceOfRDFData]);

    return (<Stack
        direction="column"
        spacing={2}
        className="rdfDataMainView"
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        justifyItems="center">

        <Divider orientation="horizontal" textAlign="center" />

        {/*
          * Element for view configuration.
          */}
        <ConfigHeader
            isLineWrapping={isLineWrapping}
            isHiddenApiResponse={isHiddenApiResponse}
            isHiddenGraph={isHiddenGraph}
            fontSize={fontSize}

            setLineWrapping={setLineWrapping}
            setHiddenApiResponse={setHiddenApiResponse}
            setHiddenGraph={setHiddenGraph}
            setFontSize={setFontSize} />
        <Divider orientation="horizontal" textAlign="center" />

        {/*
          * Element for the main editor.
          */}
        <ShareYasheEditor
            idDoc={idDoc}
            yDocCollection={"rdfData"}
            code={code}
            isLineWrapping={isLineWrapping}
            fontSize={fontSize}

            setCode={setCode}

            isError={isError}
            fullResponse={fullResponse}
            responseMessage={responseMessage}
            responseNumberOfStatements={responseNumberOfStatements}

            rdfFormat={rdfFormat}
            rdfInference={rdfInference}
            setRdfFormat={setRdfFormat}
            setRdfInference={setRdfInference} />
        <Divider orientation="horizontal" textAlign="center" />

        {/*
          * Element for the GraphViz DOT graph.
          */}
        {graphVizContent !== null && !isHiddenGraph && (
            <Container>
                <Typography variant="caption"
                >{getString("viewTexts.graphCaption")}</Typography>
                <Graphviz dot={graphVizContent} />
                <Divider orientation="horizontal" textAlign="center" />
            </Container>)}

        {/*
          * Element for the full data resume.
          */}
        {!isHiddenApiResponse && (<>
            <DataResultFull
                isError={isError}
                fullResponse={fullResponse}

                isLineWrapping={isLineWrapping}
                fontSize={fontSize}

                responseMessage={responseMessage}
                responseNumberOfStatements={responseNumberOfStatements} />
            <Divider orientation="horizontal" textAlign="center" />
        </>)}

    </Stack>);
};

export default RDFDataMainView;
