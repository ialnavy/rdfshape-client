import React from 'react';
import { AppBar, Stack, Toolbar, Button, Link, MenuItem, Menu } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

import "../../styles/mainLayout.css";
import "../../styles/navBarStyle.css";

import { useLocale } from "../containers/ExternalisedStringsContext";
import { makeParagraph } from "../../infrastructure_layer/utilities/ReactElementsUtils";


interface RDFShapeNavBarProps {
    children?: React.ReactNode;
}

const RDFShapeNavBar: React.FC<RDFShapeNavBarProps> = ({ children }) => {
    let { getString } = useLocale();

    let [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    let handleAboutClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };
    let handleAboutClose = () => { setAnchorEl(null); };

    return (
        <StyledEngineProvider injectFirst>
            <Stack className="rdfShapeContainer">
                <AppBar position="relative" className="rdfShapeNavBar">
                    <Toolbar className="rdfShapeNavBar">
                        <Link href="/" className="rdfShapeNavBarLogoContainer">
                            <img
                                src="/multimedia/rdfShapeLogo/256.png"
                                alt="RDFShape Logo"
                                className="rdfShapeNavBarLogo"
                            />
                            {makeParagraph(getString("texts.title"), "rdfShapeNavBarLogoText")}
                        </Link>
                        <Button className="rdfShapeNavBarButton" color="inherit" href="/rdfData">{getString("viewTexts.navBar.rdfData")}</Button>

                        <div style={{ flexGrow: 1 }}></div>

                        <Button
                            className="rdfShapeNavBarButton"
                            aria-controls={Boolean(anchorEl) ? 'rdfshape-about-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleAboutClick}
                            endIcon={'\u2261'}
                        >{getString("viewTexts.navBar.aboutMenuTitle")}</Button>
                        <Menu
                            id="rdfshape-about-menu"
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
                            onClose={handleAboutClose}
                        >
                            <MenuItem onClick={handleAboutClose} disableRipple>
                                <Button className="rdfShapeNavBarButton" color="inherit" href="https://www.weso.es/rdfshape-api/">{getString("viewTexts.navBar.aboutApiProject")}</Button>
                            </MenuItem>
                            <MenuItem onClick={handleAboutClose} disableRipple>
                                <Button className="rdfShapeNavBarButton" color="inherit" href="https://app.swaggerhub.com/apis/weso/RDFShape">{getString("viewTexts.navBar.aboutApiDocs")}</Button>
                            </MenuItem>
                            <MenuItem onClick={handleAboutClose} disableRipple>
                                <Button className="rdfShapeNavBarButton" color="inherit">{getString("viewTexts.navBar.aboutClient")}</Button>
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                {children}
            </Stack>
        </StyledEngineProvider>
    );
};

export default RDFShapeNavBar;