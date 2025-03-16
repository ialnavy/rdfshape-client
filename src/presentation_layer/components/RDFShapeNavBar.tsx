import React from 'react';
import { AppBar, Stack, Toolbar, Button, Link } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

import "../../styles/mainLayout.css";
import "../../styles/navBarStyle.css";

import { useLocaleStrings } from "../containers/ExternalisedStringsContext";
import { makeParagraph } from "../../infrastructure_layer/utilities/ReactElementsUtils";


interface RDFShapeNavBarProps {
    children?: React.ReactNode;
}

const RDFShapeNavBar: React.FC<RDFShapeNavBarProps> = ({ children }) => {
    let { getString } = useLocaleStrings();

    return (
        <StyledEngineProvider injectFirst>
            <Stack className="rdfShapeContainer">
                <AppBar position="relative" className="rdfShapeNavBar">
                    <Toolbar className="rdfShapeNavBar">
                        <Link href="/" className="rdfShapeNavBarLogoContainer">
                            <img
                                src="multimedia/rdfShapeLogo/256.png"
                                alt="RDFShape Logo"
                                className="rdfShapeNavBarLogo"
                            />
                            {makeParagraph(getString("texts.title"), "rdfShapeNavBarLogoText")}
                        </Link>

                        <div style={{ flexGrow: 1 }}></div>
                        
                        <Button color="inherit">About</Button>
                        <Button color="inherit">Contact</Button>
                    </Toolbar>
                </AppBar>
                {children}
            </Stack>
        </StyledEngineProvider>
    );
};

export default RDFShapeNavBar;