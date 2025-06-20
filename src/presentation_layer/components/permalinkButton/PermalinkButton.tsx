import { Button } from '@mui/material';

import { forRdfData, forRdfMerge } from '../../../domain_layer/PermalinkFactory';
import { useLocale } from '../../../infrastructure_layer/utilities/ExternalisedStringsContext';
import { IPermalinkButton } from './IPermalinkButton';


let PermalinkButton: React.FC<IPermalinkButton> = ({
    idDocs,
    yjsCollection,
    verbose
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
            && idDocs.length >= 2) {
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

    let permalinkButtonText: string;
    switch (yjsCollection) {
        case getString("yjs.collections.rdfData"):
            permalinkButtonText = getString("viewTexts.permalink.toRdfData");
            break;
        case getString("yjs.collections.rdfMerge"):
            permalinkButtonText = getString("viewTexts.permalink.toRdfMerge");
            break;
        default:
            permalinkButtonText = getString("viewTexts.permalink.default");
            break;
    }

    return (
        <Button
            variant="contained"
            onClick={() => { window.open(getPermalink(), '_blank'); }}
        >{verbose ? permalinkButtonText : getString("viewTexts.permalink.default")}</Button>
    );
};

export default PermalinkButton;
