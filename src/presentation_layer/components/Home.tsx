import React from 'react';
import { Container, Typography, Link, Stack, Grid2 as Grid } from '@mui/material';

import "../../styles/homeLayout.css";
import "../../styles/homeStyle.css";

import { useLocale } from "../containers/ExternalisedStringsContext";
import { makeParagraph } from "../../infrastructure_layer/utilities/ReactElementsUtils";

let Home: React.FC = () => {
    let { getString } = useLocale();

    return (<Container className="homeContainer">
        <Typography variant="h1">{getString("texts.title")}</Typography>
        {makeParagraph(getString("texts.description"))}

        <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 4 }} className="homeGridCell">
                <Stack className="homeGridCellStack">
                    <Container className="homeGridCellHeader">
                        <img
                            src="multimedia/rdfLogo.png"
                            alt="RDF Logo"
                            className="homeGridImg"
                        />
                        <Typography variant="h4">{getString("texts.home.rdfDataTitle")}</Typography>
                    </Container>
                    <Link href={getString("routes.client.dataInfoRoute")}>Data analysis and visualization</Link>
                    <Link href={getString("routes.client.dataConvertRoute")}>Data conversion between semantic formats</Link>
                    <Link href={getString("routes.client.dataQueryRoute")}>Data query via SPARQL</Link>
                </Stack>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }} className="homeGridCell">
                <Stack className="homeGridCellStack">
                    <Container className="homeGridCellHeader">
                        <img
                            src="multimedia/ShexLogo.png"
                            alt="ShEx Logo"
                            className="homeGridImg"
                        />
                        <img
                            src="multimedia/shaclLogo.png"
                            alt="SHACL Logo"
                            className="homeGridImg"
                        />
                        <Typography variant="h4">{getString("texts.home.shexAndShaclValidationTitle")}</Typography>
                    </Container>
                    <Link href={getString("routes.client.shexInfoRoute")}>ShEx and SHACL analysis and visualization</Link>
                    <Link href={getString("routes.client.shexValidateRoute")}>ShEx and SHACL data validation</Link>
                    <Link href={getString("routes.client.shexConvertRoute")}>ShEx and SHACL schema conversions</Link>
                </Stack>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }} className="homeGridCell">
                <Stack className="homeGridCellStack">
                    <Container className="homeGridCellHeader">
                        <img
                            src="multimedia/sparqlLogo.png"
                            alt="SPARQL Logo"
                            className="homeGridImg"
                        />
                        <Typography variant="h4">{getString("texts.home.sparqlQuerying")}</Typography>
                    </Container>
                    <Link href={getString("routes.client.endpointInfoRoute")}>Endpoint information</Link>
                    <Link href={getString("routes.client.endpointQueryRoute")}>Endpoint query</Link>
                    <Link href={getString("routes.utils.wikishape")}>Check out WikiShape for more</Link>
                </Stack>
            </Grid>
        </Grid>
        <Typography variant="body1" component="p">
            You may jump straight in or check the examples in the navbar yourself 😊
        </Typography>
    </Container>);
};

export default Home;