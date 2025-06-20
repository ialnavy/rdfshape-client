import { Button, Container, Divider, Grid2 as Grid, Typography } from "@mui/material";
import { useState } from "react";

import { useLocale } from "../infrastructure_layer/utilities/ExternalisedStringsContext";

import { useSearchParams } from "react-router-dom";
import { isDesktop } from "../domain_layer/AdaptabilityChecks";
import EditorFactory from "../domain_layer/EditorFactory";
import useEditorState from "../domain_layer/editorState/UseEditorState";
import { forRdfDataInfo, forRdfDataMerge } from "../domain_layer/RdfShapeStrategiesFactory";
import { generateRandomUuidForYjsDoc } from "../infrastructure_layer/services/YjsDocServiceLayer";
import ConfigHeader from "./components/configHeader/ConfigHeader";
import ShareYasheTurtleEditor from './components/editor/ShareYasheTurtleEditor';
import DataResultFull from "./components/fullResponse/FullResponse";
import DataResultResume from "./components/resumeResponse/ResumeResponse";


let RDFDataMergeView: React.FC = () => {
    let [searchParams] = useSearchParams();
    let { getString, getNumber, getBoolean /*, getStringsSet */ } = useLocale();

    // A colaborative document ID is used to identify the document that is being edited
    // This ID will be used to fetch the document from the Yjs server
    // and to persist every change against a MongoDB database
    let idDocLeft = searchParams.has('idDocLeft') ? searchParams.get('idDocLeft') : generateRandomUuidForYjsDoc();
    let idDocRight = searchParams.has('idDocRight') ? searchParams.get('idDocRight') : generateRandomUuidForYjsDoc();

    // Software design pattern State is used to manage the editor state
    // It is used to store all the information related to the editor
    let editorStateLeft = useEditorState();
    let editorStateRight = useEditorState();
    let editorStateMerged = useEditorState();

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

    /*
     * This function is executed whenever any of the RDF documents,
     * left or right, has a validation error.
     */
    let setRdfMergeError = () => {
        editorStateMerged.setError(true);
        editorStateMerged.setFullResponse(getString("viewTexts.genericDocumentError"));
    };

    return (<Container>
        <Grid
            container
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            justifyItems="center"
            sx={{ width: "100%" }}>

            <Grid size={12}>
                <ConfigHeader
                    idDocs={idDocLeft !== null ? (idDocRight !== null ? [idDocLeft, idDocRight] : []) : []}
                    yjsCollection={getString("yjs.collections.rdfMerge")}

                    isLineWrapping={isLineWrapping}
                    isHiddenApiResponse={isHiddenApiResponse}
                    isHiddenGraph={isHiddenGraph}
                    fontSize={fontSize}

                    setLineWrapping={setLineWrapping}
                    setHiddenApiResponse={setHiddenApiResponse}
                    setHiddenGraph={setHiddenGraph}
                    setFontSize={setFontSize} />
            </Grid>

            <Grid size={12}>
                <DataResultResume
                    isError={editorStateMerged.isError}
                    fullResponse={editorStateMerged.fullResponse} />
            </Grid>

            <Grid size={isDesktop() ? 6 : 12}>
                <ShareYasheTurtleEditor
                    idDoc={idDocLeft}
                    yDocCollection={"rdfMerge"}
                    editorState={editorStateLeft}
                    isLineWrapping={isLineWrapping}
                    fontSize={fontSize}
                    isEditable={true} />
                <Typography variant="caption"
                >{getString("viewTexts.rdfMerge.editorTitleLeft")}</Typography>
            </Grid>

            <Grid size={isDesktop() ? 6 : 12}>
                <ShareYasheTurtleEditor
                    idDoc={idDocRight}
                    yDocCollection={"rdfMerge"}
                    editorState={editorStateRight}
                    isLineWrapping={isLineWrapping}
                    fontSize={fontSize}
                    isEditable={true} />
                <Typography variant="caption"
                >{getString("viewTexts.rdfMerge.editorTitleRight")}</Typography>
            </Grid>

            <Grid size={12} justifySelf={"center"} alignSelf="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={forRdfDataInfo(editorStateLeft,
                        // Callback
                        forRdfDataInfo(editorStateRight,
                            forRdfDataMerge(editorStateLeft,
                                editorStateRight,
                                editorStateMerged),
                            // Error callback
                            setRdfMergeError),
                        // Error callback
                        setRdfMergeError)}
                    sx={{ marginTop: 2, alignSelf: "center", justifyContent: "center" }}
                >{getString("viewTexts.rdfMerge.buttonRdfMerge")}</Button>
            </Grid>

        </Grid>

        {/*
          * Element for the merged RDF data.
          */}
        {
            !editorStateMerged.isError && editorStateMerged.code !== "" && (<>
                <Typography variant="caption"
                >{getString("viewTexts.rdfMerge.editorTitleMerged")}</Typography>
                <EditorFactory
                    code={editorStateMerged.code}
                    language={getString("mimeTypes.turtle")}
                    editable={false}
                    isLineWrapping={isLineWrapping}
                    fontSize={fontSize}
                    setCode={editorStateMerged.setCode} />
                <Divider orientation="horizontal" textAlign="center" />
            </>)
        }

        {/*
          * Element for the full response from RdfShape API.
          */}
        {
            !isHiddenApiResponse && (<>
                <DataResultFull
                    isError={editorStateMerged.isError}
                    fullResponse={editorStateMerged.fullResponse}
                    isLineWrapping={isLineWrapping}
                    fontSize={fontSize} />
                <Divider orientation="horizontal" textAlign="center" />
            </>)
        }
    </Container>);
};

export default RDFDataMergeView;
