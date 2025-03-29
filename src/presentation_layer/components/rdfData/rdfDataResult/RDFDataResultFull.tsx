import { Container, Divider, Typography } from '@mui/material';
import React from 'react';

import { useLocale } from "../../../containers/ExternalisedStringsContext";

import EditorFactory from '../../../../domain_layer/use_cases/EditorFactory';
import { IRDFDataResult } from './IRDFDataResult';
import { makeParagraph } from '../../../../infrastructure_layer/utilities/ReactElementsUtils';


let RDFDataResultFull: React.FC<IRDFDataResult> = ({ isError, fullResponse, /* responseMessage, responseNumberOfStatements */ }) => {
    let { getString } = useLocale();

    return (<Container>
        <Typography variant="caption">{getString("viewTexts.rdfShapeApiCaption")}</Typography>
        <Divider orientation="horizontal" textAlign="center" />
        {isError ? (
            makeParagraph(fullResponse, "rdfDataResultResumeError")
        ) : (
            <EditorFactory code={fullResponse} language={getString("mimeTypes.json.appJSON")} editable={false} />
        )}
    </Container>);
};

export default RDFDataResultFull;