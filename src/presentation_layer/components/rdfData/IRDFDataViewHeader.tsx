export type IRDFDataViewHeader = {
    rdfFormat: string;
    rdfInference: string;

    isError: boolean;
    fullResponse: string;
    responseMessage: string;
    responseNumberOfStatements: number;

    isHiddenApiResponse: boolean;
    isLineWrapping: boolean;
    fontSize: number;
    

    setRdfFormat(rdfFormat: string): void;
    setRdfInference(rdfInference: string): void;

    setError(isError: boolean): void;
    setFullResponse(fullResponse: string): void;
    setResponseMessage(responseMessage: string): void;
    setResponseNumberOfStatements(responseNumberOfStatements: number): void;

    setHiddenApiResponse(isHiddenApiResponse: boolean): void;
    setLineWrapping(isLineWrapping: boolean): void;
    setFontSize(fontSize: number): void;
};
