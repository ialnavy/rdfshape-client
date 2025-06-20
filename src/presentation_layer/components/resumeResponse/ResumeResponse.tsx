import { Container } from '@mui/material';

import { useLocale } from '../../../infrastructure_layer/utilities/ExternalisedStringsContext';
import { makeParagraph } from '../../../infrastructure_layer/utilities/ReactElementsUtils';
import { IResumeResponse } from './IResumeResponse';


let DataResultResume: React.FC<IResumeResponse> = ({
    isError,
    fullResponse,
    editorState
}) => {
    let { getString } = useLocale();

    if (isError) {
        return (<Container>
            {makeParagraph(getString("texts.errorResponsePrefix"), true)}
            {makeParagraph(fullResponse, true)}
        </Container>);
    } else if (editorState !== undefined) {
        return (<Container>
            {makeParagraph(editorState.responseMessage)}
            {makeParagraph(
                getString("texts.numberOfStatements")
                    .concat(": ")
                    .concat((new String(editorState.responseNumberOfStatements))
                        .toString()))}
        </Container>);
    }
};

export default DataResultResume;