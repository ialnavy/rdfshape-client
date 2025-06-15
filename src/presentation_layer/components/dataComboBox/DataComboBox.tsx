import { Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { isDesktop } from '../../../domain_layer/AdaptabilityChecks';
import IRDFInferenceComboBox from './IDataComboBox';

let DataComboBox: React.FC<IRDFInferenceComboBox> = ({
    inputId,
    label,
    setOfData,
    data,
    setData
}) => {
    return (
        <Container sx={{ width: isDesktop() ? "30vw" : "100%", paddingTop: "10px" }}>
            <FormControl fullWidth>
                <InputLabel id={inputId}>RDF Inference</InputLabel>
                <Select
                    labelId={inputId}
                    value={data}
                    onChange={(event) => { setData(event.target.value); }}
                    label={label}
                    defaultValue={setOfData[0]}
                    required={true}
                >
                    {setOfData.map((option: string) => (
                        <MenuItem
                            key={inputId.concat(option)}
                            value={option}
                        >{option}</MenuItem>))}
                </Select>
            </FormControl>
        </Container>
    );
};

export default DataComboBox;
