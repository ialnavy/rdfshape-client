import React from "react";

// RDFShape commons
import ResultSchemaConvert from "../../results/ResultSchemaConvert";
import ResultShapeForm from "../../results/ResultShapeForm";
import ResultShex2Xmi from "../../results/ResultShex2Xmi";

function ShExConvertResult(props) {
    if (!props.result)
        return null;

    // The target engine will decide the result component
    if (props.result.renderType === props.resultTypes.schema) {
        return (
        <ResultSchemaConvert
            result={props.result}
            permalink={props.permalink}
            disabled={props.disabledLinks}
        />
        );
    } else if (props.result.renderType === props.resultTypes.shumlex) {
        return (
        <ResultShex2Xmi
            result={props.result}
            permalink={props.permalink}
            disabled={props.disabledLinks}
        />
        );
    } else if (props.result.renderType === props.resultTypes.shapeForms) {
        return (
        <ResultShapeForm
            result={props.result}
            permalink={props.permalink}
            disabled={props.disabledLinks}
        />
        );
    }

    return null;
}

export default ShExConvertResult;