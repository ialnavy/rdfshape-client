import { Divider, Grid2 as Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";

import { useLocale } from "../../containers/ExternalisedStringsContext";

import "../../../styles/rdfDataView.css";

import RDFFormatComboBox from "../../../domain_layer/entities/rdfData/RDFFormatComboBox";
import RDFInferenceComboBox from "../../../domain_layer/entities/rdfData/RDFInferenceComboBox";
import EditorFactory from "../../../domain_layer/use_cases/EditorFactory";
import { fetchRDFDataInfo } from '../../../infrastructure_layer/services/FetchRdfData';
import { IRDFDataView } from "./IRDFDataView";
import RDFDataResultResume from './RDFDataResultResume';


/**
 * RDF Data view, intended for smartphone view.
 * 
 * @param param0 
 * @returns 
 */
let RDFDataMobileView: React.FC<IRDFDataView> = ({ code, rdfFormat, rdfInference, sourceOfRDFData, setCode, setRdfFormat, setRdfInference, setSourceOfRDFData }) => {
    let { getString, getStringsSet } = useLocale();

    // These variables are used for assemblying the result of the previous query
    let [isError, setError] = useState<boolean>(false);
    let [fullResponse, setFullResponse] = useState<string>(getString("texts.dataInfoWillAppearHere"));
    let [responseMessage, setResponseMessage] = useState<string>("");
    let [responseNumberOfStatements, setResponseNumberOfStatements] = useState<number>();

    let doFetch = () => {
        fetchRDFDataInfo({
            host: getString("api.host"),
            endpoints: getStringsSet("api.endpoints"),
            contentType: getString("mimeTypes.json.appJSON"),
            content: code, format: rdfFormat, inference: rdfInference, source: sourceOfRDFData
        }).then(data => {
            setError(false);
            setFullResponse((new String(data)).toString());

            console.log(data);
            setResponseMessage(data.message);
            setResponseNumberOfStatements(data.result.numberOfStatements);
        }).catch(error => {
            console.log(error);
            setError(true);
            setFullResponse((new String(error)).toString());
        });
    };

    useEffect(doFetch, [code, rdfFormat, rdfInference, sourceOfRDFData]);

    return (<Grid container spacing={2} className="rdfDataSmallView">
        <Grid size={12}>
            <Divider orientation="horizontal" textAlign="center" />
        </Grid>
        <Grid size={4}>
            <RDFDataResultResume
                isError={isError}
                fullResponse={fullResponse}
                responseMessage={responseMessage}
                responseNumberOfStatements={responseNumberOfStatements} />
            
        </Grid>
        <Grid size={4}>
            <RDFFormatComboBox rdfFormat={rdfFormat} setRdfFormat={setRdfFormat} />
        </Grid>
        <Grid size={4}>
            <RDFInferenceComboBox rdfInference={rdfInference} setRdfInference={setRdfInference} />
        </Grid>
        <Grid size={12}>
            <Typography variant="caption">{getString("texts.rdfResultCaption")}</Typography>
        </Grid>
        <Grid size={12}>
            <Divider orientation="horizontal" textAlign="center" />
            <Typography variant="caption">{getString("texts.rdfDataCaption")}</Typography>
            <EditorFactory code={code} language={getString("mimeTypes.turtle")}
                onChange={(value: string) => { setCode(value); }} />
        </Grid>
    </Grid>);
};

export default RDFDataMobileView;