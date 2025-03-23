import { Container } from '@mui/material';
import React from 'react';

import { makeParagraph } from '../../../infrastructure_layer/utilities/ReactElementsUtils';
import { useLocale } from '../../containers/ExternalisedStringsContext';


export type IRDFDataResult = {
    isError: boolean;
    fullResponse: string;
    responseMessage: string;
    responseNumberOfStatements: number | undefined;
};

let RDFDataResultResume: React.FC<IRDFDataResult> = ({ isError, fullResponse, responseMessage, responseNumberOfStatements }) => {
    let { getString } = useLocale();

    return (isError ? (<Container className="rdfDataResultResumeError">
        {makeParagraph(getString("texts.errorResponsePrefix"))}
        {makeParagraph(fullResponse)}
    </Container>
    ) : (<Container className="rdfDataResultResume">
        {makeParagraph(responseMessage)}
        {makeParagraph(getString("texts.numberOfStatements").concat(": ").concat((new String(responseNumberOfStatements)).toString()))}
    </Container>));
};

export default RDFDataResultResume;