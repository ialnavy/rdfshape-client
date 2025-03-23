import { Container } from '@mui/material';
import React, { useState } from "react";

import { useLocale } from "../../presentation_layer/containers/ExternalisedStringsContext";

import { useWindowDimensions } from "../../infrastructure_layer/utilities/ReactElementsUtils";
import RDFDataDesktopView from "./rdfData/RDFDataDesktopView";
import RDFDataMobileView from "./rdfData/RDFDataMobileView";


let RDFDataMainView: React.FC = () => {
    let { getString, getNumber } = useLocale();

    // These variables are used for querying against RDFShape API
    let [code, setCode] = useState<string>(getString("defaultScripts.rdfData"));
    let [rdfFormat, setRdfFormat] = useState<string>(getString("api.formats.turtle"));
    let [rdfInference, setRdfInference] = useState<string>(getString("api.inference.none"));
    let [sourceOfRDFData, setSourceOfRDFData] = useState<string>(getString("api.sources.byText"));

    return (useWindowDimensions().width < getNumber("limits.adaptabilityThresholdPx")) ? (
        <RDFDataMobileView
            code={code}
            rdfFormat={rdfFormat}
            rdfInference={rdfInference}
            setCode={setCode}
            setRdfFormat={setRdfFormat}
            setRdfInference={setRdfInference}
            sourceOfRDFData={sourceOfRDFData}
            setSourceOfRDFData={setSourceOfRDFData} />
    ) : (
        <RDFDataDesktopView
            code={code}
            rdfFormat={rdfFormat}
            rdfInference={rdfInference}
            setCode={setCode}
            setRdfFormat={setRdfFormat}
            setRdfInference={setRdfInference}
            sourceOfRDFData={sourceOfRDFData}
            setSourceOfRDFData={setSourceOfRDFData} />);
};

export default RDFDataMainView;
