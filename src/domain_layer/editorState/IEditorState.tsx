export interface IEditorStateOperation {
    isError: boolean;
    fullResponse: string;
    responseMessage: string;
    responseNumberOfStatements: number;
    content: string | null;

    setError(isError: boolean): void;
    setFullResponse(fullResponse: string): void;
    setResponseMessage(responseMessage: string): void;
    setResponseNumberOfStatements(responseNumberOfStatements: number): void;
    setContent(content: string | null): void;
}

export interface IEditorState {
    code: string;
    rdfFormat: string;
    rdfInference: string;
    sourceOfRDFData: string;

    validate: IEditorStateOperation;
    convertToGraph: IEditorStateOperation;
    convertToAny: IEditorStateOperation;
    merge: IEditorStateOperation;

    setCode(code: string): void;
    setRdfFormat(rdfFormat: string): void;
    setRdfInference(rdfInference: string): void;
    setSourceOfRDFData(sourceOfRDFData: string): void;
};
