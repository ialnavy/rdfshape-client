import { Container, Divider, Grid2 as Grid } from "@mui/material";

import { isDesktop } from "../../../domain_layer/AdaptabilityChecks";
import EditorFactory from "../../../domain_layer/EditorFactory";
import { useLocale } from "../../../infrastructure_layer/utilities/ExternalisedStringsContext";
import DataComboBox from "../dataComboBox/DataComboBox";
import DataResultResume from "../result/DataResultResume";

import { IEditor } from "./IEditor";


let ShareYasheEditor: React.FC<IEditor> = ({
    idDoc,
    yDocCollection,
    code,
    isLineWrapping,
    fontSize,

    setCode,

    isError,
    fullResponse,
    responseMessage,
    responseNumberOfStatements,

    rdfFormat,
    rdfInference,
    setRdfFormat,
    setRdfInference
}) => {
    let { getString, /* getNumber, getBoolean, */ getStringsSet } = useLocale();

    return (<Grid
        container
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        justifyItems="center"
        sx={{ width: "100%" }}>

        <Grid size={isDesktop() ? 4 : 12}>
            <DataResultResume
                isError={isError}
                fullResponse={fullResponse}
                responseMessage={responseMessage}
                responseNumberOfStatements={responseNumberOfStatements} />
        </Grid>

        <Grid size={isDesktop() ? 4 : 12}>
            <DataComboBox
                inputId={"rdfDataFormat"}
                label={getString("viewTexts.rdfFormat")}
                setOfData={Object.values(getStringsSet("api.formats"))}
                data={rdfFormat}
                setData={setRdfFormat} />
        </Grid>

        <Grid size={isDesktop() ? 4 : 12}>
            <DataComboBox
                inputId={"rdfDataInference"}
                label={getString("viewTexts.rdfInference")}
                setOfData={Object.values(getStringsSet("api.inference"))}
                data={rdfInference}
                setData={setRdfInference} />
        </Grid>

        <Divider orientation="horizontal" textAlign="center" />

        <Container>
            <EditorFactory
                code={code}
                idDoc={idDoc}
                yDocCollection={yDocCollection}
                language={getString("mimeTypes.turtle")}
                editable={true}
                isLineWrapping={isLineWrapping}
                fontSize={fontSize}
                setCode={setCode}

            /* WARNING!
             * This element, which is the CodeMirror editor, MUST ALWAYS BE VISIBLE!
             * Otherwise, the synchronisation of the Yjs document with the y-mongodb-provider
             * would be lost when the component is made non-visible.
             */

            />
        </Container>

    </Grid>);
};

export default ShareYasheEditor;
