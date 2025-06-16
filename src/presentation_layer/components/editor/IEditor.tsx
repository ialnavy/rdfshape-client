export interface IEditor {

    /*
     * Parameters of editor.
     */
    idDoc: string | undefined;
    yDocCollection: string | undefined;
    code: string;
    isLineWrapping: boolean;
    fontSize: number;
    
    setCode: (code: string) => void;

    /*
     * Parameters of RDFShape API response.
     */
    isError: boolean;
    fullResponse: string;
    responseMessage: string;
    responseNumberOfStatements: number;

    /*
     * Input parameters.
     */
    rdfFormat: string;
    rdfInference: string;

    setRdfFormat: (rdfFormat: string) => void;
    setRdfInference: (rdfInference: string) => void;
}