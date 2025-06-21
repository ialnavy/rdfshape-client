import { Button, Stack } from '@mui/material';

import { forRdfData, forRdfMerge } from '../../../domain_layer/PermalinkFactory';
import { useLocale } from '../../../infrastructure_layer/utilities/ExternalisedStringsContext';
import { IPermalinkButton } from './IPermalinkButton';


let PermalinkButton: React.FC<IPermalinkButton> = ({
    idDocs,
    yjsCollection,
    permalinkButtonText
}) => {
    let { getString /*, getNumber, getBoolean, getStringsSet */ } = useLocale();

    let getPermalink = (): string => {
        let permalink = window.location.href;

        if (yjsCollection === getString("yjs.collections.rdfData")
            && idDocs.length >= 1) {
            /*
             * Permalink for accessing a single RDF document editing.
             */
            permalink = forRdfData(idDocs, yjsCollection);

        } else if (yjsCollection === getString("yjs.collections.rdfMerge")
            && idDocs.length >= 1) {
            /*
             * Permalink for accessing a RDF document merging
             * with two RDF documents, left and right.
             */
            permalink = forRdfMerge(idDocs, yjsCollection);
        }

        let fullPermalink = permalink.startsWith('http')
            ? permalink
            : `${window.location.origin}${permalink}`;

        navigator.clipboard.writeText(fullPermalink);
        alert(getString("viewTexts.permalink.copied"));

        return permalink;
    };

    return (<Stack
        direction="column"
        spacing={2}
        padding={1}
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        justifyItems="center">
        <Button
            variant="contained"
            onClick={() => { window.open(getPermalink(), '_blank'); }}
        >{permalinkButtonText}</Button>
    </Stack>);
};

export default PermalinkButton;
