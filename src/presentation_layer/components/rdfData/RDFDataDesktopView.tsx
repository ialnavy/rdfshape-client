import React from "react";
import { Grid2 as Grid } from '@mui/material';

import { useLocale } from "../../containers/ExternalisedStringsContext";

import { IRDFDataView } from "./IRDFDataView";


/**
 * RDF Data view, intended for desktop view.
 * TO BE DONE!
 * 
 * @param param0 
 * @returns 
 */
let RDFDataDesktopView: React.FC<IRDFDataView> = ({  }) => {
    let { getString } = useLocale();

    return (<Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 4 }} className="rdfDataInputForm">
            {/* To be done */}
        </Grid>
        {/*
    <Grid size={{ xs: 6, md: 4 }} className="...">
        ...
    </Grid>
    */}
        {/*
    <Grid size={{ xs: 6, md: 4 }} className="...">
        ...
    </Grid>
    */}
    </Grid>);
};

export default RDFDataDesktopView;