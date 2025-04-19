import { Divider, Grid2 as Grid } from '@mui/material';
import React from "react";

import "../../../styles/rdfDataView.css";

import RDFFormatComboBox from "../../../domain_layer/entities/rdfData/RDFFormatComboBox";
import RDFInferenceComboBox from "../../../domain_layer/entities/rdfData/RDFInferenceComboBox";
import EditorSettings from '../editorSettings/EditorSettings';
import { IRDFDataViewHeader } from "./IRDFDataViewHeader";
import RDFDataResultResume from './rdfDataResult/RDFDataResultResume';


/**
 * RDF Data view, intended for smartphone view.
 * 
 * @param param0 
 * @returns 
 */
let RDFDataMobileViewHeader: React.FC<IRDFDataViewHeader> = ({
    rdfFormat,
    rdfInference,

    isError,
    fullResponse,
    responseMessage,
    responseNumberOfStatements,

    isHiddenApiResponse,
    isLineWrapping,
    fontSize,


    setRdfFormat,
    setRdfInference,

    /* setError, */
    /* setFullResponse, */
    /* setResponseMessage, */
    /* setResponseNumberOfStatements, */

    setHiddenApiResponse,
    setLineWrapping,
    setFontSize }) => {

    return (<Grid container spacing={2} className="rdfDataSmallView" alignContent="center" alignItems="center" justifyContent="center" justifyItems="center">
        <Grid size={12}>
            <Divider orientation="horizontal" textAlign="center" />
        </Grid>
        <Grid size={4}>
            <RDFFormatComboBox rdfFormat={rdfFormat} setRdfFormat={setRdfFormat} />
        </Grid>
        <Grid size={4}>
            <RDFInferenceComboBox rdfInference={rdfInference} setRdfInference={setRdfInference} />
        </Grid>
        <Grid size={4}>
            <EditorSettings
                isLineWrapping={isLineWrapping}
                fontSize={fontSize}
                isHiddenApiResponse={isHiddenApiResponse}

                setLineWrapping={setLineWrapping}
                setFontSize={setFontSize}
                setHiddenApiResponse={setHiddenApiResponse} />
        </Grid>
        <Grid size={12}>
            <RDFDataResultResume
                isError={isError}
                fullResponse={fullResponse}
                responseMessage={responseMessage}
                responseNumberOfStatements={responseNumberOfStatements} />
        </Grid>
    </Grid>);
};

export default RDFDataMobileViewHeader;