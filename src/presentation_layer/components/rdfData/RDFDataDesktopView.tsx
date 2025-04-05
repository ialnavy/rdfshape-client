import { Divider, Grid2 as Grid, InputLabel, Stack, Switch, Typography } from '@mui/material';
import React from "react";

import { useLocale } from "../../containers/ExternalisedStringsContext";

import RDFFormatComboBox from '../../../domain_layer/entities/rdfData/RDFFormatComboBox';
import RDFInferenceComboBox from '../../../domain_layer/entities/rdfData/RDFInferenceComboBox';
import EditorFactory from '../../../domain_layer/use_cases/EditorFactory';
import { IRDFDataView } from "./IRDFDataView";
import RDFDataResultFull from './rdfDataResult/RDFDataResultFull';
import RDFDataResultResume from './rdfDataResult/RDFDataResultResume';
import EditorSettings from '../editorSettings/EditorSettings';


/**
 * RDF Data view, intended for desktop view.
 * TO BE DONE!
 * 
 * @param param0 
 * @returns 
 */
let RDFDataDesktopView: React.FC<IRDFDataView> = ({ /* code, */
    rdfFormat,
    rdfInference,
    /* sourceOfRDFData, */

    isError,
    fullResponse,
    responseMessage,
    responseNumberOfStatements,

    isHiddenApiResponse,
    isLineWrapping,
    editor,


    /* setCode, */
    setRdfFormat,
    setRdfInference,
    /* setSourceOfRDFData, */

    /* setError, */
    /* setFullResponse, */
    /* setResponseMessage, */
    /* setResponseNumberOfStatements, */

    setHiddenApiResponse,
    setLineWrapping,
    /* setEditor */ }) => {
    let { getString } = useLocale();

    return (
        <Grid container spacing={2} className="rdfDataSmallView">
            <Grid size={12}>
                <Divider orientation="horizontal" textAlign="center" />
            </Grid>
            <Grid size={3}>
                <RDFDataResultResume
                    isError={isError}
                    fullResponse={fullResponse}
                    responseMessage={responseMessage}
                    responseNumberOfStatements={responseNumberOfStatements} />
            </Grid>
            <Grid size={2}>
                <RDFFormatComboBox rdfFormat={rdfFormat} setRdfFormat={setRdfFormat} />
            </Grid>
            <Grid size={2}>
                <RDFInferenceComboBox rdfInference={rdfInference} setRdfInference={setRdfInference} />
            </Grid>
            <Grid size={2}>
                <Stack alignItems="center" justifyContent="center">
                    <InputLabel className="hide-api-response-input">{getString("viewTexts.hideRdfShapeApiResponse")}</InputLabel>
                    <Switch {... { inputProps: { "aria-label": "hide-api-response-input" } }} checked={isHiddenApiResponse} onChange={() => { setHiddenApiResponse(!isHiddenApiResponse); }} />
                </Stack>
            </Grid>
            <Grid size={2}>
                <EditorSettings isLineWrapping={isLineWrapping} setLineWrapping={setLineWrapping} />
            </Grid>
            <Grid size={12}>
                <Typography variant="caption">{getString("viewTexts.rdfData.rdfResultCaption")}</Typography>
            </Grid>
            <Grid size={isHiddenApiResponse ? 12 : 8}>
                <Divider orientation="horizontal" textAlign="center" />
                <Typography variant="caption">{getString("viewTexts.rdfData.rdfDataCaption")}</Typography>
                {editor}
            </Grid>
            {!isHiddenApiResponse && (
                <Grid size={4}>
                    <RDFDataResultFull
                        isError={isError}
                        fullResponse={fullResponse}
                        responseMessage={responseMessage}
                        responseNumberOfStatements={responseNumberOfStatements}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default RDFDataDesktopView;