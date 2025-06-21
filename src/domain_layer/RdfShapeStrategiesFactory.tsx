
import { fetchConvertRdfDataToGraphVizDot, fetchRdfDataConvert, fetchRdfDataInfo, fetchRdfDataMerge } from "../infrastructure_layer/services/RdfShapeApiServices";
import { IEditorState } from "./editorState/IEditorState";

/**
 * This is a factory for RdfShape strategies.
 * These methods are used to create strategies, of type RdfShapeStrategy above.
 * These strategies are used to query against the RDFShape API.
 */

export let forRdfDataInfo = (
    editorState: IEditorState,
    callback?: () => void,
    errorCallback?: () => void): () => void => {
    let strategy = () => {
        /*
         * Against the RDFShape API,
         * RDF data is validated.
         */
        fetchRdfDataInfo({
            content: editorState.code,
            format: editorState.rdfFormat,
            inference: editorState.rdfInference,
            source: editorState.sourceOfRDFData
        }).then(data => {
            editorState.setError(false);
            editorState.setFullResponse(JSON.stringify(data, null, 2));
            editorState.setResponseMessage(data.message);
            editorState.setResponseNumberOfStatements(data.result.numberOfStatements);

            if (callback !== undefined)
                callback();

        }).catch(error => {
            editorState.setError(true);
            editorState.setFullResponse((new String(error)).toString());
            editorState.setGraphVizContent(null);

            if (errorCallback !== undefined)
                errorCallback();

        });
    };
    return strategy;
};

export let forRdfDataMerge = (
    editorStateLeft: IEditorState,
    editorStateRight: IEditorState,
    editorStateMerged: IEditorState,
    callback?: () => void,
    errorCallback?: () => void): () => void => {
    let strategy = () => {
        /*
         * Against the RDFShape API,
         * RDF data left and RDF data right are merged.
         */
        fetchRdfDataMerge({
            content: [{
                content: editorStateLeft.code,
                format: editorStateLeft.rdfFormat,
                inference: editorStateLeft.rdfInference,
                source: editorStateLeft.sourceOfRDFData
            }, {
                content: editorStateRight.code,
                format: editorStateRight.rdfFormat,
                inference: editorStateRight.rdfInference,
                source: editorStateRight.sourceOfRDFData
            }],
            targetFormat: editorStateLeft.rdfFormat
        }).then(data => {
            editorStateMerged.setError(false);
            editorStateMerged.setFullResponse(JSON.stringify(data, null, 2));

            if (data?.result?.content !== undefined)
                editorStateMerged.setCode(data.result.content);
            if (data?.result?.format?.name !== undefined)
                editorStateMerged.setRdfFormat(data.result.format.name);
            if (data?.result?.inference !== undefined)
                editorStateMerged.setRdfInference(data.result.inference);

            if (callback !== undefined)
                callback();
        }).catch(error => {
            editorStateMerged.setError(true);
            editorStateMerged.setFullResponse((new String(error)).toString());

            if (errorCallback !== undefined)
                errorCallback();
        });
    };
    return strategy;
}

export let forConvertRdfDataToGraphVizDot = (
    editorState: IEditorState,
    callback?: () => void,
    errorCallback?: () => void): () => void => {
    let strategy = () => {
        /*
         * Against the RDFShape API,
         * RDF data is converted to GraphViz dot.
         */
        fetchConvertRdfDataToGraphVizDot({
            content: editorState.code,
            format: editorState.rdfFormat,
            inference: editorState.rdfInference,
            source: editorState.sourceOfRDFData
        }).then(data => {
            if (data?.result?.content !== undefined)
                editorState.setGraphVizContent(data.result.content);

            if (callback !== undefined)
                callback();

        }).catch(_error => {
            editorState.setGraphVizContent(null);

            if (errorCallback !== undefined)
                errorCallback();
        });
    };
    return strategy;
}

export let forRdfDataConvert = (
    editorState: IEditorState,
    targetFormat: string,
    callback?: () => void,
    errorCallback?: () => void): () => void => {
    let strategy = () => {
        /*
         * Against the RDFShape API,
         * RDF data is converted.
         */
        fetchRdfDataConvert({
            data: {
                content: editorState.code,
                format: editorState.rdfFormat,
                inference: editorState.rdfInference,
                source: editorState.sourceOfRDFData
            },
            targetFormat: targetFormat
        }).then(data => {
            if (data?.result?.content !== undefined)
                editorState.setConvertedRdfData(data.result.content);

            if (callback !== undefined)
                callback();

        }).catch(error => {
            editorState.setConvertedRdfData(null);
            editorState.setError(true);
            editorState.setFullResponse(error);

            if (errorCallback !== undefined)
                errorCallback();
        });
    };
    return strategy;
}
