import { Button, Container, InputLabel, Menu, MenuItem, Switch } from '@mui/material';
import React from 'react';
import { useLocale } from '../../containers/ExternalisedStringsContext';
import { EditorSettingsProps } from './IEditorSettings';


let EditorSettings: React.FC<EditorSettingsProps> = ({
    isLineWrapping,
    fontSize,

    setLineWrapping,
    setFontSize }) => {
    let { getString, getNumber } = useLocale();

    let [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    let handleClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };
    let handleClose = () => { setAnchorEl(null); };

    return (<Container>
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
                <InputLabel className="line-wrapping-input">{getString("viewTexts.settings.lineWrapping")}</InputLabel>
                <Switch {... { inputProps: { "aria-label": "line-wrapping-input" } }} checked={isLineWrapping} onChange={() => { setLineWrapping(!isLineWrapping); }} />
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
                <Button className="increase-font-size-input" color="inherit" onClick={() => { setFontSize(fontSize + 1); }}>{getString("viewTexts.settings.increaseFontSize")}</Button>
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
                <Button className="decrease-font-size-input" color="inherit" onClick={() => { setFontSize(fontSize - 1); }}>{getString("viewTexts.settings.decreaseFontSize")}</Button>
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
                <Button className="default-font-size-input" color="inherit" onClick={() => { setFontSize(getNumber("defaultBehaviour.editorFontSizePx")); }}>{getString("viewTexts.settings.defaultFontSize")}</Button>
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
                <Button className="max-font-size-input" color="inherit" onClick={() => { setFontSize(getNumber("limits.maxEditorFontSizePx")); }}>{getString("viewTexts.settings.setMaxFontSize")}</Button>
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
                <Button className="min-font-size-input" color="inherit" onClick={() => { setFontSize(getNumber("limits.minEditorFontSizePx")); }}>{getString("viewTexts.settings.setMinFontSize")}</Button>
            </MenuItem>
        </Menu>
    </Container>);
};

export default EditorSettings;