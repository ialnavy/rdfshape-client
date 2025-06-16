export interface IEditorState {
    code: string;
    rdfFormat: string;
    rdfInference: string;
    sourceOfRDFData: string;

    isError: boolean;
    fullResponse: string;
    responseMessage: string;
    responseNumberOfStatements: number;
    graphVizContent: string | null;


    setCode(code: string): void;
    setRdfFormat(rdfFormat: string): void;
    setRdfInference(rdfInference: string): void;
    setSourceOfRDFData(sourceOfRDFData: string): void;

    setError(isError: boolean): void;
    setFullResponse(fullResponse: string): void;
    setResponseMessage(responseMessage: string): void;
    setResponseNumberOfStatements(responseNumberOfStatements: number): void;
    setGraphVizContent(graphVizContent: string | null): void;
};
