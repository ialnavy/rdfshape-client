import { Button, Container, InputLabel, Stack, TextField, Grid2 as Grid } from "@mui/material";
import { useLocale } from "../../../infrastructure_layer/utilities/ExternalisedStringsContext";
import IFontSettings from "./IFontSettings";

import "../../../styles/fontSettingsStyle.css";

let FontSettings: React.FC<IFontSettings> = ({
    fontSize,
    setFontSize
}) => {
    let { getString, getNumber, /* getBoolean, getStringsSet */ } = useLocale();

    return (
        <Container>
            <InputLabel
                className="font-size-input"
            >{getString("viewTexts.fontSizeInput")}</InputLabel>
            <Stack
                direction="row"
                alignContent="center"
                alignItems="center"
                justifyContent="center"
                justifyItems="center"
                className="font-size-input-container">
                <Grid
                    container
                    spacing={2}
                    className="rdfDataSmallView"
                    alignContent="center"
                    alignItems="center"
                    justifyContent="center"
                    justifyItems="center">

                    <Grid size={6}>
                        <TextField type="number" aria-label="font-size-input" value={fontSize}
                            onChange={(event) => {
                                setFontSize((new Number(event.target.value)).valueOf());
                            }} />
                    </Grid>
                    <Grid size={2}>
                        <Button
                            className="min-font-size-input"
                            color="inherit"
                            fullWidth
                            style={{ justifyContent: 'flex-start' }}
                            onClick={() => {
                                setFontSize(getNumber("limits.minEditorFontSizePx"));
                            }}>{getString("viewTexts.settings.setMinFontSize")}</Button>
                    </Grid>
                    <Grid size={2}>
                        <Button
                            className="default-font-size-input"
                            color="inherit"
                            fullWidth
                            style={{ justifyContent: 'flex-start' }}
                            onClick={() => {
                                setFontSize(getNumber("defaultBehaviour.editorFontSizePx"));
                            }}>{getString("viewTexts.settings.defaultFontSize")}</Button>
                    </Grid>
                    <Grid size={2}>
                        <Button
                            className="max-font-size-input"
                            color="inherit"
                            fullWidth
                            style={{ justifyContent: 'flex-start' }}
                            onClick={() => {
                                setFontSize(getNumber("limits.maxEditorFontSizePx"));
                            }}>{getString("viewTexts.settings.setMaxFontSize")}</Button>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
};

export default FontSettings;