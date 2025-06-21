import { Container } from '@mui/material';

import { useLocale } from '../../../infrastructure_layer/utilities/ExternalisedStringsContext';
import { makeParagraph } from '../../../infrastructure_layer/utilities/ReactElementsUtils';
import { IResumeResponse } from './IResumeResponse';


let DataResultResume: React.FC<IResumeResponse> = ({
    isError,
    fullResponse,
    responseMessage,
    responseNumberOfStatements
}) => {
    let { getString } = useLocale();

    if (isError) {
        return (<Container>
            {makeParagraph(getString("texts.errorResponsePrefix"), true)}
            {makeParagraph(fullResponse, true)}
        </Container>);
    } else {
        return (<Container>
            {makeParagraph(responseMessage)}
            {makeParagraph(
                getString("texts.numberOfStatements")
                    .concat(": ")
                    .concat((new String(responseNumberOfStatements))
                        .toString()))}
        </Container>);
    }
};

export default DataResultResume;