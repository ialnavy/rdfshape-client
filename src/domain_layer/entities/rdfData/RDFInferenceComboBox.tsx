import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { useLocale } from "../../../presentation_layer/containers/ExternalisedStringsContext";


interface RDFInferenceComboBoxProps {
    rdfInference: string | undefined;
    setRdfInference(rdfInference: string): void;
}

let RDFInferenceComboBox: React.FC<RDFInferenceComboBoxProps> = ({ rdfInference, setRdfInference }) => {
    let { getStringsSet } = useLocale();
    let [apiDataInfoInferences, setApiDataInfoInferences] = useState<string[]>(Object.values(getStringsSet("api.inference")));

    return (
        <FormControl fullWidth>
            <InputLabel id="rdfDataInference">RDF Inference</InputLabel>
            <Select
                labelId="rdfDataInference"
                value={rdfInference}
                onChange={(event) => { setRdfInference(event.target.value); }}
                label="RDF Inference"
                defaultValue={apiDataInfoInferences[0]}
                required={true}
            >
                {apiDataInfoInferences.map((option: string) => (<MenuItem key={"apiDataInfoInference".concat(option)} value={option}>{option}</MenuItem>))}
            </Select>
        </FormControl>
    );
};

export default RDFInferenceComboBox;