import { Container } from '@mui/material';
import React from 'react';

import { useLocale } from "../../../containers/ExternalisedStringsContext";

import EditorFactory from '../../../../domain_layer/use_cases/EditorFactory';
import { IRDFDataResult } from './IRDFDataResult';


let RDFDataResultFull: React.FC<IRDFDataResult> = ({ isError, fullResponse, responseMessage, responseNumberOfStatements }) => {
    let { getString } = useLocale();

    return (<Container className={isError ? "rdfDataResultResumeError" : "rdfDataResultResume"}>
        <EditorFactory code={fullResponse} language={getString("mimeTypes.json.appJSON")} editable={false} />
    </Container>);
};

export default RDFDataResultFull;