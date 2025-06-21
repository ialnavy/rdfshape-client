import { Button, Container, Divider, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { Graphviz } from 'graphviz-react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useLocale } from "../infrastructure_layer/utilities/ExternalisedStringsContext";

import { isDesktop } from "../domain_layer/AdaptabilityChecks";
import EditorFactory from "../domain_layer/EditorFactory";
import useEditorState from "../domain_layer/editorState/UseEditorState";
import { forConvertRdfDataToGraphVizDot, forRdfDataConvert, forRdfDataInfo } from "../domain_layer/RdfShapeStrategiesFactory";
import ConfigHeader from "./components/configHeader/ConfigHeader";
import DataComboBox from "./components/dataComboBox/DataComboBox";
import ShareYasheTurtleEditor from "./components/editor/ShareYasheTurtleEditor";
import DataResultFull from "./components/fullResponse/FullResponse";
import PermalinkButton from "./components/permalinkButton/PermalinkButton";



let RDFDataMainView: React.FC = () => {
    let { getString, getNumber, getBoolean, getStringsSet } = useLocale();

    // A colaborative document ID is used to identify the document that is being edited
    // This ID will be used to fetch the document from the Yjs server
    // and to persist every change against a MongoDB database
    let { idDocParam } = useParams();
    let idDoc = idDocParam === undefined ? null : idDocParam;

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

    let [rdfFormatConvert, setRdfFormatConvert] = useState<string>(getString("api.formats.turtle"));
    let setRdfConvertError = () => {
        editorState.convertToAny.setError(true);
    };

    /*
     * Function is invoked each time
     * any of the following values changes.
     */
    useEffect(
        () => {
            forRdfDataInfo(editorState,
                forConvertRdfDataToGraphVizDot(editorState))();
            editorState.convertToAny.setContent(null);
        },
        [
            editorState.code,
            editorState.rdfFormat,
            editorState.rdfInference,
            editorState.sourceOfRDFData
        ]);

    return (<Container>
        <Stack
            direction="column"
            spacing={2}
            className="rdfDataMainView"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            justifyItems="center">

            {/*
              * Element for view configuration.
              */}
            <ConfigHeader
                idDocs={idDoc !== null ? [idDoc] : []}
                yjsCollection={getString("yjs.collections.rdfData")}
                permalinkButtonText={getString("viewTexts.rdfData.permalink.toRdfData")}

                isLineWrapping={isLineWrapping}
                isHiddenApiResponse={isHiddenApiResponse}
                isHiddenGraph={isHiddenGraph}
                fontSize={fontSize}

                setLineWrapping={setLineWrapping}
                setHiddenApiResponse={setHiddenApiResponse}
                setHiddenGraph={setHiddenGraph}
                setFontSize={setFontSize} />

            {/*
              * Element for the main editor.
              */}
            <ShareYasheTurtleEditor
                idDoc={idDoc}
                yDocCollection={getString("yjs.collections.rdfData")}
                editorState={editorState}
                isLineWrapping={isLineWrapping}
                fontSize={fontSize}
                isEditable={true} />

            <Grid
                container
                alignContent="center"
                alignItems="center"
                justifyContent="center"
                justifyItems="center"
                sx={{ width: "100%" }}>

                <Grid size={isDesktop() ? 6 : 12}>
                    <PermalinkButton
                        idDocs={idDoc !== null ? [idDoc] : []}
                        yjsCollection={getString("yjs.collections.rdfMerge")}
                        permalinkButtonText={getString("viewTexts.rdfData.permalink.toRdfMerge")} />
                </Grid>

                <Grid size={isDesktop() ? 6 : 12}>
                    <Stack
                        direction="column"
                        spacing={2}
                        padding={1}
                        alignContent="center"
                        alignItems="center"
                        justifyContent="center"
                        justifyItems="center">
                        <DataComboBox
                            inputId={"rdfDataFormatConvert"}
                            label={getString("viewTexts.rdfData.convert.comboBox")}
                            setOfData={Object.values(getStringsSet("api.formats"))}
                            data={rdfFormatConvert}
                            setData={setRdfFormatConvert} />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={
                                forRdfDataInfo(editorState,
                                    forRdfDataConvert(editorState,
                                        rdfFormatConvert,
                                        () => { },
                                        setRdfConvertError),
                                    // Error callback RDF data info
                                    setRdfConvertError)}
                            sx={{ marginTop: 2, alignSelf: "center", justifyContent: "center" }}
                        >{getString("viewTexts.rdfData.convert.button")}</Button>
                    </Stack>
                </Grid>

            </Grid>

        </Stack>

        {/*
          * Element for the converted RDF data.
          */}
        {
            !editorState.convertToAny.isError && editorState.convertToAny.content !== null && (<Stack
                direction="column"
                spacing={2}
                padding={1}
                alignContent="center"
                alignItems="center"
                justifyContent="center"
                justifyItems="center"
                sx={{ width: "100%" }}>
                <Typography variant="caption"
                >{getString("viewTexts.rdfData.editorTitleConverted")}</Typography>
                <EditorFactory
                    code={editorState.convertToAny.content ?? undefined}
                    language={rdfFormatConvert}
                    editable={false}
                    isLineWrapping={isLineWrapping}
                    fontSize={fontSize}
                    setCode={editorState.convertToAny.setContent} />
            </Stack>)
        }

        {/*
          * Element for the GraphViz DOT graph.
          */}
        {editorState.convertToGraph.content !== null && !isHiddenGraph && (
            <Stack
                direction="column"
                spacing={2}
                padding={1}
                alignContent="center"
                alignItems="center"
                justifyContent="center"
                justifyItems="center">
                <Typography variant="caption"
                >{getString("viewTexts.graphCaption")}</Typography>
                <Graphviz dot={editorState.convertToGraph.content} />
                <Divider orientation="horizontal" textAlign="center" />
            </Stack>)}

        {/*
          * Element for the full data resume.
          */}
        {!isHiddenApiResponse && (<Stack
            direction="column"
            spacing={2}
            padding={1}
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            justifyItems="center">
            <DataResultFull
                isError={editorState.validate.isError}
                fullResponse={editorState.validate.fullResponse}

                isLineWrapping={isLineWrapping}
                fontSize={fontSize} />
        </Stack>)}
    </Container>);
};

export default RDFDataMainView;
