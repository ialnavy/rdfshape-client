export type IRDFDataView = {
    code: string;
    rdfFormat: string;
    rdfInference: string;
    sourceOfRDFData: string;
    
    setCode(code: string): void;
    setRdfFormat(rdfFormat: string): void;
    setRdfInference(rdfInference: string): void;
    setSourceOfRDFData(sourceOfRDFData: string): void;
};
