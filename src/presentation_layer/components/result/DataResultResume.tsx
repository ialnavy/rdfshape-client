import { Container } from '@mui/material';

import { useLocale } from '../../../infrastructure_layer/utilities/ExternalisedStringsContext';
import { makeParagraph } from '../../../infrastructure_layer/utilities/ReactElementsUtils';
import { IDataResult } from './IDataResult';


let DataResultResume: React.FC<IDataResult> = ({
    isError,
    fullResponse,
    responseMessage,
    responseNumberOfStatements
}) => {
    let { getString } = useLocale();

    return (isError ? (<Container>
        {makeParagraph(getString("texts.errorResponsePrefix"), true)}
        {makeParagraph(fullResponse, true)}
    </Container>
    ) : (<Container>
        {makeParagraph(responseMessage)}
        {makeParagraph(
            getString("texts.numberOfStatements")
                .concat(": ")
                .concat((new String(responseNumberOfStatements))
                    .toString()))}
    </Container>));
};

export default DataResultResume;