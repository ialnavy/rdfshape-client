import { Container, Divider, Typography } from '@mui/material';

import { useLocale } from "../../../infrastructure_layer/utilities/ExternalisedStringsContext";

import EditorFactory from '../../../domain_layer/EditorFactory';
import { makeParagraph } from '../../../infrastructure_layer/utilities/ReactElementsUtils';
import { IDataResult } from './IDataResult';

let DataResultFull: React.FC<IDataResult> = ({
    isError,
    fullResponse,
    isLineWrapping,
    fontSize
    /* responseMessage,*/
    /*responseNumberOfStatements */
}) => {
    let { getString } = useLocale();

    return (<Container>
        <Typography variant="caption"
        >{getString("viewTexts.rdfShapeApiCaption")}</Typography>

        <Divider orientation="horizontal" textAlign="center" />

        {isError ? (makeParagraph(fullResponse))
            : (<EditorFactory
                code={fullResponse}
                language={getString("mimeTypes.json.appJSON")}
                editable={false}
                isLineWrapping={isLineWrapping}
                fontSize={fontSize} />)}
    </Container>);
};

export default DataResultFull;