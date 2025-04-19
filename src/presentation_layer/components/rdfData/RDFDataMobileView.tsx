import { Box, Container, Divider, Grid2 as Grid, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";

import { useLocale } from "../../containers/ExternalisedStringsContext";

import "../../../styles/rdfDataView.css";

import RDFFormatComboBox from "../../../domain_layer/entities/rdfData/RDFFormatComboBox";
import RDFInferenceComboBox from "../../../domain_layer/entities/rdfData/RDFInferenceComboBox";
import CustomTabPanel, { a11yProps } from '../../../infrastructure_layer/utilities/CustomTabPanel';
import EditorSettings from '../editorSettings/EditorSettings';
import { IRDFDataView } from "./IRDFDataView";
import RDFDataResultFull from './rdfDataResult/RDFDataResultFull';
import RDFDataResultResume from './rdfDataResult/RDFDataResultResume';
import EditorFactory from '../../../domain_layer/use_cases/EditorFactory';


/**
 * RDF Data view, intended for smartphone view.
 * 
 * @param param0 
 * @returns 
 */
let RDFDataMobileView: React.FC<IRDFDataView> = ({
    idDoc,

    code,
    rdfFormat,
    rdfInference,
    /* sourceOfRDFData, */

    isError,
    fullResponse,
    responseMessage,
    responseNumberOfStatements,

    /* isHiddenApiResponse, */
    isLineWrapping,
    fontSize,


    setCode,
    setRdfFormat,
    setRdfInference,
    /* setSourceOfRDFData, */

    /* setError, */
    /* setFullResponse, */
    /* setResponseMessage, */
    /* setResponseNumberOfStatements, */

    /* setHiddenApiResponse, */
    setLineWrapping,
    setFontSize }) => {
    let { getString } = useLocale();

    // Tab control
    let [tabIndex, setTabIndex] = useState<number>(0);
    let handleTabChange = (_event: React.SyntheticEvent, nextTabIndex: number) => {
        setTabIndex(nextTabIndex);
    };

    return (<Container>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label={getString("viewTexts.rdfData.tabTitleRdfForm")} {...a11yProps(0)} />
                <Tab label={getString("viewTexts.rdfData.tabTitleFullResponse")} {...a11yProps(1)} />
            </Tabs>
        </Box>
        <CustomTabPanel tabIndex={tabIndex} index={0}>
            <Grid container spacing={2} className="rdfDataSmallView">
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
                <Grid size={8}>
                    <Typography variant="caption">{getString("viewTexts.rdfData.rdfResultCaption")}</Typography>
                </Grid>
                <Grid size={4}>
                    <EditorSettings
                        isLineWrapping={isLineWrapping}
                        fontSize={fontSize}

                        setLineWrapping={setLineWrapping}
                        setFontSize={setFontSize} />
                </Grid>
                <Grid size={12}>
                    <Divider orientation="horizontal" textAlign="center" />
                    <Typography variant="caption">{getString("viewTexts.rdfData.rdfDataCaption")}</Typography>
                    <EditorFactory
                        code={code}
                        idDoc={idDoc}
                        language={getString("mimeTypes.turtle")}
                        editable={true}
                        isLineWrapping={isLineWrapping}
                        fontSize={fontSize}
                        setCode={setCode} />
                </Grid>
            </Grid>
        </CustomTabPanel>
        <CustomTabPanel tabIndex={tabIndex} index={1}>
            <RDFDataResultFull
                isError={isError}
                fullResponse={fullResponse}
                responseMessage={responseMessage}
                responseNumberOfStatements={responseNumberOfStatements} />
        </CustomTabPanel>
    </Container>);
};

export default RDFDataMobileView;