import { Button, Container, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useLocale } from "../infrastructure_layer/utilities/ExternalisedStringsContext";

import { useNavigate, useSearchParams } from "react-router-dom";
import { isDesktop } from "../domain_layer/AdaptabilityChecks";
import EditorFactory from "../domain_layer/EditorFactory";
import { IEditorStateOperation } from "../domain_layer/editorState/IEditorState";
import useEditorState from "../domain_layer/editorState/UseEditorState";
import { forRdfMerge } from "../domain_layer/PermalinkFactory";
import { forRdfDataInfo, forRdfDataMerge } from "../domain_layer/RdfShapeStrategiesFactory";
import { generateRandomUuidForYjsDoc } from "../infrastructure_layer/services/YjsDocServiceLayer";
import ConfigHeader from "./components/configHeader/ConfigHeader";
import ShareYasheTurtleEditor from './components/editor/ShareYasheTurtleEditor';
import DataResultFull from "./components/fullResponse/FullResponse";
import PermalinkButton from "./components/permalinkButton/PermalinkButton";
import DataResultResume from "./components/resumeResponse/ResumeResponse";


let RDFDataMergeView: React.FC = () => {
    let [searchParams] = useSearchParams();
    let navigate = useNavigate();
    let { getString, getNumber, getBoolean /*, getStringsSet */ } = useLocale();

    /*
     * A colaborative document ID is used to identify the document that is being edited
     * This ID will be used to fetch the document from the Yjs server
     * and to persist every change against a MongoDB database
     */
    let hasIdDocLeft: boolean = searchParams.has('idDocLeft');
    let hasIdDocRight: boolean = searchParams.has('idDocRight');
    let idDocLeft = hasIdDocLeft ? searchParams.get('idDocLeft') : generateRandomUuidForYjsDoc();
    let idDocRight = hasIdDocRight ? searchParams.get('idDocRight') : generateRandomUuidForYjsDoc();

    /*
     * The IDs of the RDF documents must be shown as query parameters
     * in the URL, so that the user can share the link with others.
     * Otherwise, the user would lose the changes if they refresh the page.
     */
    if (!hasIdDocLeft || !hasIdDocRight)
        navigate(forRdfMerge(idDocLeft !== null ? (idDocRight !== null ? [idDocLeft, idDocRight] : []) : [],
            getString("yjs.collections.rdfMerge")));

    /*
     * Software design pattern State is used to manage the editor state
     * It is used to store all the information related to the editor
     */
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
    let setOperationError = (operationState: IEditorStateOperation) => {
        operationState.setError(true);
        operationState.setFullResponse(getString("viewTexts.genericDocumentError"));
    };

    let doMerge = () => {
        forRdfDataInfo(editorStateLeft,
            // Callback editor left
            forRdfDataInfo(editorStateRight,
                // Callback editor right
                forRdfDataMerge(editorStateLeft,
                    editorStateRight,
                    editorStateMerged
                    // No callbacks for editor merged
                ),
                // Error callback editor right
                () => { setOperationError(editorStateMerged.merge); }),
            // Error callback editor left
            () => { setOperationError(editorStateMerged.merge); })();
    };

    useEffect(() => {
        forRdfDataInfo(editorStateLeft,
            () => { },
            () => { setOperationError(editorStateLeft.validate); })();
        // Reset quieries
        editorStateMerged.merge.setContent(null);
    }, [
        editorStateLeft.code,
        editorStateLeft.rdfFormat,
        editorStateLeft.rdfInference,
        editorStateLeft.sourceOfRDFData
    ]);

    useEffect(() => {
        forRdfDataInfo(editorStateRight,
            () => { },
            () => { setOperationError(editorStateRight.validate); })();
        // Reset quieries
        editorStateMerged.merge.setContent(null);
    }, [
        editorStateRight.code,
        editorStateRight.rdfFormat,
        editorStateRight.rdfInference,
        editorStateRight.sourceOfRDFData
    ]);

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
                    permalinkButtonText={getString("viewTexts.rdfMerge.permalink.toRdfMerge")}

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
                    isError={editorStateMerged.merge.isError}
                    fullResponse={editorStateMerged.merge.fullResponse}
                    responseMessage={editorStateMerged.merge.responseMessage} />
            </Grid>

            <Grid size={isDesktop() ? 6 : 12}>
                <Stack
                    direction="column"
                    spacing={2}
                    className="rdfDataMainView"
                    alignContent="center"
                    alignItems="center"
                    justifyContent="center"
                    justifyItems="center">
                    <ShareYasheTurtleEditor
                        idDoc={idDocLeft}
                        yDocCollection={getString("yjs.collections.rdfData")}
                        editorState={editorStateLeft}
                        isLineWrapping={isLineWrapping}
                        fontSize={fontSize}
                        isEditable={true} />
                    <Typography variant="caption"
                    >{getString("viewTexts.rdfMerge.editorTitleLeft")}</Typography>
                    <PermalinkButton
                        idDocs={idDocLeft !== null ? [idDocLeft] : []}
                        yjsCollection={getString("yjs.collections.rdfData")}
                        permalinkButtonText={getString("viewTexts.rdfMerge.permalink.toRdfData")} />
                </Stack>
            </Grid>

            <Grid size={isDesktop() ? 6 : 12}>
                <Stack
                    direction="column"
                    spacing={2}
                    className="rdfDataMainView"
                    alignContent="center"
                    alignItems="center"
                    justifyContent="center"
                    justifyItems="center">
                    <ShareYasheTurtleEditor
                        idDoc={idDocRight}
                        yDocCollection={getString("yjs.collections.rdfData")}
                        editorState={editorStateRight}
                        isLineWrapping={isLineWrapping}
                        fontSize={fontSize}
                        isEditable={true} />
                    <Typography variant="caption"
                    >{getString("viewTexts.rdfMerge.editorTitleRight")}</Typography>
                    <PermalinkButton
                        idDocs={idDocRight !== null ? [idDocRight] : []}
                        yjsCollection={getString("yjs.collections.rdfData")}
                        permalinkButtonText={getString("viewTexts.rdfMerge.permalink.toRdfData")} />
                </Stack>
            </Grid>

            <Grid size={12} justifySelf={"center"} alignSelf="center">
                <Stack
                    direction="column"
                    spacing={2}
                    padding={1}
                    alignContent="center"
                    alignItems="center"
                    justifyContent="center"
                    justifyItems="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={doMerge}
                        sx={{ marginTop: 2, alignSelf: "center", justifyContent: "center" }}
                    >{getString("viewTexts.rdfMerge.buttonRdfMerge")}</Button>
                </Stack>
            </Grid>

        </Grid>

        {/*
          * Element for the merged RDF data.
          */}
        {
            !editorStateMerged.merge.isError &&
            editorStateMerged.merge.content !== null && (
                <Stack
                    direction="column"
                    spacing={2}
                    padding={1}
                    alignContent="center"
                    alignItems="center"
                    justifyContent="center"
                    justifyItems="center"
                    sx={{ width: "100%" }}>
                    <Typography variant="caption"
                    >{getString("viewTexts.rdfMerge.editorTitleMerged")}</Typography>
                    <EditorFactory
                        code={editorStateMerged.code}
                        language={getString("mimeTypes.turtle")}
                        editable={false}
                        isLineWrapping={isLineWrapping}
                        fontSize={fontSize}
                        setCode={editorStateMerged.setCode} />
                </Stack>)
        }

        {/*
          * Element for the full response from RdfShape API.
          */}
        {
            !isHiddenApiResponse && (<Stack
                direction="column"
                spacing={2}
                padding={1}
                alignContent="center"
                alignItems="center"
                justifyContent="center"
                justifyItems="center"
                sx={{ width: "100%" }}>
                <DataResultFull
                    isError={editorStateMerged.merge.isError}
                    fullResponse={editorStateMerged.merge.fullResponse}
                    isLineWrapping={isLineWrapping}
                    fontSize={fontSize} />
            </Stack>)
        }
    </Container>);
};

export default RDFDataMergeView;
