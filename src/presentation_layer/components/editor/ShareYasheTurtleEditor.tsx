import { Grid2 as Grid } from "@mui/material";

import { isDesktop } from "../../../domain_layer/AdaptabilityChecks";
import EditorFactory from "../../../domain_layer/EditorFactory";
import { useLocale } from "../../../infrastructure_layer/utilities/ExternalisedStringsContext";
import DataComboBox from "../dataComboBox/DataComboBox";
import DataResultResume from "../resumeResponse/ResumeResponse";

import { IEditor } from "./IEditor";


let ShareYasheTurtleEditor: React.FC<IEditor> = ({
    idDoc,
    yDocCollection,
    isLineWrapping,
    fontSize,
    isEditable,
    editorState
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
            <DataComboBox
                inputId={"rdfDataFormat"}
                label={getString("viewTexts.rdfFormat")}
                setOfData={Object.values(getStringsSet("api.formats"))}
                data={editorState.rdfFormat}
                setData={editorState.setRdfFormat} />
        </Grid>

        <Grid size={isDesktop() ? 4 : 12}>
            <DataComboBox
                inputId={"rdfDataInference"}
                label={getString("viewTexts.rdfInference")}
                setOfData={Object.values(getStringsSet("api.inference"))}
                data={editorState.rdfInference}
                setData={editorState.setRdfInference} />
        </Grid>

        <Grid size={isDesktop() ? 4 : 12}>
            <DataResultResume
                editorState={editorState}
                isError={editorState.isError}
                fullResponse={editorState.fullResponse} />
        </Grid>

        <Grid size={12} padding={2}>
            <EditorFactory
                code={editorState.code}
                idDoc={idDoc}
                yDocCollection={yDocCollection}
                language={getString("mimeTypes.turtle")}
                editable={isEditable}
                isLineWrapping={isLineWrapping}
                fontSize={fontSize}
                setCode={editorState.setCode}

            /* WARNING!
             * This element, which is the CodeMirror editor, MUST ALWAYS BE VISIBLE!
             * Otherwise, the synchronisation of the Yjs document with the y-mongodb-provider
             * would be lost when the component is made non-visible.
             */

            />
        </Grid>

    </Grid>);
};

export default ShareYasheTurtleEditor;
