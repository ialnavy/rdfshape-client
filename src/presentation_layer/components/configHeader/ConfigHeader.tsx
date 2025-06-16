import { Button, Grid2 as Grid } from '@mui/material';

import { useLocale } from '../../../infrastructure_layer/utilities/ExternalisedStringsContext';

import { isDesktop } from '../../../domain_layer/AdaptabilityChecks';

import EditorSettings from '../editorSettings/EditorSettings';
import FontSettings from '../fontSettings/FontSettings';

import IConfigHeader from './IConfigHeader';


let ConfigHeader: React.FC<IConfigHeader> = ({
    isLineWrapping,
    isHiddenApiResponse,
    isHiddenGraph,
    fontSize,

    setLineWrapping,
    setHiddenApiResponse,
    setHiddenGraph,
    setFontSize
}) => {
    let { getString /*, getNumber, getBoolean, getStringsSet */ } = useLocale();
    return (
        <Grid
            container
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            justifyItems="center"
            sx={{ width: "100%" }}>

            <Grid size={isDesktop() ? 3 : 12}>
                <EditorSettings
                    isLineWrapping={isLineWrapping}
                    isHiddenApiResponse={isHiddenApiResponse}
                    isHiddenGraph={isHiddenGraph}

                    setLineWrapping={setLineWrapping}
                    setHiddenApiResponse={setHiddenApiResponse}
                    setHiddenGraph={setHiddenGraph} />
            </Grid>

            <Grid size={isDesktop() ? 3 : 12}>
                <Button
                    variant="contained"
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert(getString("viewTexts.permalink.copied"));
                    }}
                >
                    {getString("viewTexts.permalink.button")}
                </Button>
            </Grid>

            <Grid size={isDesktop() ? 6 : 12}>
                <FontSettings
                    fontSize={fontSize}
                    setFontSize={setFontSize} />
            </Grid>

        </Grid>
    );
};

export default ConfigHeader;
