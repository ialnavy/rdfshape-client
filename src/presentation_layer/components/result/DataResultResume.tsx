import { Container } from '@mui/material';

import { useLocale } from '../../../infrastructure_layer/utilities/ExternalisedStringsContext';
import { makeParagraph } from '../../../infrastructure_layer/utilities/ReactElementsUtils';
import { IDataResult } from './IDataResult';


let DataResultResume: React.FC<IDataResult> = ({
    editorState
}) => {
    let { getString } = useLocale();

    return (editorState.isError ? (<Container>
        {makeParagraph(getString("texts.errorResponsePrefix"), true)}
        {makeParagraph(editorState.fullResponse, true)}
    </Container>
    ) : (<Container>
        {makeParagraph(editorState.responseMessage)}
        {makeParagraph(
            getString("texts.numberOfStatements")
                .concat(": ")
                .concat((new String(editorState.responseNumberOfStatements))
                    .toString()))}
    </Container>));
};

export default DataResultResume;