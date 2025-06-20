import { useState } from 'react';

import { Button, InputLabel, Menu, MenuItem, Stack, Switch } from '@mui/material';
import { useLocale } from '../../../infrastructure_layer/utilities/ExternalisedStringsContext';
import { IEditorSettings } from './IEditorSettings';


let EditorSettings: React.FC<IEditorSettings> = ({
    isLineWrapping,
    isHiddenApiResponse,
    isHiddenGraph,

    setLineWrapping,
    setHiddenApiResponse,
    setHiddenGraph }) => {
    let { getString } = useLocale();

    let [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    let handleClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };
    let handleClose = () => { setAnchorEl(null); };

    return (<Stack
        direction="column"
        spacing={2}
        padding={1}
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        justifyItems="center">
        <Button
            className="rdfShapeEditorSettingsButton"
            aria-controls={Boolean(anchorEl) ? 'rdfshape-editor-settings-button' : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={'\u2699'}
        >{getString("viewTexts.settings.title")}</Button>
        <Menu
            id="rdfshape-editor-settings-button"
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose} disableRipple>
                <InputLabel className="hide-api-response-input">{getString("viewTexts.hideRdfShapeApiResponse")}</InputLabel>
                <Switch {... { inputProps: { "aria-label": "hide-api-response-input" } }} checked={isHiddenApiResponse} onChange={() => { setHiddenApiResponse(!isHiddenApiResponse); }} />
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
                <InputLabel className="hide-graph-input">{getString("viewTexts.hideRdfGraph")}</InputLabel>
                <Switch {... { inputProps: { "aria-label": "hide-graph-input" } }} checked={isHiddenGraph} onChange={() => { setHiddenGraph(!isHiddenGraph); }} />
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
                <InputLabel className="line-wrapping-input">{getString("viewTexts.settings.lineWrapping")}</InputLabel>
                <Switch {... { inputProps: { "aria-label": "line-wrapping-input" } }} checked={isLineWrapping} onChange={() => { setLineWrapping(!isLineWrapping); }} />
            </MenuItem>
        </Menu>
    </Stack>);
};

export default EditorSettings;