export type IRDFDataView = {
    code: string;
    rdfFormat: string;
    rdfInference: string;
    sourceOfRDFData: string;

    isError: boolean;
    fullResponse: string;
    responseMessage: string;
    responseNumberOfStatements: number;

    isHiddenApiResponse: boolean;
    isLineWrapping: boolean;
    editor: React.ReactNode;
    

    setCode(code: string): void;
    setRdfFormat(rdfFormat: string): void;
    setRdfInference(rdfInference: string): void;
    setSourceOfRDFData(sourceOfRDFData: string): void;

    setError(isError: boolean): void;
    setFullResponse(fullResponse: string): void;
    setResponseMessage(responseMessage: string): void;
    setResponseNumberOfStatements(responseNumberOfStatements: number): void;

    setHiddenApiResponse(isHiddenApiResponse: boolean): void;
    setLineWrapping(isLineWrapping: boolean): void;
    setEditor(editor: React.ReactNode): void;
};
