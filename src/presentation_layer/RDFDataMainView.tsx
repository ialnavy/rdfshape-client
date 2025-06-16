import { Container, Divider, Stack, Typography } from "@mui/material";
import { Graphviz } from 'graphviz-react';
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { fetchDataConvertGraphViz, fetchDataInfo } from "../infrastructure_layer/services/RdfShapeApiServices";
import { useLocale } from "../infrastructure_layer/utilities/ExternalisedStringsContext";

import useEditorState from "../domain_layer/editorState/UseEditorState";
import ConfigHeader from "./components/configHeader/ConfigHeader";
import ShareYasheEditor from './components/editor/ShareYasheEditor';
import DataResultFull from "./components/result/DataResultFull";


let RDFDataMainView: React.FC = () => {
    let { getString, getNumber, getBoolean /*, getStringsSet */ } = useLocale();

    // A colaborative document ID is used to identify the document that is being edited
    // This ID will be used to fetch the document from the Yjs server
    // and to persist every change against a MongoDB database
    let { idDoc } = useParams();

    // The location is used to get the current URL path
    // Its first subdirectory is used to determine the collection
    // where the document is stored in the MongoDB database
    // and the Yjs server
    let location = useLocation();

    // Software design pattern State is used to manage the editor state
    // It is used to store all the information related to the editor
    let editorState = useEditorState();

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
            content: editorState.code,
            format: editorState.rdfFormat,
            inference: editorState.rdfInference,
            source: editorState.sourceOfRDFData
        }).then(data => {
            editorState.setError(false);
            editorState.setFullResponse(JSON.stringify(data, null, 2));

            /*
             * Against the RDFShape API,
             * RDF data is converted to GraphViz dot.
             */
            fetchDataConvertGraphViz({
                content: editorState.code,
                format: editorState.rdfFormat,
                inference: editorState.rdfInference,
                source: editorState.sourceOfRDFData
            }).then(data => {
                if (data?.result?.content !== undefined)
                    editorState.setGraphVizContent(data.result.content);
            }).catch(_error => { editorState.setGraphVizContent(null); });

            editorState.setResponseMessage(data.message);
            editorState.setResponseNumberOfStatements(data.result.numberOfStatements);
        }).catch(error => {
            editorState.setError(true);
            editorState.setFullResponse((new String(error)).toString());
            editorState.setGraphVizContent(null);
        });
    };

    /*
     * "doFetch()" function is invoked each time
     * any of the following values changes.
     */
    useEffect(doFetch, [
        editorState.code,
        editorState.rdfFormat,
        editorState.rdfInference,
        editorState.sourceOfRDFData]);

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
            yDocCollection={location.pathname.split("/")[1]}
            editorState={editorState}
            isLineWrapping={isLineWrapping}
            fontSize={fontSize} />
        <Divider orientation="horizontal" textAlign="center" />

        {/*
          * Element for the GraphViz DOT graph.
          */}
        {editorState.graphVizContent !== null && !isHiddenGraph && (
            <Container>
                <Typography variant="caption"
                >{getString("viewTexts.graphCaption")}</Typography>
                <Graphviz dot={editorState.graphVizContent} />
                <Divider orientation="horizontal" textAlign="center" />
            </Container>)}

        {/*
          * Element for the full data resume.
          */}
        {!isHiddenApiResponse && (<>
            <DataResultFull
                isLineWrapping={isLineWrapping}
                fontSize={fontSize}
                editorState={editorState} />
            <Divider orientation="horizontal" textAlign="center" />
        </>)}

    </Stack>);
};

export default RDFDataMainView;
