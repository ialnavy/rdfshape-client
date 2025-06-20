import { Button, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";

import { fetchDataInfo, fetchDataMerge } from "../infrastructure_layer/services/RdfShapeApiServices";
import { useLocale } from "../infrastructure_layer/utilities/ExternalisedStringsContext";

import { isDesktop } from "../domain_layer/AdaptabilityChecks";
import useEditorState from "../domain_layer/editorState/UseEditorState";
import { generateRandomUuidForYjsDoc } from "../infrastructure_layer/services/YjsDocServiceLayer";
import ConfigHeader from "./components/configHeader/ConfigHeader";
import DataResultFull from "./components/fullResponse/FullResponse";
import ShareYasheEditor from './components/yEditor/ShareYasheEditor';
import DataResultResume from "./components/resumeResponse/ResumeResponse";


let RDFDataMergeView: React.FC = () => {
    let { getString, getNumber, getBoolean /*, getStringsSet */ } = useLocale();

    // A colaborative document ID is used to identify the document that is being edited
    // This ID will be used to fetch the document from the Yjs server
    // and to persist every change against a MongoDB database
    let idDocLeft = generateRandomUuidForYjsDoc();
    let idDocRight = generateRandomUuidForYjsDoc();

    // Software design pattern State is used to manage the editor state
    // It is used to store all the information related to the editor
    let editorStateLeft = useEditorState();
    let editorStateRight = useEditorState();

    let [isError, setError] = useState<boolean>(false);
    let [fullResponse, setFullResponse] = useState<string>(getString("texts.dataInfoWillAppearHere"));

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
         * RDF data left is validated.
         */
        fetchDataInfo({
            content: editorStateLeft.code,
            format: editorStateLeft.rdfFormat,
            inference: editorStateLeft.rdfInference,
            source: editorStateLeft.sourceOfRDFData
        }).then(data => {
            editorStateLeft.setError(false);
            editorStateLeft.setFullResponse(JSON.stringify(data, null, 2));
            editorStateLeft.setResponseMessage(data.message);
            editorStateLeft.setResponseNumberOfStatements(data.result.numberOfStatements);

            /*
             * Against the RDFShape API,
             * RDF data right is validated.
             */
            fetchDataInfo({
                content: editorStateRight.code,
                format: editorStateRight.rdfFormat,
                inference: editorStateRight.rdfInference,
                source: editorStateRight.sourceOfRDFData
            }).then(data => {
                editorStateRight.setError(false);
                editorStateRight.setFullResponse(JSON.stringify(data, null, 2));
                editorStateRight.setResponseMessage(data.message);
                editorStateRight.setResponseNumberOfStatements(data.result.numberOfStatements);

                /*
                 * Against the RDFShape API,
                 * RDF data left and RDF data right are merged.
                 */
                fetchDataMerge({
                    content: [{
                        content: editorStateLeft.code,
                        format: editorStateLeft.rdfFormat,
                        inference: editorStateLeft.rdfInference,
                        source: editorStateLeft.sourceOfRDFData
                    }, {
                        content: editorStateRight.code,
                        format: editorStateRight.rdfFormat,
                        inference: editorStateRight.rdfInference,
                        source: editorStateRight.sourceOfRDFData
                    }],
                    targetFormat: editorStateLeft.rdfFormat
                }).then(data => {
                    setError(false);
                    setFullResponse((new String(data)).toString());
                    console.log(data); // TBD
                }).catch(error => {
                    setError(true);
                    setFullResponse((new String(error)).toString());
                });
            }).catch(error => {
                editorStateRight.setError(true);
                editorStateRight.setFullResponse((new String(error)).toString());
                editorStateRight.setGraphVizContent(null);

                setError(true);
                setFullResponse(getString("viewTexts.genericDocumentError"));
            });
        }).catch(error => {
            editorStateLeft.setError(true);
            editorStateLeft.setFullResponse((new String(error)).toString());
            editorStateLeft.setGraphVizContent(null);

            setError(true);
            setFullResponse(getString("viewTexts.genericDocumentError"));
        });
    };

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

        <DataResultResume
            isError={isError}
            fullResponse={fullResponse} />
        <Divider orientation="horizontal" textAlign="center" />

        {/*
          * Element for the main editor.
          */}
        <Grid
            container
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            justifyItems="center"
            sx={{ width: "100%" }}>

            <Grid size={isDesktop() ? 6 : 12}>
                <Typography variant="caption"
                >{getString("viewTexts.rdfMerge.editorTitleLeft")}</Typography>
                <ShareYasheEditor
                    idDoc={idDocLeft}
                    yDocCollection={"rdfMerge"}
                    editorState={editorStateLeft}
                    isLineWrapping={isLineWrapping}
                    fontSize={fontSize} />
                <Divider orientation="horizontal" textAlign="center" />
            </Grid>

            <Grid size={isDesktop() ? 6 : 12}>
                <Typography variant="caption"
                >{getString("viewTexts.rdfMerge.editorTitleRight")}</Typography>
                <ShareYasheEditor
                    idDoc={idDocRight}
                    yDocCollection={"rdfMerge"}
                    editorState={editorStateRight}
                    isLineWrapping={isLineWrapping}
                    fontSize={fontSize} />
                <Divider orientation="horizontal" textAlign="center" />
            </Grid>

        </Grid>

        <Button
            variant="contained"
            color="primary"
            onClick={doFetch}
            sx={{ marginTop: 2 }}
        >{getString("viewTexts.rdfMerge.buttonRdfMerge")}</Button>

        {/*
          * Element for the full data resume.
          */}
        {!isHiddenApiResponse && (<>
            <DataResultFull
                isError={isError}
                fullResponse={fullResponse}
                isLineWrapping={isLineWrapping}
                fontSize={fontSize} />
            <Divider orientation="horizontal" textAlign="center" />
        </>)}

    </Stack>);
};

export default RDFDataMergeView;
