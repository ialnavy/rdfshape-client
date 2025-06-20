import { AppBar, Button, Link, Stack, Toolbar, Typography } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

import "../../styles/mainLayout.css";
import "../../styles/navBarStyle.css";

import { useLocale } from "../../infrastructure_layer/utilities/ExternalisedStringsContext";
import NavBarMenu from './navBarMenu/NavBarMenu';


interface RDFShapeNavBarProps {
    children?: React.ReactNode;
}

const RDFShapeNavBar: React.FC<RDFShapeNavBarProps> = ({ children }) => {
    let { getString } = useLocale();

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
                            <Typography
                                variant="body1"
                                component="p"
                                className="rdfShapeNavBarLogoText"
                            >{getString("texts.title")}</Typography>
                        </Link>

                        {/*
                          * Menu for views related to RDF data.
                          */}
                        <NavBarMenu
                            buttonText={getString("viewTexts.navBar.rdfMenu.title")}
                            menuId="rdfshape-rdf-menu"
                            buttonClassName="rdfShapeNavBarButton">
                            <Button
                                className="rdfShapeNavBarButton"
                                color="inherit"
                                href={`/${getString("yjs.collections.rdfData")}`}
                            >{getString("viewTexts.navBar.rdfMenu.rdfData")}</Button>

                            <Button
                                className="rdfShapeNavBarButton"
                                color="inherit"
                                href={`/${getString("yjs.collections.rdfMerge")}`}
                            >{getString("viewTexts.navBar.rdfMenu.rdfMerge")}</Button>
                        </NavBarMenu>

                        <div style={{ flexGrow: 1 }}></div>

                        {/*
                          * About menu.
                          */}
                        <NavBarMenu
                            buttonText={getString("viewTexts.navBar.aboutMenuTitle")}
                            menuId="rdfshape-about-menu"
                            buttonClassName="rdfShapeNavBarButton">
                            <Button
                                className="rdfShapeNavBarButton"
                                color="inherit"
                                href="https://www.weso.es/rdfshape-api/"
                            >{getString("viewTexts.navBar.aboutApiProject")}</Button>

                            <Button
                                className="rdfShapeNavBarButton"
                                color="inherit"
                                href="https://app.swaggerhub.com/apis/weso/RDFShape"
                            >{getString("viewTexts.navBar.aboutApiDocs")}</Button>

                            <Button
                                className="rdfShapeNavBarButton"
                                color="inherit"
                            >{getString("viewTexts.navBar.aboutClient")}</Button>
                        </NavBarMenu>
                    </Toolbar>
                </AppBar>
                {children}
            </Stack>
        </StyledEngineProvider>
    );
};

export default RDFShapeNavBar;