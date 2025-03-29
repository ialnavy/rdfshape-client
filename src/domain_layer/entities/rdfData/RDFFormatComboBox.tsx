import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { useLocale } from "../../../presentation_layer/containers/ExternalisedStringsContext";


interface RDFFormatComboBoxProps {
    rdfFormat: string | undefined;
    setRdfFormat(rdfFormat: string): void;
}

let RDFFormatComboBox: React.FC<RDFFormatComboBoxProps> = ({ rdfFormat, setRdfFormat }) => {
    let { getString, getStringsSet } = useLocale();
    let [apiDataInfoFormats /* , setApiDataInfoFormats */] = useState<string[]>(Object.values(getStringsSet("api.formats")));

    return (
        <FormControl fullWidth>
            <InputLabel id="rdfDataFormat">RDF Format</InputLabel>
            <Select
                labelId="rdfDataFormat"
                value={rdfFormat}
                onChange={(event) => { setRdfFormat(event.target.value); }}
                label={getString("viewTexts.rdfFormat")}
                defaultValue={apiDataInfoFormats[0]}
                required={true}
            >
                {apiDataInfoFormats.map((option: string) => (<MenuItem key={"apiDataInfoFormat".concat(option)} value={option}>{option}</MenuItem>))}
            </Select>
        </FormControl>
    );
};

export default RDFFormatComboBox;