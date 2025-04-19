export type IRDFDataView = {
    code: string;
    rdfFormat: string;
    rdfInference: string;
    sourceOfRDFData: string;

    isError: boolean;
    fullResponse: string;
    responseMessage: string;
    responseNumberOfStatements: number;

    isMobileView: boolean;
    isHiddenApiResponse: boolean;
    isLineWrapping: boolean;
    fontSize: number;
    editor: React.ReactNode;
    

    setCode(code: string): void;
    setRdfFormat(rdfFormat: string): void;
    setRdfInference(rdfInference: string): void;
    setSourceOfRDFData(sourceOfRDFData: string): void;

    setError(isError: boolean): void;
    setFullResponse(fullResponse: string): void;
    setResponseMessage(responseMessage: string): void;
    setResponseNumberOfStatements(responseNumberOfStatements: number): void;

    setIsMobileView(isMobileView: boolean): void;
    setHiddenApiResponse(isHiddenApiResponse: boolean): void;
    setLineWrapping(isLineWrapping: boolean): void;
    setFontSize(fontSize: number): void;
};
